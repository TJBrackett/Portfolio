interface GlobeToolbarProps {
  isSpinning: boolean
  speedMult: number
  gbOpen: boolean
  tweaksOpen: boolean
  onToggleSpin: () => void
  onSnap: () => void
  onFaster: () => void
  onSlower: () => void
  onToggleGB: () => void
  onToggleTweaks: () => void
}

export function GlobeToolbar({
  isSpinning,
  speedMult,
  gbOpen,
  tweaksOpen,
  onToggleSpin,
  onSnap,
  onFaster,
  onSlower,
  onToggleGB,
  onToggleTweaks,
}: GlobeToolbarProps) {
  return (
    <div className="right-toolbar">
      <button className={`tb-btn${isSpinning ? ' active' : ''}`} onClick={onToggleSpin} title="Toggle auto-spin">⟳</button>
      <div className="tb-sep" />
      <button className="tb-btn" onClick={onSnap} title="Snap to my location">◎</button>
      <div className="tb-sep" />
      <button className="tb-btn" onClick={onFaster} title="Speed up">+</button>
      <span className="tb-label">{speedMult}×</span>
      <button className="tb-btn" onClick={onSlower} title="Slow down">−</button>
      <div className="tb-sep" />
      <button className={`tb-btn${gbOpen ? ' active' : ''}`} onClick={onToggleGB} title="Visitor's Book">✍</button>
      <div className="tb-sep" />
      <button className={`tb-btn${tweaksOpen ? ' active' : ''}`} onClick={onToggleTweaks} title="Tweaks">✏</button>
    </div>
  )
}
