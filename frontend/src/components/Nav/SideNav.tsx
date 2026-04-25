import { useState } from 'react'

interface SideNavProps {
  visitCount: number
  countryCount: number
  activeLink?: string
}

const NAV_LINKS = ['Home', 'About', 'Work', 'Contact'] as const

export function SideNav({ visitCount, countryCount, activeLink = 'Home' }: SideNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = NAV_LINKS.map((label) => (
    <li key={label}>
      <a
        href="#"
        className={`nav-link${activeLink === label ? ' active' : ''}`}
        onClick={(e) => { e.preventDefault(); setMobileOpen(false) }}
      >
        <span className="nav-dot" />
        {label}
      </a>
    </li>
  ))

  return (
    <>
      {/* Desktop nav */}
      <nav className="left-nav">
        <div className="nav-brand">
          <span className="brand-tj">TJ</span>
          <span className="brand-name">Brackett</span>
        </div>
        <ul className="nav-links">{links}</ul>
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

      {/* Mobile hamburger */}
      <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
        ☰
      </button>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
          ×
        </button>
        <div className="nav-brand">
          <span className="brand-tj">TJ</span>
          <span className="brand-name">Brackett</span>
        </div>
        <ul className="mobile-nav-links">{links}</ul>
        <div className="nav-footer" style={{ marginTop: 'auto' }}>
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
