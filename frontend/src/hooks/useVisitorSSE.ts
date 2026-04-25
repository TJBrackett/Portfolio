import { useEffect, useState } from 'react'
import type { Pin } from '../types'
import { getVisitorPins, VISITOR_STREAM_URL } from '../api/client'

function pinKey(p: Pin) {
  return `${p.lat.toFixed(3)},${p.lon.toFixed(3)}`
}

export function useVisitorSSE() {
  const [pins, setPins] = useState<Pin[]>([])

  useEffect(() => {
    getVisitorPins().then(setPins).catch(() => {})
  }, [])

  useEffect(() => {
    const es = new EventSource(VISITOR_STREAM_URL)

    es.addEventListener('new_visitor', (e) => {
      const pin: Pin = JSON.parse((e as MessageEvent).data)
      setPins((prev) => {
        if (prev.some((p) => pinKey(p) === pinKey(pin))) return prev
        return [...prev, pin]
      })
    })

    es.addEventListener('new_signed', (e) => {
      const pin: Pin = JSON.parse((e as MessageEvent).data)
      setPins((prev) => {
        const idx = prev.findIndex((p) => pinKey(p) === pinKey(pin))
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = pin
          return next
        }
        return [...prev, pin]
      })
    })

    return () => es.close()
  }, [])

  return pins
}
