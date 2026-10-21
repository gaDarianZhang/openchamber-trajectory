import assert from "node:assert/strict";
import test from "node:test";

import {
  applyDurableMessages,
  applyEvent,
  buildSnapshot,
  createState,
} from "./ledger.js";

const usage = { input: 10, output: 5, reasoning: 2, cache: { read: 3, write: 0 } };

const durableMessages = [
  { id: "u1", type: "user", time: { created: 1000 }, text: "hello" },
  {
    id: "a1",
    type: "assistant",
    time: { created: 1100, streamed: 1300, completed: 2000 },
    agent: "build",
    model: { providerID: "p", id: "m" },
    content: [
      { type: "reasoning", text: "thinking", time: { created: 1150, completed: 1250 } },
      {
        type: "tool",
        id: "call-1",
        name: "shell",
        state: {
          status: "completed",
          input: { command: "echo hi" },
          output: [{ type: "text", text: "hi\n" }],
          metadata: { exit: 0 },
          time: { start: 1350, end: 1450 },
        },
        time: { created: 1350, ran: 1350, completed: 1450 },
      },
    ],
    tokens: usage,
    cost: 0.01,
    finish: "tool-calls",
  },
  {
    id: "a2",
    type: "assistant",
    time: { created: 2000, streamed: 2100, completed: 2200 },
    content: [{ type: "text", text: "done" }],
    tokens: usage,
    cost: 0.01,
    finish: "stop",
  },
  { id: "idle-1", type: "idle", time: { created: 2300 }, outcome: "succeeded" },
];

test("projects turns, steps, tools, TTFT and usage", () => {
  const state = createState({ sessionID: "ses_test" });
  applyDurableMessages(state, durableMessages);
  const snapshot = buildSnapshot(state);

  assert.equal(snapshot.turns.length, 1);
  assert.equal(snapshot.turns[0].steps, 2);
  assert.equal(snapshot.turns[0].tools, 1);
  assert.equal(snapshot.stats.steps, 2);
  assert.equal(snapshot.stats.tools, 1);

  const assistant = snapshot.rows.find((row) => row.id === "assistant:a1");
  assert.ok(assistant);
  assert.equal(assistant.kind, "assistant");
  assert.equal(assistant.timing.ttftMs, 200);
  assert.equal(assistant.time.duration, 900);
  assert.equal(assistant.usage.input, 10);
  assert.equal(assistant.usage.cacheRead, 3);

  const tool = snapshot.rows.find((row) => row.id === "tool:call-1");
  assert.ok(tool);
  assert.equal(tool.time.duration, 100);
  assert.equal(tool.status, "complete");
  assert.match(tool.inputPreview, /echo hi/);
});

test("live events project an open step and settle on the durable page", () => {
  const state = createState({ sessionID: "ses_live" });

  applyEvent(state, {
    type: "session.inbox.enqueued",
    id: "evt-u",
    created: 1000,
    data: {
      sessionID: "ses_live",
      inboxID: "u1",
      item: { type: "user", payload: { text: "hello", files: [] }, delivery: "steer" },
    },
  });
  applyEvent(state, {
    type: "session.step.started",
    id: "evt-s",
    created: 1100,
    data: {
      sessionID: "ses_live",
      assistantMessageID: "a1",
      agent: "build",
      model: { providerID: "p", id: "m" },
    },
  });
  applyEvent(state, {
    type: "session.text.started",
    id: "evt-t0",
    created: 1150,
    data: { sessionID: "ses_live", assistantMessageID: "a1", ordinal: 0 },
  });
  applyEvent(state, {
    type: "session.text.delta",
    id: "evt-t1",
    created: 1200,
    data: { sessionID: "ses_live", assistantMessageID: "a1", ordinal: 0, delta: "hi" },
  });
  applyEvent(state, {
    type: "session.step.streamed",
    id: "evt-stream",
    created: 1300,
    data: { sessionID: "ses_live", assistantMessageID: "a1" },
  });
  applyEvent(state, {
    type: "session.step.ended",
    id: "evt-end",
    created: 1400,
    data: {
      sessionID: "ses_live",
      assistantMessageID: "a1",
      finish: "stop",
      tokens: usage,
      cost: 0.01,
    },
  });
  applyEvent(state, {
    type: "session.execution.succeeded",
    id: "evt-idle",
    created: 1500,
    data: { sessionID: "ses_live" },
  });

  const live = buildSnapshot(state);
  assert.equal(live.turns.length, 1);
  assert.equal(live.turns[0].steps, 1);
  assert.equal(live.rows.find((row) => row.id === "assistant:a1").timing.ttftMs, 200);
  assert.match(live.rows.find((row) => row.id === "assistant:a1").text, /hi/);

  applyDurableMessages(state, durableMessages);
  const settled = buildSnapshot(state);
  assert.equal(settled.turns.length, 1);
  assert.equal(settled.turns[0].steps, 2);
  assert.equal(settled.stats.tools, 1);
});

test("a durable notice replaces its live twin", () => {
  const state = createState({ sessionID: "ses_notice" });
  applyEvent(state, {
    type: "session.instructions.updated",
    id: "evt-notice",
    created: 1000,
    data: { sessionID: "ses_notice", text: "same text", delta: { core: "x" } },
  });
  applyDurableMessages(state, [
    { id: "msg-notice", type: "system", time: { created: 1000 }, text: "same text" },
  ]);
  const snapshot = buildSnapshot(state);
  const notices = new Map(
    [...snapshot.rows, ...snapshot.betweenTurns]
      .filter((row) => row.kind === "notice")
      .map((row) => [row.id, row]),
  );
  assert.equal(notices.size, 1);
});
