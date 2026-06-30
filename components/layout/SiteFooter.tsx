import LastUpdated from './LastUpdated'

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-6">
      <div className="max-w-7xl mx-auto px-6 pb-4 mb-4 border-b border-zinc-900">
        <LastUpdated />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-200">India Climate-Tech Map</p>
          <p className="text-xs text-zinc-500 mt-0.5 max-w-md">
            Interactive analysis of India&apos;s climate-tech investment landscape: funding flows,
            white space, investor syndicates, and graduation rates. Built as original analytical work.
          </p>
        </div>

        <div className="text-xs text-zinc-500 sm:text-right">
          <p>
            Built by <span className="text-zinc-300 font-medium">Arman Ghosh</span>
          </p>
          <div className="flex sm:justify-end items-center gap-3 mt-1">
            <a
              href="https://www.linkedin.com/in/arman-ghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              LinkedIn
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="https://github.com/armanghosh10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <p className="max-w-7xl mx-auto px-6 text-[10px] text-zinc-700 mt-4">
        All data compiled from public sources (Inc42, Entrackr, BloombergNEF, MNRE, CEEW, CPI and others)
        with source citations on every entry. Built as a portfolio artifact. Not investment advice.
      </p>
    </footer>
  )
}
