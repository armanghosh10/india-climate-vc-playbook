'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FUNDING_ROUNDS } from '@/lib/data/funding-rounds'
import { INVESTOR_ENRICHMENTS } from '@/lib/data/investors'
import type { InvestorEnrichment, InvestorType } from '@/lib/data/investors'
import { SUB_SECTORS, STAGES } from '@/lib/data/taxonomy'
import type { SubSector, Stage } from '@/lib/data/taxonomy'

// ── derived investor profile ──────────────────────────────────────────────────

interface InvestorProfile {
  name: string
  companies: string[]
  subSectorFocus: SubSector[]
  stageFocus: Stage[]
  roundCount: number
  coInvestorNames: string[]
  yearsActive: number[]
  // enrichment (present only for the ~33 profiled investors)
  type?: InvestorType
  hq?: string
  climateFocus?: 'dedicated' | 'majority' | 'generalist with climate exposure'
  ticketSizeUsdMn?: { min: number; max: number }
  aum?: number | null
  website?: string
  sources?: { label: string; url: string }[]
}

function buildInvestorProfiles(): InvestorProfile[] {
  const acc = new Map<string, {
    companies: Set<string>
    subSectors: Set<SubSector>
    stages: Set<Stage>
    rounds: number
    coInvestors: Set<string>
    years: Set<number>
  }>()

  for (const round of FUNDING_ROUNDS) {
    const year = parseInt(round.date.slice(0, 4))
    for (const inv of round.investors) {
      if (!acc.has(inv)) {
        acc.set(inv, {
          companies: new Set(),
          subSectors: new Set(),
          stages: new Set(),
          rounds: 0,
          coInvestors: new Set(),
          years: new Set(),
        })
      }
      const p = acc.get(inv)!
      p.companies.add(round.company)
      p.subSectors.add(round.subSector)
      p.stages.add(round.stage)
      p.rounds++
      p.years.add(year)
      for (const other of round.investors) {
        if (other !== inv) p.coInvestors.add(other)
      }
    }
  }

  const enrichMap = new Map<string, InvestorEnrichment>(
    INVESTOR_ENRICHMENTS.map(e => [e.name, e])
  )

  const STAGE_ORDER: Stage[] = ['Pre-seed', 'Seed', 'Pre-Series A', 'Series A', 'Pre-Series B', 'Series B', 'Series C', 'Series D', 'Series E', 'Pre-IPO', 'Acquired']

  return Array.from(acc.entries())
    .map(([name, data]) => {
      const e = enrichMap.get(name)
      const stages = Array.from(data.stages).sort(
        (a, b) => STAGE_ORDER.indexOf(a) - STAGE_ORDER.indexOf(b)
      )
      return {
        name,
        companies: Array.from(data.companies).sort(),
        subSectorFocus: Array.from(data.subSectors),
        stageFocus: stages,
        roundCount: data.rounds,
        coInvestorNames: Array.from(data.coInvestors).sort(),
        yearsActive: Array.from(data.years).sort(),
        ...(e ? {
          type: e.type,
          hq: e.hq,
          climateFocus: e.climateFocus,
          ticketSizeUsdMn: e.ticketSizeUsdMn,
          aum: e.aum,
          website: e.website,
          sources: e.sources,
        } : {}),
      }
    })
    .sort((a, b) => b.roundCount - a.roundCount)
}

// actual co-investment counts (rounds where both investors appear together)
function buildCoInvestMap(): Map<string, Map<string, number>> {
  const map = new Map<string, Map<string, number>>()
  for (const round of FUNDING_ROUNDS) {
    for (const a of round.investors) {
      for (const b of round.investors) {
        if (a === b) continue
        if (!map.has(a)) map.set(a, new Map())
        const inner = map.get(a)!
        inner.set(b, (inner.get(b) ?? 0) + 1)
      }
    }
  }
  return map
}

// ── colour maps ───────────────────────────────────────────────────────────────

const SECTOR_COLOURS: Record<string, string> = {
  'Energy': 'bg-blue-950/60 text-blue-300 border-blue-900',
  'Transportation': 'bg-violet-950/60 text-violet-300 border-violet-900',
  'Food & Agriculture': 'bg-emerald-950/60 text-emerald-300 border-emerald-900',
  'Industrial Decarbonisation': 'bg-orange-950/60 text-orange-300 border-orange-900',
  'Carbon & Climate Management': 'bg-teal-950/60 text-teal-300 border-teal-900',
  'Built Environment': 'bg-amber-950/60 text-amber-300 border-amber-900',
}

