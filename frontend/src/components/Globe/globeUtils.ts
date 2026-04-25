import * as THREE from 'three'
import type { Pin, TweakSettings } from '../../types'

export const GR = 2

export const PULSE_SIZES = {
  small:  { ir: 0.05, or: 0.08, maxS: 3 },
  medium: { ir: 0.09, or: 0.13, maxS: 5 },
  large:  { ir: 0.13, or: 0.19, maxS: 8 },
} as const

export function ll2v3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

export function makeFallbackTex(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 2048; c.height = 1024
  const ctx = c.getContext('2d')!

  ctx.fillStyle = '#000508'
  ctx.fillRect(0, 0, 2048, 1024)

  ctx.fillStyle = '#0d2038';
  [
    [[340,300],[620,280],[680,470],[560,600],[430,610],[360,510]],
    [[450,610],[590,590],[640,870],[540,1020],[440,960],[410,780]],
    [[940,250],[1120,240],[1160,450],[1040,490],[940,420]],
    [[960,490],[1120,470],[1200,720],[1140,940],[1000,1000],[920,860],[930,560]],
    [[1140,240],[1820,210],[1900,360],[1860,500],[1700,560],[1420,540],[1200,460],[1120,350]],
    [[1680,560],[1840,540],[1900,660],[1760,700],[1660,640]],
    [[1680,740],[1900,720],[1940,860],[1860,940],[1680,900],[1660,820]],
    [[440,140],[560,120],[600,220],[500,260],[420,220]],
    [[0,990],[2048,990],[2048,1024],[0,1024]],
  ].forEach((pts) => {
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    pts.slice(1).forEach((p) => ctx.lineTo(p[0], p[1]))
    ctx.closePath(); ctx.fill()
  })

  ;[
    [392,300],[415,310],[450,310],[470,315],[500,295],[515,290],
    [970,275],[990,280],[1010,285],[1050,275],[1060,280],
    [1200,310],[1240,320],[1280,330],[1310,320],[1360,310],
    [1440,310],[1490,315],[1560,290],[1620,295],[1700,285],
    [1760,300],[1800,310],[1820,300],[1840,295],
    [970,510],[980,520],[1000,530],[1020,525],[1040,520],[1060,515],
    [490,615],[500,620],[510,625],[1730,760],[1760,765],[1790,760],
  ].forEach(([x, y]) => {
    const r2 = Math.random() * 1.5 + 0.5
    const g = ctx.createRadialGradient(x, y, 0, x, y, r2 * 7)
    g.addColorStop(0, 'rgba(255,200,100,0.6)')
    g.addColorStop(1, 'rgba(255,160,40,0)')
    ctx.beginPath(); ctx.arc(x, y, r2 * 7, 0, Math.PI * 2)
    ctx.fillStyle = g; ctx.fill()
    ctx.beginPath(); ctx.arc(x, y, r2, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,230,160,0.7)'; ctx.fill()
  })

  return new THREE.CanvasTexture(c)
}

export function createGlobeMesh(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(GR, 72, 72)
  const mat = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0, map: makeFallbackTex() })
  const mesh = new THREE.Mesh(geo, mat)
  new THREE.TextureLoader().load(
    'https://cdn.jsdelivr.net/npm/three-globe@2.27.3/example/img/earth-night.jpg',
    (tex) => { mat.map = tex; mat.needsUpdate = true },
  )
  return mesh
}

