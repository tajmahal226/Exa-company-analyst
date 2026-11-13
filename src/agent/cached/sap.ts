import type { EquityResearchBrief } from "../schema";

export const sapBrief: EquityResearchBrief = {
  ticker: "SAP",
  company_name: "SAP SE",
  report_date: "2026-10-21",
  report_time: "pre_market",
  fiscal_period: "Q3 2026",
  reporting_currency: "EUR",
  executive_summary: {
    value:
      "SAP's Q3 is a cloud-transition print: cloud revenue growth and the RISE/BTP backlog are the key debates, with the 2025 restructuring and the S/4HANA 2027 support deadline framing demand. Bulls cite accelerating cloud backlog and AI-wrapped business process deals; bears question margin dilution and the durability of the cloud growth rate as the installed base converts.",
    sources: [
      { url: "https://www.reuters.com/technology/sap-earnings-preview-2026-10", title: "Reuters — SAP earnings preview" },
    ],
  },
  key_debates: [
    {
      debate: "Is cloud revenue growth re-accelerating or peaking as the installed base converts?",
      bull_case: {
        value:
          "Cloud backlog growth has outpaced cloud revenue for several quarters, and Business AI up-sells are expanding deal sizes with S/4HANA migrations.",
        sources: [
          { url: "https://www.sap.com/investors", title: "SAP investor relations" },
        ],
      },
      bear_case: {
        value:
          "A large share of cloud growth is the mechanical conversion of the on-prem installed base ahead of the 2027 maintenance deadline; growth comps get harder and margins remain dilutive.",
        sources: [
          { url: "https://seekingalpha.com/article/sap-cloud-margins", title: "Seeking Alpha — SAP cloud margins" },
        ],
      },
      what_resolves_it: "Cloud backlog growth vs. cloud revenue growth, and the mix of new vs. conversion deals.",
    },
    {
      debate: "Does Business AI create a new revenue line or just protect pricing?",
      bull_case: {
        value:
          "AI 'business transforms' are attaching premium pricing to premium-tier subscriptions, with a measurable pipeline contribution this year.",
        sources: [
          { url: "https://news.sap.com/business-ai-2026", title: "SAP news — Business AI" },
        ],
      },
      bear_case: {
        value:
          "AI has so far been largely bundled rather than separately monetized; the revenue impact is hard to isolate from price increases.",
        sources: [
          { url: "https://www.reuters.com/technology/sap-ai-monetization", title: "Reuters — SAP AI monetization" },
        ],
      },
      what_resolves_it: "Any quantification of AI-attributable revenue or premium tier uptake on the call.",
    },
  ],
  kpis_to_watch: [
    {
      kpi: "Current cloud backlog (CCB)",
      why_it_matters: "The leading indicator for cloud revenue; watch for maintained ~30% growth.",
      last_reported_value: {
        value: "€16.3B, +28% YoY cc (Q2 2026)",
        sources: [
          { url: "https://www.sap.com/investors", title: "SAP investor relations" },
        ],
      },
    },
    {
      kpi: "Cloud gross margin",
      why_it_matters: "The margin-dilution debate as hyperscaler costs scale with revenue.",
      last_reported_value: {
        value: "~72% in Q2 2026",
        sources: [
          { url: "https://www.sap.com/investors", title: "SAP investor relations" },
        ],
      },
    },
    {
      kpi: "S/4HANA adoption / RISE contracts",
      why_it_matters: "Pace of the 2027 maintenance-deadline conversion cycle.",
      last_reported_value: {
        value: "~28,000 S/4HANA customers (Q2 2026)",
        sources: [
          { url: "https://www.reuters.com/technology/sap-s4hana-2026", title: "Reuters — SAP S/4HANA adoption" },
        ],
      },
    },
  ],
  peer_readthroughs: [
    {
      peer: "ORCL",
      signal: "Oracle's cloud infrastructure momentum is a positive read-through for enterprise cloud demand in Europe.",
      direction: "positive",
      sources: [
        { url: "https://www.reuters.com/technology/oracle-earnings-2026", title: "Reuters — Oracle earnings" },
      ],
    },
    {
      peer: "CRM",
      signal: "Salesforce flagged softer SMB demand; a partial caution for SAP's mid-market motion.",
      direction: "negative",
      sources: [
        { url: "https://www.reuters.com/technology/salesforce-earnings-2026", title: "Reuters — Salesforce earnings" },
      ],
    },
  ],
  recent_mgmt_commentary: [
    {
      date: "2026-09-10",
      venue: "SAP Sapphire (fall edition)",
      speaker: "CEO",
      takeaway: "Business AI is the largest 'new attach' opportunity in company history, embedded in every premium tier.",
      sources: [
        { url: "https://news.sap.com/business-ai-2026", title: "SAP news — Business AI" },
      ],
    },
    {
      date: "2026-10-05",
      venue: "Investor roadshow",
      speaker: "CFO",
      takeaway: "Confident in maintaining cloud backlog growth above 25% through the conversion cycle into 2027.",
      sources: [
        { url: "https://www.sap.com/investors", title: "SAP investor relations" },
      ],
    },
  ],
};
