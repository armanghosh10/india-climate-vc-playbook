'use client'

import { useEffect, useState } from 'react'
import meta from '@/lib/data/site-meta.json'

export default function LastUpdated() {
  const [timeStr, setTimeStr] = useState<string | null>(null)

  useEffect(() => {
    const d = new Date(meta.lastUpdatedISO)
    setTimeStr(
      d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    )
  }, [])

  const updated = new Date(meta.lastUpdatedISO)
  const checked = new Date(meta.lastCheckedISO)

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <p className="text-xs text-zinc-500">
      Data last updated{' '}
      <span className="text-zinc-300 font-medium">
        {fmtDate(updated)}{timeStr ? ` at ${timeStr} IST` : ''}
      </span>
      {' · '}
      Last checked {fmtDate(checked)}
    </p>
  )
}
