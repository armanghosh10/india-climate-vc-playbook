export default function TheRead({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className="border-l-2 border-emerald-500 bg-emerald-950/20 px-4 py-2.5 rounded-r-lg">
        <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-0.5">
          The read
        </p>
        <p className="text-sm text-zinc-200 leading-snug max-w-4xl">{children}</p>
      </div>
    </div>
  )
}
