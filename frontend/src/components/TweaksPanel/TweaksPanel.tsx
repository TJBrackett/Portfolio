import type { PulseSize, TweakSettings } from '../../types'

interface TweaksPanelProps {
  open: boolean
  tweaks: TweakSettings
  speedMult: number
  onChange: (updates: Partial<TweakSettings>) => void
  onSpeedChange: (v: number) => void
  onClose: () => void
}

export function TweaksPanel({ open, tweaks, speedMult, onChange, onSpeedChange, onClose }: TweaksPanelProps) {
  return (
    <div className={`tweaks-panel${open ? ' open' : ''}`}>
      <div className="tweaks-hdr">
        <div className="tweaks-title">Tweaks</div>
        <button className="tweaks-close" onClick={onClose} aria-label="Close tweaks">×</button>
      </div>

      <div className="tw-sec">Brightness</div>
      <div className="tr">
        <span className="tl">Globe light</span>
        <div className="tc">
          <input
            type="range" min={0.3} max={2.5} step={0.1}
            value={tweaks.globeBright}
            onChange={(e) => onChange({ globeBright: parseFloat(e.target.value) })}
          />
          <span className="tv">{tweaks.globeBright.toFixed(1)}×</span>
        </div>
      </div>
      <div className="tr">
        <span className="tl">Pin glow</span>
        <div className="tc">
          <input
            type="range" min={0.1} max={3} step={0.1}
            value={tweaks.pinBright}
            onChange={(e) => onChange({ pinBright: parseFloat(e.target.value) })}
          />
          <span className="tv">{tweaks.pinBright.toFixed(1)}×</span>
        </div>
      </div>

      <div className="tw-sec">Colors</div>
      <div className="tr">
        <span className="tl">Atmosphere</span>
        <input type="color" value={tweaks.atmoColor}
          onChange={(e) => onChange({ atmoColor: e.target.value })} />
      </div>
      <div className="tr">
        <span className="tl">Visitor pins</span>
        <input type="color" value={tweaks.pinColor}
          onChange={(e) => onChange({ pinColor: e.target.value })} />
      </div>
      <div className="tr">
        <span className="tl">Signed pins</span>
        <input type="color" value={tweaks.signedColor}
          onChange={(e) => onChange({ signedColor: e.target.value })} />
      </div>
      <div className="tr">
        <span className="tl">My pin &amp; pulse</span>
        <input type="color" value={tweaks.pulseColor}
          onChange={(e) => onChange({ pulseColor: e.target.value })} />
      </div>

      <div className="tw-sec">Pulse size</div>
      <div className="tr">
        <span className="tl">Size</span>
        <div className="ps-wrap">
          {(['small', 'medium', 'large'] as PulseSize[]).map((size) => (
            <label key={size} className="ps-opt">
              <input
                type="radio" name="psize" value={size}
                checked={tweaks.pulseSize === size}
                onChange={() => onChange({ pulseSize: size })}
              />
              <span>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="tw-sec">Globe</div>
      <div className="tr">
        <span className="tl">Spin speed</span>
        <div className="tc">
          <input
            type="range" min={0.5} max={5} step={0.5}
            value={speedMult}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          />
          <span className="tv">{speedMult}×</span>
        </div>
      </div>
      <div className="tr">
        <span className="tl">Globe tilt</span>
        <input
          type="range" min={-0.4} max={0.4} step={0.05}
          value={tweaks.globeTilt}
          onChange={(e) => onChange({ globeTilt: parseFloat(e.target.value) })}
        />
      </div>
      <div className="tr">
        <span className="tl">Atmo opacity</span>
        <div className="tc">
          <input
            type="range" min={0} max={1} step={0.05}
            value={tweaks.atmoOpacity}
            onChange={(e) => onChange({ atmoOpacity: parseFloat(e.target.value) })}
          />
          <span className="tv">{tweaks.atmoOpacity.toFixed(2)}</span>
        </div>
      </div>
      <div className="tr">
        <span className="tl">Show grid</span>
        <input
          type="checkbox" checked={tweaks.showGrid}
          onChange={(e) => onChange({ showGrid: e.target.checked })}
        />
      </div>
    </div>
  )
}
