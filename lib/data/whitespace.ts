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
      "India's power sector emits ~1.1 GtCO2e annually, the single largest source at ~35% of the national GHG inventory. Coal still supplies 72% of electricity generation. The 500 GW non-fossil target by 2030 requires roughly 50 GW of new clean capacity every year through the decade.",
    marketDescr:
      "Annual renewable energy investment need is estimated at $150–170B over the decade (IEA India 2021). The C&I rooftop solar segment alone is a $20B+ market. Energy storage is the critical gap: India has <100 MW of grid-scale BESS deployed against a 2030 target of 50 GWh. Distributed energy resources (DERs) and grid flexibility software are also substantially underfunded relative to the complexity of integrating variable renewables.",
    sources: [
      { label: 'IEA India Energy Outlook 2021', url: 'https://www.iea.org/reports/india-energy-outlook-2021' },
      { label: 'MNRE Annual Report 2023-24', url: 'https://mnre.gov.in/annual-report/' },
    ],
  },
  {
    subSector: 'Transportation',
    emissionsDescr:
      "Transport accounts for ~14% of India's total GHG emissions (~340 MtCO2e). Road transport dominates. India had 326M registered vehicles as of 2022, with the two/three-wheeler segment representing the largest electrification opportunity by unit volume. Aviation and maritime are growing fast but remain hard to decarbonise.",
    marketDescr:
      "NITI Aayog targets 30% private car, 70% commercial vehicle, and 80% two/three-wheeler EV penetration by 2030. India's EV market is projected at $100B+ by 2030. Charging infrastructure investment need: $2.5B by 2025. Agricultural equipment (tractors, harvesters) represents a largely untapped electrification frontier: 2.9M tractors in use, almost entirely diesel-powered.",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'NITI Aayog Banking on Electric Vehicles in India 2022', url: 'https://www.niti.gov.in/sites/default/files/2022-01/Banking-on-EV_web_2.0a.pdf' },
    ],
  },
  {
    subSector: 'Food & Agriculture',
    emissionsDescr:
      "Agriculture (including livestock and land use) is India's second-largest GHG source at ~620 MtCO2e or 20% of national emissions. Paddy cultivation accounts for ~17% of total methane emissions. Food waste contributes an estimated 68 Mt of GHG annually; 30–40% of India's food output is lost before reaching consumers.",
    marketDescr:
      "India's agri sector is a $400B economy. Precision agriculture (soil sensors, drone advisory, satellite crop intelligence) and food-waste-reduction technology address a combined market of significant scale, though verified segment-level market sizing remains unavailable from approved sources. The cold chain logistics gap is estimated at INR 48,000 crore annually (NABARD 2020).",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'NABARD Cold Chain Report 2020', url: 'https://www.nabard.org/auth/writereaddata/CareerNotices/1202204724cold_chain.pdf' },
    ],
  },
  {
    subSector: 'Industrial Decarbonisation',
    emissionsDescr:
      "Industry accounts for ~35% of India's total GHG emissions (~950 MtCO2e), driven by steel, cement, and chemicals. These three sub-sectors are responsible for ~60% of industrial emissions and have almost no cost-effective decarbonisation pathway without green hydrogen, electrification, or breakthrough process changes. India is the world's second-largest steel producer and third-largest cement producer.",
    marketDescr:
      "India's National Green Hydrogen Mission targets 5 Mt/year of green hydrogen by 2030 with a $2.3B government incentive package. Green steel transition alone would require $100B+ in investment. The green chemicals market (bio-based plastics, synthetic biology feedstocks) is growing rapidly globally but remains nascent in India. Industrial software for process optimisation is severely underfunded despite its potential: a 5% efficiency gain in cement and steel alone would abate ~47 MtCO2e annually.",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'MNRE National Green Hydrogen Mission', url: 'https://mnre.gov.in/en/national-green-hydrogen-mission/' },
    ],
  },
  {
    subSector: 'Carbon & Climate Management',
    emissionsDescr:
      "India is the third-largest country by VCM project count on Verra, with projects spanning avoided deforestation, clean cookstoves, solar, and agricultural soil carbon. The domestic Carbon Credit Trading Scheme (CCTS), announced under the Energy Conservation Amendment Act 2022, is still in design phase. India's NDC targets absorb ~2.5–3 GtCO2e through forest cover by 2030.",
    marketDescr:
      "CEEW projects India's voluntary carbon credit revenue could reach $20–40B by 2030 if domestic market infrastructure matures. Earth observation and MRV software is the fastest-growing sub-category: India's space tech sector has produced Pixxel and SatSure as globally competitive players. Sustainability reporting (SEBI BRSR mandates for top 1,000 listed companies) is generating immediate software demand. Parametric climate insurance is a structural underserved gap: only 2.4% of climate losses in India are insured.",
    sources: [
      { label: 'CEEW Voluntary Carbon Market 2022', url: 'https://www.ceew.in/sites/default/files/voluntary-carbon-offset-mechanism-and-challenges-in-carbon-credit-trading-scheme-market-for-india.pdf' },
      { label: 'Verra Registry India Projects', url: 'https://registry.verra.org/' },
    ],
  },
  {
    subSector: 'Built Environment',
    emissionsDescr:
      "Buildings account for ~30% of India's total electricity consumption and ~300 MtCO2e of emissions annually. India adds the equivalent of a Chicago every year in built floor area. What is built now locks in decades of energy use. Commercial buildings (malls, offices, hotels) are the highest-intensity segment; residential buildings the highest-volume. Air conditioning alone is projected to triple energy demand in buildings by 2040.",
    marketDescr:
      "India's green building market is estimated at $35–50B by 2025 (CII-ITC). Water stress affects 600M Indians; the water treatment and recycling market is $3B+ and growing at 8% annually. Building energy management systems (BEMS) are deployed in <5% of eligible commercial stock. Green real estate finance (green mortgages, PACE financing, sustainability-linked loans for buildings) is almost entirely absent in the India VC ecosystem despite significant NBFC appetite from DFI capital.",
    sources: [
      { label: 'BEE Building Sector Report 2022', url: 'https://beeindia.gov.in/content/building-sector' },
      { label: 'NITI Aayog Composite Water Management Index 2019', url: 'https://niti.gov.in/sites/default/files/2019-08/CWMI-2.0-latest.pdf' },
    ],
  },
  {
    subSector: 'Circular Economy',
    emissionsDescr:
      "India generates ~62 million tonnes of municipal solid waste annually, with only ~22% formally processed. E-waste generation is 3.2 Mt/year growing at 15% CAGR, making India the third-largest e-waste producer globally (Global E-Waste Monitor 2024). The EV transition will add 50,000+ tonnes of lithium-ion battery waste to the stream by 2030 under the most conservative scenarios. Plastic pollution contributes an estimated 15 MtCO2e annually through open burning.",
    marketDescr:
      "India's Extended Producer Responsibility (EPR) framework (plastic, e-waste, battery waste) creates a compliance market estimated at $10B+. Battery recycling market alone is projected at $2.3B by 2030 (MNRE). The formalised waste-to-resource sector is structurally underserved: organised recycling companies serve less than 30% of recoverable waste. Textile and fashion waste represents a large adjacent opportunity with no funded startups in this dataset.",
    sources: [
      { label: 'MoEFCC India BUR 2021', url: 'https://unfccc.int/documents/305591' },
      { label: 'Global E-Waste Monitor 2024', url: 'https://ewastemonitor.info/' },
    ],
  },
]