export function createAtmosphere(color: string, opacity: number): THREE.Mesh {
  const geo = new THREE.SphereGeometry(GR * 1.09, 64, 64)
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      glowColor:   { value: new THREE.Color(color) },
      atmoOpacity: { value: opacity },
    },
    vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform vec3 glowColor;uniform float atmoOpacity;varying vec3 vN;void main(){float i=pow(0.7-dot(vN,vec3(0,0,1)),3.5);gl_FragColor=vec4(glowColor,i*atmoOpacity);}`,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  })
  return new THREE.Mesh(geo, mat)
}

export function createStars(): THREE.Points {
  const count = 3000
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const r  = 60 + Math.random() * 30
    pos[i*3]   = r * Math.sin(ph) * Math.cos(th)
    pos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
    pos[i*3+2] = r * Math.cos(ph)
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0xffffff, size: 0.07, sizeAttenuation: true, transparent: true, opacity: 0.65,
  }))
}

export function createGridLines(): THREE.Line[] {
  const mat = new THREE.LineBasicMaterial({ color: 0x1a3a5e, transparent: true, opacity: 0.2 })
  const lines: THREE.Line[] = []

  ;[-60, -30, 0, 30, 60].forEach((lat) => {
    const pts: THREE.Vector3[] = []
    for (let lon = 0; lon <= 360; lon += 2) pts.push(ll2v3(lat, lon, GR + 0.002))
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)
    l.userData.isGrid = true
    lines.push(l)
  })
  for (let lon = 0; lon < 360; lon += 30) {
    const pts: THREE.Vector3[] = []
    for (let lat = -90; lat <= 90; lat += 2) pts.push(ll2v3(lat, lon, GR + 0.002))
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)
    l.userData.isGrid = true
    lines.push(l)
  }
  return lines
}

export interface PinMaterials {
  stem: THREE.MeshPhongMaterial
  head: THREE.MeshPhongMaterial
}

export interface PinGroup extends THREE.Group {
  userData: {
    pin: Pin
    isMe: boolean
    pinType: string
    hitbox: THREE.Mesh
    mats: PinMaterials
  }
}

export function createPin(pin: Pin, isMe: boolean, tweaks: TweakSettings): PinGroup {
  const group = new THREE.Group() as PinGroup
  const pos = ll2v3(pin.lat, pin.lon, GR)
  group.position.copy(pos)
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize())

  let colorHex: string
  if (isMe) {
    colorHex = tweaks.pulseColor
  } else if (pin.type === 'signed') {
    colorHex = tweaks.signedColor
  } else {
    colorHex = tweaks.pinColor
  }

  const pHex = parseInt(colorHex.replace('#', ''), 16)

  const stemRadius = isMe || pin.type === 'signed' ? 0.010 : 0.006
  const headRadius = isMe || pin.type === 'signed' ? 0.040 : 0.025
  const stemHeight = isMe || pin.type === 'signed' ? 0.20 : 0.12

  const emStem = isMe ? 0.5 * tweaks.pinBright : pin.type === 'signed' ? 0.3 * tweaks.pinBright : 0.08 * tweaks.pinBright
  const emHead = isMe ? 0.7 * tweaks.pinBright : pin.type === 'signed' ? 0.4 * tweaks.pinBright : 0.05 * tweaks.pinBright

  const stemMat = new THREE.MeshPhongMaterial({ color: pHex, emissive: pHex, emissiveIntensity: emStem, shininess: 40 })
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(stemRadius, stemRadius, stemHeight, 8), stemMat)
  stem.position.y = stemHeight / 2
  group.add(stem)

  const headMat = new THREE.MeshPhongMaterial({ color: pHex, emissive: pHex, emissiveIntensity: emHead, shininess: 80 })
  const head = new THREE.Mesh(new THREE.SphereGeometry(headRadius, 12, 12), headMat)
  head.position.y = stemHeight + headRadius
  group.add(head)

  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hitbox.position.y = stemHeight / 2 + headRadius
  hitbox.userData = { pin, isMe }
  group.add(hitbox)

  group.userData = { pin, isMe, pinType: pin.type, hitbox, mats: { stem: stemMat, head: headMat } }
  return group
}

export function addPulseRings(pinGroup: THREE.Group, pulseColor: string, pulseSize: keyof typeof PULSE_SIZES): THREE.Mesh[] {
  const ps = PULSE_SIZES[pulseSize]
  const rings: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(pulseColor),
      transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false,
    })
    const ring = new THREE.Mesh(new THREE.RingGeometry(ps.ir, ps.or, 48), mat)
    ring.position.y = 0.004
    ring.rotation.x = -Math.PI / 2
    ring.userData = { phase: i / 3, maxS: ps.maxS }
    pinGroup.add(ring)
    rings.push(ring)
  }
  return rings
}
