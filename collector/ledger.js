/**
 * Pure ledger projection for the OpenCode trajectory collector.
 *
 * No OpenCode imports, no I/O: the plugin feeds durable messages from
 * `session.context()` and live events from the public event stream. Everything
 * here can be unit-tested without a server.
 *
 * The shapes intentionally mirror what the OpenChamber extension renders:
 * a flat list of turns with rows, plus request headers kept separately so a
 * snapshot stays small.
 */

const SCHEMA_VERSION = 1;

export const emptyUsage = () => ({
  input: 0,
  output: 0,
  reasoning: 0,
  cacheRead: 0,
  cacheWrite: 0,
  cost: 0,
});

export const addUsage = (left, right) => ({
  input: (left?.input ?? 0) + (right?.input ?? 0),
  output: (left?.output ?? 0) + (right?.output ?? 0),
  reasoning: (left?.reasoning ?? 0) + (right?.reasoning ?? 0),
  cacheRead: (left?.cacheRead ?? 0) + (right?.cacheRead ?? 0),
  cacheWrite: (left?.cacheWrite ?? 0) + (right?.cacheWrite ?? 0),
  cost: (left?.cost ?? 0) + (right?.cost ?? 0),
});

export const usageFromMessage = (message) => {
  const tokens = message?.tokens;
  if (tokens === undefined && message?.cost === undefined) return undefined;
  return {
    input: numberOrZero(tokens?.input),
    output: numberOrZero(tokens?.output),
    reasoning: numberOrZero(tokens?.reasoning),
    cacheRead: numberOrZero(tokens?.cache?.read ?? tokens?.cacheRead),
    cacheWrite: numberOrZero(tokens?.cache?.write ?? tokens?.cacheWrite),
    cost: numberOrZero(message?.cost),
  };
};

const numberOrZero = (value) => (typeof value === "number" && Number.isFinite(value) ? value : 0);

const numberOrNull = (value) => (typeof value === "number" && Number.isFinite(value) ? value : null);

const textOrNull = (value) => (typeof value === "string" && value.length > 0 ? value : null);

const truncate = (value, limit) => {
  if (typeof value !== "string") return "";
  return value.length > limit ? `${value.slice(0, limit)}…` : value;
};

const asRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;

const readString = (record, key) => {
  const value = record?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
};

const contentText = (content) => {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((item) => {
      if (typeof item === "string") return item;
      if (item?.type === "text" && typeof item.text === "string") return item.text;
      if (typeof item?.text === "string") return item.text;
      return "";
    })
    .join("");
};

const errorText = (error) => {
  if (error === undefined || error === null) return undefined;
  if (typeof error === "string") return error;
  const record = asRecord(error);
  if (!record) return String(error);
  return textOrNull(record.message) ?? textOrNull(record.type) ?? JSON.stringify(error);
};

const errorCode = (error) => {
  const record = asRecord(error);
  return textOrNull(record?.code) ?? textOrNull(record?.type);
};

const headerSummary = (header) => {
  if (!header) return undefined;
  return {
    id: header.id,
    at: header.at,
    model: header.model,
    agent: header.agent,
    systemChars: Array.isArray(header.system)
      ? header.system.reduce((total, part) => total + (typeof part?.text === "string" ? part.text.length : 0), 0)
      : 0,
    toolCount: header.tools ? Object.keys(header.tools).length : 0,
    options: header.options ?? {},
    messagesCount: header.messagesCount ?? null,
  };
};

export function createState({ sessionID, directory = null, title = null }) {
  return {
    sessionID,
    directory,
    title,
    revision: 0,
    updatedAt: Date.now(),
    createdAt: Date.now(),
    messages: new Map(),
    tools: new Map(),
    headers: new Map(),
    headerSeq: 0,
    pendingHeaders: [],
    backfilled: false,
    backfillAt: 0,
    backfilling: null,
    sessionUsage: undefined,
    sessionCost: 0,
    notify: () => {},
  };
}

export function touch(state) {
  state.revision += 1;
  state.updatedAt = Date.now();
  try {
    state.notify(state);
  } catch {
    // A listener must never break the collector.
  }
}

/** Register a request header captured by `session.hook("context")`. */
export function addHeader(state, header) {
  const next = {
    ...header,
    id: ++state.headerSeq,
    at: Date.now(),
  };
  state.headers.set(next.id, next);
  state.pendingHeaders.push(next.id);

  // If the step event arrived before the context hook (rare), attach to the
  // newest assistant step that still has no header.
  const messages = [...state.messages.values()];
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.type !== "assistant") continue;
    if (message.headerId !== undefined) continue;
    if (message.time?.completed !== undefined) continue;
    state.pendingHeaders.pop();
    message.headerId = next.id;
    next.assistantMessageID = message.id;
    break;
  }

  touch(state);
  return next;
}

function takeHeader(state, assistantMessageID) {
  const id = state.pendingHeaders.shift();
  if (id === undefined) return undefined;
  const header = state.headers.get(id);
  if (!header) return undefined;
  header.assistantMessageID = assistantMessageID;
  return header;
}

