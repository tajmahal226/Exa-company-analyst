/**
 * Live Exa Agent API client for the Equity Research Brief tool.
 *
 * Uses `exa-js@2.14.0` — `exa.agent.runs.create({ query, outputSchema,
 * effort })` orchestrates many Exa Searches under the hood until it can
 * return a single structured object matching the schema, with grounding
 * (primary-source citations) attached to every claim.
 */
import Exa from "exa-js";
import { outputSchema, type EquityResearchBrief, type AgentRunView } from "./schema";

const EXA_API_KEY = process.env.EXA_API_KEY;

/** Effort/cost trade-off; default "auto" matches the template's single-call demo. */
const DEFAULT_EFFORT = process.env.EXA_AGENT_EFFORT ?? "auto";

/** The query template that produces the channel-check brief for a ticker. */
export function buildQuery(ticker: string): string {
  return [
    `Build an equity research brief (channel check) for ${ticker}.`,
    "Search the web for the latest reported results, management commentary, analyst debates, and peer guidance.",
    "Return the read: the key debates, the bulls and bears on each, KPIs to watch with the last reported value, read-throughs from peers, and recent management commentary.",
    "Ground every claim in the primary sources that back it.",
  ].join(" ");
}

function normalizeRun(run: any): AgentRunView {
  const output = run?.output ?? {};
  const structured: EquityResearchBrief | null =
    output.structured && typeof output.structured === "object" ? output.structured : null;
  return {
    id: run?.id ?? "unknown",
    status: run?.status ?? "failed",
    stopReason: run?.stopReason ?? null,
    query: typeof run?.request?.query === "string" ? run.request.query : undefined,
    createdAt: run?.createdAt,
    completedAt: run?.completedAt ?? null,
    structured,
    text: output.text ?? null,
    grounding: output.grounding ?? null,
    error: run?.error ?? null,
    usage: run?.usage ?? null,
    costDollars: run?.costDollars ?? null,
  };
}

function requireKey(): Exa {
  if (!EXA_API_KEY) {
    throw new Error(
      "EXA_API_KEY is not set. Set it in the environment (or a local .env) to run live briefs."
    );
  }
  return new Exa(EXA_API_KEY);
}

/**
 * Kick off a live Equity Research Brief run for a ticker.
 * Async: returns immediately with the run (queued/running); poll
 * `getRun` until terminal.
 */
export async function createBrief(ticker: string): Promise<AgentRunView> {
  const exa = requireKey();
  const run: any = await exa.agent.runs.create({
    query: buildQuery(ticker),
    outputSchema: outputSchema as any,
    effort: DEFAULT_EFFORT as any,
    metadata: { tool: "equity-research-brief" },
  });
  return normalizeRun(run);
}

/** Get a run (queued/running/completed/failed). */
export async function getRun(runId: string): Promise<AgentRunView> {
  const exa = requireKey();
  const run: any = await exa.agent.runs.get(runId);
  return normalizeRun(run);
}

/** List cached runs, newest first. */
export async function listRuns(limit = 20): Promise<AgentRunView[]> {
  const exa = requireKey();
  const res: any = await exa.agent.runs.list({ limit });
  const runs: AgentRunView[] = (res?.data ?? []).map(normalizeRun);
  return runs.slice(0, limit);
}

/** Cancel a queued/running run so it doesn't keep consuming budget. */
export async function cancelRun(runId: string): Promise<AgentRunView | null> {
  const exa = requireKey();
  try {
    const run: any = await exa.agent.runs.cancel(runId);
    return normalizeRun(run);
  } catch {
    return null; // already terminal
  }
}
