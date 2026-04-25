import os
from datetime import datetime

from fastapi import APIRouter, Depends, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import ChatMessage, ChatSession

router = APIRouter()

_context_cache: str | None = None

CONTEXT_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "tjbot_context.md")


def _load_context() -> str:
    global _context_cache
    if _context_cache is None:
        try:
            with open(CONTEXT_PATH, "r") as f:
                _context_cache = f.read()
        except FileNotFoundError:
            _context_cache = "You are TJBot, a helpful assistant on TJ Brackett's portfolio."
    return _context_cache


@router.get("/chat/status")
async def chat_status():
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    return {"available": bool(api_key), "message": "TJBot is online" if api_key else "API key not configured"}


@router.post("/chat")
async def chat(request: Request, db: AsyncSession = Depends(get_db)):
    import anthropic

    body = await request.json()
    session_id: str = body["session_id"]
    user_message: str = body["message"]
    now = datetime.utcnow()

    client_ip = request.headers.get("X-Real-IP") or (request.client.host if request.client else "unknown")

    # Get or create session
    result = await db.execute(select(ChatSession).where(ChatSession.session_id == session_id))
    session: ChatSession | None = result.scalar_one_or_none()

    if not session:
        session = ChatSession(session_id=session_id, visitor_ip=client_ip, started_at=now, last_activity_at=now)
        db.add(session)
        await db.flush()

    # Load message history
    msgs_result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.id)
    )
    history = [{"role": m.role, "content": m.content} for m in msgs_result.scalars().all()]

    # Save user message
    user_msg = ChatMessage(session_id=session_id, role="user", content=user_message, timestamp=now)
    db.add(user_msg)

    # Call Claude
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        return {"session_id": session_id, "response": "TJBot is currently offline.", "timestamp": now.isoformat()}

    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=_load_context(),
        messages=history + [{"role": "user", "content": user_message}],
    )
    reply = response.content[0].text

    # Save assistant message
    assist_msg = ChatMessage(session_id=session_id, role="assistant", content=reply, timestamp=datetime.utcnow())
    db.add(assist_msg)
    session.last_activity_at = datetime.utcnow()

    await db.commit()
    return {"session_id": session_id, "response": reply, "timestamp": assist_msg.timestamp.isoformat()}
