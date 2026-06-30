'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COHORT_ROWS } from '@/lib/data/cohorts'
import { SUB_SECTORS } from '@/lib/data/taxonomy'
import type { SubSector } from '@/lib/data/taxonomy'

// ── helpers ──────────────────────────────────────────────────────────────────

const SECTOR_COLOURS: Record<string, string> = {
  'Energy': 'bg-blue-600',
  'Transportation': 'bg-violet-600',
  'Food & Agriculture': 'bg-emerald-600',
  'Industrial Decarbonisation': 'bg-orange-600',
  'Carbon & Climate Management': 'bg-teal-600',
  'Built Environment': 'bg-amber-600',
  'Circular Economy': 'bg-lime-600',
}

const SECTOR_FAINT: Record<string, string> = {
  'Energy': 'bg-blue-950/60 text-blue-300 border-blue-900',
  'Transportation': 'bg-violet-950/60 text-violet-300 border-violet-900',
  'Food & Agriculture': 'bg-emerald-950/60 text-emerald-300 border-emerald-900',
  'Industrial Decarbonisation': 'bg-orange-950/60 text-orange-300 border-orange-900',
  'Carbon & Climate Management': 'bg-teal-950/60 text-teal-300 border-teal-900',
  'Built Environment': 'bg-amber-950/60 text-amber-300 border-amber-900',
  'Circular Economy': 'bg-lime-950/60 text-lime-300 border-lime-900',
}

function pct(num: number, denom: number) {
  if (denom === 0) return 'N/A'
  return `${Math.round((100 * num) / denom)}%`
}

// ── component ────────────────────────────────────────────────────────────────

