import re
import unicodedata
from datetime import datetime

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, field_validator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import GlobeVisitor, GuestbookEntry
from ..services import sse_broker
from ..services.geolocation import geolocate, mask_ip

router = APIRouter()

ALLOWED_EMOJIS = {
    '👋','🌍','🦊','🎸','🌸','🥐','🦘','⚡','🐉','🌺',
    '🚀','🦋','🎯','🌊','🔥','🦁','🌙','🎨','🏄','🦅',
    '🧩','🎭','🌿','💫','🦜',
}
_BLOCKED = re.compile(r'[<>&"\\]')


class GuestbookRequest(BaseModel):
    name: str
    emoji: str = '👋'

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        # Strip Unicode control characters (category C*)
        v = ''.join(c for c in v if unicodedata.category(c)[0] != 'C')
        # Normalize interior whitespace
        v = ' '.join(v.split())
        if not 1 <= len(v) <= 32:
            raise ValueError('Name must be 1–32 characters')
        if _BLOCKED.search(v):
            raise ValueError('Name contains invalid characters')
        return v

    @field_validator('emoji')
    @classmethod
    def validate_emoji(cls, v: str) -> str:
        return v if v in ALLOWED_EMOJIS else '👋'


def get_client_ip(request: Request) -> str:
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip.split(",")[0].strip()
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


@router.post("/guestbook")
async def sign_guestbook(body: GuestbookRequest, request: Request, db: AsyncSession = Depends(get_db)):
    name = body.name
    emoji = body.emoji

    ip = get_client_ip(request)
    masked = mask_ip(ip)
    now = datetime.utcnow()

    result = await db.execute(select(GlobeVisitor).where(GlobeVisitor.masked_ip == masked))
    globe_visitor: GlobeVisitor | None = result.scalar_one_or_none()

    geo = geolocate(ip)

    if not globe_visitor:
        globe_visitor = GlobeVisitor(
            masked_ip=masked,
            lat=geo["lat"],
            lon=geo["lon"],
            city=geo["city"],
            country=geo["country"],
            first_seen=now,
            last_seen=now,
            visit_count=1,
        )
        db.add(globe_visitor)
        await db.flush()

    # Upsert guestbook entry (one per visitor)
    entry_result = await db.execute(
        select(GuestbookEntry).where(GuestbookEntry.visitor_id == globe_visitor.id)
    )
    entry: GuestbookEntry | None = entry_result.scalar_one_or_none()

    if entry:
        entry.name = name
        entry.emoji = emoji
        entry.signed_at = now
    else:
        entry = GuestbookEntry(visitor_id=globe_visitor.id, name=name, emoji=emoji, signed_at=now)
        db.add(entry)

    await db.commit()
    await db.refresh(entry)

    lat = geo["lat"] if geo["lat"] is not None else globe_visitor.lat
    lon = geo["lon"] if geo["lon"] is not None else globe_visitor.lon

    if lat is not None:
        await sse_broker.broadcast("new_signed", {
            "lat": lat,
            "lon": lon,
            "city": geo["city"] or globe_visitor.city or "Unknown",
            "country": geo["country"] or globe_visitor.country or "??",
            "type": "signed",
            "name": name,
            "emoji": emoji,
            "signed_at": now.isoformat(),
            "first_seen": globe_visitor.first_seen.isoformat(),
        })

    return {"success": True, "entry_id": entry.id}
