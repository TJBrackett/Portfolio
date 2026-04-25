import { useEffect, useRef, useState } from 'react'
import { Globe } from '../components/Globe/Globe'
import { SideNav } from '../components/Nav/SideNav'
import { signGuestbook, trackVisit } from '../api/client'
import { useVisitorSSE } from '../hooks/useVisitorSSE'
import type { MyLocation } from '../types'

export default function HomePage() {
  const [myLocation, setMyLocation]   = useState<MyLocation | null>(null)
  const [visitId, setVisitId]         = useState<number | null>(null)
  const [visitorRank, setVisitorRank] = useState<number>(0)
  const [snapTarget, setSnapTarget]   = useState<{ lat: number; lon: number } | null>(null)
  const mountTime = useRef(Date.now())

  const pins = useVisitorSSE()

  const visitCount   = pins.length + (myLocation ? 1 : 0)
  const countryCount = new Set([
    ...pins.map((p) => p.country),
    ...(myLocation ? [myLocation.country] : []),
  ]).size

  useEffect(() => {
    trackVisit('/').then((res) => {
      setVisitId(res.visit_id)
      setVisitorRank(res.visitor_rank)
      if (res.lat != null && res.lon != null) {
        setMyLocation({ lat: res.lat, lon: res.lon, city: res.city, country: res.country })
      }
    }).catch(() => {})
  }, [])

  // Duration beacon on unload
  useEffect(() => {
    const sendBeacon = () => {
      if (!visitId) return
      const duration = Math.round((Date.now() - mountTime.current) / 1000)
      navigator.sendBeacon(
        '/api/v1/visitor/track',
        JSON.stringify({ page_path: '/', visit_id: visitId, duration_seconds: duration }),
      )
    }
    window.addEventListener('beforeunload', sendBeacon)
    return () => window.removeEventListener('beforeunload', sendBeacon)
  }, [visitId])

  async function handleGuestbookSubmit(name: string, emoji: string) {
    await signGuestbook(name, emoji)
  }

  return (
    <div className="app">
      <SideNav visitCount={visitCount} countryCount={countryCount} />
      <Globe
        pins={pins}
        myLocation={myLocation}
        visitorRank={visitorRank}
        snapTarget={snapTarget}
        onSnapHandled={() => setSnapTarget(null)}
        onSnapTo={(lat, lon) => setSnapTarget({ lat, lon })}
        onGuestbookSubmit={handleGuestbookSubmit}
      />
    </div>
  )
}
