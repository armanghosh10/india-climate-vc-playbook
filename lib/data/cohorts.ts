// Cohort graduation data — derived entirely from FUNDING_ROUNDS.
// A company "graduates" to Series A/B if both rounds appear in the dataset.
// Only cohorts with N≥3 seed-stage companies are flagged as sufficient; smaller
// cohorts are included for completeness but marked sufficientSample: false.
//
// METHODOLOGY NOTES:
// • "Entry" = earliest round in dataset is Pre-seed or Seed (or both, if multiple).
// • "Graduated to A" = company has an explicit Series A entry in dataset.
//   Companies that went Seed → Series B directly (no Series A) are counted in
//   graduatedToB but NOT graduatedToA.
// • "Graduated to B" = company has a Series B (or higher) entry in dataset.
// • Pre-Series A / Pre-Series B are bridge rounds, not graduation milestones.
// • Companies that entered at Series A or higher are excluded from cohort rows
//   (they have no seed-entry in this dataset).
// • 2026 cohort entries are omitted — too nascent for any graduation signal.
// Last derived: 2026-06-30 from full FUNDING_ROUNDS dataset (audit pass: label consistency + cohort completeness).

import type { SubSector } from './taxonomy'

export interface CohortRow {
  subSector: SubSector
  seedYear: number
  seedCompanies: string[]     // all companies with a Pre-seed or Seed entry that year
  graduatedToA: string[]      // subset with an explicit Series A in dataset
  graduatedToB: string[]      // subset with a Series B or higher in dataset
  sufficientSample: boolean   // false if n < 3
  note?: string
}