export function getHeader(state, headerId) {
  return state.headers.get(Number(headerId));
}

/** Upsert a durable or live message record. */
export function upsertMessage(state, message) {
  if (!message?.id) return undefined;
  const previous = state.messages.get(message.id);
  const next = {
    ...previous,
    ...message,
    time: {
      ...(previous?.time ?? {}),
      ...(message.time ?? {}),
    },
  };
  if (message.type === "assistant") {
    next.blocks = message.blocks ?? previous?.blocks ?? [];
  }
  state.messages.set(next.id, next);
  touch(state);
  return next;
}

/** Upsert a tool record keyed by the provider call id. */
export function upsertTool(state, tool) {
  if (!tool?.id) return undefined;
  const previous = state.tools.get(tool.id);
  const next = {
    ...previous,
    ...tool,
    time: {
      ...(previous?.time ?? {}),
      ...(tool.time ?? {}),
    },
  };
  state.tools.set(next.id, next);
  touch(state);
  return next;
}

export function getTool(state, callID) {
  return state.tools.get(callID);
}

/**
 * Replace/merge the durable transcript from `ctx.session.context()`.
 * Live-only fields on an existing record (headerId, retry) survive.
 */
export function applyDurableMessages(state, messages) {
  const seenMessages = new Set();
  const seenTools = new Set();

  for (const raw of messages ?? []) {
    const type = raw?.type;
    if (!type || !raw?.id) continue;
    seenMessages.add(raw.id);

    if (type === "assistant") {
      const content = Array.isArray(raw.content) ? raw.content : [];
      const blocks = [];
      let textOrdinal = 0;
      let reasoningOrdinal = 0;

      for (const item of content) {
        if (item?.type === "text") {
          blocks.push({
            kind: "text",
            ordinal: textOrdinal++,
            text: typeof item.text === "string" ? item.text : "",
            time: { start: item.time?.created ?? raw.time?.created, end: item.time?.completed },
          });
          continue;
        }
        if (item?.type === "reasoning") {
          blocks.push({
            kind: "reasoning",
            ordinal: reasoningOrdinal++,
            text: typeof item.text === "string" ? item.text : "",
            time: { start: item.time?.created, end: item.time?.completed },
          });
          continue;
        }
        if (item?.type === "tool") {
          const tool = durableTool(raw, item);
          seenTools.add(tool.id);
          upsertTool(state, tool);
          blocks.push({ kind: "tool", callID: tool.id, name: tool.name });
        }
      }

      upsertMessage(state, {
        id: raw.id,
        type: "assistant",
        rawType: "assistant",
        time: {
          created: raw.time?.created,
          streamed: raw.time?.streamed,
          completed: raw.time?.completed,
        },
        agent: raw.agent,
        model: raw.model,
        providerID: raw.model?.providerID,
        modelID: raw.model?.id,
        variant: raw.model?.variant,
        tokens: raw.tokens,
        cost: raw.cost,
        finish: raw.finish,
        error: raw.error,
        retry: raw.retry,
        snapshot: raw.snapshot,
        metadata: raw.metadata,
        blocks,
        durable: true,
      });
      continue;
    }

    if (type === "user") {
      upsertMessage(state, {
        id: raw.id,
        type: "user",
        rawType: "user",
        time: { created: raw.time?.created },
        text: raw.text,
        files: raw.files,
        metadata: raw.metadata,
        durable: true,
      });
      continue;
    }

    if (type === "compaction") {
      removeLiveByTime(state, "compaction", raw.time?.created, 5000);
      upsertMessage(state, {
        id: raw.id,
        type: "compaction",
        rawType: "compaction",
        time: { created: raw.time?.created, completed: raw.time?.completed },
        status: raw.status,
        reason: raw.reason,
        summary: raw.summary,
        tokens: raw.tokens,
        cost: raw.cost,
        error: raw.error,
        metadata: raw.metadata,
        durable: true,
      });
      continue;
    }

    if (type === "idle") {
      removeLiveByTime(state, "idle", raw.time?.created, 5000);
      upsertMessage(state, {
        id: raw.id,
        type: "idle",
        rawType: "idle",
        time: { created: raw.time?.created, idle: raw.time?.idle },
        outcome: raw.outcome,
        error: raw.error,
        durable: true,
      });
      continue;
    }

    if (type === "shell") {
      removeLiveDuplicate(state, "shell", raw.time?.created, raw.command);
      upsertMessage(state, {
        id: raw.id,
        type: "shell",
        rawType: "shell",
        time: { created: raw.time?.created, completed: raw.time?.completed },
        command: raw.command,
        status: raw.status,
        output: raw.output,
        exit: raw.exit,
        durable: true,
      });
      continue;
    }

    if (type === "agent-switched" || type === "model-switched" || type === "location-switched") {
      upsertMessage(state, { ...raw, rawType: type, durable: true });
      continue;
    }

    // system / synthetic / skill / anything else with text.
    if (type === "system" || type === "synthetic" || type === "skill") {
      removeLiveDuplicate(state, type, raw.time?.created, raw.text);
    }
    upsertMessage(state, {
      ...raw,
      rawType: type,
      durable: true,
    });
  }

  // Keep live records that the durable page does not have yet (a prompt that
  // is still in the inbox, or the current assistant step). Drop stale live
  // records only when the durable page is clearly ahead of them.
  const oldestDurableAt = Math.min(
    ...messages
      .map((message) => numberOrNull(message?.time?.created))
      .filter((value) => value !== null),
  );
  if (Number.isFinite(oldestDurableAt)) {
    for (const [id, message] of state.messages) {
      if (message.durable) continue;
      if ((message.time?.created ?? 0) < oldestDurableAt && !seenMessages.has(id)) {
        state.messages.delete(id);
      }
    }
  }

  for (const [id, tool] of state.tools) {
    if (tool.durable && !seenTools.has(id) && (tool.time?.created ?? 0) < oldestDurableAt) {
      state.tools.delete(id);
    }
  }

  state.backfilled = true;
  state.backfillAt = Date.now();
  touch(state);
}

