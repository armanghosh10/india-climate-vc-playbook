'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { REPORTS } from '@/lib/data/reports'

// ── types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ── component ────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  const [apiKey, setApiKey] = useState('')
  const [apiKeyStored, setApiKeyStored] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string>('All')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('anthropic-api-key') : null
    if (stored) { setApiKey(stored); setApiKeyStored(true) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const allTags = Array.from(new Set(REPORTS.flatMap(r => r.tags))).sort()
  const filteredReports = tagFilter === 'All' ? REPORTS : REPORTS.filter(r => r.tags.includes(tagFilter))

  function storeKey() {
    if (!apiKey.startsWith('sk-ant-')) { setError('Key must start with sk-ant-'); return }
    localStorage.setItem('anthropic-api-key', apiKey)
    setApiKeyStored(true)
    setError(null)
  }

  function clearKey() {
    localStorage.removeItem('anthropic-api-key')
    setApiKey('')
    setApiKeyStored(false)
    setMessages([])
  }

  async function send(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    setError(null)

    const userMsg: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, apiKey }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          assistantText += decoder.decode(value, { stream: true })
          setMessages(prev => {
            const next = [...prev]
            next[next.length - 1] = { role: 'assistant', content: assistantText }
            return next
          })
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* breadcrumb */}
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-300">India Climate-Tech VC Playbook</Link>
          {' / '}
          <span className="text-zinc-300">Research + Reports</span>
        </p>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Research + Reports</h1>
          <p className="text-zinc-400 text-sm">
            {REPORTS.length} canonical India climate-tech reports with sourced headline figures — plus a Claude-powered chat grounded on this corpus.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* ── left: report corpus ─────────────────────────────────────── */}
          <div>
            {/* tag filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setTagFilter('All')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${tagFilter === 'All' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${tagFilter === tag ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* report cards */}
            <div className="space-y-4">
              {filteredReports.map(report => (
                <div key={report.url} className="border border-zinc-800 bg-zinc-900 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-zinc-100 hover:text-emerald-300 transition-colors leading-snug"
                      >
                        {report.title}
                      </a>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {report.publisher} · {report.year}
                      </p>
                    </div>
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[10px] text-emerald-400 border border-emerald-800 rounded px-2 py-0.5 hover:bg-emerald-950/40 transition-colors"
                    >
                      Open ↗
                    </a>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{report.description}</p>

                  <div className="space-y-1.5">
                    {report.headlineFigures.map((f, i) => (
                      <div key={i} className="flex gap-2 text-xs">
                        <span className="text-emerald-400 font-semibold whitespace-nowrap shrink-0">{f.figure}</span>
                        <span className="text-zinc-400">{f.context}</span>
                        {f.page && <span className="text-zinc-600 shrink-0">({f.page})</span>}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {report.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-zinc-800 text-zinc-400 rounded px-1.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── right: chat ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <div className="flex flex-col h-full border border-zinc-800 rounded-xl bg-zinc-900 overflow-hidden">

              {/* header */}
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Ask the corpus</p>
                  <p className="text-[10px] text-zinc-500">Claude grounded on {REPORTS.length} reports</p>
                </div>
                {apiKeyStored && (
                  <button onClick={clearKey} className="text-[10px] text-zinc-500 hover:text-zinc-300">
                    Clear key
                  </button>
                )}
              </div>

              {/* API key prompt */}
              {!apiKeyStored ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-zinc-300 mb-1">Your Anthropic API key</p>
                    <p className="text-xs text-zinc-500 max-w-xs">
                      Used only in this browser — stored in localStorage, never sent to our servers.
                      Get a key at{' '}
                      <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        console.anthropic.com
                      </a>
                    </p>
                  </div>
                  <div className="w-full max-w-xs space-y-2">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder="sk-ant-..."
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      onClick={storeKey}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    >
                      Start chatting
                    </button>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                  </div>
                </div>
              ) : (
                <>
                  {/* messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
                    {messages.length === 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-zinc-500 mb-3">Suggested questions:</p>
                        {[
                          "What does India need to invest annually to meet its NDC goals?",
                          "How big is India's voluntary carbon market?",
                          "What is the decarbonisation investment needed for India's buildings sector?",
                          "What are the key findings of the McKinsey Decarbonising India report?",
                        ].map(q => (
                          <button
                            key={q}
                            onClick={() => setInput(q)}
                            className="block w-full text-left text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded px-3 py-2 transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-emerald-700 text-white' : 'bg-zinc-800 text-zinc-200'}`}
                        >
                          {msg.content || <span className="text-zinc-500 italic">Thinking…</span>}
                        </div>
                      </div>
                    ))}
                    {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                      <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-500 italic">Thinking…</div>
                      </div>
                    )}
                    {error && (
                      <p className="text-xs text-red-400 text-center">{error}</p>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* input */}
                  <form onSubmit={send} className="px-4 py-3 border-t border-zinc-800 flex gap-2">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask about India climate finance, market sizing, policy…"
                      disabled={loading}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-600 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-zinc-600 mt-10 leading-relaxed max-w-3xl">
          Report corpus sourced from IEA, IRENA, BloombergNEF, RMI, WRI, CEEW, CPI, TERI, NITI Aayog, McKinsey, IFC, and MNRE.
          All headline figures are cited with page references. Chat uses claude-sonnet-4-6 and is grounded only on
          the corpus above — it will not answer from general training data if the corpus
          does not cover the question.
        </p>
      </div>
    </main>
  )
}
