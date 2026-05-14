import { useState } from 'react'

type ProjectStatus = 'active' | 'in-progress'

interface Project {
  id: string
  name: string
  tabLabel?: string
  tagline: string
  status: ProjectStatus
  category: string
  tags: string[]
  github?: string
  demo?: string
  paragraphs: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    name: 'tjbrackett.com',
    tagline: 'This portfolio site, a full-stack web app with a real-time visitor globe.',
    status: 'active',
    category: 'Web / Full-Stack',
    tags: ['React', 'TypeScript', 'FastAPI', 'Three.js', 'Python', 'SQLite', 'Nginx', 'SSE', 'GeoIP', 'CI/CD', 'Discord'],
    github: 'https://github.com/TJBrackett/Portfolio',
    paragraphs: [
      `What started as a simple portfolio turned into an excuse to build something interesting. The homepage features a WebGL globe rendered with Three.js that plots real-time visitor pins pulled from a FastAPI backend. Location data is resolved server-side using MaxMind\u2019s GeoIP database, no third-party tracking, no JavaScript fingerprinting.`,
      `Visitor events stream to the frontend over SSE, so pins appear live as people land on the page. The guestbook lets visitors drop a message tied to their location, which shows up as a clickable pin on the globe. The contact form fires a formatted embed to a Discord bot via webhook, so messages land directly in my Discord rather than an inbox I forget to check.`,
      `The whole thing deploys automatically to a Linode VPS via GitHub Actions on every push to main, SSH in, pull, rebuild, restart. Nginx handles TLS termination and proxies to the FastAPI process managed by systemd.`,
    ],
  },
  {
    id: 'maestro',
    name: 'Maestro',
    tagline: 'An AI development toolkit that interviews your project before writing a single line of code.',
    status: 'active',
    category: 'AI / DevTools',
    tags: ['Python', 'LangGraph', 'ChromaDB', 'FastAPI', 'React', 'MCP', 'Anthropic', 'OpenAI', 'SQLite', 'Docker', 'LangSmith'],
    paragraphs: [
      `The core idea behind Maestro is that most AI coding tools fail because they start writing before they understand. Maestro runs a structured architect interview first, a batched Q&A loop that progressively refines project requirements until it has enough context to be useful. That interview gets converted into a structured spec, which gets indexed into a ChromaDB RAG system.`,
      `From there, LangGraph-based agent teams execute work against the spec. A smart routing layer sends trivial tasks to cheaper models and complex tasks to heavier ones, with full token cost tracking and configurable budget limits. Human-in-the-loop checkpoints keep things from going off the rails autonomously.`,
      `The toolkit exposes three MCP servers, making it usable from Claude Code, ChatGPT, and other LLM tools as an external knowledge and orchestration layer. Git hooks auto-index commits, validate changes against the spec, and track cost per commit. A React dashboard surfaces agent activity, specs, prompt versions, and cost metrics in real time.`,
    ],
  },
  {
    id: 'universum',
    name: 'Universum',
    tagline: 'A digital tabletop wargame mixing miniature figurines, card systems, and hex-tile strategy.',
    status: 'in-progress',
    category: 'Game Dev',
    tags: ['Game Design', 'Tabletop', 'Hex Grid', 'Systems Design', 'Wargame'],
    paragraphs: [
      `Universum is the project that keeps expanding. At its core, it\u2019s a digital tabletop wargame, the kind you\u2019d expect to see on a physical table with miniature figurines, hex tiles, and a hand of cards, but built for a screen. The design borrows from miniature wargames, collectible card games, and strategy titles and tries to blend their mechanics into something cohesive rather than frankensteined.`,
      `The hex-tile board governs movement, line of sight, and terrain interaction. Figurines have stats, abilities, and equipment loadouts. Cards are played from hand to trigger effects, modify unit behavior, or respond to the opponent\u2019s moves. The systems run deep, part of what makes this a long-term project is designing interactions that feel fair and discoverable without being simple.`,
      `Chess 3 was built as a direct spinoff to isolate and prototype hex movement systems before wiring them into Universum\u2019s more complex rules engine. Development is ongoing, with the server architecture currently being laid out.`,
    ],
  },
  {
    id: 'network',
    name: 'Home Network Control Center',
    tagline: 'Parental controls for my home network, operated entirely through Discord.',
    status: 'active',
    category: 'DevOps / Home Lab',
    tags: ['Python', 'FastAPI', 'Raspberry Pi', 'Discord API', 'Networking', 'SQLite'],
    paragraphs: [
      `My kids have devices. Those devices will eventually find their way to things I\u2019d rather they didn\u2019t. This project is my answer to that, a network monitoring and traffic control system running on a Raspberry Pi connected to my home router.`,
      `The Pi monitors inbound and outbound traffic across the network and flags requests to sites in configurable block categories. When something suspicious hits, I get a Discord notification. More importantly, I can issue commands back through the same bot: block a site to a specific device, limit traffic for a set duration, or lift a restriction, all without touching a config file.`,
      `The control surface is a FastAPI backend on the Pi that the Discord bot talks to. Commands like \u201cblock YouTube on [device] for 2 hours\u201d are parsed into policy changes that persist through reboots. It\u2019s overkill as parental controls go, but it was fun to build and I actually use it.`,
    ],
  },
  {
    id: 'music',
    name: 'Music Score Ratings',
    tagline: 'A unified 1-10 difficulty scale for any piece of sheet music, across any grading curriculum.',
    status: 'in-progress',
    category: 'Web / Music Tech',
    tags: ['Python', 'FastAPI', 'music21', 'Audiveris', 'SQLAlchemy', 'Claude', 'GPT-4o', 'OMR'],
    paragraphs: [
      `Music grading is fragmented. A piece might be graded by Suzuki, RCM, ABRSM, or not graded at all, and those scales don\u2019t map cleanly to each other. A student or teacher trying to find appropriately difficult repertoire has to cross-reference multiple systems or rely on word of mouth.`,
      `Music Score Ratings aims to fix that with a deterministic 8-dimension scoring engine: rhythm complexity, key and harmony, tempo, pitch range, dynamics, articulation, bow technique, and sight-reading difficulty. A PDF of any score gets converted to MusicXML via optical music recognition (Audiveris), parsed for features by music21, and scored across those dimensions into a weighted 1-10 overall rating. The user chooses which grading framework to evaluate against, and the weights adjust accordingly.`,
      `Optionally, an AI pass via Claude or GPT-4o adds a narrative difficulty assessment and can extract skill progressions from method books to build out grading references. The longer-term goal is a community-contributed database where any piece can be searched, compared, and rated across multiple curricula at once.`,
    ],
  },
  {
    id: 'jobbot',
    name: 'Job Bot',
    tagline: 'A resume-aware job search assistant that scores postings against your actual skills.',
    status: 'active',
    category: 'AI / Tools',
    tags: ['Python', 'Tkinter', 'SQLite', 'BeautifulSoup', 'AI', 'NLP'],
    paragraphs: [
      `Job searching is tedious. Job Bot scrapes a set of job boards and company careers pages, then scores every posting against my resume using a weighted breakdown: skills match at 40%, title relevance at 25%, seniority fit at 15%, tooling overlap at 10%, and domain alignment at 10%. Postings without salary data are included but flagged. Anything below threshold is filtered out before I ever see it.`,
      `Sources include RemoteOK, Remotive, Arbeitnow, public Greenhouse boards (Stripe, Airbnb, Cloudflare, Snowflake), and best-effort scraping of careers pages at Apple, Google, Microsoft, NVIDIA, Netflix, OpenAI, Anthropic, and others. Results deduplicate on rerun, so repeated refreshes don\u2019t bloat the list.`,
      `It\u2019s a Tkinter desktop app with a table view, click any row to open the posting in a browser. Simple, focused, and surprisingly useful during a job search.`,
    ],
  },
  {
    id: 'chess3',
    name: 'Chess 3: The Search for \u201cChess 2: The Quest for More Money\u201d',
    tabLabel: 'CHESS 3',
    tagline: 'A hexagonal chess variant with custom army loadouts. Started as a Universum prototype. Became its own game.',
    status: 'in-progress',
    category: 'Game Dev',
    tags: ['Golang', 'Unity', 'C#', 'WebSocket', 'Game Design', 'Hex Grid'],
    paragraphs: [
      `This started as a throwaway prototype to stress-test hex-grid movement mechanics for Universum. The plan was to build something quick, prove out the coordinate system and pathfinding, then move on. That plan lasted about a week before I was deep into designing a full ruleset.`,
      `The game uses a 91-tile axial hex board. Players build armies within a point budget, choosing from a roster that includes standard chess pieces adapted for hex movement alongside custom pieces with abilities like radius targeting and teleportation. Pieces are placed freely within your starting zone. Win by capturing the enemy King, but with flexible army composition, the strategies vary significantly.`,
      `The server is written in Go, the client is a Unity project, and they communicate over WebSocket. Multiplayer-first, local or networked. Whether this ships standalone or gets folded back into Universum is still an open question.`,
    ],
  },
]

