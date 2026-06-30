export interface Report {
  title: string
  publisher: string
  year: number
  url: string
  description: string
  headlineFigures: { figure: string; context: string; page?: string }[]
  tags: string[]
  sources?: { label: string; url: string }[]
}

export const REPORTS: Report[] = [
  {
    title: "India Energy Outlook 2021",
    publisher: "IEA",
    year: 2021,
    url: "https://www.iea.org/reports/india-energy-outlook-2021",
    description:
      "Comprehensive World Energy Outlook special report analysing India's energy sector with scenarios for demand, supply, investment and CO2 emissions through 2040, covering the impact of Covid-19 and pathways toward sustainable development.",
    headlineFigures: [
      {
        figure: "$1.4 trillion (70% more)",
        context:
          "Additional clean energy investment required above current-policy trajectory to put India on a sustainable development path over the next 20 years",
        page: "Executive Summary",
      },
      {
        figure: "50% rise in CO2 by 2040",
        context:
          "Projected increase in India's CO2 emissions under Stated Policies Scenario — the largest of any country — though per-capita emissions remain well below global average",
        page: "Energy in India today",
      },
      {
        figure: "35%",
        context:
          "Revised energy demand growth projected for India between 2019 and 2030 under STEPS (down from earlier 50% estimate due to Covid-19 impact)",
        page: "Executive Summary",
      },
      {
        figure: "3rd largest",
        context:
          "India's rank as an energy consumer; expected to overtake the EU by 2030",
        page: "p.21",
      },
    ],
    tags: ["Energy", "Policy", "Market sizing"],
    sources: [
      {
        label: "IEA India Energy Outlook 2021",
        url: "https://www.iea.org/reports/india-energy-outlook-2021",
      },
    ],
  },
  {
    title: "Landscape of Green Finance in India 2024",
    publisher: "Climate Policy Initiative (CPI)",
    year: 2024,
    url: "https://www.climatepolicyinitiative.org/publication/landscape-of-green-finance-in-india-2024/",
    description:
      "Comprehensive tracking of green finance flows in India for mitigation and adaptation sectors, assessing progress against NDC financing needs and identifying gaps in domestic and international capital deployment.",
    headlineFigures: [
      {
        figure: "USD 50 billion (INR 3,712 bn)",
        context:
          "Tracked green finance for mitigation sectors in India in FY2021/22 — a 20% increase since FY2019/20",
        page: "Executive Summary",
      },
      {
        figure: "USD 15 billion (INR 1,092 bn)",
        context:
          "Adaptation finance tracked in FY2021/22 — nearly three times the FY2019/20 level",
        page: "Executive Summary",
      },
      {
        figure: "USD 2.5 trillion (INR 162.5 tn)",
        context:
          "Total climate finance India needs from 2015 to 2030 (approx. USD 170 bn/year) to meet its NDC goals — current flows cover only about a third",
        page: "Key findings",
      },
      {
        figure: "83%",
        context:
          "Share of mitigation finance that was domestically sourced in FY2021/22; international finance made up 17% (USD 8.3 bn)",
        page: "Domestic vs. international",
      },
    ],
    tags: ["Energy", "Policy", "Market sizing", "Climate finance"],
    sources: [
      {
        label: "CPI Landscape of Green Finance India 2024",
        url: "https://www.climatepolicyinitiative.org/publication/landscape-of-green-finance-in-india-2024/",
      },
      {
        label: "CPI Report PDF",
        url: "https://www.climatepolicyinitiative.org/wp-content/uploads/2024/12/Landscape-of-Green-Finance-in-India.pdf",
      },
    ],
  },
  {
    title: "Decarbonising India: Charting a Pathway for Sustainable Growth",
    publisher: "McKinsey & Company",
    year: 2022,
    url: "https://www.mckinsey.com/capabilities/sustainability/our-insights/decarbonising-india-charting-a-pathway-for-sustainable-growth",
    description:
      "Sector-by-sector analysis of India's decarbonisation pathways across more than 100 levers, modelling a Line-of-Sight and an Accelerated scenario through 2050, covering power, steel, automotive, aviation, cement and agriculture.",
    headlineFigures: [
      {
        figure: "$12.1 trillion",
        context:
          "Green investment required in India through 2050 under the Accelerated decarbonisation scenario (5.9% of GDP per year)",
        page: "Executive Summary",
      },
      {
        figure: "2.9 GtCO2e per year",
        context:
          "India's net greenhouse gas emissions as of 2019 — third largest in the world at 1.8 t CO2 per capita",
        page: "p.6",
      },
      {
        figure: "638 million people",
        context:
          "Population in districts classified as climate-event hotspots (more than 75% of all India's districts)",
        page: "p.8",
      },
      {
        figure: "2,700 GW renewables by 2050",
        context:
          "Renewable energy capacity India needs to reach from ~95 GW in 2020 — representing a 95% share of generation",
        page: "Power sector",
      },
    ],
    tags: ["Energy", "Industrial Decarbonisation", "Policy", "Market sizing"],
    sources: [
      {
        label: "McKinsey Decarbonising India 2022",
        url: "https://www.mckinsey.com/capabilities/sustainability/our-insights/decarbonising-india-charting-a-pathway-for-sustainable-growth",
      },
      {
        label: "Business Standard coverage of McKinsey report",
        url: "https://www.business-standard.com/article/current-affairs/decarbonising-india-mckinsey-report-gives-10-steps-to-reach-net-zero-goal-122110301779_1.html",
      },
    ],
  },
  {
    title: "IRENA Renewable Energy Statistics 2024",
    publisher: "IRENA",
    year: 2024,
    url: "https://www.irena.org/Publications/2024/Jul/Renewable-energy-statistics-2024",
    description:
      "Annual statistical compendium covering power-generation capacity for 2014–2023 and actual generation for 2014–2022 across more than 150 countries, including India's installed renewable capacity by technology.",
    headlineFigures: [
      {
        figure: "10 years of data (2014–2023)",
        context:
          "Renewable power generation capacity statistics presented for each country and technology",
        page: "Overview",
      },
      {
        figure: ">150 countries",
        context:
          "Geographic coverage of renewable energy balances, including India at the country level",
        page: "Scope",
      },
    ],
    tags: ["Energy", "Market sizing"],
    sources: [
      {
        label: "IRENA Renewable Energy Statistics 2024",
        url: "https://www.irena.org/Publications/2024/Jul/Renewable-energy-statistics-2024",
      },
    ],
  },
  {
    title: "Renewable Energy Prospects for India (REmap Working Paper)",
    publisher: "IRENA",
    year: 2017,
    url: "https://www.irena.org/publications/2017/May/Renewable-Energy-Prospects-for-India",
    description:
      "REmap analysis modelling how India can raise renewable energy to 25% of total final energy demand by 2030, with investment requirements, employment impacts and coal/oil demand reduction estimates.",
    headlineFigures: [
      {
        figure: "25%",
        context:
          "Share of total final energy demand India can meet from renewables by 2030 under the REmap pathway",
        page: "Executive Summary",
      },
      {
        figure: "USD 42 billion/year",
        context:
          "Average annual investment in renewable energy technologies required between 2017 and 2030 (USD 16 bn Reference Case + USD 26 bn additional options)",
        page: "Investment section",
      },
      {
        figure: "185 GW wind by 2030",
        context:
          "Total wind power capacity India needs under REmap — almost eight times the end-2015 level",
        page: "Power sector",
      },
      {
        figure: "12x cost savings",
        context:
          "Economic benefit-to-cost ratio of increasing renewable deployment under REmap",
        page: "Economic analysis",
      },
    ],
    tags: ["Energy", "Policy", "Market sizing"],
    sources: [
      {
        label: "IRENA REmap India 2017 working paper",
        url: "https://www.irena.org/publications/2017/May/Renewable-Energy-Prospects-for-India",
      },
      {
        label: "IRENA REmap India PDF",
        url: "https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2017/May/IRENA_REmap_India_paper_2017.pdf",
      },
    ],
  },
  {
    title: "New Energy Outlook — India 2023",
    publisher: "BloombergNEF",
    year: 2023,
    url: "https://about.bnef.com/new-energy-outlook/",
    description:
      "BloombergNEF's India-specific long-term energy transition scenarios to 2050, modelling installed capacity by technology under a Net Zero scenario, including the role of storage, hydrogen and grid investment.",
    headlineFigures: [
      {
        figure: "Net Zero scenario to 2050",
        context:
          "India-specific energy transition modelling covering installed generation capacity and batteries by technology/fuel",
        page: "Overview",
      },
      {
        figure: "Fossil fuels largely diminished by 2050",
        context:
          "India's reliance on fossil fuels continues past mid-century but their significance is projected to reduce substantially under the Net Zero scenario",
        page: "Scenario analysis",
      },
    ],
    tags: ["Energy", "Market sizing"],
    sources: [
      {
        label: "BNEF New Energy Outlook India 2023 PDF",
        url: "https://assets.bbhub.io/professional/sites/24/BNEF_New-Energy-Outlook-India-2023.pdf",
      },
    ],
  },
  {
    title: "Scaling Clean Energy in India: Financing the Transition",
    publisher: "BloombergNEF",
    year: 2025,
    url: "https://about.bnef.com/insights/clean-energy/scaling-clean-energy-in-india-financing-the-transition/",
    description:
      "Analysis of India's clean energy financing landscape, covering investment flows in renewables and EV sectors, constraints on capital access, and the policy environment needed to close the funding gap.",
    headlineFigures: [
      {
        figure: "59 GW",
        context:
          "Renewable capacity auctioned in India in 2024, requiring unprecedented capital deployment",
        page: "Market activity",
      },
      {
        figure: "20%",
        context:
          "Drop in lithium-ion battery pack prices in 2024, reshaping economics of energy storage in India",
        page: "Technology costs",
      },
    ],
    tags: ["Energy", "Transportation", "Climate finance"],
    sources: [
      {
        label: "BNEF Scaling Clean Energy India",
        url: "https://about.bnef.com/insights/clean-energy/scaling-clean-energy-in-india-financing-the-transition/",
      },
    ],
  },
  {
    title: "From the Ground Up: A Whole-System Approach to Decarbonizing India's Buildings Sector",
    publisher: "RMI & National Institute of Urban Affairs (NIUA)",
    year: 2022,
    url: "https://rmi.org/insight/whole-system-approach-to-decarbonize-indias-buildings/",
    description:
      "Whole-system analysis of decarbonisation pathways for India's buildings sector, covering low-carbon design, materials, operational energy efficiency and clean energy supply, with policy and market recommendations.",
    headlineFigures: [
      {
        figure: "~33%",
        context:
          "Share of India's total energy use attributable to building operations; a further ~10% goes to building material production and construction",
        page: "Executive Summary",
      },
      {
        figure: "4x lower emissions by 2050",
        context:
          "Potential reduction in India's buildings-related emissions versus business-as-usual if a whole-system approach is adopted",
        page: "Scenario analysis",
      },
    ],
    tags: ["Built Environment", "Policy"],
    sources: [
      {
        label: "RMI From the Ground Up — India Buildings",
        url: "https://rmi.org/insight/whole-system-approach-to-decarbonize-indias-buildings/",
      },
      {
        label: "RMI report PDF",
        url: "https://rmi.org/wp-content/uploads/2022/11/decarbonising_from_the_ground_up.pdf",
      },
    ],
  },
  {
    title: "Empowering India: The Clean Energy Growth Opportunity",
    publisher: "RMI",
    year: 2025,
    url: "https://rmi.org/insight/empowering-india/",
    description:
      "RMI research identifying India as a clean energy powerhouse, analysing demand growth, investment gaps versus global peers, EV adoption trends and the emissions savings potential of India's energy transition.",
    headlineFigures: [
      {
        figure: "4% of global clean energy investment",
        context:
          "India's current share of global clean energy investment — far below its population and emissions share",
        page: "Investment gap",
      },
      {
        figure: "Energy demand could triple by 2050",
        context:
          "Projected energy demand growth in India driven by industrialisation, urbanisation and space cooling in a warming climate",
        page: "Demand outlook",
      },
      {
        figure: "5% of GDP",
        context:
          "Annual cost of India's fossil fuel imports (coal, gas, oil) — a key driver for domestic clean energy investment",
        page: "Energy security",
      },
    ],
    tags: ["Energy", "Transportation", "Market sizing"],
    sources: [
      {
        label: "RMI Empowering India 2025",
        url: "https://rmi.org/insight/empowering-india/",
      },
      {
        label: "RMI Empowering India PDF",
        url: "https://rmi.org/wp-content/uploads/dlm_uploads/2025/05/Empowering_India_vF.pdf",
      },
    ],
  },
  {
    title: "Pathways for Decarbonizing India's Energy Future: Scenario Analysis Using the India Energy Policy Simulator",
    publisher: "World Resources Institute (WRI)",
    year: 2022,
    url: "https://www.wri.org/research/pathways-decarbonizing-indias-energy-future-scenario-analysis-using-india-energy-policy",
    description:
      "Working paper using the open-source India Energy Policy Simulator to model two climate policy packages — NDC-SDG and Long-Term Decarbonization — assessing emissions, jobs and health co-benefits across sectors.",
    headlineFigures: [
      {
        figure: "65% emissions cut by 2050",
        context:
          "GHG reduction under the Long-Term Decarbonization (LTD) scenario versus business-as-usual",
        page: "Key findings",
      },
      {
        figure: "39 million jobs",
        context:
          "Additional jobs created by 2050 under the LTD scenario",
        page: "Co-benefits",
      },
      {
        figure: "9.4 million premature deaths prevented",
        context:
          "Public health benefit of the LTD scenario's cleaner air by 2050",
        page: "Health co-benefits",
      },
      {
        figure: "37% emissions cut by 2050",
        context:
          "GHG reduction under the NDC-SDG aligned scenario versus business-as-usual",
        page: "NDC-SDG scenario",
      },
    ],
    tags: ["Energy", "Policy", "Industrial Decarbonisation"],
    sources: [
      {
        label: "WRI Pathways Decarbonizing India's Energy Future",
        url: "https://www.wri.org/research/pathways-decarbonizing-indias-energy-future-scenario-analysis-using-india-energy-policy",
      },
      {
        label: "WRI report PDF",
        url: "https://files.wri.org/d8/s3fs-public/2022-01/pathways-decarbonizing-indias-energy-future-scenario-analysis-using-india-energy-policy-simulator.pdf",
      },
    ],
  },
  {
    title: "Scenarios Towards Viksit Bharat and Net Zero — An Overview",
    publisher: "NITI Aayog",
    year: 2026,
    url: "https://niti.gov.in/sites/default/files/2026-02/Scenarios-Towards-Viksit-Bharat-and-Net-Zero-%20An-Overview-Vol1.pdf",
    description:
      "India's first government-led, multi-sectoral integrated study covering 11 sector reports across power, transport, industry, buildings, agriculture and waste, assessing pathways to Viksit Bharat ($30 trillion GDP by 2047) and net-zero by 2070.",
    headlineFigures: [
      {
        figure: "$22.7 trillion by 2070",
        context:
          "Total investment India needs to achieve Net Zero, with a financing gap of approximately $6.5 trillion requiring external sources",
        page: "Financing needs report",
      },
      {
        figure: "6,000+ GW renewables by 2070",
        context:
          "Projected renewable energy capacity under the Net Zero scenario",
        page: "Power sector insights",
      },
      {
        figure: "60% electricity share by 2070",
        context:
          "Electricity's share of India's final energy mix under the Net Zero scenario",
        page: "Energy mix",
      },
      {
        figure: "300+ GW nuclear by 2070",
        context:
          "Nuclear capacity expansion required under the Net Zero scenario",
        page: "Power sector insights",
      },
    ],
    tags: ["Energy", "Policy", "Market sizing", "Industrial Decarbonisation"],
    sources: [
      {
        label: "NITI Aayog Viksit Bharat Net Zero Overview Vol. 1",
        url: "https://niti.gov.in/sites/default/files/2026-02/Scenarios-Towards-Viksit-Bharat-and-Net-Zero-%20An-Overview-Vol1.pdf",
      },
      {
        label: "PIB press release",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2226683",
      },
    ],
  },
  {
    title: "India Transforming to a Net-Zero Emissions Energy System",
    publisher: "TERI & Shell",
    year: 2021,
    url: "https://www.teriin.org/sites/default/files/2021-03/India_Transforming_to_a_net-zero_emissions_energy_system.pdf",
    description:
      "Scenario sketch developed jointly by TERI and Shell mapping pathways for India's energy system to reach net-zero emissions by 2050, covering power, industry, transport, hydrogen and biofuels.",
    headlineFigures: [
      {
        figure: "~90% renewables in power by 2050",
        context:
          "Share of renewables in India's power sector under the net-zero scenario",
        page: "Power pathway",
      },
      {
        figure: "13% hydrogen in final energy",
        context:
          "Role of hydrogen in India's final energy mix by 2050 under the net-zero scenario",
        page: "Hydrogen pathway",
      },
      {
        figure: "~60% improvement in energy intensity",
        context:
          "Energy intensity per unit of GDP improvement required by 2050",
        page: "Efficiency targets",
      },
      {
        figure: "4x growth in power sector",
        context:
          "India's power sector needs to grow more than four times in 30 years, dominated by renewables",
        page: "Executive Summary",
      },
    ],
    tags: ["Energy", "Industrial Decarbonisation", "Policy"],
    sources: [
      {
        label: "TERI India Transforming Net-Zero 2021",
        url: "https://www.teriin.org/sites/default/files/2021-03/India_Transforming_to_a_net-zero_emissions_energy_system.pdf",
      },
    ],
  },
  {
    title: "Financing India's Energy Transition (Green Bonds for Renewable Energy and Electric Transport)",
    publisher: "CEEW Centre for Energy Finance (CEEW-CEF)",
    year: 2022,
    url: "https://www.ceew.in/publications/financing-indias-energy-transition-green-bonds-for-renewable-energy-and-electric-transport",
    description:
      "Analysis of green bonds as a mechanism to finance India's renewable energy and electric mobility transition, examining domestic and international market potential, sovereign green bond frameworks and key barriers to scale.",
    headlineFigures: [
      {
        figure: "$43 billion",
        context:
          "Green bonds raised by India since 2014 across the 'hidden universe' of domestic and international issuances",
        page: "Market overview",
      },
      {
        figure: "USD 2 billion",
        context:
          "India's sovereign green bond (SrGB) issuance in Q1 2023, the first under the 2022 SrGB framework",
        page: "Sovereign green bonds",
      },
    ],
    tags: ["Energy", "Transportation", "Climate finance"],
    sources: [
      {
        label: "CEEW-CEF Financing India's Energy Transition",
        url: "https://www.ceew.in/publications/financing-indias-energy-transition-green-bonds-for-renewable-energy-and-electric-transport",
      },
    ],
  },
  {
    title: "India's Voluntary Offset Scheme in Carbon Credit Trading Market",
    publisher: "CEEW",
    year: 2023,
    url: "https://www.ceew.in/publications/voluntary-carbon-offset-mechanism-and-challenges-in-carbon-credit-trading-scheme-market-for-india",
    description:
      "Study examining India's voluntary carbon market, the challenges facing the Carbon Credit Trading Scheme (CCTS) offset mechanism launched in December 2023, and recommendations to scale credible carbon credit trading.",
    headlineFigures: [
      {
        figure: "278 million credits (2010–2022)",
        context:
          "Total voluntary carbon credits issued by India — 17% of global supply",
        page: "Market overview",
      },
      {
        figure: "$1.2 billion+",
        context:
          "Valuation of India's voluntary carbon market",
        page: "Market sizing",
      },
      {
        figure: "1,451 projects",
        context:
          "VCM projects registered or under consideration across Verra and Gold Standard registries as of May 2023",
        page: "Registry data",
      },
      {
        figure: "USD 20–40 billion by 2030",
        context:
          "Projected revenue potential from voluntary carbon credits for India",
        page: "Market projections",
      },
    ],
    tags: ["Carbon & Climate Management", "Policy"],
    sources: [
      {
        label: "CEEW India Voluntary Carbon Offset CCTS",
        url: "https://www.ceew.in/publications/voluntary-carbon-offset-mechanism-and-challenges-in-carbon-credit-trading-scheme-market-for-india",
      },
      {
        label: "CEEW report PDF",
        url: "https://www.ceew.in/sites/default/files/voluntary-carbon-offset-mechanism-and-challenges-in-carbon-credit-trading-scheme-market-for-india.pdf",
      },
    ],
  },
  {
    title: "Carbon Markets in India: Pathways to Durable Carbon Removal",
    publisher: "CEEW & Carbon Removal India Alliance",
    year: 2024,
    url: "https://www.ceew.in/publications/carbon-markets-in-india:-pathways-to-durable-carbon-removal",
    description:
      "Analysis of how carbon markets can scale durable carbon dioxide removal (CDR) in India, covering biochar, enhanced rock weathering, BECCS and DACCS pathways, and addressing definition, finance and MRV challenges.",
    headlineFigures: [
      {
        figure: "10–30% of global CDR capacity by 2050",
        context:
          "India's potential to supply durable carbon dioxide removal globally",
        page: "India's CDR potential",
      },
      {
        figure: "25–100 years minimum storage",
        context:
          "Minimum storage threshold set by government policies and voluntary standards for durable CDR in India",
        page: "Standards & definitions",
      },
    ],
    tags: ["Carbon & Climate Management"],
    sources: [
      {
        label: "CEEW Carbon Markets India: Pathways to Durable CDR",
        url: "https://www.ceew.in/publications/carbon-markets-in-india:-pathways-to-durable-carbon-removal",
      },
      {
        label: "CEEW CDR report PDF",
        url: "https://www.ceew.in/sites/default/files/carbon-markets-in-india-pathways-to-durable-carbon-removal-web.pdf",
      },
    ],
  },
  {
    title: "Blended Finance for Climate Investments in India",
    publisher: "IFC (International Finance Corporation)",
    year: 2023,
    url: "https://www.ifc.org/en/pressroom/2023/blended-finance-is-key-to-supporting-indias-path-to-net-zero-say",
    description:
      "IFC report assessing how blended finance structures — mixing public and private capital — can accelerate climate investment in India's energy transition, with case studies across clean energy and green infrastructure.",
    headlineFigures: [
      {
        figure: "From $18 bn to $170 bn/year",
        context:
          "Scale-up in annual climate investments India needs by 2030 to achieve its net-zero commitment",
        page: "Investment gap",
      },
    ],
    tags: ["Energy", "Climate finance"],
    sources: [
      {
        label: "IFC Blended Finance for Climate Investments India 2023",
        url: "https://www.ifc.org/en/pressroom/2023/blended-finance-is-key-to-supporting-indias-path-to-net-zero-say",
      },
      {
        label: "IFC report PDF",
        url: "https://www.ifc.org/content/dam/ifc/doc/2023/Report-Blended-Finance-for-Climate-Investments-in-India.pdf",
      },
      {
        label: "World Bank PPP library entry",
        url: "https://ppp.worldbank.org/library/blended-finance-climate-investments-india",
      },
    ],
  },
  {
    title: "MNRE Annual Report 2022–23",
    publisher: "Ministry of New and Renewable Energy (MNRE), Government of India",
    year: 2023,
    url: "https://mnre.gov.in/en/annual-reports-2022-23/",
    description:
      "Official annual report of India's Ministry of New and Renewable Energy covering installed renewable capacity, programme-wise achievements, policy updates and targets across solar, wind, small hydro, biomass and emerging technologies.",
    headlineFigures: [
      {
        figure: "500 GW by 2030",
        context:
          "India's non-fossil electricity capacity target reaffirmed in the report",
        page: "Policy targets",
      },
    ],
    tags: ["Energy", "Policy"],
    sources: [
      {
        label: "MNRE Annual Report 2022-23",
        url: "https://mnre.gov.in/en/annual-reports-2022-23/",
      },
    ],
  },
  {
    title: "Transforming India's Climate Finance through Sector-Specific Financial Institutions",
    publisher: "Climate Policy Initiative (CPI)",
    year: 2023,
    url: "https://www.climatepolicyinitiative.org/transforming-indias-climate-finance-through-sector-specific-financial-institutions/",
    description:
      "Three-part CPI India series examining how sector-specific development finance institutions (DFIs) can be restructured and capitalised to crowd-in private climate investment across energy, transport and agriculture.",
    headlineFigures: [
      {
        figure: "USD 170 billion/year",
        context:
          "Annual green finance requirement India needs to meet NDC goals by 2030",
        page: "Part 1 overview",
      },
    ],
    tags: ["Climate finance", "Policy"],
    sources: [
      {
        label: "CPI Transforming India's Climate Finance — Part 1",
        url: "https://www.climatepolicyinitiative.org/transforming-indias-climate-finance-through-sector-specific-financial-institutions/",
      },
      {
        label: "CPI — Part 2",
        url: "https://www.climatepolicyinitiative.org/transforming-indias-climate-finance-through-sector-specific-financial-institutions-2/",
      },
    ],
  },
  {
    title: "The Heat Is On: Decarbonizing Industrial Heat in India and Southeast Asia",
    publisher: "RMI",
    year: 2023,
    url: "https://rmi.org/resources/the-heat-is-on-decarbonizing-industrial-heat-in-india-and-southeast-asia/",
    description:
      "Analysis of decarbonisation pathways for industrial heat — the hardest-to-abate segment of industrial emissions in India and Southeast Asia — covering electrification, green hydrogen and biomass options with economics.",
    headlineFigures: [
      {
        figure: "14% of global CO2",
        context:
          "Industrial heat accounts for 14% of global CO2 emissions today — equivalent to all emissions from road passenger transport, aviation and shipping combined",
        page: "Context",
      },
    ],
    tags: ["Industrial Decarbonisation", "Energy"],
    sources: [
      {
        label: "RMI The Heat Is On — India Industrial Heat",
        url: "https://rmi.org/resources/the-heat-is-on-decarbonizing-industrial-heat-in-india-and-southeast-asia/",
      },
    ],
  },
  {
    title: "Green Hydrogen Production Pathways for India",
    publisher: "RMI",
    year: 2023,
    url: "https://rmi.org/green-hydrogen-production-pathways-for-india/",
    description:
      "Techno-economic analysis of green hydrogen production pathways in India, covering electrolyser technology options, renewable energy input costs and competitiveness versus grey hydrogen, with sectoral demand scenarios.",
    headlineFigures: [
      {
        figure: "5 MMT green H2 by 2030",
        context:
          "India's National Green Hydrogen Mission target for domestic production capacity by 2030",
        page: "Policy context",
      },
    ],
    tags: ["Energy", "Industrial Decarbonisation"],
    sources: [
      {
        label: "RMI Green Hydrogen Production Pathways India",
        url: "https://rmi.org/green-hydrogen-production-pathways-for-india/",
      },
    ],
  },
]
