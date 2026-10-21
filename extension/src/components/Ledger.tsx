import React from "react";

import {
  formatCost,
  formatDuration,
  formatRate,
  formatTokens,
  rowLabel,
  statusTone,
  textPreview,
} from "../format";
import type {
  AssistantRow,
  CompactionRow,
  NoticeRow,
  ToolRow,
  TrajectoryRow,
  TrajectorySnapshot,
  TrajectoryTurn,
  TurnEndRow,
  UserRow,
} from "../types";

export type LedgerItem =
  | { type: "turn"; turn: TrajectoryTurn }
  | { type: "between"; turn: null }
  | { type: "row"; row: TrajectoryRow; turn: TrajectoryTurn | null };

type Props = {
  items: LedgerItem[];
  snapshot: TrajectorySnapshot;
  selectedId: string | null;
  collapsed: Set<number>;
  following: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollTarget: { id: string; nonce: number } | null;
  onScroll: () => void;
  onToggleTurn: (index: number) => void;
  onSelect: (row: TrajectoryRow) => void;
  onJumpLatest: () => void;
};

const PAGE_ROWS = 220;

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => (
  <span className={`badge ${statusTone(status)}`}>{status ?? "—"}</span>
);

const KindBadge: React.FC<{ kind: string }> = ({ kind }) => (
  <span className={`kind kind-${kind}`}>{rowLabel(kind)}</span>
);

const TurnHeader: React.FC<{
  turn: TrajectoryTurn;
  collapsed: boolean;
  onToggle: () => void;
}> = ({ turn, collapsed, onToggle }) => (
  <div className="turn-header">
    <button type="button" className="turn-toggle" onClick={onToggle} title={collapsed ? "Expand turn" : "Collapse turn"}>
      {collapsed ? "▸" : "▾"}
    </button>
    <span className="turn-index">Turn {turn.index}</span>
    <StatusBadge status={turn.status} />
    <span className="turn-meta">
      {turn.steps} step{turn.steps === 1 ? "" : "s"} · {turn.tools} tool{turn.tools === 1 ? "" : "s"}
      {turn.ttftMs !== null ? ` · TTFT ${formatDuration(turn.ttftMs)}` : ""}
      {turn.duration !== null ? ` · ${formatDuration(turn.duration)}` : ""}
    </span>
    <span className="turn-usage">
      {formatTokens(turn.usage.input + turn.usage.output + turn.usage.reasoning + turn.usage.cacheRead + turn.usage.cacheWrite)} tok
      {turn.cost > 0 ? ` · ${formatCost(turn.cost)}` : ""}
    </span>
  </div>
);

