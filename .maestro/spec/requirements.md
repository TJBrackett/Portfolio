# brackett.dev — Personal Portfolio Website — Requirements

## REQ-001: Dark Mode UI with Cool Color Palette
**Category:** non-functional | **Priority:** critical

The entire site must use a dark mode color scheme with a palette centered on cool greens and blues. The aesthetic should feel professional and polished — similar to a product marketing website — but advertising TJ Brackett as the 'product'. The design must demonstrate strong UI/UX principles.

### Acceptance Criteria
- [ ] All pages render in dark mode with no light-mode fallback visible by default
- [ ] Primary accent colors are drawn from a green/blue palette
- [ ] Design is visually comparable to a professional SaaS or product marketing website
- [ ] A UX-knowledgeable reviewer would consider the design polished and not cluttered

## REQ-002: Subtle Animations and Particle Effects
**Category:** functional | **Priority:** high

The site must include subtle, non-intrusive animations including: particle effects (likely on the hero section background), scroll-triggered animations for section reveals, and animated transitions between states. Animations must be noticeable but not distracting or annoying — they should enhance the professional feel, not detract from it.

### Acceptance Criteria
- [ ] Hero section includes a calm particle or ambient background animation
- [ ] At least one scroll-triggered animation is present (e.g., sections fade/slide in on scroll)
- [ ] Animations do not cause layout shifts or performance degradation on mid-range hardware
- [ ] Animations can be perceived as subtle — they enhance rather than dominate the experience
- [ ] No animation loops in a way that becomes visually fatiguing after 30 seconds of viewing

## REQ-003: Sticky Navigation Header
**Category:** functional | **Priority:** critical

The site header must remain fixed/sticky at the top of the viewport at all times as the user scrolls. The header must contain navigation links, and the resume and cover letter download/view buttons.

### Acceptance Criteria
- [ ] Header remains visible and fixed at the top of the viewport on all pages during scroll
- [ ] Header contains navigation links to all major page sections
- [ ] Header contains a 'Resume' button that opens the resume PDF in a new browser tab
- [ ] Header contains a 'Cover Letter' button that opens the cover letter PDF in a new browser tab
- [ ] Header is responsive and does not overflow on mobile viewports

## REQ-004: Hero Banner Section
**Category:** functional | **Priority:** critical

The landing page must open with a hero banner section displaying TJ's name, a cycling animated title, and a calm ambient background animation (e.g., particles). The title must cycle through: 'DevOps Engineer', 'Software Engineer', 'Full-Stack Developer', and 'Indie Game Dev' using smooth text transition animations.

### Acceptance Criteria
- [ ] Hero section displays the name 'TJ Brackett' prominently
- [ ] Title cycles through all four values: DevOps Engineer, Software Engineer, Full-Stack Developer, Indie Game Dev
- [ ] Title cycling uses a smooth animation (e.g., fade, typewriter, or slide)
- [ ] Background includes a calm ambient animation (particles or similar)
- [ ] Hero section occupies at minimum the full viewport height on load
- [ ] Resume and Cover Letter buttons are accessible from the sticky header visible over the hero

## REQ-005: About Me Section
**Category:** functional | **Priority:** critical

A dedicated 'About Me' section on the main landing page displaying TJ's professional bio and a photo of TJ. The initial bio copy will be sourced from the resume header blurb: 'As a self-sufficient self-starter with a strong passion for technology and automation, I bring a versatile skill set that seamlessly integrates into any team. With a proactive approach and a deep understanding of DevOps and Software Engineering principles, I consistently drive efficiency and innovation in fast-paced environments. I have over two years of experience working with AI models to produce production-ready code and infrastructure with a focus on security, stability, and scalability.' The photo will appear in this section alongside the text.

### Acceptance Criteria
- [ ] About Me section is present on the main landing page
- [ ] Bio text matches the approved resume header blurb
- [ ] A photo of TJ is displayed in the About Me section alongside the bio text
- [ ] Layout is responsive — photo and text stack gracefully on mobile
- [ ] Section is reachable via the sticky navigation header

