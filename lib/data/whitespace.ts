import type { SubSector, TechType } from './taxonomy'

// Market/emissions context per sub-sector — sourced figures for gap analysis.
// Funding density is computed live from FUNDING_ROUNDS in the applet.

export interface SectorContext {
  subSector: SubSector
  emissionsDescr: string
  marketDescr: string
  sources: { label: string; url: string }[]
}

export const SECTOR_CONTEXTS: SectorContext[] = [
  {
    subSector: 'Energy',
    emissionsDescr:
      "India's power sector emits ~1.1 GtCO2e annually — the single largest source, accounting for ~35% of national GHG inventory. Coal still supplies 72% of electricity generation.",
    marketDescr:
      "India targets 500 GW of non-fossil capacity by 2030. The annual renewable energy investment need is estimated at $150–170B over the decade (IEA India 2021). The C&I solar segment alone is a $20B+ opportunity.",
    sources: [
      { label: 'IEA India 2021', url: 'https://www.iea.org/reports/india-energy-outlook-2021' },
      { label: 'MNRE Annual Report 2023-24', url: 'https://mnre.gov.in/annual-report/' },
    ],
  },
  {
    subSector: 'Transportation',
    emissionsDescr:
      "Transport accounts for ~14% of India's total GHG emissions (~340 MtCO2e). Road transport dominates; aviation and shipping are growing fast. India had 326M registered vehicles as of 2022.",
    marketDescr:
      "EV penetration targets: 30% of private cars, 70% of commercial vehicles, 80% of two/three-wheelers by 2030 (NITI Aayog). EV market projected at $100B+ by 2030. Charging infrastructure investment need: $2.5B by 2025.",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'NITI Aayog EV Report', url: 'https://www.niti.gov.in/sites/default/files/2022-06/EV-Report_0.pdf' },
    ],
  },
  {
    subSector: 'Food & Agriculture',
    emissionsDescr:
      "Agriculture (incl. livestock and land use) is India's second-largest GHG source — ~620 MtCO2e or 20% of national emissions. Paddy cultivation and ruminant livestock dominate.",
    marketDescr:
      "India's agri sector is a $400B economy. Food loss and waste costs ~$14B annually (FAO). Precision agri addressable market estimated at $24B by 2025 across Asia (CEEW 2022).",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'CEEW India Food Waste 2022', url: 'https://www.ceew.in/publications/tackling-indias-food-loss-and-waste' },
    ],
  },
  {
    subSector: 'Industrial Decarbonisation',
    emissionsDescr:
      "Industry accounts for ~35% of India's total GHG emissions (~950 MtCO2e). Steel, cement, and chemicals are the hardest to abate, together responsible for ~60% of industrial emissions.",
    marketDescr:
      "India's green hydrogen target is 5 Mt/year by 2030. Green steel transition alone would require $100B+ of investment. The Indian EPR (Extended Producer Responsibility) market for plastic recycling is valued at $10B+.",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'CPI India Green Hydrogen', url: 'https://www.climatepolicyinitiative.org/publication/financing-indias-green-hydrogen-ambition/' },
    ],
  },
  {
    subSector: 'Carbon & Climate Management',
    emissionsDescr:
      "India's VCM opportunity is immense: CEEW estimates 100–200 MtCO2e of annual offsets could be generated from land use and forestry alone. India is the third-largest country by VCM project count on Verra.",
    marketDescr:
      "India's voluntary carbon market could be worth $2.5–5B annually by 2030. The domestic carbon credit trading scheme (announced 2022 under Energy Conservation Amendment Act) is still in design.",
    sources: [
      { label: 'CEEW Carbon Markets Report 2023', url: 'https://www.ceew.in/publications/india-voluntary-carbon-market' },
      { label: 'Verra Registry India Projects', url: 'https://registry.verra.org/' },
    ],
  },
  {
    subSector: 'Built Environment',
    emissionsDescr:
      "Buildings account for ~30% of India's total electricity consumption and ~300 MtCO2e of emissions. India adds the equivalent of a Chicago every year in built area — what gets built now locks in decades of energy use.",
    marketDescr:
      "India's green building market is estimated at $35–50B by 2025 (CII-ITC). Water stress affects 600M Indians; the water treatment and recycling market is $3B+ and growing at 8% annually.",
    sources: [
      { label: 'BEE Building Sector Report 2022', url: 'https://beeindia.gov.in/content/building-sector' },
      { label: 'NITI Aayog Water Report 2019', url: 'https://niti.gov.in/sites/default/files/2019-08/CWMI-2.0-latest.pdf' },
    ],
  },
]

// Gap notes for specific sector × tech-type combinations that are visibly underfunded
// relative to the problem size. These appear in the cell detail panel.

export interface GapNote {
  subSector: SubSector
  techType: TechType
  note: string
}

export const GAP_NOTES: GapNote[] = [
  {
    subSector: 'Industrial Decarbonisation',
    techType: 'Software / SaaS',
    note: 'Zero VC-backed rounds in industrial process optimisation software vs. a $950 MtCO2e emissions base. This cell is genuinely empty.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    techType: 'Deep-tech hardware',
    note: 'No funded India startup in electrolyser tech, green-steel DRI, or DAC hardware — all critical to abating India\'s hard-to-decarbonise industrial base.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    techType: 'Project developer',
    note: 'No VC-backed project developer for green industrial processes in this dataset. Capital comes from strategic/DFI sources (OPIC, IFC) rather than VC.',
  },
  {
    subSector: 'Carbon & Climate Management',
    techType: 'Manufacturing / industrials',
    note: 'No funded India startup doing physical carbon removal hardware (DAC, enhanced weathering equipment). The Carbon Removal sub-category is all software-mediated.',
  },
  {
    subSector: 'Built Environment',
    techType: 'Marketplace / aggregator',
    note: 'No funded India startup aggregating demand for green retrofits or building energy efficiency services — a gap given the 300M+ sq ft of commercial stock needing upgrade.',
  },
  {
    subSector: 'Built Environment',
    techType: 'Project developer',
    note: 'No VC-backed green-building project developer. PACE financing and green real estate finance are almost entirely absent from the India VC ecosystem.',
  },
  {
    subSector: 'Food & Agriculture',
    techType: 'Manufacturing / industrials',
    note: 'Indoor / vertical farming (a Manufacturing sub-category in this dataset) has attracted only 1–2 seed rounds in India vs. $7B+ deployed globally. Land economics and power costs make India unit economics challenging.',
  },
]
