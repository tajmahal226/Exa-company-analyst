import type { EquityResearchBrief } from "../schema";

export const msftBrief: EquityResearchBrief = {
  ticker: "MSFT",
  company_name: "Microsoft Corporation",
  report_date: "2026-10-28",
  report_time: "post_market",
  fiscal_period: "Q1 FY2027",
  reporting_currency: "USD",
  executive_summary: {
    value:
      "Microsoft's quarter will be judged on Azure growth and AI capacity: Azure acceleration is the top debate after a year of AI-driven re-acceleration, with capacity constraints the main handbrake. Bulls argue AI backlog and committed capacity spending keep Azure in the low-30s% growth zone; bears worry capex intensity is compressing FCF and that AI's margin contribution is still unproven. Watch Azure constant-currency growth, capex, and M365 Copilot monetization signals.",
    sources: [
      { url: "https://www.reuters.com/technology/microsoft-earnings-preview-2026-10", title: "Reuters — Microsoft earnings preview" },
    ],
  },
  key_debates: [
    {
      debate: "Has Azure growth re-accelerated sustainably, or is capacity masking true demand?",
      bull_case: {
        value:
          "AI services consumption continues to scale with committed capacity; management flagged demand in excess of available capacity, and the AI backlog guides 12+ months of growth.",
        sources: [
          { url: "https://www.fool.com/earnings/call-transcripts/microsoft", title: "Microsoft earnings call transcript" },
        ],
      },
      bear_case: {
        value:
          "A growing share of Azure growth is capacity-constrained delivery, not new bookings; as capacity normalizes, reported growth could step down sharply.",
        sources: [
          { url: "https://seekingalpha.com/article/microsoft-azure-debate", title: "Seeking Alpha — Azure debate" },
        ],
      },
      what_resolves_it: "Azure constant-currency growth vs. prior quarters and management's capacity-add commentary.",
    },
    {
      debate: "Is the AI capex cycle destroying FCF, and when does it pay back?",
      bull_case: {
        value:
          "Finance leases and operating leverage keep FCF resilient; AI capacity converts into contracted Azure commitments with multi-year payback well under the asset life.",
        sources: [
          { url: "https://www.reuters.com/technology/microsoft-capex-2026", title: "Reuters — Microsoft capex" },
        ],
      },
      bear_case: {
        value:
          "Capex is running ahead of revenue contribution; depreciation growth is beginning to pressure operating income growth, and the payoff is back-loaded.",
        sources: [
          { url: "https://seekingalpha.com/article/microsoft-fcf", title: "Seeking Alpha — Microsoft FCF analysis" },
        ],
      },
      what_resolves_it: "Capex guidance, FCF conversion, and the growth of AI-related Azure commitments.",
    },
  ],
  kpis_to_watch: [
    {
      kpi: "Azure constant-currency growth",
      why_it_matters: "The market's single most-watched number; consensus expects ~33%.",
      last_reported_value: {
        value: "34% in Q4 FY2026 (constant currency)",
        sources: [
          { url: "https://www.fool.com/earnings/call-transcripts/microsoft", title: "Microsoft Q4 FY2026 call" },
        ],
      },
    },
    {
      kpi: "Capex (incl. finance leases)",
      why_it_matters: "Signal of AI capacity build and the main FCF debate.",
      last_reported_value: {
        value: "$39.7B in Q4 FY2026",
        sources: [
          { url: "https://www.reuters.com/technology/microsoft-capex-2026", title: "Reuters — Microsoft capex" },
        ],
      },
    },
    {
      kpi: "M365 Copilot seats / attach",
      why_it_matters: "The proof-point for AI monetization beyond cloud consumption.",
      last_reported_value: {
        value: "Commercial seats up ~60% YoY (Q4 FY2026 commentary)",
        sources: [
          { url: "https://www.microsoft.com/investor", title: "Microsoft investor relations" },
        ],
      },
    },
  ],
  peer_readthroughs: [
    {
      peer: "GOOGL",
      signal: "Google Cloud growth re-accelerated on AI demand; supportive of the AI-cloud narrative.",
      direction: "positive",
      sources: [
        { url: "https://www.reuters.com/technology/alphabet-earnings-2026", title: "Reuters — Alphabet earnings" },
      ],
    },
    {
      peer: "AMZN",
      signal: "AWS cited AI revenue run-rate momentum and capacity constraints — mirrors Azure's constraint narrative.",
      direction: "neutral",
      sources: [
        { url: "https://www.reuters.com/technology/amazon-earnings-2026", title: "Reuters — Amazon earnings" },
      ],
    },
    {
      peer: "ORCL",
      signal: "Oracle's multi-billion AI capacity backlog shows enterprise demand, but with sharper margin trade-offs.",
      direction: "neutral",
      sources: [
        { url: "https://www.reuters.com/technology/oracle-earnings-2026", title: "Reuters — Oracle earnings" },
      ],
    },
  ],
  recent_mgmt_commentary: [
    {
      date: "2026-09-22",
      venue: "Q4 FY2026 earnings call",
      speaker: "CEO",
      takeaway: "AI demand continues to exceed available capacity across Azure; expect capacity additions to be absorbed quickly.",
      sources: [
        { url: "https://www.fool.com/earnings/call-transcripts/microsoft", title: "Microsoft Q4 FY2026 call transcript" },
      ],
    },
    {
      date: "2026-10-08",
      venue: "Gartner Symposium",
      speaker: "CFO",
      takeaway: "Capex will continue to scale with committed Azure contracts; payback periods remain attractive versus asset life.",
      sources: [
        { url: "https://www.microsoft.com/investor", title: "Microsoft investor relations" },
        { url: "https://www.reuters.com/technology/microsoft-gartner-2026", title: "Reuters — Microsoft at Gartner" },
      ],
    },
  ],
};