## REQ-006: Animated Skills/Tech Stack Revolving Banner
**Category:** functional | **Priority:** high

A continuously revolving/scrolling banner section that displays icons and names of TJ's skills and technologies. The banner must auto-scroll horizontally in a loop without user interaction. Skills to display include: Python, Kubernetes, Docker, AWS Lambda, AWS S3, AWS DynamoDB, AWS SNS, AWS SQS, JavaScript/TypeScript, Golang, PostgreSQL, Linux, MySQL, SQLite, Git/GitHub, React, Ansible, Terraform, Jenkins. Skill categories to display include: CI/CD, Automation, Full-Stack Development, DevOps Engineering, Software Engineering, Large-Scale Datasets, Optimization.

### Acceptance Criteria
- [ ] Banner scrolls continuously and loops seamlessly without a visible jump
- [ ] Each item displays both an icon and the technology/skill name
- [ ] All listed technologies and skill categories are represented
- [ ] Banner does not require user interaction to animate
- [ ] Banner is responsive and does not break on mobile viewports
- [ ] Animation is smooth and does not cause jank or high CPU usage

## REQ-007: Work Experience Timeline
**Category:** functional | **Priority:** critical

A work experience section on the main landing page displaying TJ's employment history in a timeline format. Entries must include: (1) TEKsystems at Apple TV — DevOps Engineer (current): bullet points as provided. (2) Neustar Inc — DevOps Engineer: bullet points as provided. (3) Trapp Technology — DevOps Technician: bullet points as provided. Full bullet point content is specified in the interview transcript.

### Acceptance Criteria
- [ ] Timeline section is present on the main landing page
- [ ] All three work experience entries are displayed with company name, role title, and employment status/dates
- [ ] Each entry displays its associated bullet points from the resume
- [ ] TEKsystems at Apple TV is marked as current position
- [ ] Timeline layout is visually clear and chronologically ordered (most recent first)
- [ ] Section is reachable via sticky navigation

## REQ-008: Featured Projects Grid / Section
**Category:** functional | **Priority:** critical

A projects section on the main landing page displaying cards for each current project. Each card links to a dedicated project detail page. Initial projects: (1) Indie Game Dev, (2) Home Network Command Center, (3) AI Automation Toolkit. The section must be designed so new project cards can be added with minimal code changes (modular/component-based).

### Acceptance Criteria
- [ ] Projects section is present on the main landing page
- [ ] Each project is represented by a card with at minimum: title, brief description, and a link to the detail page
- [ ] Clicking a project card navigates to that project's dedicated page
- [ ] Adding a new project requires only adding a new data entry and/or component — no structural refactoring needed
- [ ] All three initial projects are present
- [ ] Section is reachable via sticky navigation

## REQ-009: Modular Individual Project Detail Pages
**Category:** functional | **Priority:** critical

