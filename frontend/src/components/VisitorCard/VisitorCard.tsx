import type { CSSProperties } from 'react'
import type { Pin } from '../../types'

interface VisitorCardProps {
  pin: Pin
  isMe: boolean
  style: CSSProperties
  fmtTime: (iso: string) => string
  onClose: () => void
}

export function VisitorCard({ pin, isMe, style, fmtTime, onClose }: VisitorCardProps) {
  return (
    <div className="visitor-card" style={style}>
      <button className="vc-close" onClick={onClose}>×</button>
      <div className="vc-top">
        <div className="vc-emoji">{pin.emoji ?? (isMe ? '📍' : '👤')}</div>
        <div>
          <div className="vc-name">{pin.name ?? (isMe ? 'You' : 'Anonymous')}</div>
          <div className="vc-loc">{[pin.city, pin.country].filter(Boolean).join(', ') || '—'}</div>
        </div>
      </div>
      <div className="vc-time">{fmtTime(pin.signed_at ?? pin.first_seen)}</div>
      <div className={`vc-tag ${isMe ? 'me' : 'visitor'}`}>
        {isMe ? '— You are here —' : pin.type === 'signed' ? 'Guestbook signer' : 'Visitor'}
      </div>
    </div>
  )
}
