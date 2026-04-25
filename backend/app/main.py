from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .routes import admin, chat, contact, guestbook, visitor
from .services.geolocation import init_geoip


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    init_geoip()
    yield


app = FastAPI(title="tjbrackett.com API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tjbrackett.com", "https://www.tjbrackett.com", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visitor.router,   prefix="/api/v1")
app.include_router(guestbook.router, prefix="/api/v1")
app.include_router(chat.router,      prefix="/api/v1")
app.include_router(contact.router,   prefix="/api/v1")
app.include_router(admin.router,     prefix="/api/v1")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
