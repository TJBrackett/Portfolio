import { useEffect, useState } from 'react'

export type HealthStatus = 'up' | 'down' | 'checking'

const HEALTH_URL = '/api/health'
const INTERVAL_MS = 30_000   // poll every 30s
const TIMEOUT_MS  = 5_000    // treat as down after 5s

async function fetchHealth(): Promise<boolean> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
    const res = await fetch(HEALTH_URL, { signal: ctrl.signal })
    clearTimeout(timer)
    return res.ok
  } catch {
    return false
  }
}

export function useHealthCheck(): HealthStatus {
  const [status, setStatus] = useState<HealthStatus>('checking')

  useEffect(() => {
    let cancelled = false

    async function check() {
      const ok = await fetchHealth()
      if (!cancelled) setStatus(ok ? 'up' : 'down')
    }

    check()
    const id = setInterval(check, INTERVAL_MS)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  return status
}
