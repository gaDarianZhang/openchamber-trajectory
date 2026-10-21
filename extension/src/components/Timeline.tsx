import React from "react";

import { formatDuration, statusTone } from "../format";
import type { TrajectoryRow, TrajectorySnapshot } from "../types";

type Props = {
  snapshot: TrajectorySnapshot;
  selectedId: string | null;
  onSelect: (row: TrajectoryRow) => void;
};

type View = { start: number; end: number };

const MAX_ZOOM = 32;
const MIN_SPAN_RATIO = 1 / MAX_ZOOM;
const ZOOM_IN = 0.8;
const ZOOM_OUT = 1.25;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

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

  const [view, setView] = React.useState<View | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const dragRef = React.useRef<{
    pointerId: number;
    x: number;
    start: number;
    end: number;
    moved: boolean;
    captured: boolean;
  } | null>(null);
  const suppressClickRef = React.useRef(false);

  const visibleView = React.useMemo(() => {
    if (!domain) return null;
    if (!view) return { start: domain.min, end: domain.max };
    const minSpan = domain.span * MIN_SPAN_RATIO;
    const span = clamp(view.end - view.start, minSpan, domain.span);
    const start = clamp(view.start, domain.min, domain.max - span);
    return { start, end: start + span };
  }, [domain, view]);

  const zoom = domain && visibleView
    ? domain.span / Math.max(1, visibleView.end - visibleView.start)
    : 1;
  const zoomed = view !== null;

  const setClampedView = React.useCallback((start: number, end: number) => {
    if (!domain) return;
    const minSpan = domain.span * MIN_SPAN_RATIO;
    const span = clamp(end - start, minSpan, domain.span);
    const clampedStart = clamp(start, domain.min, domain.max - span);
    if (span >= domain.span - 1) {
      setView(null);
      return;
    }
    setView({ start: clampedStart, end: clampedStart + span });
  }, [domain]);

  const zoomAt = React.useCallback((clientX: number, factor: number) => {
    if (!domain || !visibleView || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const anchor = visibleView.start + ratio * (visibleView.end - visibleView.start);
    const nextSpan = clamp(
      (visibleView.end - visibleView.start) * factor,
      domain.span * MIN_SPAN_RATIO,
      domain.span,
    );
    const start = anchor - ratio * nextSpan;
    setClampedView(start, start + nextSpan);
  }, [domain, visibleView, setClampedView]);

  const zoomBy = React.useCallback((factor: number) => {
    if (!visibleView) return;
    const center = (visibleView.start + visibleView.end) / 2;
    const span = (visibleView.end - visibleView.start) * factor;
    setClampedView(center - span / 2, center + span / 2);
  }, [visibleView, setClampedView]);

  const resetZoom = React.useCallback(() => setView(null), []);

  // Native listener so the wheel event can prevent the surrounding panel from
  // scrolling while the cursor is over the overview.
  React.useEffect(() => {
    const element = rootRef.current;
    if (!element || !domain) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      zoomAt(event.clientX, event.deltaY < 0 ? ZOOM_IN : ZOOM_OUT);
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [domain, zoomAt]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !visibleView) return;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      start: visibleView.start,
      end: visibleView.end,
      moved: false,
      captured: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 4) return;
    if (!drag.moved) {
      drag.moved = true;
      suppressClickRef.current = true;
      // Capture only once a drag starts, so a plain click still reaches the bar.
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.captured = true;
      } catch {
        // ignore
      }
    }
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const span = drag.end - drag.start;
    const start = drag.start - (dx / rect.width) * span;
    setClampedView(start, start + span);
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (drag.captured) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    }
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 250);
  };

  const handleBarClick = (row: TrajectoryRow) => {
    if (suppressClickRef.current) return;
    onSelect(row);
  };

  if (!domain || !visibleView) {
    return (
      <div className="timeline empty">
        <span>No timing data for this session yet.</span>
      </div>
    );
  }

  const visibleSpan = Math.max(1, visibleView.end - visibleView.start);
  const visibleTurns = snapshot.turns.filter((turn) => {
    const turnRows = rows.filter((row) => row.turn === turn.index);
    return turnRows.some((row) => {
      const start = row.time?.start ?? turn.start;
      const end = row.time?.end ?? start;
      return end >= visibleView.start && start <= visibleView.end;
    });
  }).length;

  return (
    <div
      className={`timeline${zoomed ? " zoomed" : ""}`}
      ref={rootRef}
      aria-label="Trajectory timing overview"
    >
      <div className="timeline-head">
        <span>Overview</span>
        <span className="timeline-domain">
          {formatDuration(visibleSpan)} · {visibleTurns} of {snapshot.totalTurns} turn{snapshot.totalTurns === 1 ? "" : "s"}
        </span>
        <span className="timeline-tools">
          <span className="timeline-zoom" title="Current zoom">{zoom.toFixed(1)}×</span>
          <button
            type="button"
            className="timeline-zoom-button"
            onClick={() => zoomBy(ZOOM_IN)}
            disabled={zoom >= MAX_ZOOM - 0.01}
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="timeline-zoom-button"
            onClick={() => zoomBy(ZOOM_OUT)}
            disabled={!zoomed}
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="timeline-zoom-button reset"
            onClick={resetZoom}
            disabled={!zoomed}
            title="Reset zoom"
          >
            Reset
          </button>
        </span>
      </div>
      <div
        className="timeline-body"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={resetZoom}
      >
        {snapshot.turns.map((turn) => {
          const turnRows = rows.filter((row) => row.turn === turn.index);
          const isOffscreen = !turnRows.some((row) => {
            const start = row.time?.start ?? turn.start;
            const end = row.time?.end ?? start;
            return end >= visibleView.start && start <= visibleView.end;
          });
          return (
            <div className={`timeline-row${isOffscreen ? " offscreen" : ""}`} key={turn.index}>
              <button
                type="button"
                className="timeline-turn-label"
                onClick={() => {
                  const first = turnRows[0];
                  if (first) handleBarClick(first);
                }}
                title={`Turn ${turn.index}`}
              >
                T{turn.index}
              </button>
              <div
                className="timeline-track"
                ref={turn.index === snapshot.turns[0]?.index ? trackRef : undefined}
              >
                {turnRows.map((row) => {
                  const start = row.time?.start ?? turn.start;
                  const end = row.time?.end ?? start + Math.max(1, visibleSpan * 0.004);
                  if (end < visibleView.start || start > visibleView.end) return null;
                  const left = ((start - visibleView.start) / visibleSpan) * 100;
                  const width = Math.max(0.3, ((Math.max(end, start + 1) - start) / visibleSpan) * 100);
                  const isSelected = selectedId === row.id;
                  return (
                    <button
                      type="button"
                      key={row.id}
                      className={`timeline-bar ${rowTone(row)}${isSelected ? " selected" : ""}`}
                      style={{ left: `${Math.max(0, Math.min(99.7, left))}%`, width: `${Math.min(100, width)}%` }}
                      title={barTitle(row)}
                      onClick={() => handleBarClick(row)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="timeline-hint">Scroll to zoom · drag to pan · double-click to reset</div>
    </div>
  );
};
