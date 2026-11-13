import { useCallback, useEffect, useRef, useState } from "react";
import type { AgentRunView, EquityResearchBrief, BriefSource } from "./agent/schema";
import { DEMO_RUNS } from "./agent/cached-runs";

const API = "/api";

/* ---------------------------------------------------------------- */
/* Data helpers                                                      */
/* ---------------------------------------------------------------- */

function SourcesList({ sources, label = "Sources" }: { sources?: BriefSource[]; label?: string }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="sources">
      <span className="src-label">{label}</span>
      {sources.map((s, i) => (
        <a key={i} href={s.url} target="_blank" rel="noreferrer">
          {s.title ?? s.url}
        </a>
      ))}
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

function reportTimeLabel(t?: "pre_market" | "post_market" | "unknown") {
  if (t === "pre_market") return "Pre-market";
  if (t === "post_market") return "Post-market";
  return "Time TBD";
}

function directionLabel(d: string) {
  if (d === "positive") return "Positive";
  if (d === "negative") return "Negative";
  return "Neutral";
}

/* ---------------------------------------------------------------- */
/* Brief view                                                         */
/* ---------------------------------------------------------------- */

function BriefView({ run }: { run: AgentRunView }) {
  const b: EquityResearchBrief | null = run.structured ?? null;
  if (!b) {
    return (
      <div className="error">
        <b>No structured brief in this run.</b>{" "}
        {run.error?.message ? `Error: ${run.error.message}` : "The agent output is missing."}
      </div>
    );
  }

  return (
    <div className="brief">
      <h1>
        {b.ticker}
        {b.company_name ? ` — ${b.company_name}` : ""}
      </h1>
      <div className="sub">
        {b.fiscal_period ? <span>{b.fiscal_period} · </span> : null}
        {b.report_date ? <span>{formatDate(b.report_date)} · </span> : null}
        <span>{reportTimeLabel(b.report_time)}</span>
        {b.reporting_currency ? <span> · {b.reporting_currency}</span> : null}
      </div>

      {b.executive_summary ? (
        <>
          <h2>The Read</h2>
          <p className="summary">{b.executive_summary.value}</p>
          <SourcesList sources={b.executive_summary.sources} />
        </>
      ) : null}

      {b.key_debates?.length ? (
        <>
          <h2>Key Debates</h2>
          {b.key_debates.map((d, i) => (
            <div className="debate" key={i}>
              <div className="q">{d.debate}</div>
              <div className="case">
                <span className="lbl bull">Bull</span>
                <p>{d.bull_case.value}</p>
                <SourcesList sources={d.bull_case.sources} />
              </div>
              <div className="case">
                <span className="lbl bear">Bear</span>
                <p>{d.bear_case.value}</p>
                <SourcesList sources={d.bear_case.sources} />
              </div>
              {d.what_resolves_it ? (
                <div className="resolves">
                  <b>What resolves it: </b>
                  {d.what_resolves_it}
                </div>
              ) : null}
            </div>
          ))}
        </>
      ) : null}

      {b.kpis_to_watch?.length ? (
        <>
          <h2>KPIs to Watch</h2>
          <ul className="kpis">
            {b.kpis_to_watch.map((k, i) => (
              <li key={i}>
                <div className="kpi-name">{k.kpi}</div>
                <div className="kpi-why">{k.why_it_matters}</div>
                {k.last_reported_value ? (
                  <>
                    <div className="kpi-why" style={{ marginTop: 6 }}>
                      <b>Last: </b>
                      {k.last_reported_value.value}
                    </div>
                    <SourcesList sources={k.last_reported_value.sources} />
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {b.peer_readthroughs?.length ? (
        <>
          <h2>Peer Read-Throughs</h2>
          <ul className="peers">
            {b.peer_readthroughs.map((p, i) => (
              <li key={i}>
                <div className="peer-head">
                  {p.peer}
                  <span className={`dir ${p.direction}`}>{directionLabel(p.direction)}</span>
                </div>
                <div className="kpi-why">{p.signal}</div>
                <SourcesList sources={p.sources} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {b.recent_mgmt_commentary?.length ? (
        <>
          <h2>Recent Management Commentary</h2>
          <ul className="mgmt">
            {b.recent_mgmt_commentary.map((m, i) => (
              <li key={i}>
                <div className="kpi-name">
                  {m.speaker ? m.speaker : "Management"}
                  {m.venue ? ` · ${m.venue}` : ""}
                </div>
                <div className="kpi-why">{m.takeaway}</div>
                {m.date ? <div className="when">{formatDate(m.date)}</div> : null}
                <SourcesList sources={m.sources} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {run.grounding && run.grounding.length > 0 ? (
        <>
          <h2>Field Grounding</h2>
          <p className="kpi-why">
            Every claim above is backed by primary sources attached at the field level by the agent.
          </p>
          <div className="sources">
            {run.grounding.map((g, i) => (
              <span key={i}>
                <span className="src-label">{g.field}</span>
                {g.citations.map((c, j) => (
                  <a key={j} href={c.url} target="_blank" rel="noreferrer">
                    {c.title ?? c.url}
                  </a>
                ))}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Run list card                                                      */
/* ---------------------------------------------------------------- */

function RunCard({ run, onOpen }: { run: AgentRunView; onOpen: (id: string) => void }) {
  const b = run.structured;
  const cost = run.costDollars?.total != null ? `$${run.costDollars.total.toFixed(2)}` : null;
  return (
    <div className="run-card" onClick={() => onOpen(run.id)}>
      <div className="ticker">{b?.ticker ?? (run.query ?? run.id).slice(0, 12)}</div>
      {b?.company_name ? <div className="co">{b.company_name}</div> : null}
      <div className="meta">
        <span className={`status ${run.status}`}>
          <span className="dot" />
          {run.status}
        </span>
        <span>{formatDate(run.createdAt)}</span>
      </div>
      {cost ? <div className="meta" style={{ marginTop: 4 }}>cost {cost} · {run.usage?.searches ?? 0} searches</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* App                                                                */
/* ---------------------------------------------------------------- */

export default function App() {
  const [runs, setRuns] = useState<AgentRunView[]>(DEMO_RUNS);
  const [selected, setSelected] = useState<AgentRunView | null>(null);
  const [ticker, setTicker] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Refresh cached runs from the API (falls back to demo data offline). */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/briefs`);
        if (res.ok) {
          const data = await res.json();
          if (data?.runs?.length) setRuns(data.runs);
        }
      } catch {
        /* offline: keep demo runs */
      }
    })();
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const openRun = useCallback(
    async (id?: string) => {
      if (!id) return;
      try {
        const res = await fetch(`${API}/briefs/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.run) {
            setSelected(data.run);
            setRuns((prev) => [data.run, ...prev.filter((r) => r.id !== data.run.id)]);
          }
        }
      } catch {
        const local = runs.find((r) => r.id === id);
        if (local) setSelected(local);
      }
    },
    [runs]
  );

  const runLive = useCallback(async () => {
    const sym = ticker.trim().toUpperCase();
    if (!sym || busy) return;
    setBusy(true);
    setError(null);
    stopPolling();
    try {
      const res = await fetch(`${API}/briefs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: sym }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Failed to start agent run.");
        setBusy(false);
        return;
      }
      const run: AgentRunView = data;
      setRuns((prev) => [run, ...prev.filter((r) => r.id !== run.id)]);
      setSelected(run);
      /* Poll until terminal. */
      pollRef.current = setInterval(async () => {
        try {
          const pr = await fetch(`${API}/briefs/${run.id}`);
          const pd = await pr.json();
          if (pd?.run) {
            const updated: AgentRunView = pd.run;
            setRuns((prev) => [updated, ...prev.filter((r) => r.id !== updated.id)]);
            setSelected(updated);
            if (["completed", "failed", "cancelled"].includes(updated.status)) stopPolling();
          }
        } catch {
          /* transient; keep polling */
        }
      }, 4000);
    } catch {
      setError("Could not reach the API server. Is it running? `npm run api`.");
    } finally {
      setBusy(false);
    }
  }, [ticker, busy, stopPolling]);

  useEffect(() => () => stopPolling(), [stopPolling]);

  return (
    <>
      <header className="top">
        <span className="brand">Equity Research Brief</span>
        <span className="badge">Exa Agent Tool</span>
      </header>
      <main>
        <div className="live-box">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && runLive()}
            placeholder="Ticker — e.g. AAPL"
            aria-label="Ticker symbol"
          />
          <button onClick={runLive} disabled={busy || !ticker.trim()}>
            {busy ? "Starting…" : "Run live agent"}
          </button>
          <button
            className="ghost"
            onClick={() => {
              stopPolling();
              setSelected(null);
            }}
          >
            Back to list
          </button>
          <div className="hint">
            Runs asynchronously via the Exa Agent API (one call, query + output schema, grounded
            citations). Cached demo runs below load instantly — NVDA, MSFT, SAP.
          </div>
        </div>

        {error ? <div className="error">{error}</div> : null}

        {selected ? (
          <>
            <div className="back">
              <button className="ghost" onClick={() => { stopPolling(); setSelected(null); }}>
                ← All briefs
              </button>
            </div>
            <BriefView run={selected} />
          </>
        ) : (
          <div className="run-grid">
            {runs.map((r) => (
              <RunCard key={r.id} run={r} onOpen={openRun} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
