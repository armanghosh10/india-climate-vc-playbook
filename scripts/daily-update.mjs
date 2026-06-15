#!/usr/bin/env node
/**
 * daily-update.mjs — India Climate-Tech VC Playbook daily round discovery
 *
 * Runs at 03:30 UTC (09:00 IST) via GitHub Actions.
 * Searches for newly announced India climate-tech funding rounds using
 * Claude with web_search, validates each round against covered-companies.json,
 * appends verified rounds to auto-rounds.json, and opens a PR.
 *
 * Never commits directly to main — all new rounds go through PR review
 * to prevent hallucinated data reaching the live site.
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── config ────────────────────────────────────────────────────────────────────

const MODEL = 'claude-sonnet-4-6'

// Approved sources — rounds must have a URL from one of these domains
const APPROVED_DOMAINS = [
  'inc42.com',
  'entrackr.com',
  'yourstory.com',
  'economictimes.indiatimes.com',
  'business-standard.com',
  'livemint.com',
  'mercomindia.com',
  'mercom.in',
  'energy.economictimes.indiatimes.com',
  'bloomberg.com',
  'bnef.com',
]

// Taxonomy locked values — must match taxonomy.ts exactly
const VALID_SUB_SECTORS = [
  'Energy',
  'Food & Agriculture',
  'Transportation',
  'Industrial Decarbonisation',
  'Carbon & Climate Management',
  'Built Environment',
]

const VALID_STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+']

// Queries to run every day — cast a wide net across all sub-sectors
function buildQueries() {
  const now = new Date()
  const monthYear = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1)
  const prevMonthYear = prevMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return [
    `India climate tech startup funding round ${monthYear}`,
    `India clean energy startup raises funding ${monthYear}`,
    `India EV startup investment ${monthYear}`,
    `India agri climate startup funding ${monthYear}`,
    `India carbon markets startup investment ${monthYear}`,
    `India industrial decarbonisation startup raises ${monthYear}`,
    `India sustainability tech funding round ${monthYear}`,
    `India climate tech startup funding ${prevMonthYear}`,
    `India renewable energy startup investment ${monthYear}`,
    `India cleantech funding round announced ${monthYear}`,
  ]
}

// ── helpers ───────────────────────────────────────────────────────────────────

function loadJson(relPath) {
  const abs = path.join(ROOT, relPath)
  return JSON.parse(fs.readFileSync(abs, 'utf-8'))
}

function saveJson(relPath, data) {
  const abs = path.join(ROOT, relPath)
  fs.writeFileSync(abs, JSON.stringify(data, null, 2))
}

function isApprovedSource(url) {
  try {
    const host = new URL(url).hostname
    return APPROVED_DOMAINS.some(d => host === d || host.endsWith('.' + d))
  } catch {
    return false
  }
}

function validateRound(round) {
  const errors = []
  if (!round.company || typeof round.company !== 'string') errors.push('missing company')
  if (!VALID_SUB_SECTORS.includes(round.subSector)) errors.push(`invalid subSector: ${round.subSector}`)
  if (!VALID_STAGES.includes(round.stage)) errors.push(`invalid stage: ${round.stage}`)
  if (!round.date || !/^\d{4}-\d{2}$/.test(round.date)) errors.push('invalid date (must be YYYY-MM)')
  if (!round.sources || !round.sources.length) errors.push('missing sources')
  if (round.sources && !round.sources.some(s => isApprovedSource(s.url))) {
    errors.push('no approved-domain source URL')
  }
  if (round.amountUsdMn !== null && typeof round.amountUsdMn !== 'number') {
    errors.push('amountUsdMn must be number or null')
  }
  return errors
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

  const client = new Anthropic({ apiKey })

  const coveredCompanies = new Set(loadJson('lib/data/covered-companies.json'))
  const existingAutoRounds = loadJson('lib/data/auto-rounds.json')
  const coveredAutoCompanies = new Set(existingAutoRounds.map(r => r.company))

  const queries = buildQueries()
  console.log(`Running ${queries.length} search queries…`)

  const systemPrompt = `You are a research assistant for an India climate-tech VC data platform.
Your job is to find newly announced India climate-tech funding rounds from the last 60 days.

For each round you find, return a JSON object with exactly these fields:
{
  "company": "Company Name",
  "subSector": "one of: Energy | Food & Agriculture | Transportation | Industrial Decarbonisation | Carbon & Climate Management | Built Environment",
  "subCategory": "sub-category string",
  "techType": "one of: Software / SaaS | Marketplace / aggregator | Deep-tech hardware | Manufacturing / industrials | Project developer | Fintech / risk",
  "climateOutcome": "one of: Mitigation | Adaptation | Enabling infrastructure",
  "stage": "one of: Pre-seed | Seed | Series A | Series B | Series C+",
  "amountUsdMn": number_or_null,
  "date": "YYYY-MM",
  "city": "city name",
  "geography": "one of: India-only | India + SEA | Global from India",
  "investors": ["investor1", "investor2"],
  "sources": [{"label": "Inc42", "url": "https://inc42.com/..."}]
}

Rules:
- Only include rounds from the last 60 days
- Only include rounds with a source URL from: inc42.com, entrackr.com, yourstory.com, economictimes.indiatimes.com, business-standard.com, livemint.com, mercomindia.com, energy.economictimes.indiatimes.com
- Only include India-headquartered companies operating in climate tech
- amountUsdMn must be a number if stated in the source, null if undisclosed — never estimate
- date must be YYYY-MM format
- Return a JSON array. If no new rounds found, return []`

  const allNewRounds = []

  for (const query of queries) {
    console.log(`  Searching: "${query}"`)
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 4096,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Search for India climate-tech funding rounds announced recently. Query: "${query}"\n\nReturn a JSON array of rounds found. Each round must have a source URL from an approved domain. If nothing found, return [].`,
          },
        ],
      })

      // Extract JSON from the response
      const textBlock = response.content.find(b => b.type === 'text')
      if (!textBlock) continue

      const text = textBlock.text
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) continue

      const rounds = JSON.parse(jsonMatch[0])
      if (!Array.isArray(rounds)) continue

      allNewRounds.push(...rounds)
    } catch (err) {
      console.warn(`  Query failed: ${err.message}`)
    }
  }

  console.log(`\nFound ${allNewRounds.length} candidate rounds across all queries`)

  // Deduplicate, validate, and filter
  const seen = new Set()
  const validRounds = []
  const skipped = []

  for (const round of allNewRounds) {
    const key = `${round.company}|${round.date}`

    if (seen.has(key)) {
      skipped.push({ round, reason: 'duplicate in this run' })
      continue
    }
    seen.add(key)

    if (coveredCompanies.has(round.company) && coveredAutoCompanies.has(round.company)) {
      skipped.push({ round, reason: 'already in covered-companies.json' })
      continue
    }

    const errors = validateRound(round)
    if (errors.length > 0) {
      skipped.push({ round, reason: errors.join('; ') })
      continue
    }

    validRounds.push({ ...round, _auto: true, _addedDate: new Date().toISOString().split('T')[0] })
  }

  console.log(`\nValid new rounds: ${validRounds.length}`)
  console.log(`Skipped: ${skipped.length}`)
  skipped.forEach(s => console.log(`  SKIP [${s.reason}]: ${s.round?.company || 'unknown'}`))

  if (validRounds.length === 0) {
    console.log('\nNo new rounds to add. Exiting without creating PR.')
    return
  }

  // Append to auto-rounds.json
  const updatedAutoRounds = [...existingAutoRounds, ...validRounds]
  saveJson('lib/data/auto-rounds.json', updatedAutoRounds)

  // Update site-meta.json timestamp
  const meta = loadJson('lib/data/site-meta.json')
  meta.lastCheckedISO = new Date().toISOString()
  if (validRounds.length > 0) meta.lastUpdatedISO = new Date().toISOString()
  saveJson('lib/data/site-meta.json', meta)

  console.log(`\nWrote ${validRounds.length} rounds to auto-rounds.json`)

  // Create a branch and PR via git + gh CLI
  const branch = `auto/rounds-${new Date().toISOString().split('T')[0]}`
  try {
    execSync(`git checkout -b ${branch}`, { cwd: ROOT, stdio: 'inherit' })
    execSync('git add lib/data/auto-rounds.json lib/data/site-meta.json', { cwd: ROOT, stdio: 'inherit' })

    const companies = validRounds.map(r => r.company).join(', ')
    execSync(
      `git commit -m "auto: add ${validRounds.length} new India climate-tech round(s)\n\nCompanies: ${companies}\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`,
      { cwd: ROOT, stdio: 'inherit' }
    )
    execSync(`git push origin ${branch}`, { cwd: ROOT, stdio: 'inherit' })

    const prBody = [
      '## Auto-detected India climate-tech funding rounds',
      '',
      `Found by daily-update.mjs on ${new Date().toISOString().split('T')[0]}.`,
      '',
      '### Rounds to review',
      ...validRounds.map(r =>
        `- **${r.company}** — ${r.stage}, ${r.amountUsdMn !== null ? `$${r.amountUsdMn}M` : 'undisclosed'}, ${r.date} · [${r.sources[0].label}](${r.sources[0].url})`
      ),
      '',
      '### Before merging',
      '- [ ] Verify each source URL loads and states the amount correctly',
      '- [ ] Confirm company is India-headquartered and climate-focused',
      '- [ ] Check taxonomy tags (subSector, techType, climateOutcome) are correct',
      '- [ ] Add company names to covered-companies.json if approved',
      '',
      '> Auto-generated by daily-update.mjs — do not merge without review.',
    ].join('\n')

    execSync(
      `gh pr create --title "auto: ${validRounds.length} new India climate-tech round(s) (${new Date().toISOString().split('T')[0]})" --body "${prBody.replace(/"/g, '\\"')}" --base main`,
      { cwd: ROOT, stdio: 'inherit' }
    )

    console.log('\nPR created successfully.')
  } catch (err) {
    console.error('Git/PR step failed:', err.message)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
