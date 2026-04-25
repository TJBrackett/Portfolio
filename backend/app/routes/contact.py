import os
from datetime import datetime

from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import ContactSubmission

router = APIRouter()


@router.post("/contact")
async def submit_contact(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    client_ip = request.headers.get("X-Real-IP") or (request.client.host if request.client else "unknown")

    submission = ContactSubmission(
        name=body.get("name", ""),
        phone_number=body.get("phone_number", ""),
        email=body.get("email", ""),
        message_body=body.get("message_body", ""),
        response_pref_call=body.get("response_pref_call", False),
        response_pref_text=body.get("response_pref_text", False),
        response_pref_email=body.get("response_pref_email", False),
        submitted_at=datetime.utcnow(),
        visitor_ip=client_ip,
    )
    db.add(submission)

    webhook_url = os.getenv("DISCORD_WEBHOOK_URL", "")
    discord_sent = False
    if webhook_url:
        try:
            from discord_webhook import DiscordWebhook, DiscordEmbed
            prefs = ", ".join(k for k, v in {
                "Call": submission.response_pref_call,
                "Text": submission.response_pref_text,
                "Email": submission.response_pref_email,
            }.items() if v) or "None specified"

            wh = DiscordWebhook(url=webhook_url)
            embed = DiscordEmbed(title="New Contact Form Submission", color=0x0CD463)
            embed.add_embed_field(name="Name", value=submission.name, inline=True)
            embed.add_embed_field(name="Email", value=submission.email, inline=True)
            embed.add_embed_field(name="Phone", value=submission.phone_number, inline=True)
            embed.add_embed_field(name="Response preference", value=prefs, inline=True)
            embed.add_embed_field(name="Message", value=submission.message_body, inline=False)
            wh.add_embed(embed)
            wh.execute()
            discord_sent = True
        except Exception:
            pass

    submission.discord_sent = discord_sent
    await db.commit()
    return {"success": True, "message": "Message received. TJ will be in touch!"}
