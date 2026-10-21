import React from "react";
import { connectHost } from "@openchamber/sdk";

import {
  formatClock,
  formatCost,
  formatDuration,
  formatRate,
  formatTime,
  formatTokens,
  rowLabel,
  safeJson,
  statusTone,
} from "../format";
import type {
  AssistantRow,
  RowDetail,
  ToolRow,
  TrajectoryRow,
  TrajectoryUsage,
} from "../types";

type HostClient = ReturnType<typeof connectHost>;

type Props = {
  host: HostClient;
  sessionId: string;
  directory: string | null;
  selected: TrajectoryRow | null;
  detail: RowDetail | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
};

type Tab = "summary" | "input" | "output" | "timing" | "usage" | "request" | "raw";

const tabsFor = (row: TrajectoryRow): Tab[] => {
  switch (row.kind) {
    case "assistant":
      return ["summary", "output", "timing", "usage", "request", "raw"];
    case "tool":
      return ["summary", "input", "output", "timing", "raw"];
    case "user":
      return ["summary", "input", "raw"];
    case "compaction":
      return ["summary", "output", "timing", "usage", "raw"];
    case "notice":
      return ["summary", "output", "raw"];
    default:
      return ["summary", "raw"];
  }
};

const usageRows = (usage: TrajectoryUsage | undefined): Array<[string, string]> => {
  if (!usage) return [];
  return [
    ["Input", formatTokens(usage.input)],
    ["Output", formatTokens(usage.output)],
    ["Reasoning", formatTokens(usage.reasoning)],
    ["Cache read", formatTokens(usage.cacheRead)],
    ["Cache write", formatTokens(usage.cacheWrite)],
    ["Cost", formatCost(usage.cost)],
  ];
};

const KeyValue: React.FC<{ label: string; value: React.ReactNode; mono?: boolean }> = ({ label, value, mono }) => (
  <div className="kv">
    <span className="kv-label">{label}</span>
    <span className={`kv-value${mono ? " mono" : ""}`}>{value}</span>
  </div>
);

const PreBlock: React.FC<{ text: string; limit?: number; copy?: (text: string) => void }> = ({
  text,
  limit = 60_000,
  copy,
}) => {
  const shown = text.length > limit ? `${text.slice(0, limit)}\n… (${text.length - limit} more characters)` : text;
  return (
    <div className="pre-wrap">
      {copy ? (
        <button type="button" className="copy-button" onClick={() => copy(text)} title="Copy">
          copy
        </button>
      ) : null}
      <pre className="pre-block">{shown || "(empty)"}</pre>
    </div>
  );
};

const extractText = (message: Record<string, unknown> | undefined): string => {
  if (!message || !Array.isArray(message.content)) return "";
  return (message.content as Array<{ type?: string; text?: string }>)
    .filter((item) => item?.type === "text")
    .map((item) => item.text ?? "")
    .join("\n");
};

const extractReasoning = (message: Record<string, unknown> | undefined): string => {
  if (!message || !Array.isArray(message.content)) return "";
  return (message.content as Array<{ type?: string; text?: string }>)
    .filter((item) => item?.type === "reasoning")
    .map((item) => item.text ?? "")
    .join("\n");
};

const toolField = (tool: Record<string, unknown> | undefined, key: string): unknown =>
  tool && typeof tool === "object" ? tool[key] : undefined;

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => (
  <span className={`badge ${statusTone(status)}`}>{status ?? "—"}</span>
);