Each project must have its own dedicated page with in-depth details. The page template must be reusable/modular so new project pages can be created by populating a data structure or component props. Initial project page content: (1) Indie Game Dev — description, tech stack (Golang microservices, Pygame, Unity C#), placeholder for screenshots/demos, GitHub link TBD. (2) Home Network Command Center — description, tech stack (Python, Raspberry Pi, Discord bot), placeholder for screenshots/demos, GitHub link TBD. (3) AI Automation Toolkit — description, tech stack (LangGraph, FastAPI, ChromaDB, RAG, MCP server, LangSmith), placeholder for screenshots/demos, GitHub link TBD. All three pages are currently placeholders pending more content.

### Acceptance Criteria
- [ ] Each of the three projects has a dedicated routed page
- [ ] All three pages use the same reusable page template/component
- [ ] Each page displays: project title, description, tech stack, placeholder areas for screenshots and demos
- [ ] Placeholder areas are visually indicated as 'coming soon' or similar
- [ ] A new project page can be added by creating a new data object — no new template code required
- [ ] Pages are navigable from the main landing page project cards
- [ ] Back navigation to the main page is available

## REQ-010: TJBot AI Chatbot
**Category:** functional | **Priority:** critical

An AI-powered chatbot named 'TJBot' integrated into the site, powered by the Anthropic Claude API. TJBot must be able to answer questions about TJ's resume, work experience, projects, and skills. It must have a defined persona and guardrails to keep conversations on-topic and prevent malicious usage. The chatbot must be placed in the 'Want to Learn More?' section alongside the Discord contact form.

### Acceptance Criteria
- [ ] Chatbot is named 'TJBot' and has a consistent persona in its responses
- [ ] TJBot can accurately answer questions about TJ's resume, experience, projects, and skills using provided context
- [ ] TJBot politely redirects off-topic questions back to relevant topics
- [ ] TJBot refuses or deflects prompt injection and malicious usage attempts
- [ ] Chatbot UI is located in the 'Want to Learn More?' section
- [ ] Conversation history persists within a single browser session
- [ ] If Claude API is unavailable, the input is disabled and a status message is shown (see REQ-011)
- [ ] All conversations are logged to the SQLite database (see REQ-020)

## REQ-011: TJBot API Status and Graceful Degradation
**Category:** functional | **Priority:** high

If the Claude API is down, rate-limited, or otherwise unavailable, TJBot must gracefully degrade. The chatbot input field must be disabled and a visible status message must inform the user of the current Claude API status (e.g., 'TJBot is currently unavailable — Claude API is unreachable. Please try again later.').

### Acceptance Criteria
- [ ] When Claude API returns an error or is unreachable, the chat input is disabled
- [ ] A user-visible status message explains that TJBot is currently unavailable
- [ ] The status message references the Claude API being down, not a generic error
- [ ] The rest of the page remains fully functional when TJBot is degraded
- [ ] When the API recovers, the input re-enables (either on page refresh or via polling)

## REQ-012: Discord Bot Contact Form
**Category:** functional | **Priority:** high

A contact form in the 'Want to Learn More?' section that sends messages to TJ via a Discord bot to a designated Discord server. The form must collect: name, phone number, email address, message body, and three checkboxes for response preference (Call, Text, Email — any combination allowed). Upon successful submission, a confirmation card must overlay the form area stating the message was sent successfully, with an X button to dismiss it.

### Acceptance Criteria
- [ ] Contact form collects: name, phone number, email, message body, and response preference checkboxes (Call, Text, Email)
- [ ] At least one response preference checkbox must be selectable; all three can be selected simultaneously
- [ ] Form submission sends all collected data to TJ's Discord server via a Discord bot
- [ ] Discord message includes all form fields including which response preferences were selected
- [ ] On successful submission, a confirmation card overlays the form area
- [ ] Confirmation card contains a success message and an X button to dismiss it
- [ ] Dismissing the card returns the form to its empty/ready state
- [ ] Form validates required fields before submission
- [ ] Discord bot and server must be created as part of this project

## REQ-013: Resume PDF — View and Download
**Category:** functional | **Priority:** critical

TJ's resume must be available as a PDF that opens in a new browser tab when the user clicks the Resume button in the sticky header. The browser's native PDF viewer will offer the download option. The file must be easily replaceable on the server.

### Acceptance Criteria
- [ ] Clicking the Resume button opens the resume PDF in a new browser tab
- [ ] The PDF is served such that the browser's native viewer is used, which includes a download option
- [ ] Replacing the PDF file on the server updates what users see without code changes
- [ ] Button is present in the sticky header at all times

## REQ-014: Cover Letter PDF — View and Download
**Category:** functional | **Priority:** high

TJ's cover letter must be available as a PDF that opens in a new browser tab when the user clicks the Cover Letter button in the sticky header. The cover letter file must be easily swappable (replacing the file on the server is sufficient to update it).

### Acceptance Criteria
- [ ] Clicking the Cover Letter button opens the cover letter PDF in a new browser tab
- [ ] The PDF is served such that the browser's native viewer is used, which includes a download option
- [ ] Replacing the PDF file on the server is sufficient to update the cover letter — no code changes required
- [ ] Button is present in the sticky header at all times

## REQ-015: Hidden Admin Dashboard — Konami Code Trigger
**Category:** functional | **Priority:** high

A hidden admin login modal must be triggered by the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) entered anywhere on the site. There must be no visible login button, link, or any UI element that hints at the existence of an admin interface. The login modal must not be discoverable through normal browsing.

