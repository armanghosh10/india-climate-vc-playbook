'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FUNDING_ROUNDS } from '@/lib/data/funding-rounds'
import { SUB_SECTORS, STAGES } from '@/lib/data/taxonomy'

// ── colour mappings ──────────────────────────────────────────────────────────

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

// ── helpers ──────────────────────────────────────────────────────────────────

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

const ALL_YEARS = Array.from(new Set(FUNDING_ROUNDS.map(r => parseInt(r.date.split('-')[0])))).sort()
const PAGE_SIZE = 30

function medianTimeBetweenRoundsMonths(rounds: typeof FUNDING_ROUNDS): number | null {
  const byCompany = new Map<string, string[]>()
  for (const r of rounds) {
    if (!byCompany.has(r.company)) byCompany.set(r.company, [])
    byCompany.get(r.company)!.push(r.date)
  }
  const gaps: number[] = []
  Array.from(byCompany.values()).forEach(dates => {
    if (dates.length < 2) return
    const sorted = [...dates].sort()
    for (let i = 1; i < sorted.length; i++) {
      const [y0, m0] = sorted[i - 1].split('-').map(Number)
      const [y1, m1] = sorted[i].split('-').map(Number)
      gaps.push((y1 - y0) * 12 + (m1 - m0))
    }
  })
  if (gaps.length === 0) return null
  gaps.sort((a, b) => a - b)
  const mid = Math.floor(gaps.length / 2)
  return gaps.length % 2 === 0 ? (gaps[mid - 1] + gaps[mid]) / 2 : gaps[mid]
}

function medianStepUp(rounds: typeof FUNDING_ROUNDS): number | null {
  const byCompany = new Map<string, typeof FUNDING_ROUNDS>()
  for (const r of rounds) {
    if (!byCompany.has(r.company)) byCompany.set(r.company, [])
    byCompany.get(r.company)!.push(r)
  }
  const multiples: number[] = []
  Array.from(byCompany.values()).forEach(rds => {
    if (rds.length < 2) return
    const sorted = [...rds].sort((a, b) => a.date.localeCompare(b.date))
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1].amountUsdMn && sorted[i].amountUsdMn) {
        multiples.push((sorted[i].amountUsdMn as number) / (sorted[i - 1].amountUsdMn as number))
      }
    }
  })
  if (multiples.length === 0) return null
  multiples.sort((a, b) => a - b)
  const mid = Math.floor(multiples.length / 2)
  return multiples.length % 2 === 0 ? (multiples[mid - 1] + multiples[mid]) / 2 : multiples[mid]
}

// ── component ────────────────────────────────────────────────────────────────