function removeLiveByTime(state, type, createdAt, toleranceMs) {
  const stamp = numberOrNull(createdAt);
  if (stamp === null) return;
  for (const [id, message] of state.messages) {
    if (message.durable || message.type !== type) continue;
    const other = numberOrNull(message.time?.created);
    if (other === null || Math.abs(other - stamp) > toleranceMs) continue;
    state.messages.delete(id);
    return;
  }
}

function removeLiveDuplicate(state, type, createdAt, text) {
  const stamp = numberOrNull(createdAt);
  if (stamp === null || typeof text !== "string" || text.length === 0) return;
  for (const [id, message] of state.messages) {
    if (message.durable || message.type !== type) continue;
    if (typeof message.text !== "string" || message.text !== text) continue;
    const other = numberOrNull(message.time?.created);
    if (other === null || Math.abs(other - stamp) > 5000) continue;
    state.messages.delete(id);
    return;
  }
}

function durableTool(message, item) {
  const state = item.state ?? {};
  const status = state.status === "completed"
    ? "complete"
    : state.status === "error"
      ? "error"
      : state.status === "running"
        ? "running"
        : "pending";
  return {
    id: String(item.id),
    name: item.name,
    parentAssistantID: message.id,
    status,
    input: state.input ?? {},
    rawInput: state.raw,
    output: contentText(state.output ?? state.content),
    error: errorText(state.error),
    errorCode: errorCode(state.error),
    metadata: state.metadata,
    executed: item.executed,
    time: {
      created: item.time?.created ?? message.time?.created,
      start: state.time?.start ?? item.time?.ran,
      end: state.time?.end ?? item.time?.completed,
    },
    durable: true,
  };
}

