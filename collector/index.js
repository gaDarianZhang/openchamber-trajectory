/**
 * OpenCode trajectory collector.
 *
 * A read-only OpenCode 2 plugin. It captures request headers, live session
 * events and tool results, then serves a small JSON ledger over a loopback
 * HTTP server. The OpenChamber extension service discovers that server through
 * a 0600 runtime file and proxies it to the sandboxed panel/page.
 *
 * Nothing here mutates a session. No prompt or tool content is sent off the
 * machine.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

import {
  addHeader,
  applyDurableMessages,
  applyEvent,
  buildSnapshot,
  createState,
  findRow,
  getHeader,
  touch,
  upsertTool,
} from "./ledger.js";

const PLUGIN_ID = "openchamber-trajectory";
const PLUGIN_VERSION = "0.1.0";
const SCHEMA_VERSION = 1;

const dataRoot = () => process.env.OPENCHAMBER_TRAJECTORY_DATA_DIR
  || path.join(os.homedir(), ".local", "share", "openchamber", "trajectory");

const instancesRoot = () => path.join(dataRoot(), "instances");

function ensureDataDirs() {
  fs.mkdirSync(instancesRoot(), { recursive: true, mode: 0o700 });
}

function appendLog(line) {
  try {
    ensureDataDirs();
    const file = path.join(dataRoot(), "collector.log");
    const entry = `${new Date().toISOString()} ${line}\n`;
    fs.appendFileSync(file, entry, { mode: 0o600 });
  } catch {
    // Logging must never break OpenCode.
  }
}

function safeJson(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function sendJson(response, status, body) {
  const payload = safeJson(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "cache-control": "no-store",
  });
  response.end(payload);
}

function readAuth(request, token) {
  return request.headers.authorization === `Bearer ${token}`;
}

function numberParam(searchParams, name, fallback = undefined) {
  const raw = searchParams.get(name);
  if (raw === null || raw === "") return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

function boolParam(searchParams, name) {
  const raw = searchParams.get(name);
  return raw === "1" || raw === "true";
}

function normalizeDirectory(value) {
  if (typeof value !== "string" || value.length === 0) return null;
  try {
    return fs.realpathSync(value);
  } catch {
    return path.resolve(value);
  }
}

function createWaiterMap() {
  const waiters = new Map();

  const wait = (sessionID, timeoutMs) => new Promise((resolve) => {
    const entry = { resolve, timer: null };
    entry.timer = setTimeout(() => {
      const set = waiters.get(sessionID);
      set?.delete(entry);
      if (set?.size === 0) waiters.delete(sessionID);
      resolve(false);
    }, timeoutMs);
    const set = waiters.get(sessionID) ?? new Set();
    set.add(entry);
    waiters.set(sessionID, set);
  });

  const resolve = (sessionID) => {
    const set = waiters.get(sessionID);
    if (!set) return;
    waiters.delete(sessionID);
    for (const entry of set) {
      clearTimeout(entry.timer);
      entry.resolve(true);
    }
  };

  const dispose = () => {
    for (const set of waiters.values()) {
      for (const entry of set) {
        clearTimeout(entry.timer);
        entry.resolve(false);
      }
    }
    waiters.clear();
  };

  return { wait, resolve, dispose };
}

export default {
  id: PLUGIN_ID,
  async setup(ctx) {
    ensureDataDirs();

    const token = crypto.randomBytes(32).toString("base64url");
    const startedAt = Date.now();
    const states = new Map();
    const waiters = createWaiterMap();
    const timers = new Set();
    const controller = new AbortController();
    const registrations = [];
    let server;
    let discoveryFile;
    let closed = false;

    const version = ctx.app?.version ?? "unknown";
    const location = ctx.location ?? {};
    const project = location.project ?? {};
    const canonicalDirectory = normalizeDirectory(location.directory ?? project.canonical ?? project.directory);
    const projectID = project.id ?? null;

    const log = (line) => appendLog(line);

    const schedule = (fn, delay) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!closed) {
          try {
            fn();
          } catch (error) {
            log(`scheduled task failed: ${String(error?.stack ?? error)}`);
          }
        }
      }, delay);
      timers.add(timer);
      return timer;
    };

    const stateFor = (sessionID, directory) => {
      if (typeof sessionID !== "string" || sessionID.length === 0) return undefined;
      let state = states.get(sessionID);
      if (!state) {
        state = createState({
          sessionID,
          directory: normalizeDirectory(directory) ?? canonicalDirectory,
        });
        state.notify = () => waiters.resolve(sessionID);
        states.set(sessionID, state);
      }
      return state;
    };

    const backfill = (state, { force = false } = {}) => {
      if (!state) return Promise.resolve();
      if (!force && state.backfilled) return Promise.resolve();
      if (state.backfilling) return state.backfilling;
      state.backfilling = (async () => {
        try {
          const messages = await ctx.session.context({ sessionID: state.sessionID });
          applyDurableMessages(state, messages);
        } catch (error) {
          log(`backfill ${state.sessionID} failed: ${String(error?.message ?? error)}`);
        } finally {
          state.backfilling = null;
        }
      })();
      return state.backfilling;
    };

    const scheduleBackfill = (state, delay = 900) => {
      if (!state) return;
      schedule(() => {
        void backfill(state, { force: true });
      }, delay);
    };

    const applyRetryHook = (event) => {
      const state = stateFor(event.sessionID, event.directory);
      if (!state) return;
      const messages = [...state.messages.values()];
      for (let index = messages.length - 1; index >= 0; index -= 1) {
        const message = messages[index];
        if (message.type !== "assistant") continue;
        if (message.time?.completed !== undefined) continue;
        message.retry = {
          attempt: event.attempt,
          at: Date.now(),
          error: event.error,
          decision: event.decision,
        };
        touch(state);
        return;
      }
    };

    const applyToolHook = (phase, event) => {
      const state = stateFor(event.sessionID);
      if (!state) return;
      const callID = String(event.callID ?? event.id ?? "");
      if (!callID) return;
      const existing = state.tools.get(callID);
      if (phase === "execute.before") {
        if (existing) {
          if (existing.time?.start === undefined) existing.time = { ...(existing.time ?? {}), start: Date.now() };
          if (existing.status === "pending") existing.status = "running";
          if (event.input !== undefined) existing.input = event.input;
          touch(state);
          return;
        }
        upsertTool(state, {
          id: callID,
          name: event.tool,
          parentAssistantID: latestRunningAssistant(state)?.id,
          status: "running",
          input: event.input ?? event.args ?? {},
          time: { created: Date.now(), start: Date.now() },
          live: true,
        });
        return;
      }

      const result = event.result;
      const output = typeof result?.output === "string"
        ? result.output
        : contentText(result?.content);
      upsertTool(state, {
        id: callID,
        name: event.tool ?? existing?.name,
        parentAssistantID: existing?.parentAssistantID ?? latestRunningAssistant(state)?.id,
        status: event.status === "failed" || event.error ? "error" : "complete",
        input: event.input ?? event.args ?? existing?.input ?? {},
        output: output || existing?.output,
        error: event.error ? String(event.error.message ?? event.error) : existing?.error,
        metadata: result?.metadata ?? existing?.metadata,
        time: {
          created: existing?.time?.created,
          start: existing?.time?.start,
          end: Date.now(),
        },
        live: true,
      });
    };

    const latestRunningAssistant = (state) => {
      const messages = [...state.messages.values()];
      for (let index = messages.length - 1; index >= 0; index -= 1) {
        const message = messages[index];
        if (message.type === "assistant" && message.time?.completed === undefined) return message;
      }
      return undefined;
    };

    const contentText = (content) => {
      if (typeof content === "string") return content;
      if (!Array.isArray(content)) return "";
      return content.map((item) => (item?.type === "text" ? item.text ?? "" : "")).join("");
    };

    // --- capture request headers -------------------------------------------

    try {
      registrations.push(await ctx.session.hook("context", (event) => {
        const state = stateFor(event.sessionID);
        if (!state) return;
        addHeader(state, {
          sessionID: event.sessionID,
          agent: event.agent,
          model: event.model,
          system: event.system,
          tools: event.tools,
          options: event.options,
          messagesCount: Array.isArray(event.messages) ? event.messages.length : null,
          lastMessageID: Array.isArray(event.messages) && event.messages.length > 0
            ? event.messages.at(-1)?.id ?? null
            : null,
          capturedAt: Date.now(),
        });
      }));
    } catch (error) {
      log(`context hook registration failed: ${String(error?.message ?? error)}`);
    }

    try {
      registrations.push(await ctx.session.hook("retry", applyRetryHook));
    } catch (error) {
      log(`retry hook registration failed: ${String(error?.message ?? error)}`);
    }

    for (const phase of ["execute.before", "execute.after"]) {
      try {
        registrations.push(await ctx.tool.hook(phase, (event) => applyToolHook(phase, event)));
      } catch (error) {
        log(`tool hook ${phase} registration failed: ${String(error?.message ?? error)}`);
      }
    }

    // --- live event stream --------------------------------------------------

    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({ signal: controller.signal })) {
          if (closed) break;
          try {
            const sessionID = event?.data?.sessionID;
            if (!sessionID) continue;
            const state = stateFor(sessionID, event?.data?.directory);
            if (!state) continue;
            applyEvent(state, event);
            if (
              event.type === "session.execution.succeeded"
              || event.type === "session.execution.failed"
              || event.type === "session.execution.interrupted"
              || event.type === "session.idle"
            ) {
              scheduleBackfill(state, 900);
            }
          } catch (error) {
            log(`event ${String(event?.type)} failed: ${String(error?.stack ?? error)}`);
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) log(`event stream failed: ${String(error?.stack ?? error)}`);
      }
    })();

    // --- loopback server ----------------------------------------------------

    const handleRequest = async (request, response) => {
      try {
        const url = new URL(request.url ?? "/", "http://127.0.0.1");
        if (request.method !== "GET") {
          sendJson(response, 405, { ok: false, code: "method_not_allowed" });
          return;
        }

        if (url.pathname === "/health") {
          sendJson(response, 200, {
            ok: true,
            plugin: PLUGIN_ID,
            version: PLUGIN_VERSION,
            schemaVersion: SCHEMA_VERSION,
            opencodeVersion: version,
            pid: process.pid,
          });
          return;
        }

        if (!readAuth(request, token)) {
          sendJson(response, 401, { ok: false, code: "unauthorized" });
          return;
        }

        if (url.pathname === "/info") {
          sendJson(response, 200, {
            ok: true,
            plugin: PLUGIN_ID,
            version: PLUGIN_VERSION,
            schemaVersion: SCHEMA_VERSION,
            opencodeVersion: version,
            pid: process.pid,
            startedAt,
            directory: canonicalDirectory,
            project: projectID,
            sessions: [...states.keys()],
          });
          return;
        }

        if (url.pathname === "/snapshot") {
          const sessionID = url.searchParams.get("sessionId");
          if (!sessionID) {
            sendJson(response, 400, { ok: false, code: "missing_session" });
            return;
          }
          const state = stateFor(sessionID, url.searchParams.get("directory"));
          if (!state) {
            sendJson(response, 400, { ok: false, code: "invalid_session" });
            return;
          }
          await backfill(state);

          const afterSeq = numberParam(url.searchParams, "afterSeq", -1);
          const waitMs = Math.min(Math.max(numberParam(url.searchParams, "wait", 0) ?? 0, 0), 15_000);
          if (waitMs > 0 && afterSeq >= state.revision) {
            const changed = await waiters.wait(sessionID, waitMs);
            if (!changed) {
              sendJson(response, 200, {
                ok: true,
                changed: false,
                sessionID,
                revision: state.revision,
              });
              return;
            }
          }

          const snapshot = buildSnapshot(state, {
            limitTurns: numberParam(url.searchParams, "limitTurns", 80),
          });
          sendJson(response, 200, {
            ok: true,
            changed: true,
            ...snapshot,
          });
          return;
        }

        if (url.pathname === "/row") {
          const sessionID = url.searchParams.get("sessionId");
          const rowID = url.searchParams.get("rowId");
          if (!sessionID || !rowID) {
            sendJson(response, 400, { ok: false, code: "missing_parameters" });
            return;
          }
          const state = stateFor(sessionID, url.searchParams.get("directory"));
          if (!state) {
            sendJson(response, 404, { ok: false, code: "session_not_found" });
            return;
          }
          await backfill(state);
          const found = findRow(state, rowID, {
            limitTurns: numberParam(url.searchParams, "limitTurns", 80),
          });
          if (!found) {
            sendJson(response, 404, { ok: false, code: "row_not_found" });
            return;
          }
          sendJson(response, 200, { ok: true, ...found });
          return;
        }

        if (url.pathname === "/header") {
          const sessionID = url.searchParams.get("sessionId");
          const headerId = url.searchParams.get("headerId");
          if (!sessionID || !headerId) {
            sendJson(response, 400, { ok: false, code: "missing_parameters" });
            return;
          }
          const state = stateFor(sessionID, url.searchParams.get("directory"));
          if (!state) {
            sendJson(response, 404, { ok: false, code: "session_not_found" });
            return;
          }
          const header = getHeader(state, headerId);
          if (!header) {
            sendJson(response, 404, { ok: false, code: "header_not_found" });
            return;
          }
          sendJson(response, 200, { ok: true, header });
          return;
        }

        if (url.pathname === "/backfill") {
          const sessionID = url.searchParams.get("sessionId");
          if (!sessionID) {
            sendJson(response, 400, { ok: false, code: "missing_session" });
            return;
          }
          const state = stateFor(sessionID, url.searchParams.get("directory"));
          await backfill(state, { force: boolParam(url.searchParams, "force") });
          sendJson(response, 200, { ok: true, sessionID, revision: state.revision, backfilled: state.backfilled });
          return;
        }

        sendJson(response, 404, { ok: false, code: "not_found" });
      } catch (error) {
        log(`request failed: ${String(error?.stack ?? error)}`);
        if (!response.headersSent) {
          sendJson(response, 500, { ok: false, code: "collector_error", message: String(error?.message ?? error) });
        } else {
          response.end();
        }
      }
    };

    server = http.createServer((request, response) => {
      void handleRequest(request, response);
    });

    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        server.off("error", reject);
        resolve();
      });
    });

    const address = server.address();
    const port = typeof address === "object" && address ? address.port : null;
    if (!port) throw new Error("trajectory collector could not bind a loopback port");

    discoveryFile = path.join(instancesRoot(), `${process.pid}-${crypto.randomBytes(4).toString("hex")}.json`);
    fs.writeFileSync(discoveryFile, safeJson({
      schemaVersion: SCHEMA_VERSION,
      plugin: PLUGIN_ID,
      version: PLUGIN_VERSION,
      opencodeVersion: version,
      pid: process.pid,
      port,
      token,
      directory: canonicalDirectory,
      project: projectID,
      startedAt,
    }), { mode: 0o600 });

    log(`collector ready pid=${process.pid} port=${port} version=${version} directory=${canonicalDirectory ?? "unknown"}`);

    return () => {
      if (closed) return;
      closed = true;
      controller.abort();
      waiters.dispose();
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      for (const registration of registrations) {
        try {
          void registration?.dispose?.();
        } catch {
          // ignore
        }
      }
      try {
        server?.close();
      } catch {
        // ignore
      }
      if (discoveryFile) {
        try {
          fs.unlinkSync(discoveryFile);
        } catch {
          // ignore
        }
      }
      log(`collector stopped pid=${process.pid}`);
    };
  },
};

