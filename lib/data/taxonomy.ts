export const SUB_SECTORS = [
  'Energy',
  'Food & Agriculture',
  'Transportation',
  'Industrial Decarbonisation',
  'Carbon & Climate Management',
  'Built Environment',
  'Circular Economy',
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
    'Green chemicals & synthetic biology',
    'Carbon capture & concrete',
    'Green hydrogen & electrolysers',
    'Industrial process efficiency',
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
  'Circular Economy': [
    'Battery recycling',
    'Waste & recycling',
    'Plastic & polymer recycling',
    'Sustainable materials & packaging',
    'Extended producer responsibility (EPR)',
  ],
}

export const TECH_TYPES = [
  'Software',
  'Marketplace',
  'Hardware & Industry',
  'Project Development',
  'Fintech',
] as const

export type TechType = (typeof TECH_TYPES)[number]

export const CLIMATE_OUTCOMES = [
  'Mitigation',
  'Adaptation',
] as const

export type ClimateOutcome = (typeof CLIMATE_OUTCOMES)[number]

export const STAGES = [
  'Pre-seed',
  'Seed',
  'Pre-Series A',
  'Series A',
  'Pre-Series B',
  'Series B',
  'Pre-Series C',
  'Series C',
  'Series D',
  'Series E',
  'Pre-IPO',
  'Acquired',
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
