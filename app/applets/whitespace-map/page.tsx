'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useCompanyProfile } from '@/contexts/CompanyProfileContext'
import { FUNDING_ROUNDS } from '@/lib/data/funding-rounds'
import { SECTOR_CONTEXTS, GAP_NOTES, CELL_MARKET_NOTES } from '@/lib/data/whitespace'
import { SUB_SECTORS, TECH_TYPES } from '@/lib/data/taxonomy'
import type { SubSector, TechType } from '@/lib/data/taxonomy'

// ── matrix computation ───────────────────────────────────────────────────────

interface CellData {
  subSector: SubSector
  techType: TechType
  count: number
  totalUsdMn: number
  companies: string[]
}

function buildMatrix(): CellData[] {
  const cells: CellData[] = []
  for (const subSector of SUB_SECTORS) {
    for (const techType of TECH_TYPES) {
      const matching = FUNDING_ROUNDS.filter(
        r => r.subSector === subSector && r.techType === techType
      )
      cells.push({
        subSector,
        techType,
        count: matching.length,
        totalUsdMn: matching.reduce((s, r) => s + (r.amountUsdMn ?? 0), 0),
        companies: Array.from(new Set(matching.map(r => r.company))),
      })
    }
  }
  return cells
}

// ── helpers ──────────────────────────────────────────────────────────────────

function cellColour(count: number): string {
  if (count === 0) return 'bg-zinc-900 text-zinc-700'
  if (count <= 2) return 'bg-teal-950/80 text-teal-200'
  if (count <= 5) return 'bg-teal-900/80 text-teal-100'
  if (count <= 10) return 'bg-teal-800/80 text-white'
  return 'bg-teal-600 text-white'
}