const UserRowView: React.FC<{ row: UserRow; selected: boolean; onSelect: () => void }> = ({ row, selected, onSelect }) => (
  <button type="button" className={`ledger-row user${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="row-lead">
      <KindBadge kind="user" />
      {row.steer ? <span className="mini-badge">steer</span> : null}
    </div>
    <div className="row-main">
      <div className="row-title">
        <span className="row-name">User prompt</span>
        {row.files.length > 0 ? <span className="row-sub">{row.files.length} attachment{row.files.length === 1 ? "" : "s"}</span> : null}
      </div>
      <div className="row-preview">{textPreview(row.text, 520) || "(empty prompt)"}</div>
    </div>
    <div className="row-side">
      <span className="row-meta">{row.textLength} chars</span>
    </div>
  </button>
);

const AssistantRowView: React.FC<{
  row: AssistantRow;
  selected: boolean;
  onSelect: () => void;
}> = ({ row, selected, onSelect }) => {
  const toolNames = row.blocks.filter((block) => block.kind === "tool") as Array<{ kind: "tool"; name: string }>;
  const preview = textPreview(row.text || row.reasoning, 420);
  return (
    <button type="button" className={`ledger-row assistant${selected ? " selected" : ""}`} onClick={onSelect}>
      <div className="row-lead">
        <KindBadge kind="assistant" />
        <span className="request-no">#{row.request}</span>
      </div>
      <div className="row-main">
        <div className="row-title">
          <span className="row-name">{row.modelID ?? row.model?.id ?? "assistant"}</span>
          <StatusBadge status={row.status} />
          {row.agent ? <span className="row-sub">{row.agent}</span> : null}
          {row.headersMissing ? <span className="mini-badge muted" title="The collector was not attached for this request">no header</span> : null}
          {row.retry ? <span className="mini-badge warning">retry {row.retry.attempt ?? ""}</span> : null}
        </div>
        <div className="row-preview">{preview || (row.toolIDs.length > 0 ? "(tool call only)" : "(no text yet)")}</div>
        <div className="row-chips">
          {toolNames.slice(0, 8).map((block, index) => (
            <span className="chip" key={`${block.name}:${index}`}>{block.name}</span>
          ))}
          {toolNames.length > 8 ? <span className="chip">+{toolNames.length - 8}</span> : null}
          {row.error ? <span className="chip error" title={row.error}>{row.errorCode ?? "error"}</span> : null}
        </div>
      </div>
      <div className="row-side assistant-side">
        <div className="metric">
          <span>TTFT</span>
          <strong>{formatDuration(row.timing.ttftMs)}</strong>
        </div>
        <div className="metric">
          <span>Duration</span>
          <strong>{formatDuration(row.time?.duration)}</strong>
        </div>
        <div className="metric">
          <span>Tokens</span>
          <strong>{formatTokens((row.usage?.input ?? 0) + (row.usage?.output ?? 0) + (row.usage?.reasoning ?? 0))}</strong>
        </div>
        {row.timing.throughput !== null ? <div className="metric subtle">{formatRate(row.timing.throughput)}</div> : null}
      </div>
    </button>
  );
};

const ToolRowView: React.FC<{ row: ToolRow; selected: boolean; onSelect: () => void }> = ({ row, selected, onSelect }) => (
  <button type="button" className={`ledger-row tool${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="row-lead">
      <KindBadge kind="tool" />
      <span className="request-no">#{row.request}</span>
    </div>
    <div className="row-main">
      <div className="row-title">
        <span className="row-name">{row.name}</span>
        <StatusBadge status={row.status} />
        {row.error ? <span className="chip error">{row.errorCode ?? "error"}</span> : null}
      </div>
      <div className="row-preview mono">{textPreview(row.inputPreview, 300) || "(no arguments)"}</div>
      {row.outputPreview ? <div className="row-preview subtle mono">{textPreview(row.outputPreview, 260)}</div> : null}
    </div>
    <div className="row-side">
      <span className="row-meta">{formatDuration(row.time?.duration)}</span>
      <span className="row-meta subtle">{row.outputLength} chars</span>
    </div>
  </button>
);

const CompactionRowView: React.FC<{ row: CompactionRow; selected: boolean; onSelect: () => void }> = ({ row, selected, onSelect }) => (
  <button type="button" className={`ledger-row compaction${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="row-lead">
      <KindBadge kind="compaction" />
      <span className="request-no">#{row.request}</span>
    </div>
    <div className="row-main">
      <div className="row-title">
        <span className="row-name">Compaction</span>
        <StatusBadge status={row.status} />
        {row.reason ? <span className="row-sub">{row.reason}</span> : null}
      </div>
      <div className="row-preview">{textPreview(row.summary, 420) || "(no summary yet)"}</div>
    </div>
    <div className="row-side">
      <span className="row-meta">{formatDuration(row.time?.duration)}</span>
      <span className="row-meta subtle">{formatTokens((row.usage?.input ?? 0) + (row.usage?.output ?? 0))} tok</span>
    </div>
  </button>
);

const NoticeRowView: React.FC<{ row: NoticeRow; selected: boolean; onSelect: () => void }> = ({ row, selected, onSelect }) => (
  <button type="button" className={`ledger-row notice${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="row-lead">
      <KindBadge kind="notice" />
    </div>
    <div className="row-main">
      <div className="row-title">
        <span className="row-name">{row.role}</span>
        {row.name ? <span className="row-sub">{row.name}</span> : null}
        {row.description ? <span className="row-sub">{row.description}</span> : null}
      </div>
      <div className="row-preview">{textPreview(row.text || row.command || "", 420)}</div>
    </div>
    <div className="row-side" />
  </button>
);

const TurnEndView: React.FC<{ row: TurnEndRow; selected: boolean; onSelect: () => void }> = ({ row, selected, onSelect }) => (
  <button type="button" className={`ledger-row turn-end${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="row-lead"><KindBadge kind="turn-end" /></div>
    <div className="row-main">
      <div className="row-title">
        <span className="row-name">Turn ended</span>
        <StatusBadge status={row.outcome ?? "complete"} />
      </div>
      {row.error ? <div className="row-preview error-text">{row.error}</div> : null}
    </div>
    <div className="row-side" />
  </button>
);

const RowView: React.FC<{
  row: TrajectoryRow;
  selected: boolean;
  onSelect: () => void;
}> = ({ row, selected, onSelect }) => {
  switch (row.kind) {
    case "user": return <UserRowView row={row} selected={selected} onSelect={onSelect} />;
    case "assistant": return <AssistantRowView row={row} selected={selected} onSelect={onSelect} />;
    case "tool": return <ToolRowView row={row} selected={selected} onSelect={onSelect} />;
    case "compaction": return <CompactionRowView row={row} selected={selected} onSelect={onSelect} />;
    case "notice": return <NoticeRowView row={row} selected={selected} onSelect={onSelect} />;
    case "turn-end": return <TurnEndView row={row} selected={selected} onSelect={onSelect} />;
    default: return null;
  }
};

export const Ledger: React.FC<Props> = ({
  items,
  snapshot,
  selectedId,
  collapsed,
  following,
  scrollRef,
  scrollTarget,
  onScroll,
  onToggleTurn,
  onSelect,
  onJumpLatest,
}) => {
  const [limit, setLimit] = React.useState(PAGE_ROWS);
  const visibleItems = items.length > limit ? items.slice(-limit) : items;
  const handledScrollNonce = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!following) return;
    const element = scrollRef.current;
    if (!element) return;
    const frame = window.requestAnimationFrame(() => {
      element.scrollTop = element.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [following, items.length, snapshot.revision, scrollRef]);

  React.useEffect(() => {
    if (!scrollTarget) return;
    if (handledScrollNonce.current === scrollTarget.nonce) return;

    const index = items.findIndex((item) => item.type === "row" && item.row.id === scrollTarget.id);
    if (index < 0) return;

    const needed = items.length - index;
    if (needed > limit) {
      setLimit(Math.min(items.length, needed + 12));
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      const element = Array.from(container.querySelectorAll<HTMLElement>("[data-row-id]"))
        .find((candidate) => candidate.dataset.rowId === scrollTarget.id);
      if (!element) return;
      handledScrollNonce.current = scrollTarget.nonce;
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const top = Math.max(
        0,
        container.scrollTop
          + (elementRect.top - containerRect.top)
          - container.clientHeight / 2
          + elementRect.height / 2,
      );
      container.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [scrollTarget, items, limit, scrollRef]);

  const renderItem = (item: LedgerItem) => {
    if (item.type === "turn") {
      return (
        <TurnHeader
          turn={item.turn}
          collapsed={collapsed.has(item.turn.index)}
          onToggle={() => onToggleTurn(item.turn.index)}
        />
      );
    }
    if (item.type === "between") return <div className="between-header">Between turns</div>;
    return (
      <RowView
        row={item.row}
        selected={selectedId === item.row.id}
        onSelect={() => onSelect(item.row)}
      />
    );
  };

  return (
    <div className="ledger-wrap">
      <div className="ledger-scroll" ref={scrollRef} onScroll={onScroll}>
        {items.length > limit ? (
          <div className="ledger-load-earlier">
            <button
              type="button"
              className="btn"
              onClick={() => setLimit((value) => value + PAGE_ROWS)}
            >
              Load earlier ({items.length - limit} more)
            </button>
          </div>
        ) : null}
        {items.length === 0 ? (
          <div className="ledger-empty">No rows yet. The collector is waiting for the next step.</div>
        ) : (
          <div className="ledger-inner">
            {visibleItems.map((item, index) => (
              <div
                className="ledger-item"
                data-row-id={item.type === "row" ? item.row.id : undefined}
                key={item.type === "row" ? item.row.id : item.type === "turn" ? `turn:${item.turn.index}` : `between:${index}`}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
      {!following ? (
        <button type="button" className="jump-latest" onClick={onJumpLatest}>
          ↓ Jump to latest
        </button>
      ) : null}
    </div>
  );
};
