import { useState } from 'react'
import type { Pin } from '../../types'

const EMOJIS = ['👋','🌍','🦊','🎸','🌸','🥐','🦘','⚡','🐉','🌺','🚀','🦋','🎯','🌊','🔥','🦁','🌙','🎨','🏄','🦅','🧩','🎭','🌿','💫','🦜']

const NAME_MAX = 32
// Characters that could be used for HTML/script injection
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

interface GuestbookPanelProps {
  open: boolean
  entries: Pin[]
  fmtTime: (iso: string) => string
  onClose: () => void
  onSubmit: (name: string, emoji: string) => Promise<void>
}

export function GuestbookPanel({ open, entries, fmtTime, onClose, onSubmit }: GuestbookPanelProps) {
  const [selEmoji, setSelEmoji] = useState('👋')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

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
    // Strip control characters as the user types; length is capped by maxLength
    setName(stripControlChars(e.target.value))
  }

  const sorted = [...entries].sort((a, b) =>
    new Date(b.signed_at ?? b.first_seen).getTime() - new Date(a.signed_at ?? a.first_seen).getTime()
  )

  return (
    <div className={`gb-panel${open ? ' open' : ''}`}>
      <div className="panel-hdr">
        <span className="panel-ttl">// Visitor's Book</span>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>

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

      <div className="gb-entries">
        {sorted.length === 0 ? (
          <div className="gb-empty">No entries yet. Be the first!</div>
        ) : (
          sorted.map((entry, i) => (
            <div key={`${entry.lat}-${entry.lon}-${entry.signed_at}`} className="ge">
              <div className="ge-emoji">{entry.emoji ?? '👤'}</div>
              <div className="ge-body">
                <div className="ge-name">
                  {entry.name ?? 'Anonymous'}
                  {i === 0 && <span className="ge-new">new</span>}
                </div>
                <div className="ge-loc">{[entry.city, entry.country].filter(Boolean).join(', ') || 'Unknown'}</div>
                <div className="ge-time">{fmtTime(entry.signed_at ?? entry.first_seen)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
