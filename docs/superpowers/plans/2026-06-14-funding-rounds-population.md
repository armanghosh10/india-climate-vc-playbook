# Funding Rounds Data Population — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate `lib/data/funding-rounds.ts` with 50–100+ verified India climate-tech funding rounds (2020–present), every entry sourced and typed against the locked taxonomy.

**Architecture:** One web search session per sub-sector (6 tasks), each producing typed TypeScript entries. A final assembly task merges all entries, dedupes, validates types compile, and commits. No estimation — if a figure isn't in the source, `amountUsdMn` is `null`.

**Tech Stack:** WebSearch tool, TypeScript strict mode, `lib/data/taxonomy.ts` locked types.

---

## Validation Rules (apply to every entry)

- `sources` must have ≥1 URL from: inc42.com, entrackr.com, yourstory.com, economictimes.indiatimes.com, business-standard.com, livemint.com, mercom.in, bloomberg.com/energy, blnef.com, etenergyworld.com
- `amountUsdMn`: number if stated in source, `null` if undisclosed — never estimated
- `stage`: must be exactly one of `'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+'`
- `subCategory`: must be an exact string from `SUB_CATEGORIES[subSector]` in taxonomy.ts
- `date`: `YYYY-MM` format only
- `company`: use the company's own name as stated in the source (no abbreviations)
- Rounds that appear in multiple sources: use the most detailed source, list all as sources

---

## Task 1: Energy Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run (all of them):**
- `"India solar startup funding" site:inc42.com OR site:entrackr.com 2020 2021 2022 2023 2024 2025`
- `"India renewable energy startup raises" site:economictimes.indiatimes.com`
- `"India energy storage startup funding round"`
- `"India green hydrogen startup investment"`
- `"India distributed energy grid tech funding"`
- `"Mercom India solar startup funding 2023 2024 2025"`
- `"India renewables financing fintech raises"`

**Sub-categories to find rounds for:**
- Renewables development (solar, wind project developers)
- Energy storage (battery storage, BESS)
- DERs & grid tech (rooftop solar aggregators, smart grid, VPPs)
- New energy (green hydrogen, nuclear)
- Renewables financing (green lending, solar finance)

- [ ] **Step 1: Search for Energy rounds (2020–2022)**

Run web searches with queries above filtered to 2020–2022. For each round found, verify:
- Company name, amount, date, stage, lead investor from the source article
- Tag to subSector: `'Energy'`, pick correct subCategory
- Assign techType: project developers → `'Project developer'`, software aggregators → `'Software / SaaS'`, hardware → `'Deep-tech hardware'`, finance → `'Fintech / risk'`
- climateOutcome: almost always `'Mitigation'` for Energy; grid resiliency → `'Enabling infrastructure'`

- [ ] **Step 2: Search for Energy rounds (2023–2026)**

Same queries, filtered to 2023–present. India's energy financing activity accelerated post-2022 — expect more rounds.

- [ ] **Step 3: Write entries to funding-rounds.ts**

Append verified entries using this exact shape:

```typescript
{
  company: 'Amplus Solar',
  subSector: 'Energy',
  subCategory: 'Renewables development',
  techType: 'Project developer',
  climateOutcome: 'Mitigation',
  stage: 'Series B',
  amountUsdMn: 50,
  date: '2021-03',
  city: 'Gurugram',
  geography: 'India-only',
  investors: ['ORIX Corporation'],
  sources: [{ label: 'Inc42', url: 'https://inc42.com/...' }],
},
```

- [ ] **Step 4: Commit Energy entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Energy sub-sector funding rounds (2020–present)"
```

---

## Task 2: Transportation Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run:**
- `"India EV startup funding round" site:inc42.com OR site:entrackr.com`
- `"India electric vehicle raises investment 2022 2023 2024 2025"`
- `"India EV charging startup funding"`
- `"India battery swap startup raises"`
- `"India electric two-wheeler three-wheeler funding"`
- `"India micromobility startup investment"`
- `"India electric bus truck funding"`

**Sub-categories to find rounds for:**
- EV OEMs (Ather, Ola Electric, Euler, Altigreen etc.)
- EV charging & battery swap (Statiq, Battery Smart, Sun Mobility etc.)
- Micromobility (e-cycles, shared mobility)
- Hard-to-abate transport (electric buses, trucks, ships)

- [ ] **Step 1: Search EV OEM rounds (all years)**

Transportation is likely the largest sub-sector by volume. Run all queries. Note: Ola Electric IPO'd — include its pre-IPO VC rounds only (Series A through pre-IPO).

- [ ] **Step 2: Search EV charging + battery swap rounds**

Separate search pass for charging infrastructure companies.

- [ ] **Step 3: Search micromobility + hard-to-abate**

Smaller category — fewer results expected.

- [ ] **Step 4: Write and commit Transportation entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Transportation sub-sector funding rounds (2020–present)"
```

---

## Task 3: Food & Agriculture Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run:**
- `"India agritech climate startup funding" site:inc42.com OR site:yourstory.com`
- `"India food waste startup raises investment"`
- `"India precision agriculture startup funding round"`
- `"India alternative protein startup investment"`
- `"India sustainable agriculture inputs funding"`
- `"India indoor vertical farming startup raises"`
- `"India agritech supply chain funding 2022 2023 2024"`

**Sub-categories to find rounds for:**
- Food waste & supply chain (cold chain, food loss reduction)
- Crop yield & precision agri (AI agri, drone spraying, soil sensors)
- Sustainable inputs (bio-pesticides, biofertilisers)
- Alternative protein (plant-based, cultivated meat, insect protein)
- Indoor farming (vertical farms, controlled environment)

