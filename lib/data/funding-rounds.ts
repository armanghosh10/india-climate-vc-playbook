import type { SubSector, TechType, ClimateOutcome, Stage, Geography, TRLLevel } from './taxonomy'

export interface FundingRound {
  company: string
  subSector: SubSector
  subCategory: string
  techType: TechType
  climateOutcome: ClimateOutcome
  stage: Stage
  amountUsdMn: number | null
  date: string // YYYY-MM
  city: string
  geography: Geography
  trl?: TRLLevel
  investors: string[]
  sources: { label: string; url: string }[]
}

export const FUNDING_ROUNDS: FundingRound[] = [
  // Populated via deep search — see CLAUDE.md data population instructions
]