/** Apply one public OpenCode event. */
export function applyEvent(state, event) {
  const data = event?.data ?? {};
  const type = event?.type;
  const at = numberOrNull(event?.created) ?? Date.now();

  switch (type) {
    case "session.inbox.enqueued": {
      const item = data.item;
      if (item?.type === "user" && data.inboxID) {
        upsertMessage(state, {
          id: data.inboxID,
          type: "user",
          time: { created: at },
          text: item.payload?.text,
          files: item.payload?.files,
          metadata: item.payload?.metadata,
          delivery: item.delivery,
          live: true,
        });
      } else if (item?.type === "synthetic" && data.inboxID) {
        upsertMessage(state, {
          id: data.inboxID,
          type: "synthetic",
          time: { created: at },
          text: item.payload?.text,
          description: item.payload?.description,
          metadata: item.payload?.metadata,
          live: true,
        });
      }
      break;
    }

    case "session.inbox.delivered": {
      const message = data.inboxID ? state.messages.get(data.inboxID) : undefined;
      if (message) {
        message.time.created = at;
        message.delivered = true;
        touch(state);
      }
      break;
    }

    case "session.step.started": {
      if (!data.assistantMessageID) break;
      const header = takeHeader(state, data.assistantMessageID);
      upsertMessage(state, {
        id: data.assistantMessageID,
        type: "assistant",
        time: { created: at },
        agent: data.agent,
        model: data.model,
        providerID: data.model?.providerID,
        modelID: data.model?.id,
        variant: data.model?.variant,
        snapshot: data.snapshot ? { start: data.snapshot } : undefined,
        blocks: [],
        status: "running",
        headerId: header?.id,
        headersMissing: header === undefined,
        live: true,
      });
      break;
    }

    case "session.step.streamed": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (message) {
        message.time.streamed = at;
        touch(state);
      }
      break;
    }

    case "session.step.ended": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (message) {
        message.time.completed = at;
        message.finish = data.finish;
        message.tokens = data.tokens;
        message.cost = data.cost;
        message.snapshot = data.snapshot ? { end: data.snapshot, files: data.files } : message.snapshot;
        message.status = "complete";
        message.retry = undefined;
        touch(state);
      }
      break;
    }

    case "session.step.failed": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (message) {
        message.time.completed = at;
        message.finish = data.finish ?? "error";
        message.error = data.error;
        message.tokens = data.tokens;
        message.cost = data.cost;
        message.status = "error";
        message.retry = undefined;
        touch(state);
      }
      break;
    }

    case "session.retry.scheduled": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (message) {
        message.retry = { attempt: data.attempt, at: data.at ?? at, error: data.error };
        touch(state);
      }
      break;
    }

    case "session.text.started": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "text" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "text", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      block.time = { ...(block.time ?? {}), start: block.time?.start ?? at };
      touch(state);
      break;
    }

    case "session.text.delta": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "text" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "text", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      block.text = `${block.text ?? ""}${data.delta ?? ""}`;
      block.time = { ...(block.time ?? {}), start: block.time?.start ?? at };
      touch(state);
      break;
    }

    case "session.text.ended": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "text" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "text", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      if (typeof data.text === "string") block.text = data.text;
      block.time = { ...(block.time ?? {}), end: at };
      touch(state);
      break;
    }

    case "session.reasoning.started": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "reasoning" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "reasoning", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      block.time = { ...(block.time ?? {}), start: block.time?.start ?? at };
      touch(state);
      break;
    }

    case "session.reasoning.delta": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "reasoning" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "reasoning", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      block.text = `${block.text ?? ""}${data.delta ?? ""}`;
      block.time = { ...(block.time ?? {}), start: block.time?.start ?? at };
      touch(state);
      break;
    }

    case "session.reasoning.ended": {
      const message = data.assistantMessageID ? state.messages.get(data.assistantMessageID) : undefined;
      if (!message) break;
      message.blocks = message.blocks ?? [];
      const ordinal = Number.isInteger(data.ordinal) ? data.ordinal : 0;
      let block = message.blocks.find((item) => item.kind === "reasoning" && item.ordinal === ordinal);
      if (!block) {
        block = { kind: "reasoning", ordinal, text: "", time: { start: at } };
        message.blocks.push(block);
      }
      if (typeof data.text === "string") block.text = data.text;
      block.time = { ...(block.time ?? {}), end: at };
      touch(state);
      break;
    }

    case "session.tool.input.started": {
      if (!data.id) break;
      upsertTool(state, {
        id: String(data.id),
        name: data.name,
        parentAssistantID: data.assistantMessageID,
        status: "pending",
        input: {},
        rawInput: "",
        time: { created: at },
        live: true,
      });
      break;
    }

    case "session.tool.input.delta": {
      if (!data.id) break;
      const tool = state.tools.get(String(data.id));
      if (!tool) break;
      tool.rawInput = `${tool.rawInput ?? ""}${data.delta ?? ""}`;
      touch(state);
      break;
    }

    case "session.tool.input.ended": {
      if (!data.id) break;
      const tool = state.tools.get(String(data.id));
      if (!tool) break;
      tool.rawInput = typeof data.text === "string" ? data.text : tool.rawInput;
      touch(state);
      break;
    }

    case "session.tool.called": {
      if (!data.id) break;
      upsertTool(state, {
        id: String(data.id),
        name: data.name,
        parentAssistantID: data.assistantMessageID,
        status: "running",
        input: data.input ?? {},
        executed: data.executed,
        time: { created: state.tools.get(String(data.id))?.time?.created ?? at, start: at },
        live: true,
      });
      break;
    }

    case "session.tool.progress": {
      if (!data.id) break;
      const tool = state.tools.get(String(data.id));
      if (!tool) break;
      tool.metadata = data.metadata;
      touch(state);
      break;
    }

    case "session.tool.success": {
      if (!data.id) break;
      upsertTool(state, {
        id: String(data.id),
        name: data.name,
        parentAssistantID: data.assistantMessageID,
        status: "complete",
        output: contentText(data.content),
        metadata: data.metadata,
        executed: data.executed,
        time: { end: at },
        live: true,
      });
      break;
    }

    case "session.tool.failed": {
      if (!data.id) break;
      upsertTool(state, {
        id: String(data.id),
        name: data.name,
        parentAssistantID: data.assistantMessageID,
        status: "error",
        output: contentText(data.content),
        error: errorText(data.error),
        errorCode: errorCode(data.error),
        metadata: data.metadata,
        executed: data.executed,
        time: { end: at },
        live: true,
      });
      break;
    }

    case "session.compaction.started": {
      const id = data.inputID ?? `compaction:${event.id}`;
      upsertMessage(state, {
        id,
        type: "compaction",
        time: { created: at },
        status: "running",
        reason: data.reason,
        summary: "",
        live: true,
      });
      break;
    }

    case "session.compaction.delta": {
      const message = latestMessageOfType(state, "compaction", "running");
      if (message) {
        message.summary = `${message.summary ?? ""}${data.text ?? ""}`;
        touch(state);
      }
      break;
    }

    case "session.compaction.ended": {
      const message = (data.inputID ? state.messages.get(data.inputID) : undefined)
        ?? latestMessageOfType(state, "compaction", "running");
      if (!message) break;
      message.status = "completed";
      message.summary = data.text ?? message.summary;
      message.tokens = data.tokens;
      message.cost = data.cost;
      message.time.completed = at;
      touch(state);
      break;
    }

    case "session.compaction.failed": {
      const id = data.inputID ?? `compaction:${event.id}`;
      const message = state.messages.get(id) ?? latestMessageOfType(state, "compaction", "running");
      if (message) {
        message.status = "failed";
        message.error = data.error;
        message.tokens = data.tokens;
        message.cost = data.cost;
        message.time.completed = at;
        touch(state);
      } else {
        upsertMessage(state, {
          id,
          type: "compaction",
          time: { created: at, completed: at },
          status: "failed",
          reason: data.reason,
          error: data.error,
          tokens: data.tokens,
          cost: data.cost,
          live: true,
        });
      }
      break;
    }

    case "session.execution.succeeded":
    case "session.execution.failed":
    case "session.execution.interrupted": {
      if (type === "session.execution.interrupted" && data.reason === "shutdown") break;
      addIdle(state, {
        id: `idle:${event.id}`,
        time: { created: at, idle: at },
        outcome: type === "session.execution.succeeded"
          ? "succeeded"
          : type === "session.execution.failed"
            ? "failed"
            : "interrupted",
        error: data.error,
      });
      break;
    }

    case "session.idle": {
      addIdle(state, {
        id: `idle:${event.id}`,
        time: { created: at, idle: at },
        outcome: data.outcome ?? "succeeded",
      });
      break;
    }

    case "session.instructions.updated": {
      if (typeof data.text !== "string") break;
      upsertMessage(state, {
        id: event.id ?? `instructions:${at}`,
        type: "system",
        time: { created: at },
        text: data.text,
        description: `Instructions updated: ${Object.keys(data.delta ?? {}).join(", ")}`,
        metadata: { notice: "instructions", instructionSources: Object.keys(data.delta ?? {}) },
        live: true,
      });
      break;
    }

    case "session.synthetic": {
      upsertMessage(state, {
        id: event.id ?? `synthetic:${at}`,
        type: "synthetic",
        time: { created: at },
        text: data.text,
        description: data.description,
        metadata: data.metadata,
        live: true,
      });
      break;
    }

    case "session.skill.activated": {
      upsertMessage(state, {
        id: event.id ?? `skill:${at}`,
        type: "skill",
        time: { created: at },
        skill: data.id,
        name: data.name,
        text: data.text,
        live: true,
      });
      break;
    }

    case "session.shell.started":
    case "session.shell.ended": {
      if (!data.id) break;
      upsertMessage(state, {
        id: data.id,
        type: "shell",
        time: {
          created: type === "session.shell.started" ? at : state.messages.get(data.id)?.time?.created,
          completed: type === "session.shell.ended" ? at : undefined,
        },
        command: data.command,
        status: type === "session.shell.started" ? "running" : data.status,
        output: data.output,
        exit: data.exit,
        live: true,
      });
      break;
    }

    case "session.usage.updated": {
      state.sessionUsage = data.tokens;
      state.sessionCost = data.cost;
      break;
    }

    default:
      break;
  }
}

