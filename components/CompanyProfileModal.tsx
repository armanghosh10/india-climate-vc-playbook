'use client'

import { useMemo } from 'react'
import { FUNDING_ROUNDS } from '@/lib/data/funding-rounds'
import { useCompanyProfile } from '@/contexts/CompanyProfileContext'

const SECTOR_COLOURS: Record<string, string> = {
  'Energy': 'bg-blue-950/60 text-blue-300 border-blue-900',
  'Transportation': 'bg-violet-950/60 text-violet-300 border-violet-900',
  'Food & Agriculture': 'bg-emerald-950/60 text-emerald-300 border-emerald-900',
  'Industrial Decarbonisation': 'bg-orange-950/60 text-orange-300 border-orange-900',
  'Carbon & Climate Management': 'bg-teal-950/60 text-teal-300 border-teal-900',
  'Built Environment': 'bg-amber-950/60 text-amber-300 border-amber-900',
  'Circular Economy': 'bg-lime-950/60 text-lime-300 border-lime-900',
}

const STAGE_COLOURS: Record<string, string> = {
  'Pre-seed': 'bg-zinc-800 text-zinc-300',
  'Seed': 'bg-emerald-950 text-emerald-300',
  'Pre-Series A': 'bg-sky-950 text-sky-300',
  'Series A': 'bg-blue-950 text-blue-300',
  'Pre-Series B': 'bg-indigo-950 text-indigo-300',
  'Series B': 'bg-violet-950 text-violet-300',
  'Series C': 'bg-amber-950 text-amber-300',
  'Series D': 'bg-orange-950 text-orange-300',
  'Series E': 'bg-red-950 text-red-300',
  'Pre-IPO': 'bg-yellow-950 text-yellow-200',
  'Acquired': 'bg-zinc-700 text-zinc-200',
}

function fmt(n: number | null) {
  if (n === null) return 'undisclosed'
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}B`
  return `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}M`
}

function fmtDate(d: string) {
  const [y, m] = d.split('-')
  const month = new Date(parseInt(y), parseInt(m) - 1).toLocaleString('en-IN', { month: 'short' })
  return `${month} ${y}`
}

export default function CompanyProfileModal() {
  const { selectedCompany, closeCompany } = useCompanyProfile()

  const rounds = useMemo(() => {
    if (!selectedCompany) return []
    return FUNDING_ROUNDS
      .filter(r => r.company === selectedCompany)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [selectedCompany])

  if (!selectedCompany || rounds.length === 0) return null

  const first = rounds[0]
  const totalRaised = rounds.reduce((s, r) => s + (r.amountUsdMn ?? 0), 0)
  const allInvestors = Array.from(new Set(rounds.flatMap(r => r.investors))).sort()
  const allSources = rounds.flatMap(r => r.sources)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeCompany}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-zinc-700 rounded-xl bg-zinc-900 p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">{selectedCompany}</h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[10px] font-medium border rounded-full px-2 py-0.5 ${SECTOR_COLOURS[first.subSector] ?? 'bg-zinc-800 text-zinc-300'}`}>
                {first.subSector}
              </span>
              <span className="text-[10px] text-zinc-500">{first.subCategory}</span>
              <span className="text-[10px] text-zinc-500">·</span>
              <span className="text-[10px] text-zinc-500">{first.city}</span>
            </div>
          </div>
          <button onClick={closeCompany} className="text-zinc-500 hover:text-zinc-300 ml-4 shrink-0 text-lg">✕</button>
        </div>

        {/* summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total raised', value: totalRaised > 0 ? fmt(totalRaised) : 'undisclosed' },
            { label: 'Rounds tracked', value: rounds.length.toString() },
            { label: 'Investors', value: allInvestors.length.toString() },
          ].map(s => (
            <div key={s.label} className="bg-zinc-800/60 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-semibold text-zinc-100 mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* round timeline */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Round history</p>
          <div className="space-y-2">
            {rounds.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-zinc-800/40 rounded-lg px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-medium rounded px-1.5 py-0.5 ${STAGE_COLOURS[r.stage] ?? 'bg-zinc-700 text-zinc-300'}`}>
                      {r.stage}
                    </span>
                    <span className="text-xs font-semibold text-zinc-100">{fmt(r.amountUsdMn)}</span>
                    <span className="text-[10px] text-zinc-500">{fmtDate(r.date)}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed truncate">
                    {r.investors.join(', ')}
                  </p>
                </div>
                {r.sources[0] && (
                  <a
                    href={r.sources[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[10px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2 mt-0.5"
                    onClick={e => e.stopPropagation()}
                  >
                    source
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* all investors */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-2">All investors</p>
          <div className="flex flex-wrap gap-1.5">
            {allInvestors.map(inv => (
              <span key={inv} className="text-xs bg-zinc-800 text-zinc-300 rounded px-2 py-0.5">{inv}</span>
            ))}
          </div>
        </div>

        {/* sources */}
        <div className="flex flex-wrap gap-3 pt-3 border-t border-zinc-800">
          {allSources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              onClick={e => e.stopPropagation()}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