function fmtMn(n: number) {
  if (n === 0) return ''
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}B`
  return `$${Math.round(n)}M`
}

const TECH_SHORT: Record<TechType, string> = {
  'Software': 'Software',
  'Marketplace': 'Marketplace',
  'Hardware & Industry': 'Hardware',
  'Project Development': 'Project Dev',
  'Fintech': 'Fintech',
}

// ── component ────────────────────────────────────────────────────────────────

export default function WhitespaceMapPage() {
  const matrix = useMemo(() => buildMatrix(), [])
  const [selected, setSelected] = useState<CellData | null>(null)
  const { openCompany } = useCompanyProfile()

  const selectedContext = selected
    ? SECTOR_CONTEXTS.find(c => c.subSector === selected.subSector)
    : null
  const selectedGapNote = selected
    ? GAP_NOTES.find(g => g.subSector === selected.subSector && g.techType === selected.techType)
    : null

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech Map</Link>
          {' / '}
          <span className="text-zinc-300">Whitespace Map</span>
        </p>

        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Sector × Tech Whitespace Map</h1>
          <p className="text-zinc-400 text-sm">
            Where has India climate-tech capital gone, and where hasn&apos;t it? Cell colour = funding
            density. Click any cell for deal breakdown and gap analysis.
          </p>
        </div>

        {/* editorial takeaway */}
        <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-3 rounded-r-lg mb-8">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-1">The read</p>
          <p className="text-sm text-zinc-200 leading-snug max-w-4xl">
            The heatmap reveals four structural patterns. First, Hardware dominates Transportation
            (EV OEM manufacturing bets) and has one beachhead in Industrial Decarbonisation
            (Newtrace, green hydrogen electrolysers), but green-steel, cement, and DAC hardware
            remain entirely unfunded in India VC. Second, Project Development lights up for Energy
            but is dark across Carbon, Agriculture, Built Environment, and Circular Economy. Third,
            Software has gained traction in Food &amp; Agriculture and Built Environment but is
            nearly absent in Industrial Decarbonisation, where process-optimisation software has
            the largest per-unit emissions impact. Fourth, the Circular Economy row shows early
            density in battery recycling and waste marketplaces but is empty in Software, Project
            Development, and Fintech.
          </p>
        </div>

        {/* legend */}
        <div className="flex items-center gap-3 mb-4 text-xs text-zinc-400">
          <span>Funding density:</span>
          {[
            { label: '0 rounds', cls: 'bg-zinc-900 border border-zinc-700' },
            { label: '1–2', cls: 'bg-teal-950/80' },
            { label: '3–5', cls: 'bg-teal-900/80' },
            { label: '6–10', cls: 'bg-teal-800/80' },
            { label: '11+', cls: 'bg-teal-600' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded ${l.cls}`} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>

        {/* heatmap */}
        <div className="overflow-x-auto mb-8">
          <table className="border-collapse min-w-max">
            <thead>
              <tr>
                <th className="w-44 text-left pb-2 pr-3 text-xs text-zinc-500 font-normal"></th>
                {TECH_TYPES.map(t => (
                  <th key={t} className="pb-2 px-1 text-xs text-zinc-400 font-medium text-center whitespace-nowrap">
                    {TECH_SHORT[t]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUB_SECTORS.map(sector => (
                <tr key={sector}>
                  <td className="py-1 pr-3 text-xs text-zinc-300 font-medium text-right align-middle leading-tight w-44">
                    {sector}
                  </td>
                  {TECH_TYPES.map(tech => {
                    const cell = matrix.find(c => c.subSector === sector && c.techType === tech)!
                    const isSelected = selected?.subSector === sector && selected?.techType === tech
                    return (
                      <td key={tech} className="py-1 px-1">
                        <button
                          onClick={() => setSelected(isSelected ? null : cell)}
                          className={`w-20 h-14 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${cellColour(cell.count)} ${isSelected ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-zinc-950' : 'hover:ring-1 hover:ring-zinc-600'}`}
                        >
                          {cell.count > 0 ? (
                            <>
                              <span className="text-base font-bold leading-none">{cell.count}</span>
                              <span className="text-[10px] opacity-75 leading-none">{fmtMn(cell.totalUsdMn)}</span>
                            </>
                          ) : (
                            <span className="text-zinc-700 text-xs"></span>
                          )}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* cell detail panel */}
        {selected && (
          <div className="border border-zinc-700 rounded-xl bg-zinc-900 p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">
                  {selected.subSector} × {selected.techType}
                </h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {selected.count} rounds · {fmtMn(selected.totalUsdMn)} disclosed
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* left: companies */}
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  Companies in this cell
                </p>
                {selected.companies.length > 0 ? (
                  <ul className="space-y-1">
                    {selected.companies.map(c => (
                      <li key={c}>
                        <button
                          onClick={() => openCompany(c)}
                          className="text-sm text-zinc-200 hover:text-emerald-400 transition-colors"
                        >
                          · {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-500 italic">No funded companies in this cell.</p>
                )}
              </div>

              {/* right: gap context */}
              <div className="space-y-4">
                {selectedGapNote && (
                  <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-amber-400 font-medium mb-1">
                      Gap note
                    </p>
                    <p className="text-sm text-zinc-200">{selectedGapNote.note}</p>
                  </div>
                )}
                {selectedContext && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-1">
                        Sector emissions context
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{selectedContext.emissionsDescr}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-1">
                        Market context
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {CELL_MARKET_NOTES[`${selected.subSector}::${selected.techType}`] ?? selectedContext.marketDescr}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedContext.sources.map(s => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* total summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total matrix cells', value: `${SUB_SECTORS.length * TECH_TYPES.length}` },
            { label: 'Cells with ≥1 round', value: matrix.filter(c => c.count > 0).length.toString() },
            { label: 'Empty cells (whitespace)', value: matrix.filter(c => c.count === 0).length.toString() },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-center">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-semibold text-zinc-100 mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-zinc-600 leading-relaxed max-w-3xl">
          Matrix derived from 280+ verified India climate-tech funding rounds, 2020–present.
          Cell values reflect VC and growth equity rounds in the dataset; DFI debt, project
          finance, and corporate M&A are excluded. Sector context figures sourced from IEA,
          MoEFCC, CEEW, NITI Aayog, and CPI with citations per cell.
        </p>
      </div>
    </main>
  )
}