function latestMessageOfType(state, type, status) {
  const messages = [...state.messages.values()];
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.type !== type) continue;
    if (status !== undefined && message.status !== status) continue;
    return message;
  }
  return undefined;
}

function addIdle(state, idle) {
  // `execution.succeeded` and `session.idle` both fire for one turn. Keep one
  // record when they land within a second of each other.
  const existing = [...state.messages.values()]
    .filter((message) => message.type === "idle")
    .at(-1);
  if (existing && Math.abs((existing.time?.created ?? 0) - idle.time.created) < 1000) {
    existing.outcome = idle.outcome ?? existing.outcome;
    existing.error = idle.error ?? existing.error;
    touch(state);
    return;
  }
  upsertMessage(state, {
    id: idle.id,
    type: "idle",
    time: idle.time,
    outcome: idle.outcome,
    error: idle.error,
    live: true,
  });
}

function assistantStatus(message) {
  if (message.error || message.status === "error") return "error";
  if (message.time?.completed === undefined) return "running";
  if (message.finish === "error") return "error";
  return "complete";
}

function assistantTiming(message) {
  const created = numberOrNull(message.time?.created);
  const firstToken = numberOrNull(message.time?.streamed);
  const completed = numberOrNull(message.time?.completed);
  const ttftMs = created !== null && firstToken !== null && firstToken >= created ? firstToken - created : null;
  const decodeMs = firstToken !== null && completed !== null && completed >= firstToken ? completed - firstToken : null;
  const durationMs = created !== null && completed !== null && completed >= created ? completed - created : null;
  const output = numberOrZero(message.tokens?.output);
  const reasoning = numberOrZero(message.tokens?.reasoning);
  const throughput = decodeMs !== null && decodeMs > 0 ? ((output + reasoning) / decodeMs) * 1000 : null;
  return {
    startedAt: created,
    firstTokenAt: firstToken,
    completedAt: completed,
    ttftMs,
    decodeMs,
    durationMs,
    throughput,
  };
}