export default function FundingExplorerPage() {
  const [sectorFilter, setSectorFilter] = useState<string>('All')
  const [stageFilter, setStageFilter] = useState<string>('All')
  const [yearFilter, setYearFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortCol, setSortCol] = useState<'date' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  const [page, setPage] = useState(1)
  const [expandedInvestors, setExpandedInvestors] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let rows = FUNDING_ROUNDS.slice()

    if (sectorFilter !== 'All') rows = rows.filter(r => r.subSector === sectorFilter)
    if (stageFilter !== 'All') rows = rows.filter(r => r.stage === stageFilter)
    if (yearFilter !== 'All') rows = rows.filter(r => r.date.startsWith(yearFilter))
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      rows = rows.filter(r =>
        r.company.toLowerCase().includes(q) ||
        r.investors.some(i => i.toLowerCase().includes(q)) ||
        r.subCategory.toLowerCase().includes(q)
      )
    }

    rows.sort((a, b) => {
      if (sortCol === 'date') {
        const cmp = a.date.localeCompare(b.date)
        return sortDir === 'desc' ? -cmp : cmp
      }
      const aAmt = a.amountUsdMn ?? -1
      const bAmt = b.amountUsdMn ?? -1
      return sortDir === 'desc' ? bAmt - aAmt : aAmt - bAmt
    })

    return rows
  }, [sectorFilter, stageFilter, yearFilter, searchQuery, sortCol, sortDir])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalDisclosed = filtered
    .filter(r => r.amountUsdMn !== null)
    .reduce((s, r) => s + (r.amountUsdMn as number), 0)

  const medianTime = medianTimeBetweenRoundsMonths(filtered)
  const medianMult = medianStepUp(filtered)

  function toggleSort(col: 'date' | 'amount') {
    if (sortCol === col) setSortDir(d => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortCol(col); setSortDir('desc') }
  }

  function resetPage() { setPage(1) }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech Map</Link>
          {' / '}
          <span className="text-zinc-300">Funding Rounds Explorer</span>
        </p>

        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Funding Rounds Explorer</h1>
          <p className="text-zinc-400 text-sm">
            India climate-tech funding rounds, 2020–present. Every row links to source.
          </p>
        </div>

        {/* editorial takeaway */}
        <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-3 rounded-r-lg mb-8">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-1">The read</p>
          <p className="text-sm text-zinc-200 leading-snug max-w-4xl">
            Transportation absorbs the most capital and the largest individual tickets: EV OEM
            manufacturing bets at scale (Yamaha→River $40M, Kabira Mobility $50M, EKA Mobility $23M)
            sit alongside a parallel charging-infrastructure wave of $3–25M rounds. Outside transport,
            the ecosystem is structurally early: Seed and Series A together make up 66% of all rounds.
            The sharpest whitespace is at the Series B layer for Carbon & Climate Management, Built
            Environment, and Industrial Decarbonisation, each with fewer than five rounds above Series A
            in this dataset against large unaddressed emissions footprints. 2022 was the volume peak
            (42 rounds); 2024 matched it at 40, but the composition shifted: larger tickets, fewer
            pre-seed bets.
          </p>
        </div>

        {/* stat bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Rounds shown', value: filtered.length.toString() },
            {
              label: 'Capital disclosed',
              value: totalDisclosed >= 1000
                ? `$${(totalDisclosed / 1000).toFixed(1)}B`
                : `$${Math.round(totalDisclosed)}M`,
            },
            { label: 'Unique companies', value: Array.from(new Set(filtered.map(r => r.company))).length.toString() },
            { label: 'Years covered', value: '2020–2026' },
            {
              label: 'Median months between rounds',
              value: medianTime !== null ? `${Math.round(medianTime)} mo` : 'N/A',
            },
            {
              label: 'Median round step-up',
              value: medianMult !== null ? `${medianMult.toFixed(1)}x` : 'N/A',
            },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-semibold text-zinc-100 mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* filters */}
        <div className="space-y-3 mb-6">

          {/* sub-sector chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSectorFilter('All'); resetPage() }}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                sectorFilter === 'All'
                  ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'
              }`}
            >
              All sectors
            </button>
            {SUB_SECTORS.map(s => (
              <button
                key={s}
                onClick={() => { setSectorFilter(s); resetPage() }}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  sectorFilter === s
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                    : `${SECTOR_COLOURS[s]} hover:opacity-90`
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* stage + year + search row */}
          <div className="flex flex-wrap gap-2 items-center">
            {['All', ...STAGES].map(s => (
              <button
                key={s}
                onClick={() => { setStageFilter(s); resetPage() }}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  stageFilter === s
                    ? 'bg-zinc-200 text-zinc-900'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {s}
              </button>
            ))}

            <select
              value={yearFilter}
              onChange={e => { setYearFilter(e.target.value); resetPage() }}
              className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 rounded px-2 py-1 h-7"
            >
              <option value="All">All years</option>
              {ALL_YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>

            <input
              type="text"
              placeholder="Company or investor…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); resetPage() }}
              className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 rounded px-3 py-1 h-7 w-48 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />

            {(sectorFilter !== 'All' || stageFilter !== 'All' || yearFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => { setSectorFilter('All'); setStageFilter('All'); setYearFilter('All'); setSearchQuery(''); setPage(1) }}
                className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Sector</th>
                <th className="text-left px-4 py-3 font-medium">Stage</th>
                <th
                  className="text-right px-4 py-3 font-medium cursor-pointer hover:text-zinc-200 select-none"
                  onClick={() => toggleSort('amount')}
                >
                  Amount {sortCol === 'amount' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer hover:text-zinc-200 select-none"
                  onClick={() => toggleSort('date')}
                >
                  Date {sortCol === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">City</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Lead Investors</th>
                <th className="text-center px-4 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-zinc-500 py-12 text-sm">
                    No rounds match the current filters.
                  </td>
                </tr>
              )}
              {pageRows.map((r, i) => {
                const allVisible = r.investors.filter(inv => !['undisclosed', 'undisclosed angels', 'existing investors'].includes(inv))
                const leadInvestors = allVisible.slice(0, 3)
                const overflow = allVisible.slice(3)
                const rowKey = `${r.company}-${r.date}-${i}`
                const isExpanded = expandedInvestors === rowKey
                return (
                  <tr
                    key={rowKey}
                    className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-100">{r.company}</span>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{r.subCategory}</p>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium border rounded-full px-2 py-0.5 ${SECTOR_COLOURS[r.subSector]}`}>
                        {r.subSector}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium rounded px-2 py-0.5 ${STAGE_COLOURS[r.stage]}`}>
                        {r.stage}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-sm">
                      {r.amountUsdMn !== null
                        ? <span className="text-zinc-100">{fmt(r.amountUsdMn)}</span>
                        : <span className="text-zinc-600 text-xs">undisclosed</span>
                      }
                    </td>

                    <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">
                      {fmtDate(r.date)}
                    </td>

                    <td className="px-4 py-3 text-zinc-400 text-xs hidden md:table-cell">
                      {r.city}
                    </td>

                    <td className="px-4 py-3 text-zinc-400 text-xs hidden lg:table-cell max-w-xs">
                      {leadInvestors.length > 0
                        ? <div className="relative">
                            <span>{leadInvestors.join(', ')}</span>
                            {overflow.length > 0 && (
                              <button
                                onClick={() => setExpandedInvestors(isExpanded ? null : rowKey)}
                                className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
                              >
                                {isExpanded ? '−' : `+${overflow.length}`}
                              </button>
                            )}
                            {isExpanded && (
                              <div className="absolute left-0 top-full mt-1 z-20 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl min-w-48 max-w-xs">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">All investors</p>
                                <ul className="space-y-0.5">
                                  {allVisible.map(inv => (
                                    <li key={inv} className="text-zinc-300">{inv}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        : null
                      }
                    </td>

                    <td className="px-4 py-3 text-center">
                      <a
                        href={r.sources[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                      >
                        {r.sources[0].label}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-zinc-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} rounds
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs px-3 py-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="text-xs text-zinc-500 px-2 py-1.5">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs px-3 py-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-zinc-600 mt-8 leading-relaxed max-w-3xl">
          Data compiled from Inc42, Entrackr, YourStory, Economic Times, Business Standard, Mercom
          India, and ET Energy World. Only rounds with a source URL from a reputed outlet are
          included. Amounts are as stated in the source, undisclosed where not reported. INR amounts
          converted at the prevailing rate at time of announcement.
        </p>
      </div>
    </main>
  )
}
