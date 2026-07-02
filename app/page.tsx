import Link from 'next/link'
import DealVelocityChart from '@/components/DealVelocityChart'

const APPLETS = [
  {
    slug: 'funding-explorer',
    title: 'Funding Rounds Explorer',
    description:
      'India climate-tech rounds (2020–present). Filter by sub-sector, tech type, climate outcome, stage, city, investor. Every row links to source.',
    icon: '💰',
    status: 'live',
  },
  {
    slug: 'whitespace-map',
    title: 'Sector × Tech Whitespace Map',
    description:
      'Sub-sector vs. technology type heatmap showing funding density and market gap analysis. Where has capital not yet gone?',
    icon: '🗺️',
    status: 'live',
  },
  {
    slug: 'investor-map',
    title: 'Investor Map',
    description:
      'India climate-tech funds: mandates, stage focus, ticket sizes, and syndicate affinity matrix showing natural co-investment patterns.',
    icon: '🤝',
    status: 'live',
  },
  {
    slug: 'graduation-funnel',
    title: 'Graduation Funnel',
    description:
      'Of climate-tech companies that raised Seed in year N, what % reached Series A? By sub-sector and cohort year.',
    icon: '📊',
    status: 'live',
  },
  {
    slug: 'research',
    title: 'Research & Reports',
    description:
      'Canonical India climate-tech reports: CEEW, CPI, IEA, BloombergNEF, IRENA and more, with parsed headline figures and a Claude-powered chat over the corpus.',
    icon: '📚',
    status: 'live',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <div className="inline-block text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-full px-3 py-1 mb-4">
            India · Climate Tech · 2020–present
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">
            India Climate-Tech Map
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Interactive tools for analysing India&apos;s climate-tech investment landscape,
            built the way an analyst actually works a market.
          </p>
          <p className="text-zinc-600 text-sm mt-3 max-w-2xl">
            Every data point sourced and cited. Funding figures from Inc42, Entrackr, BloombergNEF.
            Policy data from MNRE, MoEFCC. Market sizing from CEEW, CPI, IEA.
          </p>
          <p className="text-zinc-500 text-sm mt-4">
            By{' '}
            <span className="text-zinc-300 font-medium">Arman Ghosh</span>
            {' · '}
            <a
              href="https://www.linkedin.com/in/arman-ghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              LinkedIn
            </a>
            {' · '}
            <a
              href="https://github.com/armanghosh10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </header>

        <div className="mb-10">
          <DealVelocityChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPLETS.map((a) => (
            <Link
              key={a.slug}
              href={`/applets/${a.slug}`}
              className="block p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all"
            >
              <div className="text-2xl mb-3">{a.icon}</div>
              <h2 className="font-semibold text-lg mb-1">{a.title}</h2>
              <p className="text-zinc-400 text-sm">{a.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