function assistantBlocks(message) {
  const blocks = Array.isArray(message.blocks) ? message.blocks : [];
  return blocks
    .map((block) => {
      if (block.kind === "tool") {
        return { kind: "tool", callID: block.callID, name: block.name };
      }
      return {
        kind: block.kind,
        ordinal: block.ordinal,
        text: truncate(block.text ?? "", 6000),
        textLength: typeof block.text === "string" ? block.text.length : 0,
        time: block.time,
      };
    })
    .sort((left, right) => {
      if (left.kind === right.kind) return (left.ordinal ?? 0) - (right.ordinal ?? 0);
      return 0;
    });
}

function assistantText(message) {
  return assistantBlocks(message)
    .filter((block) => block.kind === "text")
    .map((block) => block.text)
    .join("\n");
}

function assistantReasoning(message) {
  return assistantBlocks(message)
    .filter((block) => block.kind === "reasoning")
    .map((block) => block.text)
    .join("\n");
}

function toolPreview(tool) {
  if (!tool) return "";
  if (typeof tool.input?.command === "string") return tool.input.command;
  if (typeof tool.input?.filePath === "string") return tool.input.filePath;
  if (typeof tool.input?.path === "string") return tool.input.path;
  if (typeof tool.input?.pattern === "string") return tool.input.pattern;
  if (tool.rawInput) return tool.rawInput;
  try {
    return JSON.stringify(tool.input ?? {});
  } catch {
    return "";
  }
}

function buildToolRow(tool, turn, step, request) {
  const start = numberOrNull(tool.time?.start ?? tool.time?.created);
  const end = numberOrNull(tool.time?.end);
  return {
    id: `tool:${tool.id}`,
    kind: "tool",
    callID: tool.id,
    messageID: tool.parentAssistantID,
    parentAssistantID: tool.parentAssistantID,
    turn,
    step,
    request,
    name: tool.name,
    status: tool.status ?? "pending",
    time: {
      start,
      end,
      duration: start !== null && end !== null && end >= start ? end - start : null,
    },
    inputPreview: truncate(toolPreview(tool), 800),
    outputPreview: truncate(tool.output ?? "", 3000),
    outputLength: typeof tool.output === "string" ? tool.output.length : 0,
    error: tool.error,
    errorCode: tool.errorCode,
    executed: tool.executed,
    metadata: tool.metadata,
  };
}

function buildAssistantRow(message, turn, step, request, cumulativeUsage) {
  const usage = usageFromMessage(message);
  const timing = assistantTiming(message);
  const blocks = assistantBlocks(message);
  const toolIDs = blocks.filter((block) => block.kind === "tool").map((block) => block.callID);
  const header = message.headerId !== undefined ? undefined : undefined;
  return {
    id: `assistant:${message.id}`,
    kind: "assistant",
    messageID: message.id,
    turn,
    step,
    request,
    status: assistantStatus(message),
    time: {
      start: timing.startedAt,
      firstToken: timing.firstTokenAt,
      end: timing.completedAt,
      duration: timing.durationMs,
    },
    timing: {
      ttftMs: timing.ttftMs,
      decodeMs: timing.decodeMs,
      throughput: timing.throughput,
    },
    usage,
    cumulativeUsage,
    model: message.model,
    provider: message.model?.providerID ?? message.providerID,
    modelID: message.model?.id ?? message.modelID,
    variant: message.model?.variant ?? message.variant,
    agent: message.agent,
    finish: message.finish,
    error: errorText(message.error),
    errorCode: errorCode(message.error),
    retry: message.retry
      ? {
        attempt: message.retry.attempt,
        at: message.retry.at,
        error: errorText(message.retry.error),
        errorCode: errorCode(message.retry.error),
      }
      : undefined,
    blocks,
    toolIDs,
    text: truncate(assistantText(message), 6000),
    textLength: assistantText(message).length,
    reasoning: truncate(assistantReasoning(message), 4000),
    headerId: message.headerId,
    headersMissing: message.headersMissing === true || message.headerId === undefined,
  };
}

function buildUserRow(message, turn, steer) {
  return {
    id: `user:${message.id}`,
    kind: "user",
    messageID: message.id,
    turn,
    time: { start: numberOrNull(message.time?.created) },
    text: truncate(message.text ?? "", 6000),
    textLength: typeof message.text === "string" ? message.text.length : 0,
    files: Array.isArray(message.files)
      ? message.files.map((file) => ({
        name: file?.name ?? null,
        mime: file?.mime ?? file?.type ?? null,
        size: file?.size ?? null,
      }))
      : [],
    steer: Boolean(steer),
  };
}

