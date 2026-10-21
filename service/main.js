/**
 * OpenChamber Trajectory extension service.
 *
 * The sandboxed panel cannot reach OpenCode or a loopback collector directly.
 * This process discovers the OpenCode trajectory collector's 0600 runtime
 * file, proxies its JSON API, and exposes only the endpoints the panel needs.
 *
 * It never sees an OpenCode password: the collector authenticates its own
 * requests with the token in the runtime file.
 */

import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const SERVICE_VERSION = "0.1.0";
const HOST = "127.0.0.1";
const PORT = Number(process.env.OPENCHAMBER_SERVICE_PORT ?? 0);
const TOKEN = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
const DATA_ROOT = process.env.OPENCHAMBER_TRAJECTORY_DATA_DIR
  || path.join(os.homedir(), ".local", "share", "openchamber", "trajectory");
const INSTANCES_ROOT = path.join(DATA_ROOT, "instances");
const PROBE_TIMEOUT_MS = 900;
const PROXY_TIMEOUT_MS = 22_000;

const probeCache = new Map();

function log(line) {
  try {
    process.stderr.write(`[trajectory-service] ${line}\n`);
  } catch {
    // ignore
  }
}

function sendJson(response, status, body) {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "cache-control": "no-store",
  });
  response.end(payload);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 2_000_000) {
        reject(new Error("request body too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

function normalizeDirectory(value) {
  if (typeof value !== "string" || value.length === 0) return null;
  try {
    return fs.realpathSync(value);
  } catch {
    return path.resolve(value);
  }
}

function pidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function readInstances() {
  let files;
  try {
    files = fs.readdirSync(INSTANCES_ROOT).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  const instances = [];
  for (const name of files) {
    const file = path.join(INSTANCES_ROOT, name);
    try {
      const stat = fs.statSync(file);
      const value = JSON.parse(fs.readFileSync(file, "utf8"));
      if (!value || typeof value.port !== "number" || typeof value.token !== "string") continue;
      if (!pidAlive(value.pid)) continue;
      instances.push({
        ...value,
        file,
        mtime: stat.mtimeMs,
      });
    } catch {
      // A stale or half-written runtime file is ignored.
    }
  }
  instances.sort((left, right) => (right.startedAt ?? 0) - (left.startedAt ?? 0));
  return instances;
}

function requestJson(url, { token, timeoutMs = PROXY_TIMEOUT_MS, headers } = {}) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, {
      headers: {
        accept: "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(headers ?? {}),
      },
    }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        const text = Buffer.concat(chunks).toString("utf8");
        let body;
        try {
          body = JSON.parse(text);
        } catch {
          body = { ok: false, code: "collector_bad_json", message: text.slice(0, 500) };
        }
        resolve({ status: response.statusCode ?? 0, body });
      });
    });
    request.setTimeout(timeoutMs, () => {
      request.destroy(new Error("collector request timed out"));
    });
    request.on("error", reject);
  });
}

async function probe(instance) {
  const now = Date.now();
  const cached = probeCache.get(instance.file);
  if (cached && now - cached.at < 3000 && cached.mtime === instance.mtime) return cached.info;
  try {
    const result = await requestJson(`http://${HOST}:${instance.port}/info`, {
      token: instance.token,
      timeoutMs: PROBE_TIMEOUT_MS,
    });
    if (result.status !== 200 || result.body?.ok !== true) throw new Error(`status ${result.status}`);
    const info = {
      ...result.body,
      port: instance.port,
      token: instance.token,
      file: instance.file,
      runtime: instance,
    };
    probeCache.set(instance.file, { at: now, mtime: instance.mtime, info });
    return info;
  } catch (error) {
    probeCache.delete(instance.file);
    return null;
  }
}

async function findCollector({ sessionId, directory }) {
  const wantedDirectory = normalizeDirectory(directory);
  const instances = readInstances();
  const matches = [];
  const directoryMatches = [];

  for (const instance of instances) {
    const info = await probe(instance);
    if (!info) continue;
    const entry = { instance, info };
    if (wantedDirectory && normalizeDirectory(info.directory) === wantedDirectory) {
      directoryMatches.push(entry);
    }
    if (sessionId && Array.isArray(info.sessions) && info.sessions.includes(sessionId)) {
      matches.push(entry);
    }
  }

  if (matches.length > 0) return matches[0];
  if (directoryMatches.length > 0) return directoryMatches[0];

  // A brand-new session may not be in the collector's map yet. Prefer the most
  // recent collector when there is exactly one, rather than failing the panel.
  if (instances.length === 1) {
    const info = await probe(instances[0]);
    if (info) return { instance: instances[0], info };
  }
  return null;
}

function collectorUrl(entry, pathname, searchParams) {
  const url = new URL(`http://${HOST}:${entry.instance.port}${pathname}`);
  for (const [key, value] of searchParams) url.searchParams.set(key, value);
  return url;
}

