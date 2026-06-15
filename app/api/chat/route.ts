import Anthropic from '@anthropic-ai/sdk'
import type { NextRequest } from 'next/server'
import { REPORTS } from '@/lib/data/reports'

// Build a system prompt grounded in the report corpus
function buildSystemPrompt(): string {
  const corpus = REPORTS.map(r => {
    const figures = r.headlineFigures.map(f => `  - ${f.figure}: ${f.context}`).join('\n')
    return `### ${r.title} (${r.publisher}, ${r.year})\nURL: ${r.url}\nKey figures:\n${figures}`
  }).join('\n\n')

  return `You are a research assistant for the India Climate-Tech VC Playbook, a data product built by Arman Ghosh. Your job is to answer questions from climate-tech investors and analysts about India's energy transition, climate finance, and decarbonisation landscape.

You have access to the following curated corpus of canonical India climate-tech research reports:

${corpus}

Guidelines:
- Ground every answer in the corpus above. Quote specific figures and cite the report and year.
- If a question requires data not covered in the corpus, say so clearly — do not invent numbers.
- Be concise and analytically sharp — your audience thinks like investors, not academics.
- When citing a figure, mention the source (e.g. "per CPI's 2024 Landscape of Green Finance report").
- If asked about venture-stage market dynamics, focus on the implications for early-stage climate tech investment.`
}

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json()

    if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('sk-ant-')) {
      return new Response(JSON.stringify({ error: 'Invalid Anthropic API key format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const client = new Anthropic({ apiKey })

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: messages.slice(-10), // keep last 10 turns to avoid token overflow
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
