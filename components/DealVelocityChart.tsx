'use client'

import { useMemo } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { FUNDING_ROUNDS } from '@/lib/data/funding-rounds'

const SECTOR_COLOURS: Record<string, string> = {
  'Energy': '#3b82f6',
  'Transportation': '#8b5cf6',
  'Food & Agriculture': '#10b981',
  'Industrial Decarbonisation': '#f97316',
  'Carbon & Climate Management': '#14b8a6',
  'Built Environment': '#f59e0b',
  'Circular Economy': '#84cc16',
}

function quarterKey(date: string) {
  const [y, m] = date.split('-').map(Number)
  return `${y} Q${Math.ceil(m / 3)}`
}

function quarterSort(a: string, b: string) {
  const parse = (s: string) => {
    const [y, q] = s.split(' Q').map(Number)
    return y * 4 + q
  }
  return parse(a) - parse(b)
}

interface TooltipPayloadEntry {
  dataKey: string
  value: number
  fill: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const countEntry = payload.find(p => p.dataKey === '_count')
  const barEntries = payload.filter(p => p.dataKey !== '_count' && p.value > 0)
  const total = barEntries.reduce((s, p) => s + p.value, 0)
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs shadow-xl">
      <p className="font-semibold text-zinc-200 mb-2">{label}</p>
      {barEntries.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.fill }} />
          <span className="text-zinc-400">{p.dataKey}:</span>
          <span className="text-zinc-200">${Math.round(p.value)}M</span>
        </div>
      ))}
      {total > 0 && (
        <div className="border-t border-zinc-700 mt-1.5 pt-1.5 flex justify-between gap-4">
          <span className="text-zinc-400">Total</span>
          <span className="text-zinc-100 font-medium">${Math.round(total)}M · {countEntry?.value ?? 0} rounds</span>
        </div>
      )}
    </div>
  )
}

export default function DealVelocityChart() {
  const data = useMemo(() => {
    const quarterMap = new Map<string, Record<string, number>>()
    for (const r of FUNDING_ROUNDS) {
      const qk = quarterKey(r.date)
      if (!quarterMap.has(qk)) quarterMap.set(qk, {})
      const entry = quarterMap.get(qk)!
      entry[r.subSector] = (entry[r.subSector] ?? 0) + (r.amountUsdMn ?? 0)
      entry['_count'] = (entry['_count'] ?? 0) + 1
    }
    return Array.from(quarterMap.keys()).sort(quarterSort).map(qk => ({ quarter: qk, ...quarterMap.get(qk)! }))
  }, [])

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-zinc-100">Deal velocity</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Capital deployed ($M, stacked by sector) and round count per quarter, 2020–present</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data} margin={{ top: 4, right: 40, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey="quarter"
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${v}M`}
            width={52}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          {Object.entries(SECTOR_COLOURS).map(([sector, colour]) => (
            <Bar
              key={sector}
              yAxisId="left"
              dataKey={sector}
              stackId="a"
              fill={colour}
              fillOpacity={0.8}
            />
          ))}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="_count"
            stroke="#e4e4e7"
            strokeWidth={1.5}
            dot={false}
            name="Rounds"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {Object.entries(SECTOR_COLOURS).map(([s, c]) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c, opacity: 0.8 }} />
            <span className="text-[10px] text-zinc-500">{s}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-px bg-zinc-300" />
          <span className="text-[10px] text-zinc-500">Round count (right axis)</span>
        </div>
      </div>
    </div>
  )
}
