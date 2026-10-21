import React from "react";

import { formatDuration, statusTone } from "../format";
import type { TrajectoryRow, TrajectorySnapshot } from "../types";

type Props = {
  snapshot: TrajectorySnapshot;
  selectedId: string | null;
  onSelect: (row: TrajectoryRow) => void;
};

const rowTone = (row: TrajectoryRow): string => {
  if (row.kind === "assistant") return `assistant ${statusTone(row.status)}`;
  if (row.kind === "tool") return `tool ${statusTone(row.status)}`;
  if (row.kind === "compaction") return `compaction ${statusTone(row.status)}`;
  if (row.kind === "user") return "user";
  if (row.kind === "turn-end") return "turn-end";
  return "notice";
};

const barTitle = (row: TrajectoryRow): string => {
  const parts: string[] = [row.kind];
  if ("name" in row && row.name) parts.push(row.name);
  if (row.time?.start) parts.push(new Date(row.time.start).toLocaleTimeString());
  if (row.time?.duration !== undefined && row.time?.duration !== null) {
    parts.push(formatDuration(row.time.duration));
  }
  if (row.kind === "assistant") {
    if (row.timing.ttftMs !== null) parts.push(`TTFT ${formatDuration(row.timing.ttftMs)}`);
    if (row.textLength) parts.push(`${row.textLength} chars`);
  }
  return parts.join(" · ");
};

export const Timeline: React.FC<Props> = ({ snapshot, selectedId, onSelect }) => {
  const rows = React.useMemo(
    () => snapshot.rows.filter((row) => row.kind !== "turn-end" && row.kind !== "notice"),
    [snapshot.rows],
  );

  const domain = React.useMemo(() => {
    const starts = rows.map((row) => row.time?.start).filter((value): value is number => typeof value === "number");
    const ends = rows.map((row) => row.time?.end).filter((value): value is number => typeof value === "number");
    if (starts.length === 0) return null;
    const min = Math.min(...starts);
    const max = Math.max(...ends, ...starts);
    return { min, max, span: Math.max(1, max - min) };
  }, [rows]);

  if (!domain) {
    return (
      <div className="timeline empty">
        <span>No timing data for this session yet.</span>
      </div>
    );
  }

  return (
    <div className="timeline" aria-label="Trajectory timing overview">
      <div className="timeline-head">
        <span>Overview</span>
        <span className="timeline-domain">
          {formatDuration(domain.span)} across {snapshot.totalTurns} turn{snapshot.totalTurns === 1 ? "" : "s"}
        </span>
      </div>
      <div className="timeline-body">
        {snapshot.turns.map((turn) => {
          const turnRows = rows.filter((row) => row.turn === turn.index);
          return (
            <div className="timeline-row" key={turn.index}>
              <button
                type="button"
                className="timeline-turn-label"
                onClick={() => {
                  const first = turnRows[0];
                  if (first) onSelect(first);
                }}
                title={`Turn ${turn.index}`}
              >
                T{turn.index}
              </button>
              <div className="timeline-track">
                {turnRows.map((row) => {
                  const start = row.time?.start ?? turn.start;
                  const end = row.time?.end ?? start + Math.max(1, domain.span * 0.004);
                  const left = ((start - domain.min) / domain.span) * 100;
                  const width = Math.max(0.45, ((Math.max(end, start + 1) - start) / domain.span) * 100);
                  const isSelected = selectedId === row.id;
                  return (
                    <button
                      type="button"
                      key={row.id}
                      className={`timeline-bar ${rowTone(row)}${isSelected ? " selected" : ""}`}
                      style={{ left: `${Math.max(0, Math.min(99.5, left))}%`, width: `${Math.min(100, width)}%` }}
                      title={barTitle(row)}
                      onClick={() => onSelect(row)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
