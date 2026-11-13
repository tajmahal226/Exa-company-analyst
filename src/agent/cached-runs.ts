/**
 * Cached demo runs for the Equity Research Brief.
 *
 * Exa Agent runs are asynchronous and take longer than typical Exa Searches,
 * so the demo ships with a few cached runs to review instantly. These are
 * shaped exactly like real Agent API runs (id / status / createdAt / output
 * with structured + grounding). The app also lets you run the agent live on
 * any ticker you choose.
 */
import type { AgentRunView, EquityResearchBrief } from "./schema";
import { nvdaBrief } from "./cached/nvda";
import { msftBrief } from "./cached/msft";
import { sapBrief } from "./cached/sap";

function brief(
  id: string,
  createdAt: string,
  completedAt: string,
  structured: EquityResearchBrief
): AgentRunView {
  return {
    id,
    status: "completed",
    stopReason: "schema_satisfied",
    query: `Build an equity research brief (channel check) for ${structured.ticker}.`,
    createdAt,
    completedAt,
    structured,
    usage: { agentComputeUnits: 4, searches: 9 },
    costDollars: { total: 0.18 },
  };
}

export const CACHED_RUNS: AgentRunView[] = [
  brief("agent_run_demo_nvda", "2026-10-28T13:05:00.000Z", "2026-10-28T13:09:32.000Z", nvdaBrief),
  brief("agent_run_demo_msft", "2026-10-15T21:20:00.000Z", "2026-10-15T21:24:11.000Z", msftBrief),
  brief("agent_run_demo_sap", "2026-10-20T06:45:00.000Z", "2026-10-20T06:48:40.000Z", sapBrief),
];

/** Runs for the demo card list, newest first. */
export const DEMO_RUNS: AgentRunView[] = [...CACHED_RUNS].reverse();