async function proxyCollector(entry, pathname, searchParams, timeoutMs = PROXY_TIMEOUT_MS) {
  const url = collectorUrl(entry, pathname, searchParams);
  const result = await requestJson(url, {
    token: entry.instance.token,
    timeoutMs,
  });
  return result;
}

function serviceAuthorized(request) {
  if (!TOKEN) return false;
  return request.headers.authorization === `Bearer ${TOKEN}`;
}

async function handle(request, response) {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");

  if (url.pathname === "/health") {
    sendJson(response, 200, {
      ok: true,
      service: "trajectory",
      version: SERVICE_VERSION,
      instances: readInstances().length,
    });
    return;
  }

  if (!serviceAuthorized(request)) {
    sendJson(response, 401, { ok: false, code: "unauthorized" });
    return;
  }

  if (url.pathname === "/info") {
    const instances = [];
    for (const instance of readInstances()) {
      const info = await probe(instance);
      if (info) {
        instances.push({
          port: info.port,
          pid: info.pid,
          version: info.version,
          opencodeVersion: info.opencodeVersion,
          directory: info.directory,
          project: info.project,
          sessions: info.sessions,
          startedAt: info.startedAt,
        });
      }
    }
    sendJson(response, 200, {
      ok: true,
      service: "trajectory",
      version: SERVICE_VERSION,
      instances,
    });
    return;
  }

  if (url.pathname === "/ledger") {
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      sendJson(response, 400, { ok: false, code: "missing_session" });
      return;
    }
    const entry = await findCollector({
      sessionId,
      directory: url.searchParams.get("directory"),
    });
    if (!entry) {
      sendJson(response, 200, {
        ok: false,
        code: "collector_missing",
        message: "The OpenCode trajectory collector is not running for this session.",
        install: "opencode plugin add openchamber-trajectory-collector",
      });
      return;
    }

    const params = new URLSearchParams();
    params.set("sessionId", sessionId);
    for (const key of ["directory", "afterSeq", "wait", "limitTurns"]) {
      const value = url.searchParams.get(key);
      if (value !== null) params.set(key, value);
    }
    try {
      const result = await proxyCollector(entry, "/snapshot", params, PROXY_TIMEOUT_MS);
      sendJson(response, result.status === 200 ? 200 : result.status, {
        ...result.body,
        collector: {
          pid: entry.instance.pid,
          port: entry.instance.port,
          version: entry.info.version,
          opencodeVersion: entry.info.opencodeVersion,
          directory: entry.info.directory,
        },
      });
    } catch (error) {
      sendJson(response, 502, {
        ok: false,
        code: "collector_unreachable",
        message: String(error?.message ?? error),
      });
    }
    return;
  }

  if (url.pathname === "/row" || url.pathname === "/header") {
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      sendJson(response, 400, { ok: false, code: "missing_session" });
      return;
    }
    const entry = await findCollector({
      sessionId,
      directory: url.searchParams.get("directory"),
    });
    if (!entry) {
      sendJson(response, 200, { ok: false, code: "collector_missing" });
      return;
    }
    const params = new URLSearchParams(url.searchParams);
    try {
      const result = await proxyCollector(entry, url.pathname, params, PROXY_TIMEOUT_MS);
      sendJson(response, result.status === 200 ? 200 : result.status, result.body);
    } catch (error) {
      sendJson(response, 502, {
        ok: false,
        code: "collector_unreachable",
        message: String(error?.message ?? error),
      });
    }
    return;
  }

  if (url.pathname === "/backfill") {
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      sendJson(response, 400, { ok: false, code: "missing_session" });
      return;
    }
    const entry = await findCollector({
      sessionId,
      directory: url.searchParams.get("directory"),
    });
    if (!entry) {
      sendJson(response, 200, { ok: false, code: "collector_missing" });
      return;
    }
    try {
      const result = await proxyCollector(entry, "/backfill", url.searchParams, PROXY_TIMEOUT_MS);
      sendJson(response, result.status === 200 ? 200 : result.status, result.body);
    } catch (error) {
      sendJson(response, 502, {
        ok: false,
        code: "collector_unreachable",
        message: String(error?.message ?? error),
      });
    }
    return;
  }

  sendJson(response, 404, { ok: false, code: "not_found" });
}

const server = http.createServer((request, response) => {
  void handle(request, response).catch((error) => {
    log(`request failed: ${String(error?.stack ?? error)}`);
    if (!response.headersSent) {
      sendJson(response, 500, { ok: false, code: "service_error", message: String(error?.message ?? error) });
    } else {
      response.end();
    }
  });
});

server.listen(PORT, HOST, () => {
  log(`listening on ${HOST}:${PORT}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1500).unref();
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
