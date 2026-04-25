import hashlib
import os
from datetime import datetime, timedelta

import bcrypt
import pyotp
from fastapi import APIRouter, Depends, HTTPException, Request
from jose import JWTError, jwt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import AdminAccount, AdminSession, ChatSession, ContactSubmission, VisitorLog

router = APIRouter()

JWT_SECRET  = os.getenv("ADMIN_JWT_SECRET", "change-me-in-production")
JWT_ALG     = "HS256"
MAX_ATTEMPTS = 5
LOCKOUT_MINS = 30
SESSION_MINS = 60


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def _issue_jwt(admin_id: int, expires_at: datetime) -> str:
    return jwt.encode({"sub": str(admin_id), "exp": expires_at}, JWT_SECRET, algorithm=JWT_ALG)


async def _require_admin(request: Request, db: AsyncSession = Depends(get_db)) -> AdminAccount:
    token = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        admin_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")

    h = _token_hash(token)
    result = await db.execute(
        select(AdminSession)
        .where(AdminSession.token_hash == h)
        .where(AdminSession.admin_id == admin_id)
        .where(AdminSession.expires_at > datetime.utcnow())
    )
    sess = result.scalar_one_or_none()
    if not sess:
        raise HTTPException(status_code=401, detail="Session expired")

    admin_result = await db.execute(select(AdminAccount).where(AdminAccount.id == admin_id))
    admin = admin_result.scalar_one_or_none()
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    return admin


# ── Auth ──────────────────────────────────────────────────────────────────────

@router.post("/admin/login")
async def admin_login(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    username: str = body.get("username", "")
    password: str = body.get("password", "")

    result = await db.execute(select(AdminAccount).where(AdminAccount.username == username))
    admin: AdminAccount | None = result.scalar_one_or_none()

    if not admin:
        return {"success": False, "pre_auth_token": None, "message": "Invalid credentials"}

    now = datetime.utcnow()
    if admin.locked_until and admin.locked_until > now:
        remaining = int((admin.locked_until - now).total_seconds() / 60)
        return {"success": False, "pre_auth_token": None, "message": f"Account locked for {remaining} more minutes"}

    if not bcrypt.checkpw(password.encode(), admin.password_hash.encode()):
        admin.failed_attempts += 1
        if admin.failed_attempts >= MAX_ATTEMPTS:
            admin.locked_until = now + timedelta(minutes=LOCKOUT_MINS)
            admin.failed_attempts = 0
        await db.commit()
        return {"success": False, "pre_auth_token": None, "message": "Invalid credentials"}

    # Valid password — issue short-lived pre-auth token (TOTP step next)
    admin.failed_attempts = 0
    await db.commit()

    pre_auth = jwt.encode(
        {"sub": str(admin.id), "exp": now + timedelta(minutes=5), "step": "totp"},
        JWT_SECRET,
        algorithm=JWT_ALG,
    )
    return {"success": True, "pre_auth_token": pre_auth, "message": ""}


@router.post("/admin/verify-totp")
async def admin_verify_totp(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    pre_auth_token: str = body.get("pre_auth_token", "")
    totp_code: str = body.get("totp_code", "")

    try:
        payload = jwt.decode(pre_auth_token, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("step") != "totp":
            raise ValueError
        admin_id = int(payload["sub"])
    except Exception:
        return {"success": False, "access_token": None, "expires_at": None, "message": "Invalid pre-auth token"}

    result = await db.execute(select(AdminAccount).where(AdminAccount.id == admin_id))
    admin: AdminAccount | None = result.scalar_one_or_none()
    if not admin:
        return {"success": False, "access_token": None, "expires_at": None, "message": "Admin not found"}

    totp = pyotp.TOTP(admin.totp_secret)
    if not totp.verify(totp_code, valid_window=1):
        return {"success": False, "access_token": None, "expires_at": None, "message": "Invalid TOTP code"}

    now = datetime.utcnow()
    expires_at = now + timedelta(minutes=SESSION_MINS)
    access_token = _issue_jwt(admin.id, expires_at)

    sess = AdminSession(
        token_hash=_token_hash(access_token),
        created_at=now,
        expires_at=expires_at,
        admin_id=admin.id,
    )
    db.add(sess)
    admin.last_login_at = now
    await db.commit()

    return {"success": True, "access_token": access_token, "expires_at": expires_at.isoformat(), "message": ""}


@router.get("/admin/me")
async def admin_me(admin: AdminAccount = Depends(_require_admin)):
    return {"valid": True, "username": admin.username}


# ── Data endpoints ────────────────────────────────────────────────────────────

@router.get("/admin/conversations")
async def list_conversations(
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db),
    _admin: AdminAccount = Depends(_require_admin),
):
    result = await db.execute(select(ChatSession).order_by(ChatSession.started_at.desc()))
    sessions = result.scalars().all()
    total = len(sessions)
    sliced = sessions[(page - 1) * page_size: page * page_size]
    return {"sessions": [{"id": s.id, "session_id": s.session_id, "visitor_ip": s.visitor_ip, "started_at": s.started_at.isoformat()} for s in sliced], "total": total, "page": page, "page_size": page_size}


@router.delete("/admin/conversations/{session_id}")
async def delete_conversation(session_id: str, db: AsyncSession = Depends(get_db), _admin: AdminAccount = Depends(_require_admin)):
    from sqlalchemy import delete as sql_delete
    await db.execute(sql_delete(ChatSession).where(ChatSession.session_id == session_id))
    await db.commit()
    return {"success": True}


@router.get("/admin/contact-submissions")
async def list_contact_submissions(
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db),
    _admin: AdminAccount = Depends(_require_admin),
):
    result = await db.execute(select(ContactSubmission).order_by(ContactSubmission.submitted_at.desc()))
    subs = result.scalars().all()
    total = len(subs)
    sliced = subs[(page - 1) * page_size: page * page_size]
    return {"submissions": [{"id": s.id, "name": s.name, "email": s.email, "submitted_at": s.submitted_at.isoformat(), "discord_sent": s.discord_sent} for s in sliced], "total": total, "page": page, "page_size": page_size}


@router.delete("/admin/contact-submissions/{sub_id}")
async def delete_contact_submission(sub_id: int, db: AsyncSession = Depends(get_db), _admin: AdminAccount = Depends(_require_admin)):
    from sqlalchemy import delete as sql_delete
    await db.execute(sql_delete(ContactSubmission).where(ContactSubmission.id == sub_id))
    await db.commit()
    return {"success": True}


@router.get("/admin/visitor-logs")
async def list_visitor_logs(
    page: int = 1,
    page_size: int = 50,
    db: AsyncSession = Depends(get_db),
    _admin: AdminAccount = Depends(_require_admin),
):
    result = await db.execute(select(VisitorLog).order_by(VisitorLog.visited_at.desc()))
    logs = result.scalars().all()
    total = len(logs)
    sliced = logs[(page - 1) * page_size: page * page_size]
    return {"logs": [{"id": l.id, "visitor_ip": l.visitor_ip, "page_path": l.page_path, "visited_at": l.visited_at.isoformat(), "duration_seconds": l.duration_seconds} for l in sliced], "total": total, "page": page, "page_size": page_size}


@router.delete("/admin/visitor-logs/{log_id}")
async def delete_visitor_log(log_id: int, db: AsyncSession = Depends(get_db), _admin: AdminAccount = Depends(_require_admin)):
    from sqlalchemy import delete as sql_delete
    await db.execute(sql_delete(VisitorLog).where(VisitorLog.id == log_id))
    await db.commit()
    return {"success": True}
