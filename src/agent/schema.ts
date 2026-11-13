/**
 * Channel-check output schema for the Equity Research Brief agent tool.
 *
 * The Exa Agent API takes a query + outputSchema and orchestrates many Exa
 * Searches under the hood until it can return a single structured object
 * matching the schema — with grounding (primary-source citations) attached
 * to every claim.
 *
 * The schema mirrors the template exactly: the SAME named fields for every
 * company, every claim wrapped with the primary sources that back it.
 * All money fields are expressed in `reporting_currency` (ISO 4217).
 */

/** A reusable building block: the primary sources backing a claim. */
export const sourcesJsonSchema = {
  type: "array",
  minItems: 1,
  items: {
    type: "object",
    required: ["url"],
    properties: {
      url: { type: "string", format: "uri" },
      title: { type: "string" },
    },
  },
} as const;

/** A string plus the sources backing it. */
export const sourcedStringJsonSchema = {
  type: "object",
  required: ["value", "sources"],
  properties: {
    value: { type: "string" },
    sources: sourcesJsonSchema,
  },
} as const;

/** The channel-check schema: the SAME named fields for every company. */
export const outputSchema = {
  type: "object",
  required: [
    "ticker",
    "report_date",
    "reporting_currency",
    "key_debates",
    "kpis_to_watch",
  ],
  properties: {
    ticker: { type: "string" },
    company_name: { type: "string" },
    report_date: { type: "string", format: "date" },
    report_time: { type: "string", enum: ["pre_market", "post_market", "unknown"] },
    fiscal_period: { type: "string" },
    reporting_currency: { type: "string" },
    executive_summary: sourcedStringJsonSchema,
    key_debates: {
      type: "array",
      maxItems: 6,
      items: {
        type: "object",
        required: ["debate", "bull_case", "bear_case"],
        properties: {
          debate: { type: "string" },
          bull_case: sourcedStringJsonSchema,
          bear_case: sourcedStringJsonSchema,
          what_resolves_it: { type: "string" },
        },
      },
    },
    kpis_to_watch: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        required: ["kpi", "why_it_matters"],
        properties: {
          kpi: { type: "string" },
          why_it_matters: { type: "string" },
          last_reported_value: sourcedStringJsonSchema,
        },
      },
    },
    peer_readthroughs: {
      type: "array",
      items: {
        type: "object",
        required: ["peer", "signal", "direction", "sources"],
        properties: {
          peer: { type: "string" },
          signal: { type: "string" },
          direction: { type: "string", enum: ["positive", "negative", "neutral"] },
          sources: sourcesJsonSchema,
        },
      },
    },
    recent_mgmt_commentary: {
      type: "array",
      items: {
        type: "object",
        required: ["takeaway", "sources"],
        properties: {
          date: { type: "string", format: "date" },
          venue: { type: "string" },
          speaker: { type: "string" },
          takeaway: { type: "string" },
          sources: sourcesJsonSchema,
        },
      },
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Types mirroring the schema, for typed reads of agent output.        */
/* ------------------------------------------------------------------ */

export interface BriefSource {
  url: string;
  title?: string;
}

export interface SourcedString {
  value: string;
  sources: BriefSource[];
}

export interface KeyDebate {
  debate: string;
  bull_case: SourcedString;
  bear_case: SourcedString;
  what_resolves_it?: string;
}

export interface KpiToWatch {
  kpi: string;
  why_it_matters: string;
  last_reported_value?: SourcedString;
}

export interface PeerReadthrough {
  peer: string;
  signal: string;
  direction: "positive" | "negative" | "neutral";
  sources: BriefSource[];
}

export interface MgmtCommentary {
  date?: string;
  venue?: string;
  speaker?: string;
  takeaway: string;
  sources: BriefSource[];
}

/** The structured object the agent returns for a ticker. */
export interface EquityResearchBrief {
  ticker: string;
  company_name?: string;
  report_date?: string;
  report_time?: "pre_market" | "post_market" | "unknown";
  fiscal_period?: string;
  reporting_currency: string;
  executive_summary?: SourcedString;
  key_debates: KeyDebate[];
  kpis_to_watch: KpiToWatch[];
  peer_readthroughs?: PeerReadthrough[];
  recent_mgmt_commentary?: MgmtCommentary[];
}

/**
 * Field-level grounding as returned by the Agent API:
 * every field of the structured output carries its citations.
 */
export interface GroundingEntry {
  field: string;
  citations: BriefSource[];
  score?: number | null;
  confidence?: "low" | "medium" | "high" | null;
}

/** How we present a run to the UI. */
export interface AgentRunView {
  id: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  stopReason?: string | null;
  query?: string;
  createdAt?: string;
  completedAt?: string | null;
  structured?: EquityResearchBrief | null;
  text?: string | null;
  grounding?: GroundingEntry[] | null;
  error?: { message?: string; code?: string; type?: string } | null;
  usage?: { agentComputeUnits?: number; searches?: number } | null;
  costDollars?: { total?: number } | null;
}
