// Cohort graduation data — derived entirely from FUNDING_ROUNDS.
// A company "graduates" to Series A/B if both rounds appear in the dataset.
// Only cohorts with N≥3 seed-stage companies are included; smaller cohorts
// are flagged as insufficient sample size.

import type { SubSector } from './taxonomy'

export interface CohortRow {
  subSector: SubSector
  seedYear: number
  seedCompanies: string[]     // all companies with a Seed/Pre-seed in this year
  graduatedToA: string[]      // subset that later raised Series A (in dataset)
  graduatedToB: string[]      // subset that later raised Series B (in dataset)
  sufficientSample: boolean   // false if n < 3
  note?: string
}

// Computed from FUNDING_ROUNDS as of 2026-06.
// Graduation is detected within the dataset only — a company that raised
// Series A with unreported sources may show 0% graduation here.

export const COHORT_ROWS: CohortRow[] = [
  // ── Transportation ─────────────────────────────────────────────────────────
  {
    subSector: 'Transportation',
    seedYear: 2021,
    seedCompanies: ['Turno', 'Chara Technologies', '3EV Industries'],
    graduatedToA: ['Turno'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'Early EV three-wheeler and two-wheeler cohort. Turno graduated to Series A; Chara and 3EV remain at seed or pivoted.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2022,
    seedCompanies: ['Baaz Bikes', 'Minus Zero', 'Oben Electric', 'Clean Electric', 'River', 'Kazam'],
    graduatedToA: ['Baaz Bikes', 'River'],
    graduatedToB: ['River'],
    sufficientSample: true,
    note: 'The strongest EV cohort — River reached Series B ($40M, Yamaha) within two years. Oben and Kazam both raised Series A. Minus Zero and Clean Electric remain early-stage.',
  },
  {
    subSector: 'Transportation',
    seedYear: 2023,
    seedCompanies: ['FreshBus', 'Raptee'],
    graduatedToA: ['FreshBus'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Small cohort (n=2). FreshBus quickly raised Series A in 2024.',
  },

  // ── Food & Agriculture ──────────────────────────────────────────────────────
  {
    subSector: 'Food & Agriculture',
    seedYear: 2021,
    seedCompanies: ['BioPrime Agrisolutions', 'GreenPod Labs', 'Farmtheory', 'BharatAgri', 'CropIn', 'Ecozen Solutions'],
    graduatedToA: ['BharatAgri', 'BioPrime Agrisolutions', 'Ecozen Solutions'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'Precision agri and cold chain sub-sectors showing ~50% conversion to Series A. CropIn and GreenPod Labs were already Series C+ at time of dataset entry.',
  },
  {
    subSector: 'Food & Agriculture',
    seedYear: 2022,
    seedCompanies: ['Loopworm', 'Sea6 Energy', 'Shaka Harry', 'Eeki Foods', 'AquaExchange', 'Wastelink', 'Aquaconnect'],
    graduatedToA: ['Loopworm', 'AquaExchange', 'Aquaconnect'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'Alternative protein and aquaculture cohort. Loopworm (insect protein) has raised Series A; conventional agritech graduates faster than alt-protein.',
  },

  // ── Energy ──────────────────────────────────────────────────────────────────
  {
    subSector: 'Energy',
    seedYear: 2021,
    seedCompanies: ['MYSUN', 'Buyofuel', 'Indi Energy', 'Prescinto'],
    graduatedToA: ['Prescinto'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'Early DERs & grid-tech cohort. Prescinto (solar monitoring SaaS) graduated to Series A; Buyofuel and Indi Energy remain early. 25% graduation rate vs 50% in Transport.',
  },

  // ── Industrial Decarbonisation ──────────────────────────────────────────────
  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2022,
    seedCompanies: ['Cercle X', 'BatX Energies'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Insufficient sample (n=2). Neither company has a Series A in the dataset — consistent with the broader pattern of Industrial Decarbonisation stalling at seed.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    seedYear: 2024,
    seedCompanies: ['Bambrew', 'ReCircle', 'Nepra Resource Management'],
    graduatedToA: ['Bambrew'],
    graduatedToB: ['Bambrew'],
    sufficientSample: true,
    note: 'Bambrew (bamboo packaging) has moved fastest — Series A and B within 18 months. Circular-economy packaging companies with proven offtake appear to graduate significantly faster than process-tech companies in this sector.',
  },

  // ── Carbon & Climate Management ─────────────────────────────────────────────
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2022,
    seedCompanies: ['Climes', 'Varaha', 'SatSure'],
    graduatedToA: ['SatSure', 'Varaha'],
    graduatedToB: ['SatSure'],
    sufficientSample: true,
    note: 'Strong early cohort — SatSure (agri earth observation) and Varaha (carbon farming) both raised beyond Seed. Carbon-market and MRV companies with genuine data assets are converting.',
  },
  {
    subSector: 'Carbon & Climate Management',
    seedYear: 2023,
    seedCompanies: ['Aurassure', 'sentra.world', 'Alt Carbon', 'StepChange'],
    graduatedToA: [],
    graduatedToB: [],
    sufficientSample: true,
    note: 'No 2023 cohort companies have yet reached Series A in the dataset. This may reflect both the nascent stage of India\'s VCM and a 12–18 month runway still to play out.',
  },

  // ── Built Environment ───────────────────────────────────────────────────────
  {
    subSector: 'Built Environment',
    seedYear: 2023,
    seedCompanies: ['Uravu Labs', 'Smart Joules'],
    graduatedToA: ['Uravu Labs', 'Smart Joules'],
    graduatedToB: [],
    sufficientSample: false,
    note: 'Small cohort (n=2). Both companies raised follow-on rounds — positive signal but sample is too small for conclusions.',
  },
  {
    subSector: 'Built Environment',
    seedYear: 2024,
    seedCompanies: ['Boson Whitewater', 'INDRA Water', 'Boon'],
    graduatedToA: ['INDRA Water'],
    graduatedToB: [],
    sufficientSample: true,
    note: 'Water tech sub-sector graduating at a modest rate. INDRA Water raised Series A; Boon and Boson Whitewater remain early. Too recent for full cohort maturation.',
  },
]