function buildCompactionRow(message, turn, request, cumulativeUsage) {
  const usage = usageFromMessage(message);
  const created = numberOrNull(message.time?.created);
  const completed = numberOrNull(message.time?.completed);
  return {
    id: `compaction:${message.id}`,
    kind: "compaction",
    messageID: message.id,
    turn,
    request,
    status: message.status ?? (message.time?.completed ? "completed" : "running"),
    time: {
      start: created,
      end: completed,
      duration: created !== null && completed !== null && completed >= created ? completed - created : null,
    },
    summary: truncate(message.summary ?? "", 6000),
    summaryLength: typeof message.summary === "string" ? message.summary.length : 0,
    reason: message.reason,
    usage,
    cumulativeUsage,
    error: errorText(message.error),
    errorCode: errorCode(message.error),
  };
}

function buildNoticeRow(message, turn) {
  const text = message.text ?? message.command ?? "";
  return {
    id: `notice:${message.id}`,
    kind: "notice",
    messageID: message.id,
    turn,
    role: message.type,
    time: { start: numberOrNull(message.time?.created), end: numberOrNull(message.time?.completed) },
    text: truncate(text, 6000),
    description: message.description ?? message.status ?? null,
    skill: message.skill ?? null,
    name: message.name ?? null,
    command: message.command ?? null,
  };
}

/**
 * Build the render snapshot. Turns are chronological; a session with no turn
 * yet returns a synthetic "between turns" bucket for compactions/notices.
 */
export function buildSnapshot(state, options = {}) {
  const limitTurns = Number.isInteger(options.limitTurns) && options.limitTurns > 0 ? options.limitTurns : 80;
  const messages = [...state.messages.values()].sort(compareMessages);
  const toolsByAssistant = new Map();
  const orphanTools = [];
  for (const tool of state.tools.values()) {
    if (tool.parentAssistantID) {
      const list = toolsByAssistant.get(tool.parentAssistantID) ?? [];
      list.push(tool);
      toolsByAssistant.set(tool.parentAssistantID, list);
    } else {
      orphanTools.push(tool);
    }
  }
  for (const list of toolsByAssistant.values()) list.sort(compareTools);
  orphanTools.sort(compareTools);

  const turns = [];
  const betweenTurns = [];
  let current = null;
  let turnIndex = 0;
  let step = 0;
  let request = 0;
  let cumulativeUsage = undefined;
  let totalTools = 0;
  let totalSteps = 0;
  let totalMessages = 0;
  const allUsage = emptyUsage();

  const startTurn = (message) => {
    turnIndex += 1;
    step = 0;
    const turn = {
      index: turnIndex,
      start: numberOrNull(message?.time?.created) ?? Date.now(),
      end: null,
      status: "running",
      steps: 0,
      tools: 0,
      usage: emptyUsage(),
      cost: 0,
      ttftMs: null,
      duration: null,
      rowIDs: [],
    };
    turns.push(turn);
    current = turn;
    return turn;
  };

  const pushRow = (row) => {
    if (!current) {
      betweenTurns.push(row);
      return;
    }
    row.turn = current.index;
    current.rowIDs.push(row.id);
    current.rows = current.rows ?? [];
    current.rows.push(row);
  };

  for (const message of messages) {
    totalMessages += 1;
    if (message.type === "user") {
      const hasRunningAssistant = current?.rows?.some((row) => row.kind === "assistant" && row.status === "running");
      if (!current) startTurn(message);
      else if (!hasRunningAssistant) {
        current.end = numberOrNull(message.time?.created);
        current.status = current.status === "running" ? "complete" : current.status;
        startTurn(message);
      }
      pushRow(buildUserRow(message, current.index, current.rows?.some((row) => row.kind === "user")));
      continue;
    }

    if (message.type === "assistant") {
      if (!current) startTurn(message);
      step += 1;
      request += 1;
      const usage = usageFromMessage(message);
      const row = buildAssistantRow(message, current.index, step, request, cumulativeUsage);
      pushRow(row);
      current.steps += 1;
      totalSteps += 1;
      if (usage) {
        current.usage = addUsage(current.usage, usage);
        current.cost += usage.cost;
        cumulativeUsage = addUsage(cumulativeUsage, usage);
        Object.assign(allUsage, addUsage(allUsage, usage));
      }
      const toolList = toolsByAssistant.get(message.id) ?? [];
      for (const tool of toolList) {
        pushRow(buildToolRow(tool, current.index, step, request));
        current.tools += 1;
        totalTools += 1;
      }
      if (current.ttftMs === null && row.timing.ttftMs !== null) current.ttftMs = row.timing.ttftMs;
      continue;
    }

    if (message.type === "compaction") {
      request += 1;
      const usage = usageFromMessage(message);
      const row = buildCompactionRow(message, current?.index ?? null, request, cumulativeUsage);
      if (!current) {
        betweenTurns.push(row);
      } else {
        pushRow(row);
      }
      if (usage) {
        if (current) {
          current.usage = addUsage(current.usage, usage);
          current.cost += usage.cost;
        }
        cumulativeUsage = addUsage(cumulativeUsage, usage);
        Object.assign(allUsage, addUsage(allUsage, usage));
      }
      continue;
    }

    if (message.type === "idle") {
      if (!current) continue;
      const at = numberOrNull(message.time?.created) ?? numberOrNull(message.time?.idle);
      current.end = at ?? current.end;
      current.status = message.outcome === "failed"
        ? "error"
        : message.outcome === "interrupted"
          ? "interrupted"
          : "complete";
      current.error = errorText(message.error);
      current.rowIDs.push(`turn-end:${message.id}`);
      current.rows = current.rows ?? [];
      current.rows.push({
        id: `turn-end:${message.id}`,
        kind: "turn-end",
        turn: current.index,
        time: { start: at },
        outcome: message.outcome,
        error: errorText(message.error),
      });
      current = null;
      continue;
    }

    if (message.type === "shell") {
      const row = buildNoticeRow(message, current?.index ?? null);
      if (!current) betweenTurns.push(row);
      else pushRow(row);
      continue;
    }

    // system / synthetic / skill / switched notices
    const row = buildNoticeRow(message, current?.index ?? null);
    if (!current) betweenTurns.push(row);
    else pushRow(row);
  }

  if (current) {
    current.end = current.end ?? ((current.rows ?? []).reduce((latest, row) => Math.max(latest, row.time?.end ?? row.time?.start ?? 0), 0) || null);
  }

  for (const tool of orphanTools) {
    const row = buildToolRow(tool, turns.at(-1)?.index ?? null, 0, 0);
    if (turns.length === 0) betweenTurns.push(row);
    else {
      const last = turns.at(-1);
      last.rows = last.rows ?? [];
      last.rows.push(row);
      last.rowIDs.push(row.id);
      last.tools += 1;
      totalTools += 1;
    }
  }

  for (const turn of turns) {
    turn.rows = (turn.rows ?? []).sort(compareRows);
    turn.duration = turn.start !== null && turn.end !== null && turn.end >= turn.start ? turn.end - turn.start : null;
    turn.status = turn.status === "running" && turn.end !== null ? "complete" : turn.status;
  }
  betweenTurns.sort(compareRows);

  const hasOlder = turns.length > limitTurns;
  const visibleTurns = hasOlder ? turns.slice(-limitTurns) : turns;
  const visibleTurnIDs = new Set(visibleTurns.map((turn) => turn.index));
  const visibleBetween = betweenTurns.filter((row) => row.turn === null || visibleTurnIDs.has(row.turn));
  const visibleRows = visibleTurns.flatMap((turn) => turn.rows ?? []).concat(visibleBetween);

  return {
    schemaVersion: SCHEMA_VERSION,
    sessionID: state.sessionID,
    directory: state.directory,
    title: state.title,
    revision: state.revision,
    generatedAt: Date.now(),
    updatedAt: state.updatedAt,
    turns: visibleTurns,
    betweenTurns: visibleBetween,
    rows: visibleRows,
    hasOlder,
    totalTurns: turns.length,
    stats: {
      messages: totalMessages,
      steps: totalSteps,
      tools: totalTools,
      usage: allUsage,
      cost: numberOrZero(allUsage.cost),
    },
    collector: {
      backfilled: state.backfilled,
      backfillAt: state.backfillAt || null,
      sessionCost: state.sessionCost,
      sessionUsage: state.sessionUsage ?? null,
    },
  };
}

