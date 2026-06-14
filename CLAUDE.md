# India Climate-Tech VC Playbook — Claude Code Briefing

Read this file fully before writing any code. Every architectural and taxonomy decision here was made deliberately. Do not re-derive or second-guess them.

---

## What we're building

An original interactive data product for India climate-tech VC analysis. The site is built by Arman Ghosh as a portfolio artifact for Samara Capital's Digital & AI internship.

**Stack reference**: Study https://github.com/Shaurya3001/consumer-vc-analyst-playbook for architectural patterns, component structure, and the daily-update pipeline. Use it as engineering reference only — do not copy content, branding, framing, or editorial structure. The final site must read as original work.

**Audience**: Samara Capital's Digital & AI team (private equity, Mumbai). People who think like analysts — they will scrutinize every number. Every figure on the site must be sourced and cited.

---

## The most important rule in this entire file

**Nothing is hardcoded. No numbers, no percentages, no company names, no fund sizes, no policy details, no editorial takeaways.**

Every single data point on this site — every funding figure, every investor mandate, every policy date, every market size number, every "The read" analyst takeaway — must come from a deep web search against reputed sources, with a citation attached.

Reputed sources for this project:
- **Funding data**: Inc42, Entrackr, YourStory, ET Energy, Mercom India, BloombergNEF India, Business Standard, Economic Times, Livemint
- **Market data**: CTVC State of Climate Tech (annual), BloombergNEF, IEA, IRENA, REN21
- **India policy**: MNRE (mnre.gov.in), MoEFCC, PIB press releases, PRS Legislative Research, CEA
- **Carbon markets**: Verra public registry (registry.verra.org), Gold Standard registry, UC Berkeley Voluntary Registry Offsets Database, IETA, CPI (Climate Policy Initiative)
- **Research reports**: CEEW, CPI India, TERI, Niti Aayog, McKinsey, Bain, RMI India, WRI India, IFC
- **Investor data**: Fund websites, official press releases, Tracxn public blog, Crunchbase public profiles

If a fact cannot be verified against one of these sources with a URL, it does not go on the site. Period.

When Claude runs searches for data population:
- Run multiple searches per topic, not just one
- Cross-reference figures across at least two sources where possible
- If sources conflict, use the more recent or more authoritative one and note the discrepancy
- If a figure cannot be found, leave the field blank or mark as "data unavailable" — never estimate or interpolate
- Every data entry in every TypeScript file must have a `sources` array with real URLs

---

## Stack

- **Framework**: Next.js 14 App Router, TypeScript strict mode
- **UI**: Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **Data**: No backend. All data as typed TypeScript constants in `/lib/data/`. No runtime API calls except in the research chat applet.
- **AI**: Anthropic API (`claude-sonnet-4-6`) — used in:
  1. `scripts/daily-update.mjs` — daily cron that finds new funding rounds
  2. Research + Chat applet — Claude answers questions over the report corpus
- **Deploy**: Vercel, auto-deploy on push to main
- **Cron**: GitHub Actions, 03:30 UTC daily (09:00 IST)

---

## Taxonomy — locked

This is the MECE spine. Every data file and applet filter references these exact values. Defined in `lib/data/taxonomy.ts`. Do not add, remove, or rename values without explicit instruction.

### Sub-sectors (6 pillars)

```typescript
export const SUB_SECTORS = [
  'Energy',
  'Food & Agriculture',
  'Transportation',
  'Industrial Decarbonisation',
  'Carbon & Climate Management',
  'Built Environment',
] as const
```

Each sub-sector has sub-categories used as tags (not top-level filters):

**Energy**: Renewables development, Energy storage, DERs & grid tech, New energy (hydrogen/nuclear), Renewables financing

**Food & Agriculture**: Food waste & supply chain, Crop yield & precision agri, Sustainable inputs, Alternative protein, Indoor farming

**Transportation**: EV OEMs, EV charging & battery swap, Micromobility, Hard-to-abate transport

**Industrial Decarbonisation**: Battery recycling, Green chemicals & synthetic biology, Waste & recycling, Carbon capture & concrete

**Carbon & Climate Management**: Earth observation & MRV, Sustainability reporting, Carbon markets & offsets, Carbon removal, Parametric climate insurance

**Built Environment**: Green construction materials, Building energy efficiency, Green real estate finance, Water & wastewater

### Technology type

```typescript
export const TECH_TYPES = [
  'Software / SaaS',
  'Marketplace / aggregator',
  'Deep-tech hardware',
  'Manufacturing / industrials',
  'Project developer',
  'Fintech / risk',
] as const
```

### Climate outcome