export const Inspector: React.FC<Props> = ({
  host,
  sessionId,
  directory,
  selected,
  detail,
  loading,
  error,
  onClose,
}) => {
  const [tab, setTab] = React.useState<Tab>("summary");

  React.useEffect(() => {
    setTab("summary");
  }, [selected?.id]);

  const copy = React.useCallback((text: string) => {
    const value = text.length > 32_000 ? text.slice(0, 32_000) : text;
    if (!value) return;
    void host.writeClipboard(value).then(
      () => host.toast({ kind: "success", message: value.length < text.length ? "Copied the first 32,000 characters." : "Copied to clipboard." }),
      () => host.toast({ kind: "error", message: "Could not copy." }),
    );
  }, [host]);

  if (!selected) {
    return (
      <aside className="inspector empty">
        <div className="inspector-empty">
          <span>⌁</span>
          <p>Select a row to inspect its input, output, timing, usage and request context.</p>
        </div>
      </aside>
    );
  }

  const tabs = tabsFor(selected);
  const message = detail?.message;
  const tool = detail?.tool;
  const header = detail?.header;
  const assistant = selected.kind === "assistant" ? selected as AssistantRow : null;
  const toolRow = selected.kind === "tool" ? selected as ToolRow : null;

  const rowUsage = "usage" in selected ? selected.usage : undefined;
  const cumulativeUsage = "cumulativeUsage" in selected ? selected.cumulativeUsage : undefined;
  const fullText = extractText(message) || (assistant?.text ?? "");
  const fullReasoning = extractReasoning(message) || (assistant?.reasoning ?? "");
  const toolInput = toolField(tool, "input");
  const toolOutput = toolField(tool, "output");
  const toolError = toolField(tool, "error");
  const toolMetadata = toolField(tool, "metadata");

  return (
    <aside className="inspector has-selection">
      <div className="inspector-head">
        <div className="inspector-title">
          <span className={`kind kind-${selected.kind}`}>{rowLabel(selected.kind)}</span>
          <strong>
            {selected.kind === "assistant"
              ? `Request #${assistant?.request ?? ""}`
              : selected.kind === "tool"
                ? toolRow?.name ?? "Tool"
                : selected.kind === "user"
                  ? "User prompt"
                  : selected.kind === "compaction"
                    ? "Compaction"
                    : selected.kind === "notice"
                      ? selected.role
                      : "Turn end"}
          </strong>
          {"status" in selected && selected.status ? <StatusBadge status={selected.status} /> : null}
        </div>
        <button type="button" className="icon-button" onClick={onClose} title="Close inspector">×</button>
      </div>

      <div className="tabs" role="tablist">
        {tabs.map((name) => (
          <button
            type="button"
            key={name}
            role="tab"
            aria-selected={tab === name}
            className={`tab${tab === name ? " active" : ""}`}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="inspector-body">
        {loading ? (
          <div className="inspector-loading"><div className="spinner" /> Loading record…</div>
        ) : error ? (
          <div className="inspector-error">{error}</div>
        ) : tab === "summary" ? (
          <div className="inspector-section">
            <KeyValue label="Kind" value={rowLabel(selected.kind)} />
            {selected.kind === "assistant" ? (
              <>
                <KeyValue label="Model" value={`${assistant?.provider ?? "—"} / ${assistant?.modelID ?? "—"}`} />
                <KeyValue label="Agent" value={assistant?.agent ?? "—"} />
                <KeyValue label="Status" value={assistant?.status ?? "—"} />
                <KeyValue label="Started" value={formatTime(assistant?.time?.start)} />
                <KeyValue label="First token" value={formatTime(assistant?.time?.firstToken)} />
                <KeyValue label="Completed" value={formatTime(assistant?.time?.end)} />
                <KeyValue label="TTFT" value={formatDuration(assistant?.timing.ttftMs)} />
                <KeyValue label="Duration" value={formatDuration(assistant?.time?.duration)} />
                <KeyValue label="Throughput" value={formatRate(assistant?.timing.throughput)} />
                <KeyValue label="Request header" value={assistant?.headersMissing ? "not recorded" : "recorded"} />
                {assistant?.finish ? <KeyValue label="Finish" value={assistant.finish} /> : null}
                {assistant?.error ? <KeyValue label="Error" value={<span className="error-text">{assistant.error}</span>} /> : null}
                {assistant?.retry ? (
                  <KeyValue
                    label="Retry"
                    value={`attempt ${assistant.retry.attempt ?? "?"}${assistant.retry.error ? ` · ${assistant.retry.error}` : ""}`}
                  />
                ) : null}
              </>
            ) : null}
            {selected.kind === "tool" ? (
              <>
                <KeyValue label="Tool" value={toolRow?.name ?? "—"} />
                <KeyValue label="Status" value={toolRow?.status ?? "—"} />
                <KeyValue label="Started" value={formatTime(toolRow?.time?.start)} />
                <KeyValue label="Duration" value={formatDuration(toolRow?.time?.duration)} />
                <KeyValue label="Output chars" value={String(toolRow?.outputLength ?? 0)} />
                {toolRow?.error ? <KeyValue label="Error" value={<span className="error-text">{toolRow.error}</span>} /> : null}
              </>
            ) : null}
            {selected.kind === "user" ? (
              <>
                <KeyValue label="Characters" value={String(selected.textLength)} />
                <KeyValue label="Attachments" value={String(selected.files.length)} />
                <KeyValue label="Steering" value={selected.steer ? "yes" : "no"} />
              </>
            ) : null}
            {selected.kind === "compaction" ? (
              <>
                <KeyValue label="Reason" value={selected.reason ?? "—"} />
                <KeyValue label="Status" value={selected.status} />
                <KeyValue label="Summary chars" value={String(selected.summaryLength)} />
              </>
            ) : null}
            {selected.kind === "notice" ? (
              <>
                <KeyValue label="Role" value={selected.role} />
                {selected.description ? <KeyValue label="Description" value={selected.description} /> : null}
              </>
            ) : null}
          </div>
        ) : tab === "input" ? (
          <div className="inspector-section">
            {selected.kind === "user" ? (
              <>
                <PreBlock text={selected.text} copy={copy} />
                {selected.files.length > 0 ? (
                  <div className="file-list">
                    {selected.files.map((file, index) => (
                      <div className="file-item" key={index}>
                        <span>{file.name ?? `file ${index + 1}`}</span>
                        <span className="subtle">{file.mime ?? ""} {file.size ? `· ${file.size} bytes` : ""}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : selected.kind === "tool" ? (
              <PreBlock text={safeJson(toolInput ?? toolRow?.inputPreview ?? {})} copy={copy} />
            ) : (
              <PreBlock text={fullReasoning || "(no reasoning recorded)"} copy={copy} />
            )}
          </div>
        ) : tab === "output" ? (
          <div className="inspector-section">
            {selected.kind === "assistant" ? (
              <>
                <h4>Text</h4>
                <PreBlock text={fullText} copy={copy} />
                <h4>Reasoning</h4>
                <PreBlock text={fullReasoning || "(no reasoning)"} copy={copy} />
              </>
            ) : selected.kind === "tool" ? (
              <>
                <h4>Result</h4>
                <PreBlock
                  text={typeof toolOutput === "string" ? toolOutput : safeJson(toolOutput ?? toolRow?.outputPreview ?? "")}
                  copy={copy}
                />
                {toolError ? <><h4>Error</h4><PreBlock text={String(toolError)} copy={copy} /></> : null}
                {toolMetadata ? <><h4>Metadata</h4><PreBlock text={safeJson(toolMetadata)} copy={copy} /></> : null}
              </>
            ) : selected.kind === "compaction" ? (
              <PreBlock text={selected.summary || "(no summary)"} copy={copy} />
            ) : selected.kind === "notice" ? (
              <PreBlock text={selected.text || selected.command || ""} copy={copy} />
            ) : (
              <PreBlock text={selected.kind === "user" ? selected.text : ""} copy={copy} />
            )}
          </div>
        ) : tab === "timing" ? (
          <div className="inspector-section">
            <KeyValue label="Started" value={`${formatClock(selected.time?.start)} · ${selected.time?.start ?? "—"}`} />
            {selected.kind === "assistant" ? (
              <>
                <KeyValue label="First token" value={`${formatClock(assistant?.time?.firstToken)} · ${assistant?.time?.firstToken ?? "—"}`} />
                <KeyValue label="Completed" value={`${formatClock(assistant?.time?.end)} · ${assistant?.time?.end ?? "—"}`} />
                <KeyValue label="TTFT" value={formatDuration(assistant?.timing.ttftMs)} />
                <KeyValue label="Decode" value={formatDuration(assistant?.timing.decodeMs)} />
                <KeyValue label="Duration" value={formatDuration(assistant?.time?.duration)} />
                <KeyValue label="Throughput" value={formatRate(assistant?.timing.throughput)} />
                <p className="inspector-note">
                  TTFT is measured from the assistant step start to the first streamed token. Running rows show no made-up duration.
                </p>
              </>
            ) : (
              <>
                <KeyValue label="Duration" value={formatDuration(selected.time?.duration)} />
                <KeyValue label="Completed" value={formatTime(selected.time?.end)} />
              </>
            )}
          </div>
        ) : tab === "usage" ? (
          <div className="inspector-section">
            {rowUsage ? (
              <>
                <h4>This request</h4>
                <div className="usage-grid">
                  {usageRows(rowUsage).map(([label, value]) => (
                    <div className="usage-cell" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {cumulativeUsage ? (
              <>
                <h4>Session cumulative</h4>
                <div className="usage-grid">
                  {usageRows(cumulativeUsage).map(([label, value]) => (
                    <div className="usage-cell" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {!rowUsage && !cumulativeUsage ? <p className="subtle">No usage recorded for this row.</p> : null}
          </div>
        ) : tab === "request" ? (
          <div className="inspector-section">
            {header ? (
              <>
                <KeyValue label="Model" value={`${header.model?.providerID ?? "—"} / ${header.model?.id ?? "—"}`} />
                <KeyValue label="Variant" value={header.model?.variant ?? "—"} />
                <KeyValue label="Agent" value={header.agent ?? "—"} />
                <KeyValue label="Prompt messages" value={String(header.messagesCount ?? "—")} />
                <KeyValue label="System parts" value={String(header.system?.length ?? 0)} />
                <KeyValue label="Tools" value={String(header.tools ? Object.keys(header.tools).length : 0)} />
                <h4>Options</h4>
                <PreBlock text={safeJson(header.options ?? {})} copy={copy} />
                <h4>System prompt</h4>
                {(header.system ?? []).length > 0 ? (
                  (header.system ?? []).map((part, index) => (
                    <PreBlock key={index} text={part.text ?? ""} copy={copy} />
                  ))
                ) : (
                  <p className="subtle">No system parts recorded.</p>
                )}
                <h4>Tools</h4>
                {header.tools && Object.keys(header.tools).length > 0 ? (
                  <div className="tool-schema-list">
                    {Object.entries(header.tools).map(([name, schema]) => (
                      <details className="tool-schema" key={name}>
                        <summary>{name}</summary>
                        <PreBlock text={safeJson(schema, 30_000)} copy={copy} />
                      </details>
                    ))}
                  </div>
                ) : (
                  <p className="subtle">No tools recorded.</p>
                )}
              </>
            ) : (
              <div className="inspector-note">
                This request was made before the collector captured request headers, or the header was not matched.
                Timing, tokens and tools are still available from the durable transcript.
              </div>
            )}
          </div>
        ) : (
          <div className="inspector-section">
            <PreBlock text={safeJson(detail ?? selected, 80_000)} copy={copy} />
          </div>
        )}
      </div>
      <div className="inspector-foot">
        <span className="subtle">{sessionId}</span>
        {directory ? <span className="subtle mono" title={directory}>{directory.split("/").slice(-2).join("/")}</span> : null}
      </div>
    </aside>
  );
};
