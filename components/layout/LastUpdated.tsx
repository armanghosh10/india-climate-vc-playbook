'use client'

import meta from '@/lib/data/site-meta.json'

export default function LastUpdated() {
  const updated = new Date(meta.lastUpdatedISO)
  const checked = new Date(meta.lastCheckedISO)

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })

  return (
    <p className="text-xs text-zinc-500">
      Data last updated{' '}
      <span className="text-zinc-300 font-medium">
        {fmtDate(updated)} at {fmtTime(updated)} IST
      </span>
      {' · '}
      Last checked {fmtDate(checked)}
    </p>
  )
}
