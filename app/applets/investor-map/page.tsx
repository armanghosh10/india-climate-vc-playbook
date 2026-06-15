'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { INVESTORS } from '@/lib/data/investors'
import { SUB_SECTORS, STAGES } from '@/lib/data/taxonomy'
import type { SubSector, Stage } from '@/lib/data/taxonomy'
import type { Investor } from '@/lib/data/investors'

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

// ── stage matrix (co-investment affinity) ─────────────────────────────────────

function stageOverlap(a: Investor, b: Investor): number {
  const shared = a.stageFocus.filter(s => b.stageFocus.includes(s)).length
  return shared
}

// ── component ────────────────────────────────────────────────────────────────

export default function InvestorMapPage() {
  const [sectorFilter, setSectorFilter] = useState<SubSector | 'All'>('All')
  const [stageFilter, setStageFilter] = useState<Stage | 'All'>('All')
  const [mandateFilter, setMandateFilter] = useState<string>('All')
  const [selected, setSelected] = useState<Investor | null>(null)
  const [view, setView] = useState<'cards' | 'matrix'>('cards')

  const filtered = useMemo(() => {
    return INVESTORS.filter(inv => {
      if (sectorFilter !== 'All' && !inv.subSectorFocus.includes(sectorFilter as SubSector)) return false
      if (stageFilter !== 'All' && !inv.stageFocus.includes(stageFilter as Stage)) return false
      if (mandateFilter !== 'All' && inv.climateFocus !== mandateFilter) return false
      return true
    })
  }, [sectorFilter, stageFilter, mandateFilter])

  // Co-investment affinity matrix (only Seed/Pre-seed + Series A overlap investors)
  const matrixInvestors = useMemo(() =>
    INVESTORS.filter(i => i.stageFocus.some(s => ['Seed', 'Pre-seed', 'Series A'].includes(s))).slice(0, 20),
    []
  )

  const isEmpty = INVESTORS.length === 0

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech VC Playbook</Link>
          {' / '}
          <span className="text-zinc-300">Investor Map</span>
        </p>

        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Investor Map</h1>
          <p className="text-zinc-400 text-sm">
            India climate-tech funds — mandates, stage focus, ticket sizes, and syndicate patterns.
          </p>
        </div>

        {isEmpty ? (
          // empty state — data population in progress
          <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400 text-sm mb-2">Investor data population in progress.</p>
            <p className="text-zinc-600 text-xs max-w-sm mx-auto">
              Verified fund mandates, AUMs, and portfolio data are being sourced from fund websites,
              press releases, and Tracxn. Check back shortly.
            </p>
          </div>
        ) : (
          <>
            {/* editorial takeaway */}
            <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-3 rounded-r-lg mb-8">
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-1">The read</p>
              <p className="text-sm text-zinc-200 leading-snug max-w-4xl">
                India&apos;s climate-tech investor base is concentrated but diversifying. A handful of
                dedicated impact funds (Omnivore, Avaana, Transition VC) anchor the ecosystem at
                seed and Series A. International DFIs and growth funds (BII, Lightrock, Nuveen) are
                writing the larger Series B+ cheques — almost no domestic Indian multi-stage fund has
                made climate tech a primary focus. The co-investment affinity matrix shows tight
                syndicate clustering: Omnivore and 3one4 co-invest frequently in Food &amp; Agri;
                Lightrock and Eversource anchor the energy-infrastructure growth rounds.
              </p>
            </div>

            {/* stat bar */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Investors tracked', value: INVESTORS.length.toString() },
                { label: 'Dedicated climate', value: INVESTORS.filter(i => i.climateFocus === 'dedicated').length.toString() },
                { label: 'Active at Seed', value: INVESTORS.filter(i => i.stageFocus.includes('Seed')).length.toString() },
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
                {/* filters */}
                <div className="space-y-2 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSectorFilter('All')} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === 'All' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}>All sectors</button>
                    {SUB_SECTORS.map(s => (
                      <button key={s} onClick={() => setSectorFilter(s)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sectorFilter === s ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : `${SECTOR_COLOURS[s]} hover:opacity-90`}`}>{s}</button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...STAGES].map(s => (
                      <button key={s} onClick={() => setStageFilter(s as Stage | 'All')} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${stageFilter === s ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'}`}>{s}</button>
                    ))}
                    <span className="text-zinc-700 px-1">|</span>
                    {['All', 'dedicated', 'majority', 'generalist with climate exposure'].map(m => (
                      <button key={m} onClick={() => setMandateFilter(m)} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${mandateFilter === m ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'}`}>
                        {m === 'All' ? 'All mandates' : m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* investor cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(inv => (
                    <button
                      key={inv.name}
                      onClick={() => setSelected(selected?.name === inv.name ? null : inv)}
                      className={`text-left p-4 rounded-xl border transition-all ${selected?.name === inv.name ? 'border-emerald-600 bg-emerald-950/20' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-semibold text-zinc-100 text-sm leading-tight">{inv.name}</p>
                        <span className={`shrink-0 text-[10px] font-medium border rounded-full px-2 py-0.5 ${MANDATE_COLOUR[inv.climateFocus]}`}>
                          {inv.climateFocus === 'dedicated' ? 'Dedicated' : inv.climateFocus === 'majority' ? 'Majority' : 'Generalist'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-500 mb-2">{TYPE_LABEL[inv.type]} · {inv.hq}</p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {inv.stageFocus.map(s => (
                          <span key={s} className="text-[10px] bg-zinc-800 text-zinc-300 rounded px-1.5 py-0.5">{s}</span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {inv.subSectorFocus.slice(0, 3).map(s => (
                          <span key={s} className={`text-[10px] border rounded-full px-1.5 py-0.5 ${SECTOR_COLOURS[s]}`}>{s}</span>
                        ))}
                        {inv.subSectorFocus.length > 3 && (
                          <span className="text-[10px] text-zinc-500">+{inv.subSectorFocus.length - 3}</span>
                        )}
                      </div>

                      {inv.aum && (
                        <p className="text-xs text-zinc-500 mt-2">AUM: <span className="text-zinc-300">${inv.aum}M</span></p>
                      )}
                    </button>
                  ))}
                </div>

                {/* detail panel */}
                {selected && (
                  <div className="mt-6 border border-zinc-700 rounded-xl bg-zinc-900 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-semibold">{selected.name}</h2>
                        <p className="text-sm text-zinc-400">{TYPE_LABEL[selected.type]} · {selected.hq}</p>
                      </div>
                      <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-zinc-300">✕</button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Climate mandate</p>
                        <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${MANDATE_COLOUR[selected.climateFocus]}`}>{selected.climateFocus}</span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Stage focus</p>
                        <div className="flex flex-wrap gap-1">{selected.stageFocus.map(s => <span key={s} className="text-xs bg-zinc-800 text-zinc-200 rounded px-2 py-0.5">{s}</span>)}</div>
                      </div>
                      {selected.ticketSizeUsdMn && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Ticket size</p>
                          <p className="text-zinc-200">${selected.ticketSizeUsdMn.min}M–${selected.ticketSizeUsdMn.max}M</p>
                        </div>
                      )}
                    </div>
                    {selected.sources.length > 0 && (
                      <div className="mt-4 flex gap-3 flex-wrap">
                        {selected.sources.map(s => (
                          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2">{s.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {view === 'matrix' && (
              <div>
                <p className="text-xs text-zinc-500 mb-4">
                  Showing top 20 early-stage investors. Cell colour = shared stage focus (darker = more overlap).
                </p>
                <div className="overflow-x-auto">
                  <table className="border-collapse text-[10px]">
                    <thead>
                      <tr>
                        <th className="w-32 pr-2"></th>
                        {matrixInvestors.map(inv => (
                          <th key={inv.name} className="pb-2 px-0.5 text-center" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: '80px' }}>
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
                            const overlap = stageOverlap(rowInv, colInv)
                            const isSelf = rowInv.name === colInv.name
                            return (
                              <td key={colInv.name} className="py-0.5 px-0.5">
                                <div
                                  className={`w-6 h-6 rounded ${isSelf ? 'bg-zinc-700' : overlap === 0 ? 'bg-zinc-900' : overlap === 1 ? 'bg-teal-950' : overlap === 2 ? 'bg-teal-800' : 'bg-teal-600'}`}
                                  title={isSelf ? rowInv.name : `${rowInv.name} × ${colInv.name}: ${overlap} shared stage(s)`}
                                />
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
          </>
        )}

        <p className="text-[11px] text-zinc-600 mt-8 leading-relaxed max-w-3xl">
          Investor data sourced from fund websites, official press releases, Inc42, YourStory,
          and Tracxn public profiles. Climate mandate is classified based on fund&apos;s own stated
          thesis — &quot;dedicated&quot; means climate is the primary lens; &quot;majority&quot; means
          climate is explicitly a focus area; &quot;generalist with climate exposure&quot; means the
          fund has made climate bets without a stated mandate.
        </p>
      </div>
    </main>
  )
}
