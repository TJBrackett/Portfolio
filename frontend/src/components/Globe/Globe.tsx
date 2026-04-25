import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { MyLocation, Pin, TweakSettings } from '../../types'
import { TWEAK_DEFAULTS } from '../../types'
import {
  addPulseRings,
  createAtmosphere,
  createGlobeMesh,
  createGridLines,
  createPin,
  createStars,
  type PinGroup,
} from './globeUtils'
import { GlobeToolbar } from '../Toolbar/GlobeToolbar'
import { GuestbookPanel } from '../GuestbookPanel/GuestbookPanel'
import { TweaksPanel } from '../TweaksPanel/TweaksPanel'
import { VisitorCard } from '../VisitorCard/VisitorCard'

interface GlobeProps {
  pins: Pin[]
  myLocation: MyLocation | null
  visitorRank: number
  snapTarget: { lat: number; lon: number } | null
  onSnapHandled: () => void
  onSnapTo: (lat: number, lon: number) => void
  onGuestbookSubmit: (name: string, emoji: string) => Promise<void>
}

interface SelectedPin {
  pin: Pin
  isMe: boolean
  x: number
  y: number
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

export function Globe({ pins, myLocation, visitorRank, snapTarget, onSnapHandled, onSnapTo, onGuestbookSubmit }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Three.js objects — all refs (no re-renders)
  const rendererRef    = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef       = useRef<THREE.Scene | null>(null)
  const cameraRef      = useRef<THREE.PerspectiveCamera | null>(null)
  const globeGroupRef  = useRef<THREE.Group | null>(null)
  const atmosphereRef  = useRef<THREE.Mesh | null>(null)
  const ambientRef     = useRef<THREE.AmbientLight | null>(null)
  const sunRef         = useRef<THREE.DirectionalLight | null>(null)
  const animFrameRef   = useRef<number>(0)
  const clockRef       = useRef(0)

  // Pin management
  const pinGroupMapRef  = useRef<Map<string, PinGroup>>(new Map())
  const hitboxesRef     = useRef<THREE.Mesh[]>([])
  const pulseRingsRef   = useRef<THREE.Mesh[]>([])
  const myPinGroupRef   = useRef<THREE.Group | null>(null)

  // Drag state refs (used inside RAF, no re-render needed)
  const isDraggingRef = useRef(false)
  const hasMovedRef   = useRef(false)
  const prevMxRef     = useRef(0)
  const prevMyRef     = useRef(0)

  // Snap animation cancel + post-initial-snap flags
  const snapCancelRef      = useRef(false)
  const postSnapDoneRef    = useRef(false)
  const initialSnapDoneRef = useRef(false)

  // Pinch zoom
  const touchDistRef = useRef<number | null>(null)

  // Hover throttle
  const lastHoverTimeRef = useRef(0)

  // Spin/speed: refs for the animation loop, state for UI
  const [isSpinning, setIsSpinning] = useState(true)
  const isSpinningRef = useRef(true)
  const [speedMult, setSpeedMult] = useState(TWEAK_DEFAULTS.speedMult)
  const speedMultRef = useRef(TWEAK_DEFAULTS.speedMult)

  // UI state
  const [selectedPin, setSelectedPin] = useState<SelectedPin | null>(null)
  const selectedPinRef = useRef<SelectedPin | null>(null)
  const [hoveredPin, setHoveredPin]   = useState<SelectedPin | null>(null)
  const hoveredPinRef = useRef<SelectedPin | null>(null)
  const [gbOpen, setGbOpen]           = useState(false)
  const [tweaksOpen, setTweaksOpen]   = useState(false)
  const [tweaks, setTweaks]           = useState<TweakSettings>(TWEAK_DEFAULTS)
  const [toast, setToast]             = useState<string | null>(null)
  const [myLocText, setMyLocText]     = useState<string | null>(null)

  const tweaksRef = useRef<TweakSettings>(TWEAK_DEFAULTS)

  function selectPin(sp: SelectedPin | null) {
    selectedPinRef.current = sp
    setSelectedPin(sp)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3200)
  }

  // ── Init Three.js ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas  = canvasRef.current!
    const section = sectionRef.current!
    const W = section.clientWidth - 68
    const H = section.clientHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    sceneRef.current    = scene
    cameraRef.current   = camera
    rendererRef.current = renderer