// Per-cell market context — specific to each sub-sector × tech-type intersection.
// Used in the cell detail panel instead of the generic sector-level marketDescr.
// Key format: `${subSector}::${techType}`

export const CELL_MARKET_NOTES: Record<string, string> = {
  // ── ENERGY ────────────────────────────────────────────────────────────────
  'Energy::Software':
    'Grid analytics, BEMS, and demand-response platforms are an estimated $2–3B TAM driven by POSOCO real-time monitoring mandates and BEE energy audit compliance. C&I rooftop solar creates immediate demand for monitoring and yield-optimisation SaaS. The 500 GW renewables target will require grid-flexibility software at a scale India has not yet built.',

  'Energy::Marketplace':
    'C&I solar procurement aggregation, PPA platforms, and REC trading marketplaces address a $20B+ corporate renewable energy market. SolarSquare and similar platforms capture margin by aggregating buyer demand and negotiating bulk PPAs. SEBI ESG mandates have accelerated Scope 2 procurement activity — demand for green tariff platforms is growing faster than supply.',

  'Energy::Hardware & Industry':
    'Solar modules, inverters, battery cells, and balance-of-system components. India\'s PLI scheme allocates Rs 24,000 Cr for domestic solar module manufacturing. The energy storage hardware gap is acute: <100 MW of grid-scale BESS deployed against a 50 GWh 2030 target. Inverter and BESS manufacturing is import-dependent — PLI-driven domestic supply is the near-term opportunity.',

  'Energy::Project Development':
    'Distributed rooftop solar EPC and C&I project development addresses 50 GW/year of required new capacity. Most VC-backed project developers focus on <1 MW rooftop and C&I; utility-scale requires infrastructure PE or DFI capital. The corporate and industrial PPA market alone is a $15B+ annual opportunity if procurement platforms and project developers work in tandem.',

  'Energy::Fintech':
    'MSME solar lending, pay-as-you-go solar, and green bonds address an $80B financing gap by 2030 (IEA). Sachet-size solar loans (Rs 50,000–5L) for rural SMEs are severely underserved — most NBFCs lack underwriting models for energy asset cash flows. Yield-backed revenue share structures and solar-as-a-service are the two commercial models showing early traction.',

  // ── FOOD & AGRICULTURE ───────────────────────────────────────────────────
  'Food & Agriculture::Software':
    'Precision agriculture SaaS — drone advisory, satellite crop intelligence, soil sensor networks, farm management systems. India has 140M+ farm holdings mostly under 2 hectares, creating aggregation challenges but a large addressable base. NABARD estimates digital agri services could add $10B+ to farmer income by 2030 if coverage reaches 30% of kisan credit card holders.',

  'Food & Agriculture::Marketplace':
    'Agri supply chain aggregation and farmer-to-retailer platforms attack a Rs 90,000 Cr+ annual food waste problem (30–40% of output lost pre-consumer). Marketplace models that compress cold chain intermediaries are directly emissions-relevant. Well-funded cell — Waycool, Otipy, DeHaat — but consolidation is underway as unit economics pressure grows.',

  'Food & Agriculture::Hardware & Industry':
    'Agri IoT hardware (soil sensors, weather stations, drone units), alternative protein manufacturing equipment, and controlled environment agriculture infrastructure. India\'s indoor farming economics are challenging: electricity and cooling costs vs. open-field land costs make payback periods long. Alternative protein manufacturing is the highest climate-impact sub-category — no India startup has reached Series A here.',

  'Food & Agriculture::Project Development':
    'Agroforestry and carbon farming project developers, integrated food park development, food processing infrastructure. Carbon farming across India\'s 162M ha of farmland is the largest single latent carbon credit pool in the country. Project developer models require patient capital at the intersection of NABARD agri finance and VCM infrastructure — a structural gap no VC-backed startup has yet bridged.',

  'Food & Agriculture::Fintech':
    'Crop insurance, post-harvest credit, and supply chain finance for agri exporters. PMFBY covers 50M+ farmers but payout dispute rates are high — parametric index insurance (automatic payout on weather triggers, no claims adjustment) is the structural replacement. Input credit for sustainable practices (bio-inputs, drip irrigation) is chronically underserved by commercial banks.',

  // ── TRANSPORTATION ────────────────────────────────────────────────────────
  'Transportation::Software':
    'Fleet telematics, EV fleet management, route optimisation, and charging network orchestration. India has 3M+ commercial vehicles and 500K+ three-wheelers converting to EV — fleet SaaS demand is growing fast. EV fleet management (SoC optimisation, predictive maintenance) is a high-margin opportunity with no dominant India player yet. VAHAN data shows 1.7M EVs registered as of 2024.',

  'Transportation::Marketplace':
    'EV aggregation platforms, used-EV marketplaces, battery-as-a-service capacity exchanges. Battery-swapping marketplaces (Sun Mobility, Gogoro model) aggregate swap station capacity and match EV operators to stations dynamically. The used EV market will emerge at scale after 2027 when the first wave of 2W EVs exits primary ownership — a $5B+ opportunity.',

  'Transportation::Hardware & Industry':
    'EV OEM manufacturing (2W, 3W, commercial vehicles), EV charging hardware, and battery cell/pack manufacturing. PLI for ACC battery storage allocates Rs 18,100 Cr targeting 50 GWh of domestic cell manufacturing by 2030. Most VC bets are concentrated in 2W/3W OEMs (Ather, Ola, Ampere, Eka). Commercial vehicle electrification (trucks, buses) is the next underfunded frontier.',

  'Transportation::Project Development':
    'EV charging network roll-out, battery swapping network deployment, and public transit electrification. FAME-II disbursed Rs 10,000 Cr for EV infrastructure — but fast-charging density outside metro corridors is <15% of what IEA models require by 2030. Solar-powered highway charging hubs represent a project development model with viable toll-road economics that no VC-backed startup has fully pursued.',

  'Transportation::Fintech':
    'EV purchase financing, fleet electrification loans, and battery leasing products. 70% of India\'s EV purchases are financed but NBFCs lack residual value models for EVs. Battery leasing (separating battery cost from vehicle purchase) can reduce upfront EV cost by 30–40%, meaningfully expanding the addressable market. No India fintech has cracked EV underwriting at scale.',

  // ── INDUSTRIAL DECARBONISATION ────────────────────────────────────────────
  'Industrial Decarbonisation::Software':
    'Industrial process optimisation software, factory energy management, and emissions monitoring dashboards. India\'s industry is 35% of GHG emissions (~950 MtCO2e) but <5% of industrial facilities have deployed process optimisation software. SEBI BRSR mandates for listed manufacturers are creating immediate compliance SaaS demand. A 5% efficiency gain in cement and steel alone abates ~47 MtCO2e annually.',

  'Industrial Decarbonisation::Marketplace':
    'Industrial waste exchange platforms and green industrial inputs marketplaces. Industrial symbiosis — one facility\'s waste as another\'s input — is a $50B+ global value creation opportunity. India\'s SEZs and industrial clusters (Surat textiles, Morbi ceramics, Pune auto) create the geographic density for marketplace models. No funded India startup has built this infrastructure at scale.',

  'Industrial Decarbonisation::Hardware & Industry':
    'Green hydrogen electrolysers, industrial heat pumps, electric arc furnaces, and carbon capture hardware. Newtrace (electrolyser) is the only funded India VC-backed startup in deep-tech industrial hardware. India\'s National Green Hydrogen Mission targets 5 Mt/year by 2030, requiring $100B+ in electrolyser capacity. Green-steel DRI, cement decarbonisation hardware, and DAC remain entirely absent from India VC.',

  'Industrial Decarbonisation::Project Development':
    'Green hydrogen production projects, industrial energy-as-a-service, and waste heat recovery project development. Large-scale green hydrogen projects (Adani Green Hydrogen, NTPC) are DFI and strategic capital territory, not VC. Distributed hydrogen for industrial clusters and green ammonia for fertiliser plants represent a $10–50M project scale accessible to growth equity — no VC-backed developer has emerged.',

  'Industrial Decarbonisation::Fintech':
    'Sustainability-linked loans for SME manufacturers and transition finance for industrial decarbonisation. India has 63M+ MSMEs, many in energy-intensive sectors (textiles, ceramics, brick-kilns). Transition finance for SME manufacturers to install energy-efficient equipment is a $30B+ credit gap — but commercial banks lack tools to underwrite energy savings as collateral. No India fintech has tackled this.',

  // ── CARBON & CLIMATE MANAGEMENT ───────────────────────────────────────────
  'Carbon & Climate Management::Software':
    'MRV platforms, carbon accounting software, sustainability reporting tools, and satellite-based monitoring. SEBI BRSR mandates for India\'s top 1,000 listed companies are driving immediate SaaS demand. India\'s space tech sector (Pixxel hyperspectral, SatSure crop intelligence) provides world-competitive remote-sensing data that MRV platforms can build on as a domestic supply chain advantage.',

  'Carbon & Climate Management::Marketplace':
    'Carbon credit trading platforms, VCM project marketplaces, and offset verification aggregators. India is the third-largest VCM project country on Verra — but domestic carbon trading infrastructure is underdeveloped. CEEW projects $20–40B in potential VCM revenue by 2030 if market infrastructure matures. The Carbon Credit Trading Scheme (CCTS) under the Energy Conservation Amendment Act 2022 will create a domestic compliance demand layer.',

  'Carbon & Climate Management::Hardware & Industry':
    'Physical carbon removal hardware: direct air capture, enhanced rock weathering, biochar production, and ocean alkalinity enhancement. No funded India startup in any of these categories. DAC is still $400–600/tonne — too expensive for VCM. Biochar is the nearest-term hardware opportunity: India has vast agricultural residue feedstock from paddy straw burning (~18 Mt/year in Punjab alone).',

  'Carbon & Climate Management::Project Development':
    'Carbon project development: avoided deforestation (REDD+), clean cookstoves, soil carbon, and mangrove restoration. India is already among the top 5 countries by registered VCM project count. Varaha and similar project developers face a structural 2–3 year pipeline-to-credit lag, requiring bridge capital that VCs are reluctant to provide. The sector is chronically underfunded relative to its project pipeline size.',

  'Carbon & Climate Management::Fintech':
    'Parametric climate insurance, carbon credit pre-financing, and carbon-backed structured products. Only 2.4% of climate losses in India are insured (Swiss Re). Parametric insurance (automatic payout on weather triggers, no claims adjustment) is the only model that can reach MSME and smallholder scale economically. No India fintech has built a commercially viable parametric climate insurance product at scale.',

  // ── BUILT ENVIRONMENT ─────────────────────────────────────────────────────
  'Built Environment::Software':
    'BEMS, green building certification SaaS, and real estate ESG reporting tools. Deployed in <5% of eligible commercial stock despite India adding a Chicago-equivalent of floor area every year. SEBI BRSR mandates push corporate tenants to demand building-level emissions data from landlords — creating immediate SaaS demand from owners and facility managers.',

  'Built Environment::Marketplace':
    'Green retrofit aggregation platforms, building energy services marketplaces, and sustainable materials procurement. 300M+ sq ft of commercial stock needs energy efficiency upgrade. ESCO (energy service company) aggregation and PACE financing are proven internationally but absent from India VC. Corporate Scope 2 reporting requirements are creating tenant-side demand for greener buildings that no marketplace has yet formalised.',

  'Built Environment::Hardware & Industry':
    'Green construction materials (fly-ash bricks, geopolymer cement, bamboo composites) and energy-efficient HVAC. India\'s green building market is $35–50B by 2025 (CII-ITC). Geopolymer concrete (30–40% lower embodied carbon than OPC) has no funded India startup despite India being the world\'s third-largest cement producer. Air conditioning energy demand is projected to triple in buildings by 2040.',

  'Built Environment::Project Development':
    'PACE-financed green retrofits, net-zero building development, and green affordable housing. Green affordable housing under PMAY is a policy-backed opportunity but no VC-backed project developer has structured a PACE or green mortgage product at scale. FMO and BII fund NBFCs like Ecofy for on-lending but not direct project developers who do the actual construction.',

  'Built Environment::Fintech':
    'Green mortgages, sustainability-linked real estate loans, PACE financing platforms, and green REIT structures. India\'s mortgage market is Rs 28 trillion — a small green premium (lower rate for rated-green buildings) could mobilise significant capital. No commercial bank or NBFC has launched a differentiated green mortgage product. RBI\'s green taxonomy is in early stages but likely to drive policy incentives within 2–3 years.',

  // ── CIRCULAR ECONOMY ──────────────────────────────────────────────────────
  'Circular Economy::Software':
    'EPR compliance software, waste intelligence dashboards, and circular supply chain tracking. India\'s EPR mandates for plastic, e-waste, and battery waste create immediate compliance demand from producers, importers, and brand owners. The software layer to manage EPR certificate issuance, transfer, and audit trail is largely unbuilt — CPCB enforcement is tightening, creating urgency for the compliance SaaS layer.',

  'Circular Economy::Marketplace':
    'Waste aggregation marketplaces, recyclate trading platforms, and refurbishment/resale platforms. Recykal (waste marketplace), BanQu (supply chain traceability), and similar platforms are building the formalisation layer. The organised recycling sector serves <30% of recoverable waste — marketplace models that bring informal aggregators onto a digital platform are the primary value creation opportunity.',

  'Circular Economy::Hardware & Industry':
    'Battery recycling facilities, e-waste processing plants, chemical recycling technology, and plastic pyrolysis. India\'s e-waste generation is 3.2 Mt/year growing at 15% CAGR — the third-largest e-waste producer globally (Global E-Waste Monitor 2024). Battery recycling will need to scale 50x by 2030 for EV end-of-life. Attero and Lohum have received investment but sector capacity is still far short of incoming waste volume.',

  'Circular Economy::Project Development':
    'Material recovery facility development, industrial symbiosis park development, and waste-to-energy project development. No funded India startup in this cell despite a $10B+ EPR compliance market. Industrial symbiosis parks — co-locating manufacturers whose waste streams are complementary — require project developer capital and government land allocation, making DFI rather than VC the natural financier.',

  'Circular Economy::Fintech':
    'EPR credit trading platforms, recyclate price risk instruments, and supply chain finance for waste aggregators. EPR credit trading will emerge as CPCB strengthens enforcement — but no India fintech has built infrastructure to trade, settle, or hedge EPR certificates. Waste aggregators and recyclers face chronic working capital gaps: receivables-backed lending tailored to recyclate cash flow cycles is an unserved niche.',
}

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
    techType: 'Software',
    note: 'Zero VC-backed rounds in industrial process-optimisation software against a $950 MtCO2e emissions base. This cell is genuinely empty. A 5% efficiency improvement in cement and steel alone would abate ~47 MtCO2e annually — yet no funded India startup is building the SaaS layer to capture it.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    techType: 'Hardware & Industry',
    note: 'Newtrace (green hydrogen electrolyser) is the only funded India startup in deep-tech industrial hardware — a thin beachhead in a sector that requires green-steel DRI, DAC hardware, and industrial electrification at scale. Green-steel and cement decarbonisation hardware remain entirely absent from India VC. Electrolyser commercialisation (Newtrace\'s path) is the nearest-term credible bet; the others require strategic and DFI capital beyond typical VC cheque sizes.',
  },
  {
    subSector: 'Industrial Decarbonisation',
    techType: 'Project Development',
    note: 'No VC-backed project developer for green industrial processes in this dataset. Industrial decarbonisation projects (green hydrogen plants, industrial symbiosis parks) require DFI and strategic capital rather than VC — IFC, OPIC, and large strategics are the primary financiers.',
  },
  {
    subSector: 'Carbon & Climate Management',
    techType: 'Hardware & Industry',
    note: 'No funded India startup doing physical carbon removal hardware: no direct air capture, no enhanced rock weathering equipment, no biochar kilns at VC scale. The Carbon Removal sub-category is entirely software-mediated (MRV, project development), not hardware-led.',
  },
  {
    subSector: 'Built Environment',
    techType: 'Marketplace',
    note: 'No funded India startup aggregating demand for green retrofits or building energy management services. A significant gap given 300M+ sq ft of commercial stock needing upgrade and SEBI\'s ESG disclosure mandates driving corporate demand for building-level emissions data.',
  },
  {
    subSector: 'Built Environment',
    techType: 'Project Development',
    note: 'No VC-backed green-building project developer in this dataset. PACE financing and sustainability-linked real estate development are almost entirely absent from India\'s VC ecosystem. DFI capital (FMO, BII) flows to NBFCs like Ecofy rather than project developers.',
  },
  {
    subSector: 'Food & Agriculture',
    techType: 'Hardware & Industry',
    note: 'Indoor and vertical farming has attracted only 1–2 seed rounds in India vs. $7B+ deployed globally. Power costs, land economics, and cooling loads make India unit economics challenging relative to open-field farming. Alternative protein manufacturing faces a similar structural barrier: no mass-market price parity yet.',
  },
  {
    subSector: 'Circular Economy',
    techType: 'Software',
    note: 'No funded India startup building digital EPR compliance infrastructure, waste intelligence dashboards, or circular supply chain software. India\'s EPR mandates (plastic, e-waste, battery) create immediate compliance demand, but the software layer to manage it remains largely unbuilt.',
  },
  {
    subSector: 'Circular Economy',
    techType: 'Project Development',
    note: 'No VC-backed project developer structuring circular economy infrastructure: no funded startup building industrial symbiosis parks, material recovery facilities at scale, or waste-to-energy project pipelines. This cell is empty despite a $10B+ EPR compliance market.',
  },
  {
    subSector: 'Circular Economy',
    techType: 'Fintech',
    note: 'No funded India startup building circular economy finance products: no EPR credit trading platforms, no recyclate price risk instruments, no supply-chain finance for waste aggregators. The formal financial infrastructure for circular economy incentives is absent.',
  },
]