### Acceptance Criteria
- [ ] No login button, link, or admin-related UI element is visible anywhere on the public site
- [ ] Entering the Konami code sequence triggers the display of a login modal
- [ ] The login modal does not appear under any other condition
- [ ] The Konami code listener is active on all pages of the site
- [ ] The modal can be dismissed without logging in

## REQ-016: Admin Authentication — Brute Force Protection and 2FA
**Category:** non-functional | **Priority:** critical

The admin login must be secured against brute force attacks with account lockout after 5 failed attempts. Two-factor authentication (TOTP, e.g., compatible with Google Authenticator or Authy — free) must be required in addition to a password. The lockout must be enforced server-side, not just client-side.

### Acceptance Criteria
- [ ] After 5 consecutive failed login attempts from a given IP or for the admin account, the account is locked
- [ ] Lockout is enforced server-side in the FastAPI backend
- [ ] Locked account cannot be unlocked by the attacker — requires manual server-side reset or a timed unlock (spec to define duration)
- [ ] TOTP-based 2FA is required after correct password entry
- [ ] TOTP is compatible with standard authenticator apps (Google Authenticator, Authy)
- [ ] 2FA setup uses a free TOTP library (e.g., pyotp)
- [ ] JWT or session token issued only after both password and TOTP are verified
- [ ] Admin session tokens expire after a reasonable idle period (e.g., 30 minutes)

## REQ-017: Admin Dashboard — Content and Features
**Category:** functional | **Priority:** high

Once authenticated, the admin dashboard must display: (1) TJBot conversation logs — full message history, timestamps, visitor IP, session ID; (2) Discord contact form submissions — all fields submitted; (3) Site visitor logs — IP address, page visited, visit timestamp, and visit duration. Admin must be able to delete individual entries from all three data sets. The visitor IP data is intended for potential future use in a world map visualization project.

### Acceptance Criteria
- [ ] Dashboard displays a table/list of TJBot conversation logs with full message history, timestamps, IP, and session ID
- [ ] Dashboard displays a table/list of Discord contact form submissions with all submitted fields
- [ ] Dashboard displays a table/list of site visitor logs with IP, page visited, timestamp, and duration
- [ ] Admin can delete individual entries from each of the three data sets
- [ ] Dashboard is only accessible after successful authentication (password + TOTP)
- [ ] Dashboard is not linked from any public-facing page
- [ ] Data is paginated or otherwise manageable for large record sets

## REQ-018: Visitor IP and Session Tracking
**Category:** functional | **Priority:** high

All page visits across the entire site must be logged server-side. Logging must capture: visitor IP address, page/path visited, visit timestamp, and visit duration. IP/timestamp logging will be handled via FastAPI middleware parsing Nginx access log data or direct middleware logging. Visit duration will be captured via a client-side JavaScript beacon that pings the backend on page unload/beforeunload.

### Acceptance Criteria
- [ ] Every page visit on the site is logged to the SQLite database
- [ ] Each log entry captures: IP address, page path, visit start timestamp, and visit duration
- [ ] Visit duration is recorded via a client-side beacon sent on page unload
- [ ] Logging occurs for all pages, not just the landing page
- [ ] Logs are viewable in the admin dashboard
- [ ] Logging does not noticeably impact page load performance

## REQ-019: Discord Contact Form Submission Logging
**Category:** functional | **Priority:** high

All Discord contact form submissions must be stored in the SQLite database in addition to being sent to Discord. This allows the admin to review submissions via the admin dashboard even if Discord messages are missed.

### Acceptance Criteria
- [ ] Every contact form submission is persisted to the SQLite database
- [ ] Stored data includes: name, phone number, email, message body, response preferences, and submission timestamp
- [ ] Submissions are viewable and deletable in the admin dashboard
- [ ] Database write and Discord message send are both attempted; failure of one does not prevent the other

