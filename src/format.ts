export const formatDuration = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value) || value < 0) return "—";
  if (value < 50) return "<0.1s";
  if (value < 60_000) return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)}s`;
  const seconds = Math.round(value / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
};

export const formatTokens = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(Math.round(value));
};

export const formatCost = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (value === 0) return "$0";
  if (value < 0.0001) return `$${value.toExponential(1)}`;
  return `$${value.toFixed(4)}`;
};

export const formatRate = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value) || value <= 0) return "—";
  if (value > 5000) return "—";
  return `${Math.round(value)} tok/s`;
};

export const formatTime = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const date = new Date(value);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatClock = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const date = new Date(value);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  } as Intl.DateTimeFormatOptions);
};

export const shortModel = (provider: string | undefined, model: string | undefined): string => {
  if (!model) return provider ?? "—";
  return model;
};

export const truncate = (value: string, limit: number): string => {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit)}…`;
};

export const statusTone = (status: string | undefined): "success" | "error" | "warning" | "info" | "muted" => {
  switch (status) {
    case "complete":
    case "completed":
    case "succeeded":
      return "success";
    case "error":
    case "failed":
      return "error";
    case "running":
    case "pending":
      return "warning";
    case "interrupted":
      return "info";
    default:
      return "muted";
  }
};

export const rowLabel = (kind: string): string => {
  switch (kind) {
    case "assistant": return "ASSISTANT";
    case "user": return "USER";
    case "tool": return "TOOL";
    case "compaction": return "COMPACT";
    case "notice": return "NOTICE";
    case "turn-end": return "TURN END";
    default: return kind.toUpperCase();
  }
};

export const safeJson = (value: unknown, limit = 40_000): string => {
  try {
    const text = JSON.stringify(value, null, 2) ?? "";
    return truncate(text, limit);
  } catch {
    return String(value);
  }
};

export const textPreview = (value: string | undefined, limit = 220): string => {
  if (!value) return "";
  const compact = value.replace(/\s+/g, " ").trim();
  return truncate(compact, limit);
};