export default function GraduationFunnelPage() {
  const [sectorFilter, setSectorFilter] = useState<SubSector | 'All'>('All')
  const [showSmall, setShowSmall] = useState(false)

  const filtered = COHORT_ROWS.filter(c => {
    if (sectorFilter !== 'All' && c.subSector !== sectorFilter) return false
    if (!showSmall && !c.sufficientSample) return false
    return true
  }).sort((a, b) => a.seedYear - b.seedYear)

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech Map</Link>
          {' / '}
          <span className="text-zinc-300">Graduation Funnel</span>
        </p>

        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Graduation Funnel</h1>
          <p className="text-zinc-400 text-sm">
            Of India climate-tech companies that raised Seed in year N, what percentage reached
            Series A? Series B? By sub-sector and cohort year.
          </p>
        </div>

        {/* caveat banner */}
        <div className="border border-amber-900/60 bg-amber-950/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-xs text-amber-300">
            <span className="font-semibold">Methodology note: </span>
            India&apos;s climate-tech VC ecosystem is nascent. Cohort sizes are small, and some years
            have fewer than 5 seed rounds per sub-sector. Graduation rates are computed within
            this dataset only: a company that raised Series A without press coverage in approved
            sources may show as 0%. Only cohorts with N≥3 seed companies are shown by default.
            Use directional patterns, not precise benchmarks.
          </p>
        </div>

        {/* editorial takeaway */}
        <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-3 rounded-r-lg mb-8">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-1">The read</p>
          <p className="text-sm text-zinc-200 leading-snug max-w-4xl">
            Transportation shows the highest and fastest graduation rates: the 2022 cohort converted
            33% to Series A and 17% to Series B within two years, anchored by River (Yamaha). Food &amp;
            Agriculture 2021 and 2022 cohorts show ~43–50% Seed→A conversion, driven by precision agri
            companies with defensible data moats. The most striking finding is Industrial Decarbonisation:
            no cohort has produced a single in-dataset Series A graduation, consistent with the longer
            capital cycles and higher technical risk in hard-to-abate sectors. Carbon &amp; Climate
            Management&apos;s 2022 cohort graduated well (67%), but the 2023 cohort has yet to produce
            any follow-on, either still on runway or reflecting a market reset after the voluntary
            carbon market downturn.
          </p>
        </div>

        {/* filters */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <button
            onClick={() => setSectorFilter('All')}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === 'All' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
          >
            All sectors
          </button>
          {SUB_SECTORS.map(s => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === s ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : `${SECTOR_FAINT[s]} hover:opacity-90`}`}
            >
              {s}
            </button>
          ))}
          <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={showSmall}
              onChange={e => setShowSmall(e.target.checked)}
              className="accent-emerald-500"
            />
            Show small cohorts (n&lt;3)
          </label>
        </div>

        {/* cohort cards */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-zinc-500 text-sm py-8 text-center">No cohorts match the current filters.</p>
          )}
          {filtered.map(row => {
            const seedN = row.seedCompanies.length
            const aRate = row.graduatedToA.length / seedN
            const bRate = row.graduatedToB.length / seedN
            const accentBar = SECTOR_COLOURS[row.subSector]

            return (
              <div key={`${row.subSector}-${row.seedYear}`} className="border border-zinc-800 rounded-xl overflow-hidden">
                {/* card header */}
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-medium border rounded-full px-2 py-0.5 ${SECTOR_FAINT[row.subSector]}`}>
                      {row.subSector}
                    </span>
                    <span className="text-zinc-300 font-semibold">{row.seedYear} Seed cohort</span>
                    {!row.sufficientSample && (
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 rounded px-1.5 py-0.5">
                        n&lt;3 · low confidence
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{seedN} companies</span>
                </div>

                {/* funnel bars */}
                <div className="px-5 py-4 space-y-3">
                  {/* Seed bar: always 100% */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Seed / Pre-seed</span>
                      <span className="font-mono">{seedN} ({pct(seedN, seedN)})</span>
                    </div>
                    <div className="h-5 rounded bg-zinc-700 w-full" />
                  </div>

                  {/* Series A bar */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>→ Series A</span>
                      <span className="font-mono">{row.graduatedToA.length} ({pct(row.graduatedToA.length, seedN)})</span>
                    </div>
                    <div className="h-5 rounded bg-zinc-800 w-full relative">
                      <div
                        className={`h-5 rounded ${accentBar} transition-all`}
                        style={{ width: seedN > 0 ? `${aRate * 100}%` : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Series B bar */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>→ Series B</span>
                      <span className="font-mono">
                        {row.graduatedToB.length} ({pct(row.graduatedToB.length, seedN)} of seed
                        {row.graduatedToA.length > 0 && (
                          <> · {pct(
                            row.graduatedToB.filter(c => row.graduatedToA.includes(c)).length,
                            row.graduatedToA.length
                          )} of A</>
                        )})
                      </span>
                    </div>
                    <div className="h-5 rounded bg-zinc-800 w-full relative">
                      <div
                        className={`h-5 rounded ${accentBar} opacity-70 transition-all`}
                        style={{ width: seedN > 0 ? `${bRate * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* company lists */}
                <div className="px-5 pb-4 grid sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-zinc-500 mb-1.5 uppercase tracking-wider text-[10px]">Seed cohort</p>
                    <div className="flex flex-wrap gap-1">
                      {row.seedCompanies.map(c => (
                        <span key={c} className="bg-zinc-800 text-zinc-300 rounded px-1.5 py-0.5">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-500 mb-1.5 uppercase tracking-wider text-[10px]">Reached Series A</p>
                    <div className="flex flex-wrap gap-1">
                      {row.graduatedToA.length > 0
                        ? row.graduatedToA.map(c => <span key={c} className={`${SECTOR_FAINT[row.subSector]} border rounded px-1.5 py-0.5`}>{c}</span>)
                        : <span className="text-zinc-600 italic">None in dataset</span>
                      }
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-500 mb-1.5 uppercase tracking-wider text-[10px]">Reached Series B</p>
                    <div className="flex flex-wrap gap-1">
                      {row.graduatedToB.length > 0
                        ? row.graduatedToB.map(c => <span key={c} className={`${SECTOR_FAINT[row.subSector]} border rounded px-1.5 py-0.5`}>{c}</span>)
                        : <span className="text-zinc-600 italic">None in dataset</span>
                      }
                    </div>
                  </div>
                </div>

                {/* note */}
                {row.note && (
                  <div className="px-5 pb-4">
                    <p className="text-xs text-zinc-500 border-t border-zinc-800 pt-3 leading-relaxed">{row.note}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-[11px] text-zinc-600 mt-8 leading-relaxed max-w-3xl">
          Graduation rates computed within this dataset only. A company&apos;s Series A may exist
          but not appear here if coverage in approved sources is incomplete. Seed year is assigned
          by the earliest Seed or Pre-seed round in the dataset. Series A graduation is detected
          if any Series A round appears for the same company name.
        </p>
      </div>
    </main>
  )
}
