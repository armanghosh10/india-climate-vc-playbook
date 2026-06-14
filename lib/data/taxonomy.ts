export const SUB_SECTORS = [
  'Energy',
  'Food & Agriculture',
  'Transportation',
  'Industrial Decarbonisation',
  'Carbon & Climate Management',
  'Built Environment',
] as const

export type SubSector = (typeof SUB_SECTORS)[number]

export const SUB_CATEGORIES: Record<SubSector, string[]> = {
  'Energy': [
    'Renewables development',
    'Energy storage',
    'DERs & grid tech',
    'New energy (hydrogen/nuclear)',
    'Renewables financing',
  ],
  'Food & Agriculture': [
    'Food waste & supply chain',
    'Crop yield & precision agri',
    'Sustainable inputs',
    'Alternative protein',
    'Indoor farming',
  ],
  'Transportation': [
    'EV OEMs',
    'EV charging & battery swap',
    'Micromobility',
    'Hard-to-abate transport',
  ],
  'Industrial Decarbonisation': [
    'Battery recycling',
    'Green chemicals & synthetic biology',
    'Waste & recycling',
    'Carbon capture & concrete',
  ],
  'Carbon & Climate Management': [
    'Earth observation & MRV',
    'Sustainability reporting',
    'Carbon markets & offsets',
    'Carbon removal',
    'Parametric climate insurance',
  ],
  'Built Environment': [
    'Green construction materials',
    'Building energy efficiency',
    'Green real estate finance',
    'Water & wastewater',
  ],
}

export const TECH_TYPES = [
  'Software / SaaS',
  'Marketplace / aggregator',
  'Deep-tech hardware',
  'Manufacturing / industrials',
  'Project developer',
  'Fintech / risk',
] as const

export type TechType = (typeof TECH_TYPES)[number]

export const CLIMATE_OUTCOMES = [
  'Mitigation',
  'Adaptation',
  'Enabling infrastructure',
] as const

export type ClimateOutcome = (typeof CLIMATE_OUTCOMES)[number]

export const STAGES = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
] as const

export type Stage = (typeof STAGES)[number]

export const GEOGRAPHIES = [
  'India-only',
  'India + SEA',
  'Global from India',
] as const

export type Geography = (typeof GEOGRAPHIES)[number]

export const TRL_LEVELS = ['Low', 'Medium', 'High'] as const

export type TRLLevel = (typeof TRL_LEVELS)[number]
