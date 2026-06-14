export interface Report {
  title: string
  publisher: string
  year: number
  url: string
  description: string
  headlineFigures: { figure: string; context: string; page?: string }[]
}

export const REPORTS: Report[] = [
  // Populated via deep search — see CLAUDE.md data population instructions
]
