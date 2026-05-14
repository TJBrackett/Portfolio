import { useEffect, useRef, useState } from 'react'

const TITLES = [
  'Software Engineer',
  'Father',
  'DevOps Engineer',
  'Husband',
  'Full-Stack Developer',
  'Tech Enthusiast',
  'Indie Game Dev',
  'Automation Aficionado',
  'Nerd',
]

function CyclingTitle() {
  const [idx, setIdx]       = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx((i) => (i + 1) % TITLES.length)
        setFading(false)
      }, 400)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`about-title-cycle${fading ? ' fade-out' : ''}`}>
      {TITLES[idx]}
    </span>
  )
}

// ── Skills data — replace/extend before launch ──
const SKILLS: { name: string; icon?: string }[] = [
  { name: 'Python'      },
  { name: 'TypeScript'  },
  { name: 'React'       },
  { name: 'FastAPI'     },
  { name: 'PostgreSQL'  },
  { name: 'Docker'      },
  { name: 'Kubernetes'  },
  { name: 'Linux'       },
  { name: 'Nginx'       },
  { name: 'Git'         },
  { name: 'CI/CD'       },
  { name: 'AI'          },
  { name: 'Terraform'   },
  { name: 'AWS'         },
  { name: 'LangChain'   },
]

function SkillsBanner() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef   = useRef(0)
  const rafRef   = useRef<number>(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onEnter = () => { pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    // Wait one frame so the browser has painted and scrollWidth is accurate
    rafRef.current = requestAnimationFrame(() => {
      const singleWidth = track.scrollWidth / 3
      const speed = 1 // px per frame at ~60 fps

      function step() {
        if (!pausedRef.current) {
          posRef.current += speed
          if (posRef.current >= singleWidth) posRef.current -= singleWidth
          if (track) track.style.transform = `translateX(-${posRef.current}px)`
        }
        rafRef.current = requestAnimationFrame(step)
      }

      rafRef.current = requestAnimationFrame(step)
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Three copies so the wrap is invisible
  const items = [...SKILLS, ...SKILLS, ...SKILLS]
  return (
    <div className="skills-banner-wrap">
      <div className="skills-banner-track" ref={trackRef}>
        {items.map((s, i) => (
          <span key={i} className="skills-banner-item">
            <span className="skills-dot">◆</span>
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="about-wrap">

        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="about-hero-text">
            <h3 className="about-eyebrow">Hello, I'm</h3>
            <h1 className="about-name">TJ Brackett</h1>
            <div className="about-cycling-row">
              <CyclingTitle />
            </div>
            <p className="about-bio">
              I'm a software and platform engineer with 7+ years of experience building automation systems,
              distributed workflows, and cloud-native applications. I care about reliability, clean architecture,
              and making complex systems feel simple. I get a kick out of designing things from scratch,
              especially when there's a hard problem to solve or a creative angle hiding underneath.
            </p>
          </div>
          <div className="about-hero-photo">
            <img
              src="https://github.com/TJBrackett.png"
              alt="TJ Brackett"
              className="about-photo"
            />
          </div>
        </section>

        {/* ── Skills banner ── */}
        <section className="about-section">
          <h2 className="about-section-title">Skills &amp; Tools</h2>
          <SkillsBanner />
        </section>

        {/* ── Currently working on ── */}
        <section className="about-section">
          <h2 className="about-section-title">Currently</h2>
          <div className="about-currently-grid">
            <div className="about-currently-card">
              <div className="about-currently-label">Open to</div>
              <div className="about-currently-value">Software, DevOps, &amp; Platform Engineering opportunities</div>
            </div>
            <div className="about-currently-card">
              <div className="about-currently-label">Building</div>
              <div className="about-currently-value">Indie games, dev tools, and a website for a business concept</div>
            </div>
            <div className="about-currently-card">
              <div className="about-currently-label">Learning</div>
              <div className="about-currently-value">Golang, C#, LangGraph, and agentic AI patterns</div>
            </div>
          </div>
        </section>

        {/* ── Outside work ── */}
        <section className="about-section about-section--last">
          <h2 className="about-section-title">Outside Work</h2>
          <p className="about-bio">
            When I'm not at a keyboard I'm usually spending time with my wife and two kids.
            Outside of family life I game, work on side projects, and find myself constantly
            theorycrafting something new, there's always at least one thing being built or
            half-finished in a repo somewhere.
          </p>
        </section>

      </div>
    </div>
  )
}