```typescript
export const CLIMATE_OUTCOMES = [
  'Mitigation',
  'Adaptation',
  'Enabling infrastructure',
] as const
```

### Additional tags per round entry

```typescript
stage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+'
geography: 'India-only' | 'India + SEA' | 'Global from India'
trl: 'Low' | 'Medium' | 'High'   // optional
year: number
city: string
sources: { label: string; url: string }[]   // REQUIRED on every entry
```

---

## Applets — 5 total

### Applet 1: Funding Rounds Explorer
**Route**: `/applets/funding-explorer`
**Data file**: `lib/data/funding-rounds.ts`

An interactive, filterable table of India climate-tech funding rounds. Filters: sub-sector, tech type, climate outcome, stage, city, year, investor.

**How to populate**:
Run deep web searches across Inc42, Entrackr, YourStory, ET Energy, Mercom, BloombergNEF India for India climate-tech funding rounds from 2020 to present. For each round found:
- Verify the amount, date, stage, and investor list against the original source
- Tag it against the taxonomy (sub-sector, tech type, climate outcome)
- Attach the source URL
- Add to `funding-rounds.ts`

Do not seed with assumed or estimated data. Search first, populate from what is found.

**"The read" editorial takeaway**: Do NOT write this until the data is populated. The takeaway must emerge from what the data actually shows, not from prior assumptions. Once rounds are populated, run an analysis pass and write the takeaway based on real patterns in the data.

---

### Applet 2: Sector × Tech Type Heatmap (Whitespace Map)
**Route**: `/applets/whitespace-map`
**Data file**: `lib/data/whitespace.ts`

A heatmap with sub-sector as rows and technology type as columns. Cell colour = funding density (number of rounds + total $M deployed). Clicking a cell shows the gap analysis: estimated market/emissions size of the problem vs. capital deployed.

**How to populate**:
Derived from the funding rounds data — no separate manual population needed. The market size and emissions figures per cell need to be sourced separately:
- Search for India emissions by sector (MNRE, MoEFCC, Niti Aayog, IEA India)
- Search for market size estimates per sub-sector (sector-specific reports, BloombergNEF, CEEW)
- Every number in the gap analysis must have a source URL

**"The read" takeaway**: Write after data is in. Do not assume which cells will be empty — let the data show it.

---

### Applet 3: Investor Map
**Route**: `/applets/investor-map`
**Data file**: `lib/data/investors.ts`

Maps India climate-tech investors: who invests at what stage, which funds naturally co-invest, affinity matrix showing syndicate patterns.

**How to populate**:
Search for India climate-tech VC funds — fund websites, LinkedIn, Tracxn public profiles, press releases. For each investor:
- Verify their climate-tech mandate from their own website or official communications
- Verify stage focus (pre-seed, seed, Series A, growth) from portfolio page or press
- Verify ticket size range if publicly available
- List known co-investments only if verifiable from press releases or both funds' portfolio pages
- Attach source URLs for each investor entry

Do not assume any investor's mandate. If the fund website doesn't clearly state climate focus, mark it as "generalist with climate exposure" not "climate-focused."

**Starting search queries** (do not assume results — search and verify):
- "India climate tech venture capital fund"
- "India clean energy VC investor"
- "India agritech climate investor"
- "India deep tech climate fund"
- "[Fund name] portfolio climate"

---

### Applet 4: Graduation Funnel
**Route**: `/applets/graduation-funnel`
**Data file**: `lib/data/cohorts.ts`

Of India climate-tech companies that raised Seed in year N, what % reached Series A? Series B? By sub-sector and cohort year.

**Important caveat to display on the applet**: India's climate-tech VC ecosystem is nascent. Cohort sizes are small (some years, some sub-sectors may have <5 seed rounds), so graduation rates should be interpreted carefully. Display confidence intervals or sample sizes alongside percentages. This applet is most useful for showing directional trends and identifying sub-sectors with unusually high or low graduation rates, not for statistically robust benchmarking.

**How to populate**:
- Derived entirely from the funding rounds data — a company graduates from Seed to Series A if both rounds appear in the dataset
- Match companies across rounds by name (careful with name variations)
- Calculate graduation rates only for cohorts with N≥3 companies — flag cohorts below this threshold
- Do not extrapolate or estimate graduation rates for cohorts with insufficient data

**"The read" takeaway**: Write after data is populated. The interesting finding may be sub-sectors with zero graduation (no Seed → Series A conversions yet) or unexpectedly high graduation (strong signal of market validation).

---

### Applet 5: Research + Reports Chat
**Route**: `/applets/research`
**Data file**: `lib/data/reports.ts`

