import { useEffect, useRef, useState } from 'react'
import type { Pin } from '../../types'

const EMOJIS = ['👋','🌍','🦊','🎸','🌸','🥐','🦘','⚡','🐉','🌺','🚀','🦋','🎯','🌊','🔥','🦁','🌙','🎨','🏄','🦅','🧩','🎭','🌿','💫','🦜']

const NAME_MAX = 32
const BLOCKED_RE = /[<>&"\\]/

function stripControlChars(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x1f\x7f]/g, '')
}

function getNameError(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return null
  if (BLOCKED_RE.test(trimmed)) return 'Name cannot contain < > & " \\'
  return null
}

function fmtTimeLocal(iso: string): string {
  // Ensure the string is treated as UTC (backend stores utcnow without 'Z')
  const utc = iso.endsWith('Z') || iso.includes('+') ? iso : iso + 'Z'
  const d = new Date(utc)
  const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

function getTzAbbr(): string {
  try {
    const parts = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date())
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
  } catch {
    return ''
  }
}

interface GuestbookPanelProps {
  open: boolean
  allPins: Pin[]
  onClose: () => void
  onSnapTo: (lat: number, lon: number) => void
  onSubmit: (name: string, emoji: string) => Promise<void>
}

export function GuestbookPanel({ open, allPins, onClose, onSnapTo, onSubmit }: GuestbookPanelProps) {
  const [selEmoji, setSelEmoji] = useState('👋')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAllVisitors, setShowAllVisitors] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(false)

  useEffect(() => {
    isMobileRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  }, [])

  // Reset scroll indicator when panel closes/opens
  useEffect(() => {
    if (!open) setScrolled(false)
  }, [open])

  const tzAbbr = getTzAbbr()
  const nameError = getNameError(name)
  const canSubmit = !loading && name.trim().length > 0 && !nameError

  async function handleSubmit() {
    if (!canSubmit) return
    setLoading(true)
    try {
      await onSubmit(name.trim(), selEmoji)
      setName('')
    } finally {
      setLoading(false)
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(stripControlChars(e.target.value))
  }

  function handleScroll() {
    if (scrollRef.current) setScrolled(scrollRef.current.scrollTop > 80)
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleEntryClick(lat: number, lon: number) {
    onSnapTo(lat, lon)
    if (isMobileRef.current) onClose()
  }

  // "new" badge: the single most recent entry across ALL pins
  const newestKey = (() => {
    if (!allPins.length) return null
    const newest = allPins.reduce((a, b) =>
      new Date(a.signed_at ?? a.first_seen) > new Date(b.signed_at ?? b.first_seen) ? a : b
    )
    return `${newest.lat}|${newest.lon}|${newest.first_seen}`
  })()

  const visiblePins = showAllVisitors ? allPins : allPins.filter((p) => p.type === 'signed')
  const sorted = [...visiblePins].sort((a, b) =>
    new Date(b.signed_at ?? b.first_seen).getTime() - new Date(a.signed_at ?? a.first_seen).getTime()
  )

  return (
    <div className={`gb-panel${open ? ' open' : ''}`}>
      <div className="panel-hdr">
        <span className="panel-ttl">// Visitor's Book</span>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>

      <div className="gb-scroll" ref={scrollRef} onScroll={handleScroll}>
        <div className="gb-form">
          <div>
            <div className="fl">Pick your emoji</div>
            <div className="emoji-grid">
              {EMOJIS.map((em) => (
                <button
                  key={em}
                  className={`eb${selEmoji === em ? ' sel' : ''}`}
                  onClick={() => setSelEmoji(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="fl">Your name</div>
            <input
              className={`fi${nameError ? ' fi-error' : ''}`}
              type="text"
              placeholder="Enter your name..."
              maxLength={NAME_MAX}
              value={name}
              onChange={handleNameChange}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
              autoComplete="off"
              spellCheck={false}
            />
            {nameError && <div className="fi-error-msg">{nameError}</div>}
          </div>

          <button className="gb-submit" onClick={handleSubmit} disabled={!canSubmit}>
            — Sign the Visitor's Book —
          </button>
        </div>

        <div className="gb-filter">
          <label className="gb-filter-label">
            <input
              type="checkbox"
              checked={showAllVisitors}
              onChange={(e) => setShowAllVisitors(e.target.checked)}
            />
            <span>Show all visitors</span>
          </label>
          {tzAbbr && <span className="gb-tz-label">· times in {tzAbbr}</span>}
        </div>

        <div className="gb-entries">
          {sorted.length === 0 ? (
            <div className="gb-empty">No entries yet. Be the first!</div>
          ) : (
            sorted.map((entry) => {
              const key = `${entry.lat}|${entry.lon}|${entry.first_seen}`
              const isSigned = entry.type === 'signed'
              const displayEmoji = isSigned ? (entry.emoji ?? '👋') : '🌐'
              const displayName = isSigned ? (entry.name ?? 'Anonymous') : null
              const timestamp = isSigned ? (entry.signed_at ?? entry.first_seen) : entry.first_seen
              const isNew = key === newestKey
              return (
                <div
                  key={key}
                  className="ge ge-clickable"
                  onClick={() => handleEntryClick(entry.lat, entry.lon)}
                  title="Click to snap globe to this location"
                >
                  <div className="ge-emoji">{displayEmoji}</div>
                  <div className="ge-body">
                    <div className="ge-name">
                      {displayName ?? <span className="ge-anon">{[entry.city, entry.country].filter(Boolean).join(', ') || 'Unknown'}</span>}
                      {isNew && <span className="ge-new">new</span>}
                    </div>
                    {displayName && (
                      <div className="ge-loc">{[entry.city, entry.country].filter(Boolean).join(', ') || 'Unknown'}</div>
                    )}
                    <div className="ge-time">{fmtTimeLocal(timestamp)}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {scrolled && (
        <button className="gb-scroll-top" onClick={scrollToTop} title="Scroll to top">↑</button>
      )}
    </div>
  )
}