    const ambient = new THREE.AmbientLight(0x223355, 0.55)
    scene.add(ambient)
    ambientRef.current = ambient

    const sun = new THREE.DirectionalLight(0xfff4e0, 1.3)
    sun.position.set(7, 3, 5)
    scene.add(sun)
    sunRef.current = sun

    const fill = new THREE.DirectionalLight(0x0a1844, 0.25)
    fill.position.set(-5, -2, -4)
    scene.add(fill)

    const globeGroup = new THREE.Group()
    globeGroup.rotation.x = tweaksRef.current.globeTilt
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    scene.add(createStars())
    globeGroup.add(createGlobeMesh())
    const atmo = createAtmosphere(tweaksRef.current.atmoColor, tweaksRef.current.atmoOpacity)
    scene.add(atmo)
    atmosphereRef.current = atmo
    createGridLines().forEach((l) => globeGroup.add(l))

    applyGlobeBrightness(tweaksRef.current.globeBright)

    // Animation loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      clockRef.current += 0.016
      if (isSpinningRef.current && !isDraggingRef.current && !hoveredPinRef.current && !selectedPinRef.current) {
        globeGroup.rotation.y += 0.0008 * speedMultRef.current
      }
      pulseRingsRef.current.forEach((ring) => {
        const t = ((clockRef.current * 0.65 + (ring.userData as { phase: number; maxS: number }).phase) % 1)
        ring.scale.setScalar(1 + t * ((ring.userData as { phase: number; maxS: number }).maxS - 1))
        ;(ring.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.85
      })
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!sectionRef.current) return
      const W2 = sectionRef.current.clientWidth - 68
      const H2 = sectionRef.current.clientHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => { onResize(); requestAnimationFrame(onResize) })

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Keep spin/speed refs in sync ─────────────────────────────────────────
  useEffect(() => { isSpinningRef.current = isSpinning }, [isSpinning])
  useEffect(() => { speedMultRef.current = speedMult }, [speedMult])

  // ── Update pins when array changes ────────────────────────────────────────
  useEffect(() => {
    const globeGroup = globeGroupRef.current
    if (!globeGroup) return

    const pinKey = (p: Pin) => `${p.lat.toFixed(3)},${p.lon.toFixed(3)}`

    pins.forEach((pin) => {
      const key = pinKey(pin)
      const existing = pinGroupMapRef.current.get(key)

      if (!existing) {
        const group = createPin(pin, false, tweaksRef.current)
        globeGroup.add(group)
        hitboxesRef.current.push(group.userData.hitbox)
        pinGroupMapRef.current.set(key, group)
      } else if (existing.userData.pinType !== pin.type) {
        // Upgrade visitor → signed: rebuild the pin
        globeGroup.remove(existing)
        hitboxesRef.current = hitboxesRef.current.filter((h) => h !== existing.userData.hitbox)
        const group = createPin(pin, false, tweaksRef.current)
        globeGroup.add(group)
        hitboxesRef.current.push(group.userData.hitbox)
        pinGroupMapRef.current.set(key, group)
      }
    })
  }, [pins])

  // ── Add "my pin" when location arrives ────────────────────────────────────
  useEffect(() => {
    if (!myLocation || !globeGroupRef.current) return

    if (myPinGroupRef.current) {
      globeGroupRef.current.remove(myPinGroupRef.current)
      pulseRingsRef.current = []
    }

    const myPin: Pin = {
      lat: myLocation.lat,
      lon: myLocation.lon,
      city: myLocation.city,
      country: myLocation.country,
      type: 'visitor',
      first_seen: new Date().toISOString(),
    }

    const group = createPin(myPin, true, tweaksRef.current)
    const rings = addPulseRings(group, tweaksRef.current.pulseColor, tweaksRef.current.pulseSize)
    pulseRingsRef.current = rings
    myPinGroupRef.current = group
    globeGroupRef.current.add(group)
    hitboxesRef.current.push(group.userData.hitbox)

    setMyLocText(`${myLocation.city}, ${myLocation.country}`)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setTimeout(() => snapToMyPin(true, !isTouch && !initialSnapDoneRef.current), 700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation])

  // ── Tweak reactivity ──────────────────────────────────────────────────────
  function applyGlobeBrightness(v: number) {
    if (ambientRef.current) ambientRef.current.intensity = 0.55 * v
    if (sunRef.current) sunRef.current.intensity = 1.3 * v
  }

  useEffect(() => {
    tweaksRef.current = tweaks
    applyGlobeBrightness(tweaks.globeBright)
    if (atmosphereRef.current) {
      const mat = atmosphereRef.current.material as THREE.ShaderMaterial
      mat.uniforms.glowColor.value.set(tweaks.atmoColor)
      mat.uniforms.atmoOpacity.value = tweaks.atmoOpacity
    }
    if (globeGroupRef.current) {
      globeGroupRef.current.children.forEach((c) => {
        if (c.userData?.isGrid) c.visible = tweaks.showGrid
      })
    }
    // Update other pin materials
    pinGroupMapRef.current.forEach((group) => {
      const p = group.userData.pin as Pin
      let colorHex: string
      if (p.type === 'signed') {
        colorHex = tweaks.signedColor
      } else {
        colorHex = tweaks.pinColor
      }
      const hex = parseInt(colorHex.replace('#', ''), 16)
      const emStem = p.type === 'signed' ? 0.3 * tweaks.pinBright : 0.08 * tweaks.pinBright
      const emHead = p.type === 'signed' ? 0.4 * tweaks.pinBright : 0.05 * tweaks.pinBright
      group.userData.mats.stem.color.setHex(hex)
      group.userData.mats.stem.emissive.setHex(hex)
      group.userData.mats.stem.emissiveIntensity = emStem
      group.userData.mats.head.color.setHex(hex)
      group.userData.mats.head.emissive.setHex(hex)
      group.userData.mats.head.emissiveIntensity = emHead
    })
    if (myPinGroupRef.current) {
      const hex = parseInt(tweaks.pulseColor.replace('#', ''), 16)
      const mats = (myPinGroupRef.current as PinGroup).userData.mats
      mats.stem.color.setHex(hex); mats.stem.emissive.setHex(hex); mats.stem.emissiveIntensity = 0.5 * tweaks.pinBright
      mats.head.color.setHex(hex); mats.head.emissive.setHex(hex); mats.head.emissiveIntensity = 0.7 * tweaks.pinBright
      pulseRingsRef.current.forEach((r) => (r.material as THREE.MeshBasicMaterial).color.setHex(hex))
    }
  }, [tweaks])

  // ── Input ─────────────────────────────────────────────────────────────────
  function onMouseDown(e: React.MouseEvent) {
    snapCancelRef.current = true
    isDraggingRef.current = true
    hasMovedRef.current   = false
    prevMxRef.current = e.clientX
    prevMyRef.current = e.clientY
  }

  function onMouseMove(e: React.MouseEvent) {
    if (isDraggingRef.current && globeGroupRef.current) {
      const dx = e.clientX - prevMxRef.current
      const dy = e.clientY - prevMyRef.current
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) hasMovedRef.current = true
      globeGroupRef.current.rotation.y += dx * 0.004
      globeGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroupRef.current.rotation.x + dy * 0.004))
      prevMxRef.current = e.clientX
      prevMyRef.current = e.clientY
    }
    // Hover raycasting — throttled to ~30fps
    if (!isDraggingRef.current) {
      const now = Date.now()
      if (now - lastHoverTimeRef.current > 33) {
        lastHoverTimeRef.current = now
        doHover(e.clientX, e.clientY)
      }
    }
  }

  function onMouseUp(e: React.MouseEvent) {
    if (isDraggingRef.current && !hasMovedRef.current) doClick(e.clientX, e.clientY)
    isDraggingRef.current = false
  }

  function onMouseLeave() {
    isDraggingRef.current = false
    hoveredPinRef.current = null
    setHoveredPin(null)
  }

  function onWheel(e: React.WheelEvent) {
    if (!cameraRef.current) return
    const delta = e.deltaY > 0 ? 0.3 : -0.3
    cameraRef.current.position.z = Math.max(2.5, Math.min(10, cameraRef.current.position.z + delta))
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      touchDistRef.current = Math.hypot(dx, dy)
      isDraggingRef.current = false
      return
    }
    snapCancelRef.current = true
    isDraggingRef.current = true
    hasMovedRef.current   = false
    prevMxRef.current = e.touches[0].clientX
    prevMyRef.current = e.touches[0].clientY
  }

  // ── Block browser pinch-zoom via non-passive listener ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current!
    const handler = (e: TouchEvent) => {
      if (e.touches.length >= 2) e.preventDefault()
    }
    canvas.addEventListener('touchmove', handler, { passive: false })
    return () => canvas.removeEventListener('touchmove', handler)
  }, [])

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && touchDistRef.current !== null && cameraRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const newDist = Math.hypot(dx, dy)
      const delta = (touchDistRef.current - newDist) * 0.02
      cameraRef.current.position.z = Math.max(2.5, Math.min(10, cameraRef.current.position.z + delta))
      touchDistRef.current = newDist
      return
    }
    if (!isDraggingRef.current || !globeGroupRef.current) return
    const dx = e.touches[0].clientX - prevMxRef.current
    const dy = e.touches[0].clientY - prevMyRef.current
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMovedRef.current = true
    globeGroupRef.current.rotation.y += dx * 0.004
    globeGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroupRef.current.rotation.x + dy * 0.004))
    prevMxRef.current = e.touches[0].clientX
    prevMyRef.current = e.touches[0].clientY
  }

  function onTouchEnd(e: React.TouchEvent) {
    touchDistRef.current = null
    if (!hasMovedRef.current && isDraggingRef.current && e.changedTouches.length > 0) {
      doClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    }
    isDraggingRef.current = false
  }

  function doHover(cx: number, cy: number) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const mouse = new THREE.Vector2(
      ((cx - rect.left) / rect.width) * 2 - 1,
      -((cy - rect.top) / rect.height) * 2 + 1,
    )
    const ray = new THREE.Raycaster()
    ray.setFromCamera(mouse, cameraRef.current!)
    const hits = ray.intersectObjects(hitboxesRef.current, false)
    if (hits.length > 0) {
      const { pin, isMe } = hits[0].object.userData as { pin: Pin; isMe: boolean }
      hoveredPinRef.current = { pin, isMe, x: cx, y: cy }
      if (!selectedPinRef.current) setHoveredPin({ pin, isMe, x: cx, y: cy })
    } else {
      hoveredPinRef.current = null
      if (!selectedPinRef.current) setHoveredPin(null)
    }
  }

  function doClick(cx: number, cy: number) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const mouse = new THREE.Vector2(
      ((cx - rect.left) / rect.width) * 2 - 1,
      -((cy - rect.top) / rect.height) * 2 + 1,
    )
    const ray = new THREE.Raycaster()
    ray.setFromCamera(mouse, cameraRef.current!)
    const hits = ray.intersectObjects(hitboxesRef.current, false)
    if (hits.length > 0) {
      const { pin, isMe } = hits[0].object.userData as { pin: Pin; isMe: boolean }
      selectPin({ pin, isMe, x: cx, y: cy })
    } else {
      selectPin(null)
    }
  }

  // ── Snap to coords (generalised) ─────────────────────────────────────────
  const snapToCoords = useCallback((lat: number, lon: number, resumeAfter = false, zoomIn = false) => {
    if (!globeGroupRef.current) return
    setIsSpinning(false)
    isSpinningRef.current = false
    snapCancelRef.current = false

    let tY = -Math.PI / 2 - lon * (Math.PI / 180)
    const tX = lat * (Math.PI / 180)
    const curY = globeGroupRef.current.rotation.y
    tY += Math.round((curY - tY) / (Math.PI * 2)) * Math.PI * 2
    const sY = curY, sX = globeGroupRef.current.rotation.x

    // Optional zoom-in: animate camera z → 5.8 alongside the snap
    const sZ = zoomIn && cameraRef.current ? cameraRef.current.position.z : null
    const tZ = 5.8

    let p = 0
    const go = () => {
      if (snapCancelRef.current) return
      p++
      const t = p / 100
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      globeGroupRef.current!.rotation.y = sY + (tY - sY) * ease
      globeGroupRef.current!.rotation.x = sX + (tX - sX) * ease
      if (sZ !== null && cameraRef.current) {
        cameraRef.current.position.z = sZ + (tZ - sZ) * ease
      }
      if (p < 100) requestAnimationFrame(go)
    }
    go()

    if (resumeAfter) {
      setTimeout(() => {
        if (!postSnapDoneRef.current) {
          postSnapDoneRef.current = true
          setIsSpinning(true)
          isSpinningRef.current = true
        }
      }, 3000)
    }
  }, [])

  // ── Snap to my pin ────────────────────────────────────────────────────────
  const snapToMyPin = useCallback((resumeAfter = false, zoomIn = false) => {
    if (!myLocation) { showToast('Still locating you…'); return }
    if (zoomIn) initialSnapDoneRef.current = true
    snapToCoords(myLocation.lat, myLocation.lon, resumeAfter, zoomIn)
  }, [myLocation, snapToCoords])

  // ── Snap when snapTarget prop changes ────────────────────────────────────
  useEffect(() => {
    if (!snapTarget) return
    snapToCoords(snapTarget.lat, snapTarget.lon)
    onSnapHandled()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapTarget])

  // ── Speed controls ────────────────────────────────────────────────────────
  function faster() {
    const v = Math.min(5, parseFloat((speedMult + 0.5).toFixed(1)))
    setSpeedMult(v); speedMultRef.current = v
  }
  function slower() {
    const v = Math.max(0.25, parseFloat((speedMult - 0.5).toFixed(1)))
    setSpeedMult(v); speedMultRef.current = v
  }
  function toggleSpin() {
    const next = !isSpinning
    setIsSpinning(next); isSpinningRef.current = next
  }

  // ── Overlay card position ─────────────────────────────────────────────────
  function cardPos(sp: SelectedPin) {
    if (!sectionRef.current) return {}
    const rect = sectionRef.current.getBoundingClientRect()
    let lx = sp.x - rect.left + 18
    const ly = sp.y - rect.top
    if (lx + 260 > rect.width - 60) lx = sp.x - rect.left - 260
    return { left: Math.max(8, lx), top: ly }
  }

  return (
    <section className="globe-section" ref={sectionRef}>
      <canvas
        className={`globe-canvas${isDraggingRef.current ? ' dragging' : ''}`}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <div className="top-bar">
        <span className="top-l">Global Visitor Map</span>
        <span className="top-r">
          You{myLocText
            ? <> — <span className="top-r-accent">{myLocText}</span>{visitorRank ? <> · Visitor <span className="top-r-accent">#{visitorRank}</span></> : null}</>
            : ' — Locating...'}
        </span>
      </div>

      <GlobeToolbar
        isSpinning={isSpinning}
        speedMult={speedMult}
        gbOpen={gbOpen}
        tweaksOpen={tweaksOpen}
        onToggleSpin={toggleSpin}
        onSnap={snapToMyPin}
        onFaster={faster}
        onSlower={slower}
        onToggleGB={() => setGbOpen((o) => !o)}
        onToggleTweaks={() => setTweaksOpen((o) => !o)}
      />

      {(selectedPin || hoveredPin) && (() => {
        const active = selectedPin ?? hoveredPin!
        return (
          <VisitorCard
            pin={active.pin}
            isMe={active.isMe}
            style={cardPos(active)}
            fmtTime={fmtTime}
            onClose={() => { selectPin(null); hoveredPinRef.current = null; setHoveredPin(null) }}
          />
        )
      })()}

      <GuestbookPanel
        open={gbOpen}
        allPins={pins}
        onClose={() => setGbOpen(false)}
        onSnapTo={onSnapTo}
        onSubmit={async (name, emoji) => {
          await onGuestbookSubmit(name, emoji)
          showToast(`Welcome, ${name}! You're on the map 🌍`)
        }}
      />

      <TweaksPanel
        open={tweaksOpen}
        tweaks={tweaks}
        speedMult={speedMult}
        onChange={(updates) => setTweaks((t) => ({ ...t, ...updates }))}
        onSpeedChange={(v) => { setSpeedMult(v); speedMultRef.current = v }}
        onClose={() => setTweaksOpen(false)}
      />

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
    </section>
  )
}