## REQ-020: TJBot Conversation Logging
**Category:** functional | **Priority:** high

All TJBot conversations must be logged to the SQLite database for admin review. Each conversation session must capture: session ID, visitor IP address, full message history (user and assistant turns), and timestamps for each message.

### Acceptance Criteria
- [ ] Every TJBot conversation is persisted to the SQLite database
- [ ] Each session has a unique session ID
- [ ] Visitor IP address is captured per session
- [ ] Full message history (both user and TJBot turns) is stored
- [ ] Timestamps are recorded per message
- [ ] Conversations are viewable and deletable in the admin dashboard

## REQ-021: SQLite Database for All Persistent Data
**Category:** constraint | **Priority:** critical

All persistent data — TJBot conversation logs, Discord contact form submissions, visitor/session logs, and admin authentication state — must be stored in a SQLite database on the Linode server. No external database service is required.

### Acceptance Criteria
- [ ] A single SQLite database file is used for all persistent application data
- [ ] Database schema includes tables for: conversations, contact_submissions, visitor_logs, and admin_auth
- [ ] Database file is stored in a location with appropriate file system permissions
- [ ] Database is backed up as part of any deployment process (noted in deployment docs)

## REQ-022: Rate Limiting on Backend API
**Category:** non-functional | **Priority:** critical

The FastAPI backend must enforce rate limiting per IP address on all public-facing endpoints, particularly the TJBot chatbot endpoint and the contact form endpoint, to prevent abuse and control Claude API costs. Additionally, Claude API usage must be capped via Anthropic's built-in cost/usage limits configured in the Anthropic console.

### Acceptance Criteria
- [ ] Rate limiting is applied per IP address on the /api/chat endpoint
- [ ] Rate limiting is applied per IP address on the /api/contact endpoint
- [ ] Requests exceeding the rate limit receive a 429 Too Many Requests response with a clear message
- [ ] Rate limit thresholds are configurable via environment variables or config file
- [ ] Claude API cost limits are configured in the Anthropic console (documented in deployment notes)
- [ ] Rate limiting state is maintained in-memory or in SQLite — no external cache required

## REQ-023: Nginx Reverse Proxy Configuration
**Category:** constraint | **Priority:** critical

Nginx must be installed and configured on the Linode server as the primary reverse proxy. It must: serve the React frontend static build, proxy API requests to the FastAPI backend, handle SSL/TLS termination for brackett.dev and api.brackett.dev, and coexist with the existing game dev project (Apache or direct service). The existing game dev project must remain live and accessible.

