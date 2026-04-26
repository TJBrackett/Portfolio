import { useEffect, useRef, useState } from 'react'
import { Globe } from '../components/Globe/Globe'
import { trackVisit, signGuestbook } from '../api/client'
import type { MyLocation, Pin } from '../types'

interface HomePageProps {
  pins: Pin[]
  myLocation: MyLocation | null
  setMyLocation: (loc: MyLocation) => void
}

export default function HomePage({ pins, myLocation, setMyLocation }: HomePageProps) {
  const [visitId, setVisitId]         = useState<number | null>(null)
  const [visitorRank, setVisitorRank] = useState<number>(0)
  const [snapTarget, setSnapTarget]   = useState<{ lat: number; lon: number } | null>(null)
  const mountTime = useRef(Date.now())

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
    <Globe
      pins={pins}
      myLocation={myLocation}
      visitorRank={visitorRank}
      snapTarget={snapTarget}
      onSnapHandled={() => setSnapTarget(null)}
      onSnapTo={(lat, lon) => setSnapTarget({ lat, lon })}
      onGuestbookSubmit={handleGuestbookSubmit}
    />
  )
}