A curated corpus of canonical India climate-tech reports, each with parsed headline figures and source links, plus a Claude-powered chat that answers questions from the corpus.

**How to populate**:
Search for and verify the following report categories (find real URLs, do not assume):
- CEEW reports on India climate investment and energy transition
- Climate Policy Initiative (CPI) India climate finance reports
- IEA India energy outlook
- IRENA India renewable energy reports
- BloombergNEF India energy transition outlook
- RMI India reports
- WRI India climate reports
- Niti Aayog energy/climate publications
- McKinsey India decarbonisation
- Bain India climate reports

For each report found: verify it exists at the URL, extract 3-5 headline figures with page references, store in `reports.ts` with full citation.

**Chat implementation**: Same pattern as Shaurya's research applet — user brings their own Anthropic API key. System prompt grounds Claude on the corpus contents.

---

## The daily-update cron

`scripts/daily-update.mjs` — runs daily at 03:30 UTC via GitHub Actions.

**What it does**:
1. Searches for newly announced India climate-tech funding rounds using Claude + web_search
2. Validates each round has a real source URL from a reputed outlet
3. Dedupes against `covered-companies.json`
4. Appends verified rounds to `auto-rounds.json` (tagged "new" in the explorer)
5. Opens a PR (not a direct commit) — rounds must be reviewed before going live

**Search queries for the cron** (run all of these, not just one):
- "India climate tech startup funding round [current month year]"
- "India clean energy startup raises funding [current month year]"
- "India EV startup investment [current month year]"
- "India agri climate startup funding [current month year]"
- "India carbon markets startup investment [current month year]"
- "India industrial decarbonisation startup raises [current month year]"
- "India sustainability tech funding round [current month year]"

**Validation rules** (same rigour as manual population):
- Must have a source URL from: Inc42, Entrackr, YourStory, ET Energy, Mercom, BloombergNEF, Business Standard, Economic Times, Livemint
- Must be taggable to at least one sub-sector from the taxonomy
- Amount must be stated in the source (not estimated)
- If any field is unverifiable, drop the round entirely

**Model**: `claude-sonnet-4-6` with `web_search_20250305` tool.

**PR over direct commit**: Always open a PR. Never commit directly to main. One hallucinated round destroys credibility.

---

## File structure

```
lib/
  data/
    taxonomy.ts              ← Write first. Everything typed against this.
    funding-rounds.ts        ← Populated via deep search
    investors.ts             ← Populated via deep search
    whitespace.ts            ← Derived from funding rounds + sourced market data
    cohorts.ts               ← Derived from funding rounds
    reports.ts               ← Populated via deep search
    sources.ts               ← Source URL registry
    site-meta.json           ← lastUpdated timestamp
    auto-rounds.json         ← Starts empty, cron fills it
    covered-companies.json   ← Deduplication list

app/
  applets/
    funding-explorer/
    whitespace-map/
    investor-map/
    graduation-funnel/
    research/

scripts/
  daily-update.mjs

.github/workflows/
  daily-update.yml
```

---

## Build order

Follow this exactly. Do not skip steps.

1. Write `taxonomy.ts` — locked values above
2. Run deep searches to populate `funding-rounds.ts` — this is the foundation everything else derives from
3. Run deep searches to populate `investors.ts`
4. Build `funding-explorer` applet — once data exists, write "The read" from what the data shows
5. Derive `whitespace.ts` from funding rounds data + sourced market/emissions figures; build `whitespace-map` applet
6. Derive `cohorts.ts` from funding rounds data; build `graduation-funnel` applet
7. Run deep searches to populate `reports.ts`; build `research` applet
8. Build `investor-map` applet
9. Update `daily-update.mjs` with climate-tech search queries and PR workflow
10. Write README — original framing, methodology note, data sources
11. Deploy to Vercel; set `ANTHROPIC_API_KEY` in GitHub secrets

---

## What NOT to build

These applets are explicitly out of scope for MVP:

- **Carbon Markets Dashboard** — removed for now, may return in v2
- **Exits Tracker** — too few India climate-tech exits to populate meaningfully
- **Unit Economics Sandbox** — too variable across tech types to be useful
- **Momentum Dashboard** — brand signal data hard to source for B2B climate startups

---

## Framing for the application

The site is Arman's original analytical work on India's climate-tech investment landscape, built using his domain knowledge from deal sourcing at Picus Capital and carbon markets thesis work at NIIF. Every data point is sourced and cited. The daily pipeline keeps it fresh automatically.

The graduation funnel and whitespace heatmap are the analytical centrepieces — they show not just where capital has gone but where it hasn't, and whether early bets are converting. That's the kind of thinking Samara's team does every day.
