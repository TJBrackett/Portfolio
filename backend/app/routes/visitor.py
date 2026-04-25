import asyncio
from datetime import datetime

from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import GlobeVisitor, GuestbookEntry, VisitorLog
from ..services import sse_broker
from ..services.geolocation import geolocate, mask_ip

router = APIRouter()


def get_client_ip(request: Request) -> str:
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip.split(",")[0].strip()
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


@router.post("/visitor/track")
async def track_visitor(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    page_path: str = body.get("page_path", "/")
    visit_id: int | None = body.get("visit_id")
    duration_seconds: int | None = body.get("duration_seconds")

    # Duration beacon from unload event
    if visit_id is not None and duration_seconds is not None:
        await db.execute(
            update(VisitorLog)
            .where(VisitorLog.id == visit_id)
            .values(duration_seconds=duration_seconds)
        )
        await db.commit()
        return {"visit_id": visit_id, "lat": None, "lon": None, "city": None, "country": None, "is_new_globe_visitor": False}

    ip = get_client_ip(request)
    masked = mask_ip(ip)
    now = datetime.utcnow()
    user_agent = request.headers.get("User-Agent", "")

    # Log the page visit
    log = VisitorLog(visitor_ip=masked, page_path=page_path, visited_at=now, user_agent=user_agent)
    db.add(log)

    # Upsert globe visitor
    result = await db.execute(select(GlobeVisitor).where(GlobeVisitor.masked_ip == masked))
    globe_visitor: GlobeVisitor | None = result.scalar_one_or_none()

    geo = geolocate(ip)
    is_new = globe_visitor is None

    if is_new:
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
    else:
        globe_visitor.last_seen = now
        globe_visitor.visit_count += 1

    await db.commit()
    await db.refresh(log)

    if is_new and geo["lat"] is not None:
        await sse_broker.broadcast("new_visitor", {
            "lat": geo["lat"],
            "lon": geo["lon"],
            "city": geo["city"],
            "country": geo["country"],
            "type": "visitor",
            "first_seen": now.isoformat(),
        })

    return {
        "visit_id": log.id,
        "lat": geo["lat"],
        "lon": geo["lon"],
        "city": geo["city"],
        "country": geo["country"],
        "is_new_globe_visitor": is_new,
    }


@router.get("/visitors/pins")
async def get_pins(db: AsyncSession = Depends(get_db)):
    visitors_result = await db.execute(select(GlobeVisitor))
    visitors: list[GlobeVisitor] = list(visitors_result.scalars().all())

    entries_result = await db.execute(select(GuestbookEntry))
    signed: dict[int, GuestbookEntry] = {e.visitor_id: e for e in entries_result.scalars().all()}

    pins = []
    for v in visitors:
        if v.lat is None:
            continue
        entry = signed.get(v.id)
        pin: dict = {
            "lat": v.lat,
            "lon": v.lon,
            "city": v.city or "Unknown",
            "country": v.country or "??",
            "type": "signed" if entry else "visitor",
            "first_seen": v.first_seen.isoformat(),
        }
        if entry:
            pin["name"] = entry.name
            pin["emoji"] = entry.emoji
            pin["signed_at"] = entry.signed_at.isoformat()
        pins.append(pin)

    return {"pins": pins}


@router.get("/visitors/stream")
async def stream_visitors():
    q = sse_broker.subscribe()

    async def event_generator():
        try:
            yield "event: connected\ndata: {}\n\n"
            while True:
                try:
                    msg = await asyncio.wait_for(q.get(), timeout=30)
                    yield msg
                except asyncio.TimeoutError:
                    yield ": heartbeat\n\n"
        finally:
            sse_broker.unsubscribe(q)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
