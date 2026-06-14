import type { SubSector, Stage } from './taxonomy'

export type InvestorType =
  | 'seed-fund'
  | 'micro-vc'
  | 'multi-stage'
  | 'growth-equity'
  | 'impact-fund'
  | 'corporate-vc'
  | 'family-office'
  | 'accelerator'
  | 'angel-network'
  | 'dfi'

export interface Investor {
  name: string
  type: InvestorType
  climateFocus: 'dedicated' | 'majority' | 'generalist with climate exposure'
  stageFocus: Stage[]
  ticketSizeUsdMn?: { min: number; max: number }
  subSectorFocus: SubSector[]
  aum?: number | null
  website?: string
  sources: { label: string; url: string }[]
}

export const INVESTORS: Investor[] = [
  // Populated via deep search — see CLAUDE.md data population instructions
]
