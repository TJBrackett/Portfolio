import asyncio
import json
from typing import Any

_queues: list[asyncio.Queue[str]] = []


def subscribe() -> asyncio.Queue[str]:
    q: asyncio.Queue[str] = asyncio.Queue()
    _queues.append(q)
    return q


def unsubscribe(q: asyncio.Queue[str]) -> None:
    try:
        _queues.remove(q)
    except ValueError:
        pass


async def broadcast(event_type: str, data: dict[str, Any]) -> None:
    if not _queues:
        return
    msg = f"event: {event_type}\ndata: {json.dumps(data)}\n\n"
    for q in list(_queues):
        await q.put(msg)
