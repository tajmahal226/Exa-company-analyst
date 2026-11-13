# Exa Company Analyst — Equity Research Brief

**Channel-check brief on any ticker: the read, debates, KPIs, and peer read-throughs with sources.**

An **Agent Tool** (Financial Services use case) built on the [Exa Agent API](https://exa.ai). It takes
a ticker, searches the web for the latest results, management commentary, analyst debates, and peer
guidance — and returns a single structured **Equity Research Brief** with primary-source citations
(grounding) attached to every claim.

## How it works

1. **One API call.** The Exa Agent takes a query + an `outputSchema` and orchestrates many Exa
   Searches under the hood until it can return a single structured object matching the schema —
   with grounding (citations) attached to every claim. Both query and schema are customised for
   equity research channel checks.
2. **The schema is the same for every company** (`src/agent/schema.ts`): ticker, company, report
   date/time, fiscal period, reporting currency (ISO 4217), executive summary, key debates
   (bull/bear with sources + what resolves it), KPIs to watch (with last reported value), peer
   read-throughs (with direction), and recent management commentary.
3. **Runs are asynchronous** over a longer time than typical Exa Searches, so the demo ships with
   cached runs (NVDA, MSFT, SAP) to review instantly. You can also **run the agent live** on any
   ticker.

## Quick start

```bash
cp .env.example .env      # add your EXA_API_KEY
npm install --include=dev

# terminal 1 — the API server (proxies to the Exa Agent API)
npm run api

# terminal 2 — the web app
npm run dev               # http://localhost:5173
```

The UI shows the cached demo runs instantly; type a ticker (e.g. `AAPL`) and **Run live agent**
to kick off a real run. The frontend polls until the run reaches a terminal state.

## API

| Method | Path                     | Description                                        |
| ------ | ------------------------ | -------------------------------------------------- |
| `POST` | `/api/briefs`            | Run the live agent: body `{ "ticker": "AAPL" }`    |
| `GET`  | `/api/briefs`            | List cached runs (newest first)                    |
| `GET`  | `/api/briefs/:id`        | Fetch one run (cached or live)                     |
| `POST` | `/api/briefs/:id/cancel` | Cancel a queued/running live run                   |
| `GET`  | `/api/health`            | Health check                                       |

The Vite dev server proxies `/api` to `http://localhost:8787` (override with `API_TARGET`).

## Project layout

```
src/
  agent/
    schema.ts        # outputSchema (JSON Schema) + TS types for the brief
    exa.ts           # live Exa Agent client: createBrief / getRun / listRuns / cancelRun
    cached-runs.ts   # cached demo runs (NVDA, MSFT, SAP)
    cached/          # the demo briefs, one file each
  server/
    api.ts           # node:http API server (no framework)
  App.tsx            # UI: cached-run list, live-run control, brief view + sources
```

## Environment

| Variable          | Default              | Purpose                                    |
| ----------------- | -------------------- | ------------------------------------------ |
| `EXA_API_KEY`     | —                    | Required for live runs (https://dashboard.exa.ai/api-keys) |
| `EXA_AGENT_EFFORT`| `auto`               | `auto`/`low`/`medium`/`high`/`xhigh`       |
| `PORT`            | `8787`               | API server port                            |
| `API_TARGET`      | `http://localhost:8787` | Where the Vite dev server proxies `/api` |

## License

Private tooling for TJ. Not investment advice.