const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
}

function WorkDetail({ project }: { project: Project }) {
  return (
    <div className="work-detail">
      <div className="work-entry-meta">
        <span className="work-category">{project.category}</span>
        <span className={`work-badge work-badge--${project.status}`}>
          {STATUS_LABELS[project.status]}
        </span>
      </div>
      <h2 className="work-title">{project.name}</h2>
      <p className="work-tagline">{project.tagline}</p>
      <div className="work-body">
        {project.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="work-tags">
        {project.tags.map(t => <span key={t} className="work-tag">{t}</span>)}
      </div>
      {(project.github || project.demo) && (
        <div className="work-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="work-link-btn">GitHub ↗</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="work-link-btn work-link-btn--demo">Live Demo ↗</a>
          )}
        </div>
      )}
    </div>
  )
}

export default function WorkPage() {
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id)
  const activeProject = PROJECTS.find(p => p.id === selectedId)!

  return (
    <div className="page-content">
      <div className="work-wrap">
        <header className="work-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">Things I've built, am building, or can't stop thinking about.</p>
        </header>
        <nav className="work-tabs">
          {PROJECTS.map(p => (
            <button
              key={p.id}
              className={`work-tab${selectedId === p.id ? ' active' : ''}`}
              onClick={() => setSelectedId(p.id)}
            >
              {p.tabLabel ?? p.name}
            </button>
          ))}
        </nav>
        <WorkDetail project={activeProject} />
      </div>
    </div>
  )
}
