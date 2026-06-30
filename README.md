# India Climate-Tech VC Playbook

An original interactive data product mapping India's climate-tech investment landscape — 280+ verified funding rounds, investor mandates, sector whitespace, cohort graduation rates, and a daily-updated pipeline, with a Claude-powered research chat.

Built by Arman Ghosh as a portfolio artifact for Samara Capital's Digital & AI internship. Draws on deal sourcing experience at Picus Capital and carbon markets thesis work at NIIF.

**Live site**: [climate-vc-handbook.vercel.app](https://climate-vc-handbook.vercel.app)

---

## What's inside

### Five analytical applets

| Applet | Route | What it shows |
|---|---|---|
| **Funding Rounds Explorer** | `/applets/funding-explorer` | 280+ verified India climate-tech rounds (2020–present), filterable by sector, stage, city, investor, year, and tech type |
| **Sector × Tech Whitespace Map** | `/applets/whitespace-map` | 7×5 heatmap of funding density (sub-sector × technology type), with unique market context and gap analysis for each of the 35 cells |
| **Investor Map** | `/applets/investor-map` | 420+ investors in the dataset; 55+ institutionally-profiled funds with climate mandates, stage focus, and ticket sizes; co-investment affinity matrix |
| **Graduation Funnel** | `/applets/graduation-funnel` | Of India climate-tech Seed cohorts, what % reached Series A or Series B? By sector and year, with sample-size caveats |
| **Research + Reports Chat** | `/applets/research` | 20 canonical reports (IEA, CPI, McKinsey, RMI, CEEW, BNEF, WRI…) with headline figures, plus a Claude-powered chat grounded on the corpus |

### Daily update pipeline

A GitHub Actions cron runs at 09:00 IST every day. It uses `claude-sonnet-4-6` with `web_search_20250305` to search for newly announced India climate-tech funding rounds across seven query patterns, validates each against approved sources, deduplicates against existing data, and opens a PR for human review — it never commits directly to `main`.

---

## Data methodology

**Nothing in this site is hardcoded.** Every funding round, investor mandate, market size figure, and policy date was sourced from a primary or reputed secondary source and carries a citation URL.

### Sources by data type

| Data type | Sources |
|---|---|
| Funding rounds | Inc42, Entrackr, YourStory, ET Energy World, Mercom India, Business Standard, Livemint, BloombergNEF India |
| Investor mandates | Fund websites, official press releases, Tracxn public profiles, Crunchbase public data |
| Market & emissions figures | IEA, MNRE, MoEFCC, CEEW, CPI India, NITI Aayog, BEE, NABARD |
| Research reports | IEA, IRENA, BloombergNEF, RMI India, WRI India, McKinsey, Bain, TERI, NITI Aayog, CEEW, CPI, IFC |
| Carbon markets | Verra public registry, Gold Standard, CEEW, IETA |

### Taxonomy

Seven sub-sectors × five technology types × three climate outcomes. Every funding round is tagged to this locked taxonomy, enabling the cross-cutting analysis in the whitespace map and graduation funnel.

**Sub-sectors**: Energy · Transportation · Food & Agriculture · Industrial Decarbonisation · Carbon & Climate Management · Built Environment · Circular Economy

**Technology types**: Software / SaaS · Marketplace · Hardware & Industry · Project Development · Fintech

**Climate outcomes**: Mitigation · Adaptation · Enabling infrastructure

### What's excluded

- Debt rounds, project finance, and green bonds — VC and growth equity only
- Non-India-headquartered companies
- Rounds without a verifiable source URL from an approved outlet
- Estimated or interpolated figures — if a data point couldn't be confirmed from a primary source, it's left blank or marked unavailable

---

## Stack

- **Framework**: Next.js 14 App Router, TypeScript strict mode
- **UI**: Tailwind CSS, Recharts, Framer Motion
- **Data**: TypeScript constants in `/lib/data/` — no runtime API calls for data; all figures sourced and cited at the entry level
- **AI**: Anthropic `claude-sonnet-4-6` — daily cron (web search + round validation) and research chat (corpus Q&A)
- **Deploy**: Vercel, auto-deploy on push to `main`
- **Cron**: GitHub Actions at 03:30 UTC (09:00 IST) daily

---

## Running locally

```bash
npm install
npm run dev
```

For the research chat, enter your own Anthropic API key in the chat panel on the Research + Reports page. The key is stored in `localStorage` only and never leaves your browser except in direct calls to the Anthropic API.

---

## Key analytical findings

- **Whitespace**: 19 of 35 sector × tech-type cells have zero funded companies. Industrial Decarbonisation Software (0 rounds against ~950 MtCO2e of emissions) and Built Environment Fintech (0 green mortgage products in a Rs 28T mortgage market) are the sharpest gaps.
- **Concentration**: Three sub-sectors — Energy, Transportation, and Food & Agriculture — account for ~80% of disclosed capital deployed. Industrial Decarbonisation, Circular Economy, and Built Environment are structurally underfunded relative to their emissions footprints.
- **Stage gap**: Graduation rates from Seed to Series A vary significantly by sub-sector. Carbon & Climate Management and Built Environment show near-zero conversion, suggesting either a pipeline too new to have graduated or structural misalignment between VC return profiles and project timelines.
- **Investor structure**: Dedicated climate funds (Omnivore, Avaana, Transition VC, Theia) anchor the seed layer. International DFIs and growth funds (BII, IFC, Lightrock, Nuveen, NIIF India-Japan Fund) write the Series B+ cheques. No large domestic Indian multi-stage fund has made climate tech a primary vertical.

---

## File structure

```
lib/data/
  taxonomy.ts           Locked sub-sector, tech-type, and outcome values
  funding-rounds.ts     280+ verified rounds with source URLs
  investors.ts          55+ enrichment profiles for institutional investors
  whitespace.ts         Market/emissions context per cell; gap notes
  cohorts.ts            Seed cohort graduation data derived from rounds
  reports.ts            20-report research corpus with headline figures
  auto-rounds.json      Daily cron output (human-reviewed before merge)
  covered-companies.json Deduplication list for the cron

app/applets/
  funding-explorer/     Filterable rounds table
  whitespace-map/       Sector × tech heatmap with gap analysis
  investor-map/         Investor cards, profiles, co-invest matrix
  graduation-funnel/    Cohort conversion rates
  research/             Report corpus + Claude chat

scripts/
  daily-update.mjs      Daily cron: search → validate → PR

.github/workflows/
  daily-update.yml      GitHub Actions schedule (03:30 UTC)
```

---

*All data verified as of June 2026. Built with [Claude Code](https://claude.ai/code).*