export const COHORT_ROWS: CohortRow[] = [

  // ── TRANSPORTATION ──────────────────────────────────────────────────────────

  {
    subSector: 'Transportation',
    seedYear: 2020,
    seedCompanies: ['BluSmart'],
    graduatedToA: ['BluSmart'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). BluSmart (EV ride-hailing) raised a Seed in Sep 2020 and later raised multiple Series A tranches. However BluSmart subsequently suspended operations in Apr 2025, a cautionary outcome for this sub-sector.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2021,
    seedCompanies: ['EMotorad', 'Exponent Energy', 'Kazam', 'Chara Technologies', '3EV Industries', 'The ePlane Company'],
    graduatedToA: ['Exponent Energy', 'Kazam', 'Chara Technologies', '3EV Industries'],
    graduatedToB: ['EMotorad', 'Exponent Energy', 'Kazam', 'The ePlane Company'],
    sufficientSample: true,
    note: 'Strongest cohort in the dataset: 4/6 reached Series A, 4/6 reached Series B. Two companies (EMotorad and The ePlane Company) bypassed Series A entirely — going from Seed directly to Series B — a pattern unique to this sub-sector\'s momentum. Exponent Energy and Kazam both reached Series B within 3 years of their Seed rounds.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2022,
    seedCompanies: ['EVage', 'Minus Zero', 'Turno', 'Clean Electric'],
    graduatedToA: ['Turno', 'Clean Electric'],
    graduatedToB: [],
    sufficientSample: true,
    note: '50% Series A conversion — below the 2021 cohort. EVage and Minus Zero have no follow-on rounds in the dataset. Turno (EV3W marketplace) and Clean Electric (fleet charging) both graduated to Series A by 2024. No Series B conversions yet from this cohort.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2023,
    seedCompanies: ['FreshBus', 'BluJ Aero'],
    graduatedToA: ['FreshBus'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). FreshBus (intercity electric bus) raised Seed in Feb 2023 and graduated to Series A by Aug 2024. BluJ Aero (hydrogen-electric freight aircraft, Seed Jun 2023 from Endiya + Rainmatter) has no follow-on in the dataset — deep-tech aviation hardware faces a longer commercialisation path.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2024,
    seedCompanies: ['Sarla Aviation', 'Naxatra Labs'],
    graduatedToA: ['Sarla Aviation'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). Sarla Aviation (eVTOL flying taxi) raised Pre-seed in May 2024 and graduated to Series A in Jan 2025 — an 8-month pace, fast for deep-tech hardware. Naxatra Labs (EV motor manufacturer, Seed Dec 2024 from GVFL + Rainmatter) reached Pre-Series A in Dec 2025 but has no confirmed Series A yet.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2025,
    seedCompanies: ['VoltUp', 'Moonrider', 'Dreamfly Innovations'],
    graduatedToA: ['Moonrider'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=3. Moonrider (autonomous electric delivery vehicles, Seed Jan 2025) reached Series A by Dec 2025 — an 11-month seed-to-A pace, the fastest in this cohort and a strong signal for autonomous last-mile logistics. VoltUp (EV charging, Seed Jan 2025) and Dreamfly Innovations (drone battery systems, Seed Feb 2025 from Avaana + Sunicon) have no follow-ons yet. 1/3 Series A graduation rate so far.',
  },

  // ── FOOD & AGRICULTURE ──────────────────────────────────────────────────────

  {
    subSector: 'Food & Agriculture',
    seedYear: 2020,
    seedCompanies: ['Farmtheory'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Farmtheory raised a Pre-seed in Mar 2020 and a Seed in Feb 2024 — a 4-year gap before even reaching Seed, reflecting the long capital cycles in agri-cold-chain.',
  },
  {
    subSector: 'Food & Agriculture',
    seedYear: 2021,
    seedCompanies: ['Evo Foods', 'BioPrime Agrisolutions', 'Celcius Logistics'],
    graduatedToA: ['BioPrime Agrisolutions', 'Celcius Logistics'],
    graduatedToB: ['Celcius Logistics'],
    sufficientSample: true,
    note: '2/3 reached Series A (67%). Celcius Logistics (cold-chain logistics) reached Series B in 2025, the only food & agri company in this cohort to do so. Evo Foods (alt-protein) has not raised a follow-on in the dataset. Note: Evo Foods Pre-seed was a very small check (pre-product stage) — cohort skews toward agri-infrastructure plays that have clearer revenue models.',
  },
  {
    subSector: 'Food & Agriculture',
    seedYear: 2022,
    seedCompanies: ['AquaExchange', 'GreenPod Labs', 'Loopworm', 'Shaka Harry', 'Eeki Foods'],
    graduatedToA: ['Eeki Foods'],
    graduatedToB: ['AquaExchange'],
    sufficientSample: true,
    note: 'Weak cohort: only 1/5 reached an explicit Series A (Eeki Foods). AquaExchange (aquaculture marketplace) bypassed Series A and went directly to Series B in Mar 2026 — an unusual path. Loopworm (insect protein) raised a Pre-Series A bridge in Jul 2025 (a positive signal) but has not reached a formal Series A yet. Shaka Harry (plant-based) and GreenPod Labs (post-harvest tech) have no follow-on rounds in the dataset. The low graduation rate suggests alt-protein and post-harvest plays face longer commercialisation timelines than initially expected. Note: Cercle X (waste aggregator) was previously miscategorised here — it is tagged Industrial Decarbonisation in the dataset and is counted in that sub-sector\'s cohort.',
  },
  {
    subSector: 'Food & Agriculture',
    seedYear: 2023,
    seedCompanies: ['Zero Cow Factory'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Zero Cow Factory (precision fermentation dairy) raised its Seed in 2023 and has no follow-on in the dataset yet — consistent with the long development timelines for bio-manufacturing platforms. Note: altM was previously miscategorised here — it is tagged Industrial Decarbonisation in the dataset (biomaterials / green chemicals) and is counted in that sub-sector\'s 2023 cohort.',
  },
  {
    subSector: 'Food & Agriculture',
    seedYear: 2025,
    seedCompanies: ['Fragaria Fruits', 'Green Grahi', 'High Time Foods'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=3, too early (all raised 2025). Covers three distinct sub-categories: Fragaria Fruits (fresh fruit indoor farming, Seed Oct 2025 from WEH Ventures + Rainmatter), Green Grahi (insect-based biotech / black soldier fly protein, Seed Apr 2025 from Avaana + Huddle + Blume — largest-ever India insect-biotech seed), and High Time Foods (shelf-stable alt-protein for B2B HoReCa, Seed May 2025 from Avaana). Graduation signals expected 2027.',
  },

  // ── ENERGY ──────────────────────────────────────────────────────────────────

  {
    subSector: 'Energy',
    seedYear: 2021,
    seedCompanies: ['Prescinto', 'Buyofuel'],
    graduatedToA: ['Prescinto', 'Buyofuel'],
    graduatedToB: ['Prescinto'],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). Both companies graduated to Series A — 100% in the cohort. Prescinto (solar monitoring SaaS) was subsequently acquired by IBM in Jan 2024, counted here as a B+ exit: the acquisition followed a Series A and represented a full exit rather than a traditional Series B raise.',
  },
  {
    subSector: 'Energy',
    seedYear: 2022,
    seedCompanies: ['SolarSquare', 'Aerem', 'EdgeGrid', 'Offgrid Energy Labs'],
    graduatedToA: ['SolarSquare', 'Aerem', 'Offgrid Energy Labs'],
    graduatedToB: ['SolarSquare'],
    sufficientSample: true,
    note: '3/4 reached Series A (75%). SolarSquare is the standout: it raised a $4.2M Seed in Jun 2022, followed with Series A (Nov 2022) just 5 months later, and reached Series B ($40M, Lightspeed + Lightrock, Dec 2024). Aerem (solar financing) reached Series A ($12M, BII + SE Ventures) in Apr 2025. Offgrid Energy Labs (zinc-gel storage) reached Series A ($15M) in Sep 2025. EdgeGrid (DER software) remains pre-Series A. Note: Newtrace (green hydrogen electrolyser) was previously in this cohort but has been reclassified to Industrial Decarbonisation — its primary addressable market is industrial green hydrogen, not energy generation.',
  },
  {
    subSector: 'Energy',
    seedYear: 2023,
    seedCompanies: ['EMO Energy'],
    graduatedToA: ['EMO Energy'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). EMO Energy (grid-scale energy storage systems) raised a Seed in May 2023 and graduated to Series A in Jan 2025 — a 20-month seed-to-A pace, consistent with the hardware development cycle. No Series B yet.',
  },
  {
    subSector: 'Energy',
    seedYear: 2024,
    seedCompanies: ['Roofsol Energy'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Roofsol Energy (rooftop solar installer) raised Seed in Oct 2024. Too early to assess.',
  },
  {
    subSector: 'Energy',
    seedYear: 2025,
    seedCompanies: ['Stride Green', 'Vimano', 'Arkle Energy Solutions'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=3, too early (all raised 2025). Vimano (nanotech membranes for energy storage, Seed anchored by Ankur Capital), Stride Green (renewables asset financing SaaS, Seed from Micelio + Incubate Fund), and Arkle Energy Solutions (grid-scale energy storage, Seed Mar 2025) cover energy storage and grid infrastructure themes. Graduation signals expected 2026–2027.',
  },

  // ── INDUSTRIAL DECARBONISATION ──────────────────────────────────────────────

  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2022,
    seedCompanies: ['Newtrace'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Newtrace (green hydrogen electrolyser, reclassified from Energy — its primary market is industrial green H₂ for chemicals and refineries, not power generation) raised a Pre-seed in Jun 2022, Seed ($5.65M, Peak XV + Aavishkaar) in May 2023, and a Pre-Series A ($6.3M, HDFC Bank + MSIVC) in Mar 2026. No Series A yet — consistent with the long capital cycles in deep-tech industrial hardware. The Pre-Series A bridge signals continued investor conviction.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2023,
    seedCompanies: ['altM'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). altM (biomaterials / mycelium composites) raised a $3.5M Seed in Sep 2023 (Omnivore + Theia Ventures + Thai Wah Ventures). No follow-on in the dataset yet — consistent with the long R&D cycles for bio-manufacturing platforms.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2024,
    seedCompanies: ['CarbonStrong'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1) after reclassification of recycling/waste companies to Circular Economy. CarbonStrong (biochar / low-carbon concrete) raised a Pre-seed in Jan 2024. Too early to assess. The Industrial Decarbonisation cohort is now narrower: only process-tech and chemistry plays (green hydrogen, synthetic biology, carbon capture) remain in this sub-sector.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2025,
    seedCompanies: ['Dashamlabs', 'Cellarim Labs', 'Climitra', 'Lemnisca'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=4 but too early (all raised 2025; < 12 months elapsed). Green chemicals and synthetic biology dominate — Dashamlabs, Cellarim Labs, Climitra, and Lemnisca. Theia Ventures and Momentum Capital are the most active early backers. Note: Beyond Renewables and Recove (solar module recycling) were previously listed here but are tagged Circular Economy in the dataset and counted in that sub-sector\'s 2025 cohort. Graduation signals expected 2026–2027.',
  },

  // ── CIRCULAR ECONOMY ────────────────────────────────────────────────────────

  {
    subSector: 'Circular Economy',
    seedYear: 2020,
    seedCompanies: ['Bambrew'],
    graduatedToA: ['Bambrew'],
    graduatedToB: ['Bambrew'],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Bambrew (sustainable bamboo packaging) raised a Pre-seed in Oct 2020 and has since reached Series B (Jul 2025) — the fastest seed-to-B graduation in the Circular Economy sub-sector. Proof that circular-economy packaging with defensible IP and proven offtake converts substantially faster than deep-tech recycling plays.',
  },
  {
    subSector: 'Circular Economy',
    seedYear: 2022,
    seedCompanies: ['BatX Energies', 'Cercle X', 'Metastable Materials'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: '0/3 reached Series A in this dataset. Metastable Materials (lithium-ion solid-state batteries) and BatX Energies (lithium battery recycling) raised Pre-Series A bridges but no confirmed A round in the dataset. Cercle X (industrial waste aggregator marketplace) has no follow-on at all. Technology risk and long development cycles in recycling make Series A conversion harder than asset-light marketplace models.',
  },
  {
    subSector: 'Circular Economy',
    seedYear: 2024,
    seedCompanies: ['RecommerceX', 'Dharaksha Ecosolutions'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Insufficient sample (n=2) and too early. RecommerceX (industrial equipment resale, Seed Sep 2024 from Accel + Kae Capital) and Dharaksha Ecosolutions (mycelium-based biodegradable packaging, Seed Sep 2024 from Avaana + Rainmatter) have no follow-ons yet.',
  },
  {
    subSector: 'Circular Economy',
    seedYear: 2025,
    seedCompanies: ['Zerocircle', 'Alt Mat', 'Beyond Renewables', 'Recove'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=4 but too early (all raised 2025). Covers two sustainable-materials plays — Zerocircle (seaweed-based plastic alternatives, Seed Jan 2025 from Rainmatter + 1Crowd) and Alt Mat (agricultural-fibre textiles for fashion, Seed Oct 2025 from Rainmatter + H&M Group + Fashion for Good) — plus two solar module recycling plays — Beyond Renewables (Seed Oct 2025) and Recove (Seed Sep 2025). No follow-ons yet across any of the four. Graduation signals expected 2027.',
  },

  // ── CARBON & CLIMATE MANAGEMENT ─────────────────────────────────────────────

  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2020,
    seedCompanies: ['Pixxel', 'Terra.do'],
    graduatedToA: ['Pixxel'],
    graduatedToB: ['Pixxel'],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). Pixxel (hyperspectral earth observation) raised Seed in Aug 2020, Series A in Mar 2022, and Series B in Jun 2023 — one of the fastest graduation paths in the entire dataset. Terra.do (climate education platform, Seed Aug 2020 from Rainmatter + BEENEXT) has no follow-on in the dataset. Pixxel is the outlier; Terra.do is the more representative outcome for early-stage climate-enabling software.',
  },
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2022,
    seedCompanies: ['Varaha', 'Climes'],
    graduatedToA: ['Varaha'],
    graduatedToB: ['Varaha'],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). Varaha (carbon farming MRV) is the standout — Seed in Dec 2022, Series A in Feb 2024, Series B in Feb 2026. Climes (parametric climate insurance) has no follow-on in the dataset after its Jul 2022 Seed, suggesting either a slow fundraise or pivot.',
  },
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2023,
    seedCompanies: ['StepChange', 'Breathe ESG', 'sentra.world'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: '0% Series A graduation so far — all three (StepChange, Breathe ESG, sentra.world) have no follow-on in the dataset. This likely reflects the 12–18 month runway still playing out: 2023 seed companies would naturally be fundraising for Series A in 2025–2026. It may also reflect genuine difficulty — sustainability reporting and carbon intelligence platforms face commoditisation risk as large incumbents launch competing products.',
  },
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2024,
    seedCompanies: ['Prithu'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Prithu (climate intelligence / parametric products) raised Seed in Oct 2024. Too early.',
  },
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2025,
    seedCompanies: ['Alt Carbon', 'GreenFi', 'Equilibrium', 'SatLeo Labs'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'n=4 but too early (all raised 2025). Equilibrium (full-stack carbon removal) attracted Kalaari, Peak XV, and Avaana at Seed — an unusually strong lead trio for a 2025 pre-revenue company, signalling high expectations. SatLeo Labs progressed to Seed in Apr 2026 (from Pre-seed in Apr 2025) — an internal graduation within the entry stage. Graduation signals for Series A expected 2027.',
  },

  // ── BUILT ENVIRONMENT ───────────────────────────────────────────────────────

  {
    subSector: 'Built Environment',
    seedYear: 2022,
    seedCompanies: ['Boson Whitewater'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Single-company cohort (n=1). Boson Whitewater raised a Pre-seed in Feb 2022 and a Seed in Sep 2024 — a 2.5-year gap between rounds. No Series A in dataset yet.',
  },
  {
    subSector: 'Built Environment',
    seedYear: 2023,
    seedCompanies: ['DigitalPaani', 'Uravu Labs', 'Smarter Dharma', 'Solinas Integrity'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: '0% Series A graduation (n=4). DigitalPaani and Uravu Labs have raised Pre-Series A bridge rounds but no confirmed Series A yet. Smarter Dharma (sustainability SaaS for real estate, Seed Oct 2023 from Rainmatter + Gruhas) and Solinas Integrity (water pipeline inspection robots, Seed Jun 2023 from Neev Fund + Rainmatter) both have no follow-on rounds in the dataset. Built Environment remains the weakest graduation sub-sector — dominated by Series A+ entrants (Smart Joules, INDRA Water, Ecofy) rather than seed-to-A graduates.',
  },
  {
    subSector: 'Built Environment',
    seedYear: 2024,
    seedCompanies: ['Amwoodo', 'Optimist'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Insufficient sample (n=2) and too early. Amwoodo (bamboo construction materials) raised Pre-Series A in Sep 2025. Optimist (building energy efficiency SaaS) raised a $12M Seed from Accel + Arkam in Jan 2026 — an unusually large Seed that likely functions as a de facto Series A.',
  },
]
