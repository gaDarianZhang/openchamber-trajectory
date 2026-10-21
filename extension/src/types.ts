export type TrajectoryUsage = {
  input: number;
  output: number;
  reasoning: number;
  cacheRead: number;
  cacheWrite: number;
  cost: number;
};

export type TrajectoryStatus = "running" | "complete" | "error" | "interrupted" | "pending";

export type TrajectoryTiming = {
  startedAt: number | null;
  firstTokenAt: number | null;
  completedAt: number | null;
  ttftMs: number | null;
  decodeMs: number | null;
  durationMs: number | null;
  throughput: number | null;
};

type RowBase = {
  id: string;
  turn: number | null;
  time?: {
    start?: number | null;
    end?: number | null;
    duration?: number | null;
    firstToken?: number | null;
  };
};

export type UserRow = RowBase & {
  kind: "user";
  messageID: string;
  text: string;
  textLength: number;
  files: Array<{ name?: string | null; mime?: string | null; size?: number | null }>;
  steer?: boolean;
};

export type AssistantBlock =
  | { kind: "text"; ordinal: number; text: string; textLength: number; time?: { start?: number; end?: number } }
  | { kind: "reasoning"; ordinal: number; text: string; textLength: number; time?: { start?: number; end?: number } }
  | { kind: "tool"; callID: string; name: string };

export type AssistantRow = RowBase & {
  kind: "assistant";
  messageID: string;
  step: number;
  request: number;
  status: TrajectoryStatus;
  timing: {
    ttftMs: number | null;
    decodeMs: number | null;
    throughput: number | null;
  };
  usage?: TrajectoryUsage;
  cumulativeUsage?: TrajectoryUsage;
  model?: { id: string; providerID: string; variant?: string };
  provider?: string;
  modelID?: string;
  variant?: string;
  agent?: string;
  finish?: string;
  error?: string;
  errorCode?: string | null;
  retry?: { attempt?: number; at?: number; error?: string; errorCode?: string | null };
  blocks: AssistantBlock[];
  toolIDs: string[];
  text: string;
  textLength: number;
  reasoning: string;
  headerId?: number;
  headersMissing: boolean;
};

export type ToolRow = RowBase & {
  kind: "tool";
  callID: string;
  messageID?: string;
  parentAssistantID?: string;
  step: number;
  request: number;
  name: string;
  status: TrajectoryStatus;
  inputPreview: string;
  outputPreview: string;
  outputLength: number;
  error?: string;
  errorCode?: string | null;
  executed?: boolean;
  metadata?: unknown;
};

export type CompactionRow = RowBase & {
  kind: "compaction";
  messageID: string;
  request: number;
  status: string;
  summary: string;
  summaryLength: number;
  reason?: string;
  usage?: TrajectoryUsage;
  cumulativeUsage?: TrajectoryUsage;
  error?: string;
  errorCode?: string | null;
};

export type NoticeRow = RowBase & {
  kind: "notice";
  messageID: string;
  role: string;
  text: string;
  description?: string | null;
  skill?: string | null;
  name?: string | null;
  command?: string | null;
};

export type TurnEndRow = RowBase & {
  kind: "turn-end";
  outcome?: string;
  error?: string;
};

export type TrajectoryRow =
  | UserRow
  | AssistantRow
  | ToolRow
  | CompactionRow
  | NoticeRow
  | TurnEndRow;

export type TrajectoryTurn = {
  index: number;
  start: number;
  end: number | null;
  status: string;
  steps: number;
  tools: number;
  usage: TrajectoryUsage;
  cost: number;
  ttftMs: number | null;
  duration: number | null;
  rows: TrajectoryRow[];
  rowIDs: string[];
};

export type TrajectoryStats = {
  messages: number;
  steps: number;
  tools: number;
  usage: TrajectoryUsage;
  cost: number;
};

export type CollectorInfo = {
  pid: number;
  port: number;
  version: string;
  opencodeVersion: string;
  directory: string | null;
};

export type TrajectorySnapshot = {
  ok: true;
  changed: true;
  schemaVersion: number;
  sessionID: string;
  directory: string | null;
  title: string | null;
  revision: number;
  generatedAt: number;
  updatedAt: number;
  turns: TrajectoryTurn[];
  betweenTurns: TrajectoryRow[];
  rows: TrajectoryRow[];
  hasOlder: boolean;
  totalTurns: number;
  stats: TrajectoryStats;
  collector: {
    backfilled: boolean;
    backfillAt: number | null;
    sessionCost: number;
    sessionUsage: TrajectoryUsage | null;
  };
  collectorInfo?: CollectorInfo;
};

export type LedgerFailure = {
  ok: false;
  code: string;
  message?: string;
  install?: string;
};

export type LedgerResponse = TrajectorySnapshot | LedgerFailure | {
  ok: true;
  changed: false;
  sessionID: string;
  revision: number;
  collector?: CollectorInfo;
};

export type RequestHeader = {
  id: number;
  sessionID: string;
  assistantMessageID?: string;
  agent?: string;
  model?: { id: string; providerID: string; variant?: string };
  system?: Array<{ type?: string; text?: string }>;
  tools?: Record<string, { description?: string; input?: unknown }>;
  options?: Record<string, unknown>;
  messagesCount?: number | null;
  lastMessageID?: string | null;
  capturedAt?: number;
  at?: number;
};

export type RowDetail = {
  ok: true;
  row: TrajectoryRow;
  message?: Record<string, unknown>;
  tool?: Record<string, unknown>;
  tools?: Array<Record<string, unknown>>;
  header?: RequestHeader;
};

export type HostContextLike = {
  surface: string;
  locale: string;
  directory: string | null;
  session: { id: string; title: string; busy: boolean; model?: string; agent?: string } | null;
};
