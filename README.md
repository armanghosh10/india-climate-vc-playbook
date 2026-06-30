# India Climate-Tech VC Playbook

An original interactive data product mapping India's climate-tech investment landscape — funding rounds, investor mandates, sector whitespace, and cohort graduation rates, with a daily-updated pipeline and a Claude-powered research chat.

Built by Arman Ghosh as a portfolio artifact for Samara Capital's Digital & AI internship.

---

## What's inside

### Five analytical applets

| Applet | What it shows |
|---|---|
| **Funding Rounds Explorer** | 215 verified India climate-tech rounds (2020–present), filterable by sector, stage, geography, investor, and year |
| **Sector × Tech Whitespace Map** | 6×6 heatmap of funding density (sub-sector × technology type), with emissions context and gap analysis per cell |
| **Investor Map** | 19 tracked funds with climate mandates, stage focus, and ticket sizes; co-investment affinity matrix |
| **Graduation Funnel** | Of India climate-tech Seed cohorts, what % reached Series A or Series B? By sector and year |
| **Research + Reports Chat** | 20 canonical reports (IEA, CPI, McKinsey, RMI, CEEW, BNEF, WRI…) with headline figures, plus a Claude-powered chat grounded on the corpus |

### Daily update pipeline

A GitHub Actions cron runs at 09:00 IST every day. It uses `claude-sonnet-4-6` with `web_search_20250305` to search for newly announced India climate-tech funding rounds, validates each against approved sources (Inc42, Entrackr, YourStory, ET Energy World, Business Standard, Livemint, Mercom), deduplicates against existing data, and opens a PR for human review — it never commits directly to `main`.

---

## Data methodology

**Nothing in this site is hardcoded.** Every funding round, investor mandate, market size figure, and policy date was sourced from a primary or reputed secondary source and carries a citation URL.

### Sources by data type

| Data type | Sources |
|---|---|
| Funding rounds | Inc42, Entrackr, YourStory, ET Energy World, Mercom India, Business Standard, Livemint, BloombergNEF |
| Investor mandates | Fund websites, official press releases, Tracxn public profiles |
| Market/emissions figures | IEA, MNRE, MoEFCC, CEEW, CPI India, NITI Aayog |
| Research reports | IEA, IRENA, BloombergNEF, RMI, WRI, McKinsey, TERI, NITI Aayog, CEEW, CPI, IFC |
| Carbon markets | Verra public registry, CEEW |

### Taxonomy

Six sub-sectors (Energy, Transportation, Food & Agriculture, Industrial Decarbonisation, Carbon & Climate Management, Built Environment) × six technology types × three climate outcomes. Every data point is tagged to this locked taxonomy, enabling the cross-cutting analysis in the whitespace map and graduation funnel.

### What's excluded

- Debt rounds and project finance (DFI debt, green bonds, project bonds) — VC and growth equity only
- Non-India-headquartered companies
- Rounds without a verifiable source URL from an approved outlet
- Estimated or interpolated figures — if a data point couldn't be confirmed, it's left blank

---

## Stack

- **Framework**: Next.js 14 App Router, TypeScript strict mode
- **UI**: Tailwind CSS, shadcn/ui
- **Data**: TypeScript constants in `/lib/data/` — no runtime API calls for data
- **AI**: Anthropic (`claude-sonnet-4-6`) — daily cron and research chat
- **Deploy**: Vercel, auto-deploy on push to `main`
- **Cron**: GitHub Actions at 03:30 UTC (09:00 IST)

---

## Running locally

```bash
npm install
npm run dev
```

For the research chat, you'll need your own Anthropic API key — enter it in the chat panel on the Research + Reports page. The key is stored in `localStorage` and never sent anywhere except directly to the Anthropic API.

---

## Background

This project draws on Arman's deal sourcing experience at Picus Capital and carbon markets thesis work at NIIF. The whitespace heatmap and graduation funnel are the analytical centrepieces — they show not just where India climate-tech capital has gone but where it hasn't, and whether early bets are converting to later stages. The daily pipeline keeps the funding data fresh automatically.

All data verified as of June 2026.