function compareMessages(left, right) {
  const leftTime = numberOrNull(left.time?.created) ?? 0;
  const rightTime = numberOrNull(right.time?.created) ?? 0;
  if (leftTime !== rightTime) return leftTime - rightTime;
  return String(left.id).localeCompare(String(right.id));
}

function compareTools(left, right) {
  const leftTime = numberOrNull(left.time?.start ?? left.time?.created) ?? 0;
  const rightTime = numberOrNull(right.time?.start ?? right.time?.created) ?? 0;
  if (leftTime !== rightTime) return leftTime - rightTime;
  return String(left.id).localeCompare(String(right.id));
}

function compareRows(left, right) {
  const leftTime = numberOrNull(left.time?.start) ?? 0;
  const rightTime = numberOrNull(right.time?.start) ?? 0;
  if (leftTime !== rightTime) return leftTime - rightTime;
  return String(left.id).localeCompare(String(right.id));
}

export function findRow(state, rowID, options = {}) {
  const snapshot = buildSnapshot(state, options);
  const row = snapshot.rows.find((candidate) => candidate.id === rowID);
  if (!row) return undefined;
  if (row.kind === "assistant" || row.kind === "user" || row.kind === "compaction" || row.kind === "notice") {
    const message = state.messages.get(row.messageID);
    return {
      row,
      message,
      tools: message?.type === "assistant"
        ? [...state.tools.values()].filter((tool) => tool.parentAssistantID === message.id)
        : [],
      header: row.headerId !== undefined ? state.headers.get(row.headerId) : undefined,
    };
  }
  if (row.kind === "tool") {
    const tool = state.tools.get(row.callID);
    const message = tool?.parentAssistantID ? state.messages.get(tool.parentAssistantID) : undefined;
    return {
      row,
      tool,
      message,
      header: message?.headerId !== undefined ? state.headers.get(message.headerId) : undefined,
    };
  }
  return { row };
}

export { SCHEMA_VERSION, headerSummary };
