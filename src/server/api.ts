/**
 * Tiny Node API server for the Equity Research Brief tool.
 *
 * Uses only node:http (no framework). Exposes:
 *   POST /api/briefs            — run the live Exa Agent for a ticker
 *   GET  /api/briefs            — list runs (cached demo runs, newest first)
 *   GET  /api/briefs/:id        — fetch one run (cached or live)
 *   POST /api/briefs/:id/cancel — cancel a queued/running live run
 *   GET  /api/health            — health check
 *
 * The frontend (Vite dev server) proxies /api to this server.
 */
import http from "node:http";
import { createBrief, getRun, listRuns, cancelRun } from "../agent/exa";
import { CACHED_RUNS } from "../agent/cached-runs";

const PORT = Number(process.env.PORT ?? 8787);
const CACHE = new Map<string, any>();
for (const run of CACHED_RUNS) CACHE.set(run.id, run);

function json(res: http.ServerResponse, status: number, body: unknown) {
  const text = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(text),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(text);
}

function readBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e6) reject(new Error("body too large"));
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const path = url.pathname;

  if (req.method === "OPTIONS") {
    json(res, 204, {});
    return;
  }

  try {
    /* POST /api/briefs — run the live agent for a ticker */
    if (req.method === "POST" && path === "/api/briefs") {
      const body = await readBody(req);
      const ticker = String(body?.ticker ?? "").trim().toUpperCase();
      if (!ticker) {
        json(res, 400, { error: "ticker is required" });
        return;
      }
      try {
        const run = await createBrief(ticker);
        CACHE.set(run.id, run);
        json(res, 201, run);
      } catch (err: any) {
        json(res, 502, { error: err?.message ?? "failed to start agent run" });
      }
      return;
    }

    /* GET /api/briefs — cached demo runs, newest first */
    if (req.method === "GET" && path === "/api/briefs") {
      const live = await listRuns(20).catch(() => []);
      const all = [...live, ...CACHED_RUNS];
      const seen = new Set<string>();
      const unique = all.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
      unique.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
      json(res, 200, { runs: unique });
      return;
    }

    /* GET /api/briefs/:id */
    const briefMatch = path.match(/^\/api\/briefs\/([A-Za-z0-9_-]+)$/);
    if (req.method === "GET" && briefMatch) {
      const id = briefMatch[1];
      const cached = CACHE.get(id);
      if (cached) {
        json(res, 200, { run: cached });
        return;
      }
      try {
        const run = await getRun(id);
        CACHE.set(run.id, run);
        json(res, 200, { run });
      } catch {
        json(res, 404, { error: "run not found" });
      }
      return;
    }

    /* POST /api/briefs/:id/cancel */
    const cancelMatch = path.match(/^\/api\/briefs\/([A-Za-z0-9_-]+)\/cancel$/);
    if (req.method === "POST" && cancelMatch) {
      const run = await cancelRun(cancelMatch[1]);
      json(res, run ? 200 : 404, run ? { run } : { error: "run not found or already terminal" });
      return;
    }

    if (req.method === "GET" && path === "/api/health") {
      json(res, 200, { ok: true });
      return;
    }

    json(res, 404, { error: "not found" });
  } catch (err: any) {
    json(res, 500, { error: err?.message ?? "internal error" });
  }
});

server.listen(PORT, () => {
  console.log(`[equity-research-brief] api listening on http://localhost:${PORT}`);
});
