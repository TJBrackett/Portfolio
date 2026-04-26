import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface SideNavProps {
  visitCount: number
  countryCount: number
}

const NAV_LINKS = [
  { label: 'Home',    to: '/'        },
  { label: 'About',   to: '/about'   },
  { label: 'Work',    to: '/work'    },
  { label: 'Contact', to: '/contact' },
] as const

const DOC_LINKS = [
  { label: 'Resume',       href: '/resume.pdf'        },
  { label: 'Cover Letter', href: '/cover-letter.pdf'  },
] as const

export function SideNav({ visitCount, countryCount }: SideNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = NAV_LINKS.map(({ label, to }) => (
    <li key={label}>
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        onClick={() => setMobileOpen(false)}
      >
        <span className="nav-dot" />
        {label}
      </NavLink>
    </li>
  ))

  const docBtns = DOC_LINKS.map(({ label, href }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="nav-doc-btn">
      <span className="nav-doc-icon">↗</span>
      {label}
    </a>
  ))

  return (
    <>
      {/* Always-visible top bar (mobile: full width bar; desktop: hidden via CSS) */}
      <div className="mobile-top-bar">
        <button
          className="hamburger-inline"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileOpen ? '×' : '☰'}
        </button>
        {!mobileOpen && <Link to="/" className="mobile-brand-link">TJ Brackett</Link>}
      </div>

      {/* Desktop nav */}
      <nav className="left-nav">
        <div className="nav-brand">
          <Link to="/" className="brand-home-link">
            <span className="brand-tj">TJ</span>
            <span className="brand-name">Brackett</span>
          </Link>
        </div>
        <ul className="nav-links">{links}</ul>
        <div className="nav-doc-btns">{docBtns}</div>
        <div className="nav-footer">
          <div className="visitor-counter">
            <div><span className="c-num">{visitCount || '—'}</span> visitors</div>
            <div>across <span className="c-num">{countryCount || '—'}</span> countries</div>
          </div>
          <div className="nav-status">
            <div className="live-dot" />
            <span>LIVE</span>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
          ×
        </button>
        <div className="nav-brand" style={{ marginTop: '16px' }}>
          <Link to="/" className="brand-home-link" onClick={() => setMobileOpen(false)}>
            <span className="brand-tj">TJ</span>
            <span className="brand-name">Brackett</span>
          </Link>
        </div>
        <ul className="mobile-nav-links">{links}</ul>
        <div className="nav-doc-btns" style={{ marginTop: 'auto' }}>{docBtns}</div>
        <div className="nav-footer">
          <div className="visitor-counter">
            <div><span className="c-num">{visitCount || '—'}</span> visitors</div>
            <div>across <span className="c-num">{countryCount || '—'}</span> countries</div>
          </div>
          <div className="nav-status">
            <div className="live-dot" />
            <span>LIVE</span>
          </div>
        </div>
      </div>
    </>
  )
}
