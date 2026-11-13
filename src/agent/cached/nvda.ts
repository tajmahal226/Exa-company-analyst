import type { EquityResearchBrief } from "../schema";

export const nvdaBrief: EquityResearchBrief = {
  ticker: "NVDA",
  company_name: "NVIDIA Corporation",
  report_date: "2026-11-12",
  report_time: "post_market",
  fiscal_period: "Q3 FY2027",
  reporting_currency: "USD",
  executive_summary: {
    value:
      "The read into NVIDIA's FQ3 print is a demand story: hyperscaler AI capex remains the dominant debate, with the Blackwell Ultra ramp and CoWoS packaging supply as the swing factors. Bulls point to persistent multi-quarter visibility and pricing power; bears flag concentration, export controls, and a digestion risk into early 2027. KPIs to watch are data-center revenue, CoWoS/HBM supply commentary, and China mix.",
    sources: [
      { url: "https://www.reuters.com/technology/nvidia-earnings-preview-2026-11-12/", title: "Reuters — Nvidia earnings preview" },
      { url: "https://www.trendforce.com/news/2026/11/05/blackwell-ultra-ramp-2027", title: "TrendForce — Blackwell Ultra ramp outlook" },
    ],
  },
  key_debates: [
    {
      debate: "Is hyperscaler AI capex still growing through 2027, or is the market at a digestion point?",
      bull_case: {
        value:
          "Capex guides from the big four cloud providers were again raised into Q4; NVIDIA keeps multi-quarter visibility, and demand still exceeds supply for Blackwell Ultra. The installed base build-out is the real driver, not a replacement cycle.",
        sources: [
          { url: "https://www.reuters.com/technology/hyperscaler-capex-2026", title: "Reuters — Hyperscaler capex tracker" },
        ],
      },
      bear_case: {
        value:
          "Concentration risk is at an all-time high: a handful of buyers account for the majority of data-center revenue, and any pause in their build-out would hit NVIDIA hardest. Early-2027 digestion risk is the principal downside scenario.",
        sources: [
          { url: "https://seekingalpha.com/article/2026-nvidia-bear-case", title: "Seeking Alpha — NVIDIA bear case" },
        ],
      },
      what_resolves_it: "Next quarter's data-center revenue vs. consensus and any change to the 'demand exceeds supply' language on the call.",
    },
    {
      debate: "Can NVIDIA hold pricing power as CoWoS and HBM capacity expand?",
      bull_case: {
        value:
          "Supply expansion is already sold out through 2027; ASPs on Blackwell Ultra are up versus Hopper, and NVIDIA's systems attach more memory per GPU, supporting dollar content growth.",
        sources: [
          { url: "https://www.trendforce.com/news/2026/11/05/blackwell-ultra-ramp-2027", title: "TrendForce — Blackwell Ultra ramp outlook" },
        ],
      },
      bear_case: {
        value:
          "As CoWoS capacity doubles and competitors (AMD, custom silicon) scale, price/mix could normalize from record levels. A portion of the AI build may shift to ASICs over time.",
        sources: [
          { url: "https://www.semiengineering.com/cowos-capacity-2026", title: "Semiconductor Engineering — CoWoS capacity" },
        ],
      },
      what_resolves_it: "Gross margin guidance and commentary on CoWoS/HBM availability on the earnings call.",
    },
  ],
  kpis_to_watch: [
    {
      kpi: "Data-center revenue",
      why_it_matters: "~87% of revenue and the pure read on AI demand.",
      last_reported_value: {
        value: "$41.2B in FQ2 FY2027, +12% QoQ",
        sources: [
          { url: "https://investor.nvidia.com/financial-info/quarterly-results", title: "NVIDIA quarterly results" },
        ],
      },
    },
    {
      kpi: "CoWoS / HBM supply commentary",
      why_it_matters: "The binding constraint on shipments; any easing is a positive surprise.",
      last_reported_value: {
        value: "'Supply continues to trail demand' (FQ2 call)",
        sources: [
          { url: "https://www.fool.com/earnings/call-transcripts/nvidia", title: "NVIDIA earnings call transcript" },
        ],
      },
    },
    {
      kpi: "China mix",
      why_it_matters: "Export controls cap the addressable market; mix impacts growth and margin.",
      last_reported_value: {
        value: "~12% of data-center revenue in FQ2 FY2027",
        sources: [
          { url: "https://www.reuters.com/technology/nvidia-china-export-2026", title: "Reuters — NVIDIA China export controls" },
        ],
      },
    },
  ],
  peer_readthroughs: [
    {
      peer: "AMD",
      signal: "AMD raised MI-series guidance on server AI strength; consistent with firm overall AI demand.",
      direction: "positive",
      sources: [
        { url: "https://www.reuters.com/technology/amd-earnings-2026", title: "Reuters — AMD earnings" },
      ],
    },
    {
      peer: "TSMC",
      signal: "TSMC cited AI-accelerator demand as the driver of its raised full-year outlook and CoWoS expansions.",
      direction: "positive",
      sources: [
        { url: "https://www.trendforce.com/news/2026/10/tsmc-ai-outlook", title: "TrendForce — TSMC outlook" },
      ],
    },
    {
      peer: "AVGO",
      signal: "Custom silicon (ASIC) momentum at Broadcom competitive for incremental AI workloads.",
      direction: "negative",
      sources: [
        { url: "https://www.reuters.com/technology/broadcom-ai-2026", title: "Reuters — Broadcom AI commentary" },
      ],
    },
  ],
  recent_mgmt_commentary: [
    {
      date: "2026-10-14",
      venue: "Berenberg Tech Conference",
      speaker: "CFO",
      takeaway: "Reiterated that demand for Blackwell Ultra exceeds supply through the current quarter; no digestion signal yet.",
      sources: [
        { url: "https://www.fool.com/earnings/call-transcripts/nvidia", title: "NVIDIA management commentary" },
      ],
    },
    {
      date: "2026-11-04",
      venue: "Q3 FY2027 pre-announcement",
      speaker: "CEO",
      takeaway: "Framed the AI build-out as a multi-year cycle with compute demand 'an order of magnitude' larger at the next frontier-model generation.",
      sources: [
        { url: "https://www.reuters.com/technology/nvidia-preannouncement-2026-11-04", title: "Reuters — NVIDIA pre-announcement" },
      ],
    },
  ],
};
