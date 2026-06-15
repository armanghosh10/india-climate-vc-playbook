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
  hq: string
  climateFocus: 'dedicated' | 'majority' | 'generalist with climate exposure'
  stageFocus: Stage[]
  ticketSizeUsdMn?: { min: number; max: number }
  subSectorFocus: SubSector[]
  aum?: number | null
  website?: string
  sources: { label: string; url: string }[]
}

export const INVESTORS: Investor[] = [
  {
    name: 'Omnivore Partners',
    type: 'impact-fund',
    hq: 'Mumbai',
    climateFocus: 'dedicated',
    stageFocus: ['Seed', 'Series A'],
    subSectorFocus: ['Food & Agriculture', 'Energy', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 1, max: 5 },
    aum: 150,
    website: 'https://omnivore.vc',
    sources: [
      { label: 'Omnivore Fund III first close – Inc42', url: 'https://inc42.com/buzz/omnivore-announces-first-close-third-fund-150-mn/' },
      { label: 'Omnivore Medium announcement', url: 'https://omnivore-vc.medium.com/omnivore-announces-first-close-of-third-fund-at-150-million-fdf921608e53' },
      { label: 'Omnivore portfolio', url: 'https://www.omnivore.vc/portfolios/' },
    ],
  },
  {
    name: 'Avaana Capital',
    type: 'impact-fund',
    hq: 'Mumbai',
    climateFocus: 'dedicated',
    stageFocus: ['Pre-seed', 'Seed', 'Series A'],
    subSectorFocus: ['Energy', 'Transportation', 'Food & Agriculture', 'Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 1.2, max: 3.6 },
    aum: 135,
    website: 'https://avaanacapital.com',
    sources: [
      { label: 'Avaana $135M fund close – SAURenergy', url: 'https://www.saurenergy.com/solar-energy-news/avaana-capital-raises-largest-climate-tech-vc-fund-of-135mn' },
      { label: 'Avaana final close – Entrepreneur India', url: 'https://www.entrepreneur.com/en-in/news-and-trends/avaana-capital-completes-final-close-of-usd-135-mn-climate/481739' },
      { label: 'Green Climate Fund backing – GCF', url: 'https://www.greenclimate.fund/project/sap037' },
    ],
  },
  {
    name: 'Eversource Capital',
    type: 'growth-equity',
    hq: 'Mumbai',
    climateFocus: 'dedicated',
    stageFocus: ['Series B', 'Series C+'],
    subSectorFocus: ['Energy', 'Transportation', 'Built Environment', 'Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 30, max: 150 },
    aum: 741,
    website: 'https://eversourcecapital.com',
    sources: [
      { label: 'GGEF $741M final close – Eversource Capital', url: 'https://eversourcecapital.com/news/eversource-closes-indias-largest-climate-impact-fund-at-us-741-million/' },
      { label: 'Eversource seeks $1B Fund II – Business Standard', url: 'https://www.business-standard.com/india-news/eversource-capital-india-s-top-climate-investor-seeks-to-raise-1-bn-124051700060_1.html' },
      { label: 'Ecofy green NBFC – Eversource Capital', url: 'https://eversourcecapital.com/news/indias-green-retail-nbfc-ecofy-promoted-by-eversource-capital/' },
    ],
  },
  {
    name: 'Lightrock India',
    type: 'growth-equity',
    hq: 'London (India operations)',
    climateFocus: 'dedicated',
    stageFocus: ['Series B', 'Series C+'],
    subSectorFocus: ['Energy', 'Transportation', 'Food & Agriculture'],
    ticketSizeUsdMn: { min: 20, max: 100 },
    aum: 500,
    website: 'https://www.lightrock.com',
    sources: [
      { label: 'Lightrock $500M Accelerate7 fund – ESG Today', url: 'https://www.esgtoday.com/lightrock-raises-500-million-to-scale-clean-energy-access-in-emerging-markets/' },
      { label: 'SolarSquare portfolio – Lightrock', url: 'https://www.lightrock.com/portfolio/solarsquare/' },
    ],
  },
  {
    name: 'Theia Ventures',
    type: 'seed-fund',
    hq: 'Bengaluru',
    climateFocus: 'dedicated',
    stageFocus: ['Pre-seed', 'Seed'],
    subSectorFocus: ['Industrial Decarbonisation', 'Energy', 'Carbon & Climate Management', 'Transportation'],
    ticketSizeUsdMn: { min: 0.25, max: 2 },
    aum: 30,
    website: 'https://www.theia-ventures.com',
    sources: [
      { label: 'Theia first close – ImpactAlpha', url: 'https://impactalpha.com/theia-ventures-raises-more-than-15-million-for-its-first-climate-tech-fund/' },
      { label: 'Theia BII anchor investor – Theia Substack', url: 'https://theiaventures.substack.com/p/theia-ventures-announces-bii-as-anchor' },
      { label: 'Theia Fund I – Inc42', url: 'https://inc42.com/buzz/theia-ventures-marks-first-close-of-maiden-fund/' },
    ],
  },
  {
    name: 'Transition VC',
    type: 'seed-fund',
    hq: 'Mumbai',
    climateFocus: 'dedicated',
    stageFocus: ['Pre-seed', 'Seed'],
    subSectorFocus: ['Energy', 'Transportation', 'Carbon & Climate Management', 'Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 0.5, max: 3 },
    aum: 84,
    website: 'https://www.transitionventurecapital.com',
    sources: [
      { label: 'Transition VC ₹700 Cr final close – Inc42', url: 'https://inc42.com/buzz/transition-vc-closes-maiden-fund-at-inr-700-cr/' },
      { label: 'Fund final close – Business Standard', url: 'https://www.business-standard.com/amp/companies/news/transition-vc-closes-oversubscribed-rs-700-crore-debut-fund-125121000930_1.html' },
      { label: 'Transition VC portfolio', url: 'https://www.transitionventurecapital.com/portfolio' },
    ],
  },
  {
    name: 'Green Frontier Capital',
    type: 'multi-stage',
    hq: 'New York (India AIF registered)',
    climateFocus: 'dedicated',
    stageFocus: ['Seed', 'Series A'],
    subSectorFocus: ['Energy', 'Transportation', 'Food & Agriculture', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 1.5, max: 5 },
    aum: null,
    website: 'https://www.greenfrontiercapital.com',
    sources: [
      { label: 'GFC India fund launch – YourStory', url: 'https://yourstory.com/2024/11/green-frontier-capital-launchesrs-1500-cr-fund-climate-tech-startups' },
      { label: 'GFC ₹1500 Cr fund – Inc42', url: 'https://inc42.com/features/decoding-green-frontier-capitals-inr-1500-cr-bet-on-indias-climate-tech/' },
    ],
  },
  {
    name: 'Ankur Capital',
    type: 'impact-fund',
    hq: 'Mumbai',
    climateFocus: 'majority',
    stageFocus: ['Seed', 'Series A'],
    subSectorFocus: ['Food & Agriculture', 'Industrial Decarbonisation', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 1, max: 10 },
    aum: null,
    website: 'https://ankurcapital.com',
    sources: [
      { label: 'Ankur Fund III – Inc42', url: 'https://inc42.com/buzz/ankur-capital-to-float-inr-1200-cr-third-fund-gets-commitments-from-bii-macarthur/' },
      { label: 'Ankur Fund III DFC PIS', url: 'https://www.dfc.gov/sites/default/files/media/documents/9000116088.pdf' },
      { label: 'Ankur Fund III – YourStory', url: 'https://yourstory.com/2024/08/ankur-capital-commitments-bii-macarthur-third-fund' },
    ],
  },
  {
    name: 'Speciale Invest',
    type: 'seed-fund',
    hq: 'Chennai / Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Pre-seed', 'Seed'],
    subSectorFocus: ['Energy', 'Transportation', 'Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 0.5, max: 1.5 },
    aum: 70,
    website: 'https://www.specialeinvest.com',
    sources: [
      { label: 'Speciale Fund III close – Inc42', url: 'https://inc42.com/buzz/speciale-invest-closes-fund-iii-at-inr-600-cr-to-back-deeptech-startups/' },
      { label: 'Speciale climate & deep tech – Indian Startup Times', url: 'https://www.indianstartuptimes.com/interviews/pioneering-the-future-vishnu-rajeev-on-speciale-invests-role-in-deep-tech-and-climate-innovation/' },
    ],
  },
  {
    name: 'Blume Ventures',
    type: 'multi-stage',
    hq: 'Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Pre-seed', 'Seed', 'Series A'],
    subSectorFocus: ['Transportation', 'Energy', 'Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 0.5, max: 5 },
    aum: 900,
    website: 'https://blume.vc',
    sources: [
      { label: 'Blume Fund IV close – Blume.vc', url: 'https://blume.vc/news/blume-ventures-closes-its-fourth-fund-at-upwards-of-250-million-to-back-visionary-tech-founders' },
      { label: 'Blume climate tech sector page', url: 'https://blume.vc/sectors/climatetech' },
    ],
  },
  {
    name: '3one4 Capital',
    type: 'multi-stage',
    hq: 'Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Pre-seed', 'Seed', 'Series A'],
    subSectorFocus: ['Energy', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 0.5, max: 10 },
    aum: 310,
    website: 'https://www.3one4capital.com',
    sources: [
      { label: '3one4 ESG report 2024', url: 'https://3one4capital.com/blogs/esg-report-2024-responsible-investing-at-3one4-capital' },
      { label: '3one4 climate tech thesis', url: 'https://www.3one4capital.com/blogs/climate-tech-indias-major-imperatives' },
    ],
  },
  {
    name: 'Kalaari Capital',
    type: 'multi-stage',
    hq: 'Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Seed', 'Series A', 'Series B'],
    subSectorFocus: ['Carbon & Climate Management', 'Energy'],
    ticketSizeUsdMn: { min: 1, max: 15 },
    aum: null,
    website: 'https://kalaari.com',
    sources: [
      { label: 'Why Kalaari invested in Climes', url: 'https://kalaari.com/why-we-invested-in-climes/' },
      { label: 'Why Kalaari invested in Equilibrium', url: 'https://kalaari.com/why-we-invested-in-equilibrium/' },
    ],
  },
  {
    name: 'British International Investment (BII)',
    type: 'dfi',
    hq: 'London (India operations)',
    climateFocus: 'majority',
    stageFocus: ['Series A', 'Series B', 'Series C+'],
    subSectorFocus: ['Energy', 'Transportation', 'Food & Agriculture', 'Built Environment'],
    ticketSizeUsdMn: { min: 10, max: 150 },
    aum: null,
    website: 'https://www.bii.co.uk',
    sources: [
      { label: 'BII exceeds $1B India climate commitment – Investment Monitor', url: 'https://www.investmentmonitor.ai/news/british-international-investment-surpasses-climate-funding/' },
      { label: 'BII India climate roadmap – BII.co.uk', url: 'https://www.bii.co.uk/en/news-insight/news/british-international-investment-eyes-further-opportunities-in-climate-finance-in-india-as-part-of-2030-uk-india-roadmap/' },
    ],
  },
  {
    name: 'Circulate Capital',
    type: 'impact-fund',
    hq: 'New York (Asia operations)',
    climateFocus: 'dedicated',
    stageFocus: ['Seed', 'Series A', 'Series B'],
    subSectorFocus: ['Industrial Decarbonisation'],
    ticketSizeUsdMn: { min: 1, max: 10 },
    aum: 220,
    website: 'https://www.circulatecapital.com',
    sources: [
      { label: 'Circulate Capital India investments', url: 'https://www.newsfilecorp.com/release/69970/Circulate-Capital-Invests-to-Scale-Indias-Circular-Economy-for-Plastic-Waste-Offers-Powerful-Blueprint-to-Build-Back-Stronger' },
      { label: 'Asia Fund II $220M – FundsForNGOs', url: 'https://news.fundsforngos.org/2026/04/07/asia-fund-ii-220m-raised-by-circulate-capital-for-circular-economy-growth/' },
    ],
  },
  {
    name: 'Lok Capital',
    type: 'impact-fund',
    hq: 'New Delhi',
    climateFocus: 'majority',
    stageFocus: ['Series A', 'Series B'],
    subSectorFocus: ['Food & Agriculture', 'Carbon & Climate Management', 'Energy'],
    ticketSizeUsdMn: { min: 2, max: 15 },
    aum: 350,
    website: 'https://www.lokcapital.com',
    sources: [
      { label: 'Lok Capital Fund IV – AIIB', url: 'https://www.aiib.org/en/projects/details/2023/approved/India-LOK-Capital-Fund-4.html' },
      { label: 'Lok Capital Fund IV – FMO', url: 'https://www.fmo.nl/project-detail/62868' },
    ],
  },
  {
    name: 'SBI Ventures',
    type: 'corporate-vc',
    hq: 'Mumbai',
    climateFocus: 'majority',
    stageFocus: ['Seed', 'Series A', 'Series B'],
    subSectorFocus: ['Energy', 'Industrial Decarbonisation', 'Food & Agriculture', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 2, max: 20 },
    aum: null,
    website: 'https://sbiventures.co.in',
    sources: [
      { label: 'SBI Ventures ₹2,000 Cr climate fund – Business Standard', url: 'https://www.business-standard.com/companies/news/sbi-ventures-to-launch-2-000-crore-fund-for-climate-tech-investments-125112400892_1.html' },
    ],
  },
  {
    name: 'Peak XV Partners',
    type: 'multi-stage',
    hq: 'Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Seed', 'Series A', 'Series B', 'Series C+'],
    subSectorFocus: ['Transportation', 'Energy', 'Carbon & Climate Management'],
    ticketSizeUsdMn: { min: 1, max: 100 },
    aum: 10000,
    website: 'https://www.peakxv.com',
    sources: [
      { label: 'Peak XV rebrand announcement – BusinessWire', url: 'https://www.businesswire.com/news/home/20230606005677/en/Sequoia-India-Southeast-Asia-Is-Now-Peak-XV-Partners' },
      { label: 'Peak XV about page', url: 'https://www.peakxv.com/about-us' },
    ],
  },
  {
    name: 'Elevation Capital',
    type: 'multi-stage',
    hq: 'New Delhi / Bengaluru',
    climateFocus: 'generalist with climate exposure',
    stageFocus: ['Seed', 'Series A', 'Series B', 'Series C+'],
    subSectorFocus: ['Transportation', 'Energy'],
    ticketSizeUsdMn: { min: 1, max: 50 },
    aum: 2600,
    website: 'https://www.elevationcapital.com',
    sources: [
      { label: 'Elevation Capital profile – Tracxn', url: 'https://tracxn.com/d/venture-capital/elevation-capital/__krRDXX__IuTrMZrM9JgNPAdXOYnVzU0XEwR0TornlPM' },
      { label: 'Elevation Capital portfolio', url: 'https://www.elevationcapital.com/portfolio' },
    ],
  },
  {
    name: 'responsAbility Investments',
    type: 'dfi',
    hq: 'Zurich (Asia operations)',
    climateFocus: 'dedicated',
    stageFocus: ['Series A', 'Series B', 'Series C+'],
    subSectorFocus: ['Energy', 'Transportation'],
    ticketSizeUsdMn: { min: 10, max: 60 },
    aum: 500,
    website: 'https://www.responsability.com',
    sources: [
      { label: 'responsAbility Asia Climate Fund – FMO', url: 'https://www.fmo.nl/project-detail/63058' },
      { label: 'responsAbility $80M India loan agreements', url: 'https://www.responsability.com/en/press-releases/a-responsability-managed-climate-fund-accelerates-india-s-climate-progress-with-usd-80-million-in-new-loan-agreements' },
    ],
  },
]