**Important:** Only include companies where climate impact is the primary value proposition, not general agritech (e.g., a farmer credit app is not climate-tech; a drone crop monitoring service that reduces input use is).

- [ ] **Step 1: Search Food & Agriculture rounds**

Run all queries. Be selective — apply the climate relevance filter above strictly.

- [ ] **Step 2: Write and commit Food & Agriculture entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Food & Agriculture sub-sector funding rounds (2020–present)"
```

---

## Task 4: Industrial Decarbonisation Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run:**
- `"India battery recycling startup funding round"`
- `"India green chemicals startup raises investment"`
- `"India waste management recycling startup funding" site:inc42.com`
- `"India carbon capture startup investment"`
- `"India green cement concrete startup funding"`
- `"India industrial decarbonisation startup raises"`
- `"India synthetic biology startup funding"`

**Sub-categories to find rounds for:**
- Battery recycling (Li-ion recycling, second-life batteries)
- Green chemicals & synthetic biology
- Waste & recycling (plastic waste, e-waste, industrial waste)
- Carbon capture & concrete (DAC, low-carbon cement, concrete)

**Note:** This sub-sector is nascent in India — expect fewer rounds. Do not pad with tangential companies.

- [ ] **Step 1: Search Industrial Decarbonisation rounds**

Run all queries. Fewer results expected — that itself is a data point.

- [ ] **Step 2: Write and commit Industrial Decarbonisation entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Industrial Decarbonisation sub-sector funding rounds (2020–present)"
```

---

## Task 5: Carbon & Climate Management Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run:**
- `"India carbon credits startup funding" site:inc42.com OR site:yourstory.com`
- `"India MRV earth observation climate startup raises"`
- `"India sustainability reporting ESG startup funding"`
- `"India carbon market offset startup investment"`
- `"India carbon removal startup raises"`
- `"India parametric insurance climate startup funding"`
- `"India climate risk analytics startup investment"`

**Sub-categories to find rounds for:**
- Earth observation & MRV (satellite, drone-based monitoring)
- Sustainability reporting (ESG data, scope 3 tracking)
- Carbon markets & offsets (VCM platforms, project aggregators)
- Carbon removal (biochar, enhanced weathering)
- Parametric climate insurance (weather index insurance, crop insurance tech)

- [ ] **Step 1: Search Carbon & Climate Management rounds**

Run all queries. This sub-sector is emerging — cross-check any carbon credit companies against Verra/Gold Standard registries to confirm they are real project developers.

- [ ] **Step 2: Write and commit Carbon & Climate Management entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Carbon & Climate Management sub-sector funding rounds (2020–present)"
```

---

## Task 6: Built Environment Sub-sector

**Files:**
- Modify: `lib/data/funding-rounds.ts` (append entries)

**Search queries to run:**
- `"India green building materials startup funding"`
- `"India building energy efficiency startup raises"`
- `"India green real estate finance startup investment"`
- `"India water wastewater startup funding round" site:inc42.com`
- `"India smart buildings startup funding"`
- `"India sustainable construction startup investment"`

**Sub-categories to find rounds for:**
- Green construction materials (low-carbon cement, bamboo, recycled materials)
- Building energy efficiency (BMS, HVAC optimisation, retrofits)
- Green real estate finance (green mortgages, PACE financing)
- Water & wastewater (treatment tech, water recycling)

- [ ] **Step 1: Search Built Environment rounds**

Run all queries.

- [ ] **Step 2: Write and commit Built Environment entries**

```bash
git add lib/data/funding-rounds.ts
git commit -m "data: add Built Environment sub-sector funding rounds (2020–present)"
```

---

## Task 7: Final Assembly, Deduplication & Type Check

**Files:**
- Modify: `lib/data/funding-rounds.ts` (final review)
- Modify: `lib/data/covered-companies.json` (populate dedup list)

- [ ] **Step 1: Deduplicate**

Scan `FUNDING_ROUNDS` for:
- Same company appearing twice with the same date (remove duplicate)
- Same company with rounds ≤3 months apart (keep both only if stages differ — e.g., Seed + bridge)
- Name inconsistencies (e.g., "Ola Electric" vs "Ola Electric Mobility") — standardise to the company's legal/brand name

- [ ] **Step 2: Run TypeScript build to verify no type errors**

```bash
npm run build
```

Expected: clean build, no type errors. If errors appear, fix field values to match taxonomy union types exactly.

- [ ] **Step 3: Populate covered-companies.json**

Extract all unique company names from `FUNDING_ROUNDS` and write to `lib/data/covered-companies.json`:

```json
["Ather Energy", "Battery Smart", "Climes", ...]
```

This is the dedup list the daily cron uses.

- [ ] **Step 4: Final commit**

```bash
git add lib/data/funding-rounds.ts lib/data/covered-companies.json
git commit -m "data: final dedup pass + covered-companies.json for cron dedup

Closes #1"
```

- [ ] **Step 5: Push and verify**

```bash
git push origin main
```

Vercel will auto-deploy. Verify the live site at https://climate-vc-handbook.vercel.app — funding explorer stub page should still load (no data wired to UI yet, that's the next issue).

---

## Self-Review

**Spec coverage:**
- ✓ All 6 sub-sectors covered with dedicated search tasks
- ✓ All taxonomy fields mapped in entry template
- ✓ Source validation rules stated per task
- ✓ `covered-companies.json` populated in Task 7
- ✓ TypeScript build verification in Task 7
- ✓ GitHub issue #1 closed in final commit

**Gaps:** None. The `whitespace.ts` and `cohorts.ts` derivations are downstream and intentionally deferred to the next plan.

**Type consistency:** Entry shape in Task 1 matches `FundingRound` interface in `lib/data/funding-rounds.ts` exactly. All subsequent tasks use the same shape.
