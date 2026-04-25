# brackett.dev — Personal Portfolio Website — Constraints & Assumptions

## Constraints

- The entire stack (frontend and backend) must be hosted on the existing Linode server
- The domain brackett.dev must be used, with api.brackett.dev as the backend subdomain
- DNS is managed via Google Workspace or the associated domain registrar
- Nginx must be used as the reverse proxy — Apache may remain for the game dev project but Nginx is the primary entry point
- The existing game dev project on the Linode server must remain live and accessible after the portfolio is deployed
- SQLite must be used as the database — no external database service
- The Anthropic Claude API must be used for TJBot — no other LLM provider
- A Discord bot must be created for the contact form — no email-based contact form
- The admin interface must have no visible entry point — only accessible via Konami code
- Admin authentication must require both a password and TOTP (2FA) — single-factor auth is not acceptable
- Account lockout must occur after exactly 5 failed login attempts
- TOTP implementation must use a free library (e.g., pyotp) — no paid 2FA service
- The cover letter PDF must be swappable by replacing a file on the server with no code changes
- The TJBot context document must be a Markdown file updatable without code changes
- All project pages must use a single reusable template component — no duplicated page templates
- The React frontend must be built as a static build served by Nginx
- The FastAPI backend must run as a persistent service (systemd) on the Linode server
- SSL/TLS must be configured for all public-facing domains (Let's Encrypt recommended)
- Rate limiting must be enforced server-side per IP address — client-side rate limiting alone is not acceptable
- Claude API cost limits must also be configured in the Anthropic console as a secondary safeguard

## Assumptions

- TJ will provide the actual photo file, resume PDF, and cover letter PDF before the corresponding features are implemented
- TJ will provide a completed tjbot_context.md file with full resume details, project descriptions, and background before TJBot is finalized
- The Linode server has been wiped since the previous Apache/game dev setup — Apache is not currently running and port 80/443 are available for Nginx
- The game dev project will need to be re-deployed on the Linode server alongside the portfolio — its specific port and configuration will need to be determined during deployment
- TJ will create the Discord server and provide the bot token and channel ID during the Discord bot setup phase
- The Google Workspace account controls DNS for brackett.dev and TJ has access to configure DNS records
- The Linode server is running a modern Linux distribution (Ubuntu 22.04 LTS assumed) with sufficient resources for Nginx + FastAPI + SQLite
- TJ will provide GitHub and LinkedIn profile URLs before the social links feature is implemented
- The three project pages are intentionally placeholder/incomplete — full content (screenshots, demos, GitHub links) will be added in future iterations
- More projects will be added to the portfolio over time — the modular structure must accommodate this without architectural changes
- The admin dashboard is a single-user system — only one admin account will ever exist
- Admin session timeout will be set to 30 minutes of inactivity (configurable)
- Account lockout duration after 5 failed attempts will be 15 minutes (configurable) — TJ to confirm
- The pre-auth token for the two-step admin login will expire after 5 minutes
- Visit duration tracking via beforeunload beacon may not be 100% reliable (browser behavior varies) — this is acceptable
- The revolving skills banner will use SVG icons from a library such as Simple Icons or Devicons for technology logos
- The React frontend will use React Router for client-side routing between the landing page and project detail pages
- The FastAPI backend will use JWT (JSON Web Tokens) for admin session management
- CORS will be configured on the FastAPI backend to allow requests from brackett.dev only
- The Claude model to use will be claude-3-5-sonnet-20241022 or the latest recommended model at time of implementation
- TJ's name is TJ Brackett and the chatbot persona name TJBot is derived from this

## Tech Stack

| Layer | Technology |
|---|---|
| frontend_framework | React 18+ |
| frontend_routing | React Router v6 |
| frontend_language | TypeScript |
| frontend_styling | Tailwind CSS or CSS Modules (to be decided during implementation) |
| frontend_animations | To be selected during implementation — candidates: GSAP, Framer Motion, tsParticles (for particle effects) |
| frontend_testing | Vitest + React Testing Library |
| frontend_build_tool | Vite |
| backend_framework | FastAPI (Python 3.11+) |
| backend_server | Uvicorn (ASGI) |
| backend_language | Python 3.11+ |
| backend_orm | SQLAlchemy (async) or aiosqlite |
| backend_database | SQLite 3 |
| backend_auth | pyotp (TOTP/2FA), bcrypt (password hashing), python-jose or PyJWT (JWT sessions) |
| backend_rate_limiting | slowapi or custom FastAPI middleware |
| backend_ai_client | anthropic Python SDK |
| backend_discord | discord-webhook or discord.py |
| backend_testing | pytest + httpx (async test client for FastAPI) |
| reverse_proxy | Nginx |
| ssl | Let's Encrypt via Certbot |
| hosting | Linode VPS |
| process_management | systemd |
| version_control | Git / GitHub |
| domain | brackett.dev (Google Workspace DNS) |
| ai_provider | Anthropic Claude API |
| contact_messaging | Discord Bot (Discord API) |

## Open Questions

- [ ] What is the exact Linode server OS and version? (Ubuntu 22.04 LTS assumed — confirm before deployment)
- [ ] What port is the game dev project intended to run on, and does it need its own subdomain (e.g., game.brackett.dev)?
- [ ] What is the desired account lockout duration after 5 failed admin login attempts? (30 minutes assumed — confirm)
- [ ] Should the admin dashboard be a separate React route (e.g., /admin) within the same React app, or a completely separate mini-app? (Same app with protected route recommended)
- [ ] Should the Konami code listener be active on all pages including project detail pages, or only the main landing page?
- [ ] What specific Claude model should be used? (claude-3-5-sonnet-20241022 assumed — confirm or specify)
- [ ] What are the desired rate limit thresholds? (e.g., 20 chat messages per IP per hour, 5 contact form submissions per IP per day — TJ to specify)
- [ ] Should the visitor tracking beacon also capture referrer URL (where the visitor came from)?
- [ ] Should the admin dashboard display any aggregate analytics (e.g., total visits today, most visited pages) in addition to raw log tables?
- [ ] Is there a preference for the React frontend styling approach — Tailwind CSS, CSS Modules, or styled-components?
- [ ] Should the TJBot chat UI support markdown rendering in responses (e.g., bold text, bullet points, code blocks)?
- [ ] Should there be a footer on the site, and if so, what should it contain (e.g., copyright, social links, quick nav)?
- [ ] What is TJ's GitHub profile URL and LinkedIn profile URL for the social links?
- [ ] Should the contact form include any spam protection beyond rate limiting (e.g., honeypot field, reCAPTCHA)?
- [ ] Should the PDF files (resume, cover letter) be served directly by Nginx as static files, or through a FastAPI endpoint that can log download events?
- [ ] Is there a preference for the specific Claude model tier (Haiku for cost savings vs. Sonnet/Opus for quality)?
- [ ] Should the admin be able to export data (e.g., CSV export of visitor logs for the future IP mapping project)?
- [ ] What should happen to the admin session if the browser tab is closed — should the session persist across browser restarts or expire immediately?