const MANDATE_COLOUR: Record<string, string> = {
  'dedicated': 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
  'majority': 'bg-blue-900/60 text-blue-300 border-blue-700',
  'generalist with climate exposure': 'bg-zinc-800 text-zinc-300 border-zinc-600',
}

const TYPE_LABEL: Record<string, string> = {
  'seed-fund': 'Seed fund',
  'micro-vc': 'Micro VC',
  'multi-stage': 'Multi-stage',
  'growth-equity': 'Growth equity',
  'impact-fund': 'Impact fund',
  'corporate-vc': 'Corporate VC',
  'family-office': 'Family office',
  'accelerator': 'Accelerator',
  'angel-network': 'Angel network',
  'dfi': 'DFI / Development bank',
}

const CARDS_PAGE = 48

// ── component ────────────────────────────────────────────────────────────────

export default function InvestorMapPage() {
  const allProfiles = useMemo(() => buildInvestorProfiles(), [])
  const coInvestMap = useMemo(() => buildCoInvestMap(), [])

  const [search, setSearch] = useState('')
  const [sectorFilter, setSectorFilter] = useState<SubSector | 'All'>('All')
  const [stageFilter, setStageFilter] = useState<Stage | 'All'>('All')
  const [mandateFilter, setMandateFilter] = useState<string>('All')
  const [selected, setSelected] = useState<InvestorProfile | null>(null)
  const [view, setView] = useState<'cards' | 'matrix'>('cards')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return allProfiles.filter(inv => {
      if (q && !inv.name.toLowerCase().includes(q)) return false
      if (sectorFilter !== 'All' && !inv.subSectorFocus.includes(sectorFilter as SubSector)) return false
      if (stageFilter !== 'All' && !inv.stageFocus.includes(stageFilter as Stage)) return false
      if (mandateFilter !== 'All' && inv.climateFocus !== mandateFilter) return false
      return true
    })
  }, [allProfiles, search, sectorFilter, stageFilter, mandateFilter])

  const displayed = showAll ? filtered : filtered.slice(0, CARDS_PAGE)

  // top 20 by roundCount for co-invest matrix
  const matrixInvestors = useMemo(
    () => allProfiles.slice(0, 20),
    [allProfiles]
  )

  const stats = useMemo(() => ({
    total: allProfiles.length,
    dedicated: allProfiles.filter(i => i.climateFocus === 'dedicated').length,
    seedActive: allProfiles.filter(i => i.stageFocus.some(s => s === 'Seed' || s === 'Pre-seed')).length,
  }), [allProfiles])

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech Map</Link>
          {' / '}
          <span className="text-zinc-300">Investor Map</span>
        </p>

        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Investor Map</h1>
          <p className="text-zinc-400 text-sm">
            Every investor that appears in the funding rounds dataset, derived live from the same source as the Funding Explorer.
            Mandates, ticket sizes, and fund profiles available for the {INVESTOR_ENRICHMENTS.length} institutionally-verified investors.
          </p>
        </div>

        {/* editorial takeaway */}
        <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-3 rounded-r-lg mb-8">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-1">The read</p>
          <p className="text-sm text-zinc-200 leading-snug max-w-4xl">
            India&apos;s climate-tech investor base is concentrated but diversifying. A handful of
            dedicated impact funds (Omnivore, Avaana, Transition VC, Theia) anchor the ecosystem at
            seed and Series A. International DFIs and growth funds (BII, Lightrock, Nuveen) are
            writing the larger Series B+ cheques, with almost no domestic Indian multi-stage fund having made
            climate tech a primary focus. The co-investment matrix (below) shows actual syndicate
            patterns from the dataset: which investors consistently appear in the same rounds.
          </p>
        </div>

        {/* stat bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Investors in dataset', value: stats.total.toString() },
            { label: 'Dedicated climate (profiled)', value: stats.dedicated.toString() },
            { label: 'Active at Seed / Pre-seed', value: stats.seedActive.toString() },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-semibold text-zinc-100 mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* view toggle */}
        <div className="flex gap-2 mb-6">
          {(['cards', 'matrix'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${view === v ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'}`}
            >
              {v === 'cards' ? 'Investor cards' : 'Co-invest affinity'}
            </button>
          ))}
        </div>

        {view === 'cards' && (
          <>
            {/* search + filters */}
            <div className="space-y-2 mb-6">
              <input
                type="text"
                placeholder="Search investor name…"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowAll(false) }}
                className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setSectorFilter('All'); setShowAll(false) }} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === 'All' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}>All sectors</button>
                {SUB_SECTORS.map(s => (
                  <button key={s} onClick={() => { setSectorFilter(s); setShowAll(false) }} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === s ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : `${SECTOR_COLOURS[s]} hover:opacity-90`}`}>{s}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', ...STAGES] as const).map(s => (
                  <button key={s} onClick={() => { setStageFilter(s as Stage | 'All'); setShowAll(false) }} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${stageFilter === s ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'}`}>{s}</button>
                ))}
                <span className="text-zinc-700 px-1">|</span>
                {['All', 'dedicated', 'majority', 'generalist with climate exposure'].map(m => (
                  <button key={m} onClick={() => { setMandateFilter(m); setShowAll(false) }} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${mandateFilter === m ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'}`}>
                    {m === 'All' ? 'All mandates' : m}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-500">
                {filtered.length} investor{filtered.length !== 1 ? 's' : ''} matched
                {filtered.length > CARDS_PAGE && !showAll ? ` (showing first ${CARDS_PAGE})` : ''}
              </p>
            </div>

            {/* investor cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayed.map(inv => (
                <button
                  key={inv.name}
                  onClick={() => setSelected(selected?.name === inv.name ? null : inv)}
                  className={`text-left p-4 rounded-xl border transition-all ${selected?.name === inv.name ? 'border-emerald-600 bg-emerald-950/20' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-semibold text-zinc-100 text-sm leading-tight">{inv.name}</p>
                    {inv.climateFocus && (
                      <span className={`shrink-0 text-[10px] font-medium border rounded-full px-2 py-0.5 ${MANDATE_COLOUR[inv.climateFocus]}`}>
                        {inv.climateFocus === 'dedicated' ? 'Dedicated' : inv.climateFocus === 'majority' ? 'Majority' : 'Generalist'}
                      </span>
                    )}
                  </div>

                  {inv.hq && (
                    <p className="text-xs text-zinc-500 mb-2">
                      {inv.type ? TYPE_LABEL[inv.type] + ' · ' : ''}{inv.hq}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-2">
                    {inv.stageFocus.slice(0, 4).map(s => (
                      <span key={s} className="text-[10px] bg-zinc-800 text-zinc-300 rounded px-1.5 py-0.5">{s}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {inv.subSectorFocus.slice(0, 3).map(s => (
                      <span key={s} className={`text-[10px] border rounded-full px-1.5 py-0.5 ${SECTOR_COLOURS[s]}`}>{s}</span>
                    ))}
                    {inv.subSectorFocus.length > 3 && (
                      <span className="text-[10px] text-zinc-500">+{inv.subSectorFocus.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-600 mt-1">
                    <span>{inv.roundCount} round{inv.roundCount !== 1 ? 's' : ''} · {inv.companies.length} co.</span>
                    {inv.aum && <span>AUM ${inv.aum >= 1000 ? (inv.aum / 1000).toFixed(1) + 'B' : inv.aum + 'M'}</span>}
                  </div>
                </button>
              ))}
            </div>

            {/* show more */}
            {!showAll && filtered.length > CARDS_PAGE && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-4 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
                >
                  Show all {filtered.length} investors
                </button>
              </div>
            )}

            {/* detail modal — fixed overlay */}
            {selected && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setSelected(null)}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div
                  className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-zinc-700 rounded-xl bg-zinc-900 p-6 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">{selected.name}</h2>
                      {selected.hq && (
                        <p className="text-sm text-zinc-400">
                          {selected.type ? TYPE_LABEL[selected.type] + ' · ' : ''}{selected.hq}
                        </p>
                      )}
                    </div>
                    <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-zinc-300 ml-4 shrink-0">✕</button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Rounds in dataset</p>
                      <p className="text-zinc-200">{selected.roundCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Companies backed</p>
                      <p className="text-zinc-200">{selected.companies.length}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Years active</p>
                      <p className="text-zinc-200">{selected.yearsActive[0]}–{selected.yearsActive[selected.yearsActive.length - 1]}</p>
                    </div>
                    {selected.climateFocus && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Climate mandate</p>
                        <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${MANDATE_COLOUR[selected.climateFocus]}`}>{selected.climateFocus}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Portfolio companies (this dataset)</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.companies.map(c => (
                        <span key={c} className="text-xs bg-zinc-800 text-zinc-300 rounded px-2 py-0.5">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Stage focus (derived)</p>
                      <div className="flex flex-wrap gap-1">
                        {selected.stageFocus.map(s => <span key={s} className="text-xs bg-zinc-800 text-zinc-200 rounded px-2 py-0.5">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Sub-sector focus (derived)</p>
                      <div className="flex flex-wrap gap-1">
                        {selected.subSectorFocus.map(s => <span key={s} className={`text-xs border rounded-full px-2 py-0.5 ${SECTOR_COLOURS[s]}`}>{s}</span>)}
                      </div>
                    </div>
                  </div>

                  {selected.ticketSizeUsdMn && (
                    <p className="text-xs text-zinc-400 mb-2">Ticket size: <span className="text-zinc-200">${selected.ticketSizeUsdMn.min}M–${selected.ticketSizeUsdMn.max}M</span></p>
                  )}

                  {selected.coInvestorNames.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Co-investors in same rounds</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {selected.coInvestorNames.slice(0, 15).join(', ')}
                        {selected.coInvestorNames.length > 15 && <span className="text-zinc-600"> +{selected.coInvestorNames.length - 15} more</span>}
                      </p>
                    </div>
                  )}

                  {selected.website && (
                    <a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 mr-4">{selected.website}</a>
                  )}
                  {selected.sources && selected.sources.map(s => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 mr-3">{s.label}</a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {view === 'matrix' && (
          <div>
            <p className="text-xs text-zinc-500 mb-1">
              Top 20 most active investors by round count. Cell = number of rounds where both investors appear together.
            </p>
            <p className="text-xs text-zinc-600 mb-4">
              Derived directly from funding-rounds data. No manual co-invest tagging.
            </p>
            <div className="overflow-x-auto">
              <table className="border-collapse text-[10px]">
                <thead>
                  <tr>
                    <th className="w-40 pr-2"></th>
                    {matrixInvestors.map(inv => (
                      <th key={inv.name} className="pb-2 px-0.5 text-center" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: '100px' }}>
                        <span className="text-zinc-400 font-normal">{inv.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixInvestors.map(rowInv => (
                    <tr key={rowInv.name}>
                      <td className="py-0.5 pr-2 text-zinc-400 text-right whitespace-nowrap">{rowInv.name}</td>
                      {matrixInvestors.map(colInv => {
                        const isSelf = rowInv.name === colInv.name
                        const count = isSelf ? 0 : (coInvestMap.get(rowInv.name)?.get(colInv.name) ?? 0)
                        return (
                          <td key={colInv.name} className="py-0.5 px-0.5">
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center ${isSelf ? 'bg-zinc-700' : count === 0 ? 'bg-zinc-900' : count === 1 ? 'bg-teal-950' : count <= 3 ? 'bg-teal-800' : 'bg-teal-600'}`}
                              title={isSelf ? rowInv.name : `${rowInv.name} × ${colInv.name}: ${count} shared round${count !== 1 ? 's' : ''}`}
                            >
                              {!isSelf && count > 0 && <span className="text-[8px] text-white font-medium">{count}</span>}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-[11px] text-zinc-600 mt-8 leading-relaxed max-w-3xl">
          All investor data derived from <strong className="text-zinc-500">funding-rounds.ts</strong>, the same dataset powering the Funding Explorer.
          Stage focus, sub-sector focus, companies backed, and co-investors are computed live from round entries.
          Fund type, HQ, climate mandate, ticket size, and AUM are from verified enrichment profiles (fund websites,
          press releases, Tracxn) for {INVESTOR_ENRICHMENTS.length} institutionally-verified investors.
          Investors without enrichment profiles appear with derived data only.
        </p>
      </div>
    </main>
  )
}