### Acceptance Criteria
- [ ] Nginx is installed and running on the Linode server
- [ ] brackett.dev serves the React frontend (static build)
- [ ] api.brackett.dev proxies to the FastAPI backend
- [ ] SSL/TLS certificates are configured for both domains (e.g., Let's Encrypt)
- [ ] The existing game dev project remains accessible (Nginx proxies to it or it runs on a separate port/subdomain)
- [ ] HTTP traffic is redirected to HTTPS for all domains
- [ ] Nginx configuration is documented in the project repo

## REQ-024: Domain Configuration — brackett.dev
**Category:** constraint | **Priority:** critical

The portfolio must be accessible at brackett.dev. The backend API must be accessible at api.brackett.dev. DNS must be configured via Google Workspace (or the domain registrar) to point both domains to the Linode server's IP address. The entire stack (frontend and backend) will be hosted on the Linode server.

### Acceptance Criteria
- [ ] brackett.dev resolves to the Linode server and serves the portfolio frontend
- [ ] api.brackett.dev resolves to the Linode server and serves the FastAPI backend
- [ ] DNS A records are configured for both brackett.dev and api.brackett.dev
- [ ] SSL certificates are valid and auto-renewing for both domains
- [ ] www.brackett.dev redirects to brackett.dev (optional but recommended)

## REQ-025: TJBot Context and System Prompt
**Category:** functional | **Priority:** critical

TJBot must be initialized with a comprehensive system prompt and context document derived from a Markdown file containing TJ's full resume, work experience details, project descriptions, and any additional background TJ provides. The context document must be loaded server-side and injected into the Claude API system prompt. The MD file must be easily updatable without code changes.

### Acceptance Criteria
- [ ] A Markdown context file (e.g., tjbot_context.md) exists in the backend and is loaded at startup or per-request
- [ ] The system prompt instructs TJBot to answer only questions related to TJ's professional background, projects, and skills
- [ ] The system prompt establishes the TJBot persona and name
- [ ] The system prompt includes guardrails against off-topic, harmful, or prompt-injection attempts
- [ ] Updating the MD file is sufficient to update TJBot's knowledge — no code changes required
- [ ] TJBot accurately answers questions based on the provided context

## REQ-026: TJBot Guardrails and Safety
**Category:** non-functional | **Priority:** critical

TJBot must have explicit guardrails in its system prompt and optionally in backend validation to: (1) keep conversations focused on TJ's professional background, projects, and skills; (2) politely redirect off-topic questions; (3) refuse to execute or assist with prompt injection attempts; (4) not reveal its system prompt or internal instructions when asked.

### Acceptance Criteria
- [ ] TJBot responds to off-topic questions with a polite redirect (e.g., 'I'm here to answer questions about TJ's work and experience')
- [ ] TJBot does not reveal its system prompt when asked
- [ ] TJBot does not comply with prompt injection attempts (e.g., 'ignore previous instructions')
- [ ] TJBot does not produce harmful, offensive, or inappropriate content
- [ ] Guardrail behavior is consistent across sessions

## REQ-027: Automated Testing Suite
**Category:** non-functional | **Priority:** high

The project must include automated tests for both the backend and frontend. Backend: pytest-based unit and integration tests for FastAPI endpoints. Frontend: component tests using Vitest and React Testing Library. Manual testing will also be performed by TJ in addition to automated tests.

### Acceptance Criteria
- [ ] pytest test suite exists covering all FastAPI API endpoints
- [ ] Tests cover happy path, error cases, and rate limiting behavior
- [ ] Tests cover admin authentication including lockout and 2FA flows
- [ ] React component tests exist for key components (chatbot, contact form, project cards)
- [ ] All tests pass in CI before deployment
- [ ] Test coverage report is generated

## REQ-028: Modular and Maintainable Codebase
**Category:** non-functional | **Priority:** high

The codebase must be structured for maintainability and extensibility. The React frontend must use a component-based architecture where new project pages, sections, or features can be added with minimal changes to existing code. The FastAPI backend must follow a clean separation of concerns (routers, services, models, database layer).

### Acceptance Criteria
- [ ] Adding a new project page requires only creating a new data object/config entry — no structural changes
- [ ] Frontend components are reusable and documented
- [ ] Backend follows a router/service/model separation
- [ ] No hardcoded content that should be configurable (e.g., project data in a config/data file)
- [ ] README documents how to add new projects and update content

## REQ-029: Responsive Design
**Category:** non-functional | **Priority:** high

The portfolio must be fully responsive and usable on desktop, tablet, and mobile viewports. Given the target audience is employers who may view on any device, the mobile experience must be professional and not degraded.

### Acceptance Criteria
- [ ] All pages render correctly on viewport widths from 320px to 2560px
- [ ] Sticky header collapses to a hamburger menu or equivalent on mobile
- [ ] Revolving skills banner is functional on mobile
- [ ] TJBot chatbot UI is usable on mobile
- [ ] Contact form is usable on mobile
- [ ] No horizontal scrollbars appear on any standard viewport size

## REQ-030: LinkedIn and GitHub Profile Links
**Category:** functional | **Priority:** medium

The site must include links to TJ's LinkedIn profile and GitHub profile. These should be accessible from the main landing page (e.g., in the hero section, footer, or header).

### Acceptance Criteria
- [ ] A link to TJ's LinkedIn profile is present on the main landing page
- [ ] A link to TJ's GitHub profile is present on the main landing page
- [ ] Both links open in a new browser tab
- [ ] Links are visually represented with recognizable icons
