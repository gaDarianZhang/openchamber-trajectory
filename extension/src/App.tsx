import React from "react";
import { connectHost } from "@openchamber/sdk";
import type { HostReadyContext, SessionSnapshot } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";

import { fetchRow, describeError } from "./api";
import type { LedgerFailure, RowDetail, TrajectoryRow, TrajectorySnapshot } from "./types";
import { formatCost, formatTokens } from "./format";
import { Timeline } from "./components/Timeline";
import { Ledger, type LedgerItem } from "./components/Ledger";
import { Inspector } from "./components/Inspector";

type HostClient = ReturnType<typeof connectHost>;

type LedgerState = {
  snapshot: TrajectorySnapshot | null;
  failure: LedgerFailure | null;
  error: string | null;
  loading: boolean;
  refresh: () => void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function useLedger(host: HostClient, sessionId: string, directory: string | null): LedgerState {
  const [snapshot, setSnapshot] = React.useState<TrajectorySnapshot | null>(null);
  const [failure, setFailure] = React.useState<LedgerFailure | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const hostRef = React.useRef(host);
  hostRef.current = host;

  React.useEffect(() => {
    let cancelled = false;
    let after = -1;
    setSnapshot(null);
    setFailure(null);
    setError(null);
    setLoading(true);

    const loop = async () => {
      while (!cancelled) {
        try {
          const result = await hostRef.current.serviceRequest({
            method: "GET",
            path: "/ledger",
            query: {
              sessionId,
              ...(directory ? { directory } : {}),
              afterSeq: String(after),
              wait: "8000",
              limitTurns: "80",
            },
          });
          if (cancelled) return;

          let body: unknown;
          try {
            body = JSON.parse(result.body);
          } catch {
            throw new Error(result.body || "Trajectory service returned an empty answer.");
          }

          if (!body || typeof body !== "object" || !("ok" in body)) {
            throw new Error("Trajectory service returned an invalid answer.");
          }

          const value = body as
            | TrajectorySnapshot
            | LedgerFailure
            | { ok: true; changed: false; revision: number };

          if (value.ok === false) {
            setFailure(value);
            setError(null);
            setLoading(false);
            await sleep(value.code === "collector_missing" ? 4000 : 2500);
            continue;
          }

          if ("changed" in value && value.changed === false) {
            setLoading(false);
            continue;
          }

          const next = value as TrajectorySnapshot;
          setSnapshot(next);
          setFailure(null);
          setError(null);
          setLoading(false);
          after = next.revision;
        } catch (reason) {
          if (cancelled) return;
          const described = describeError(reason);
          setError(described.message);
          setLoading(false);
          await sleep(2500);
        }
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, [sessionId, directory, refreshKey]);

  return {
    snapshot,
    failure,
    error,
    loading,
    refresh: () => setRefreshKey((value) => value + 1),
  };
}

function matches(row: TrajectoryRow, query: string): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  const parts = [
    row.kind,
    "text" in row ? row.text : "",
    "inputPreview" in row ? row.inputPreview : "",
    "outputPreview" in row ? row.outputPreview : "",
    "summary" in row ? row.summary : "",
    "name" in row ? row.name : "",
    "description" in row ? row.description : "",
    "modelID" in row ? row.modelID : "",
    "error" in row ? row.error : "",
  ];
  return parts.some((part) => typeof part === "string" && part.toLowerCase().includes(needle));
}

function buildItems(
  snapshot: TrajectorySnapshot,
  query: string,
  collapsed: Set<number>,
): LedgerItem[] {
  const items: LedgerItem[] = [];
  for (const turn of snapshot.turns) {
    const turnRows = (turn.rows?.length ?? 0) > 0
      ? turn.rows
      : snapshot.rows.filter((row) => row.turn === turn.index);
    const matching = query
      ? turnRows.filter((row) => matches(row, query))
      : turnRows;
    if (query && matching.length === 0) continue;
    items.push({ type: "turn", turn });
    if (!query && collapsed.has(turn.index)) continue;
    for (const row of matching) items.push({ type: "row", row, turn });
  }

  if (snapshot.betweenTurns.length > 0) {
    const between = query
      ? snapshot.betweenTurns.filter((row) => matches(row, query))
      : snapshot.betweenTurns;
    if (between.length > 0) {
      items.push({ type: "between", turn: null });
      for (const row of between) items.push({ type: "row", row, turn: null });
    }
  }
  return items;
}

const StatChip: React.FC<{ label: string; value: string; title?: string }> = ({ label, value, title }) => (
  <span className="stat-chip" title={title}>
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </span>
);

const FailurePanel: React.FC<{
  failure: LedgerFailure;
  onRetry: () => void;
  host: HostClient;
}> = ({ failure, onRetry, host }) => {
  const install = failure.install ?? "mkdir -p .opencode/plugins && ln -s /path/to/openchamber-trajectory/collector .opencode/plugins/trajectory-collector";
  return (
    <div className="state-panel">
      <div className="state-icon">◎</div>
      <h2>Collector not running</h2>
      <p>
        The Trajectory view needs the OpenCode collector plugin. Install it once, then open a
        session so it can attach to this project.
      </p>
      <pre className="install-command">{install}</pre>
      <div className="state-actions">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            void host.writeClipboard(install);
            void host.toast({ kind: "success", message: "Install command copied." });
          }}
        >
          Copy command
        </button>
        <button type="button" className="btn" onClick={onRetry}>
          Retry
        </button>
      </div>
      <p className="state-note">
        {failure.message ?? "The extension service could not find a live collector for this session."}
      </p>
    </div>
  );
};

export const App: React.FC<{ host: HostClient }> = ({ host }) => {
  const [ready, setReady] = React.useState<HostReadyContext | null>(null);
  const [session, setSession] = React.useState<SessionSnapshot | null>(null);

  React.useEffect(() => {
    const offReady = host.onReady((ctx) => {
      applyHostReady(ctx, document.documentElement);
      document.body.dataset.surface = ctx.surface;
      setReady(ctx);
      setSession(ctx.session);
    });
    const offSession = host.onSession((next) => setSession(next));
    return () => {
      offReady();
      offSession();
    };
  }, [host]);

  if (!ready) {
    return (
      <div className="boot-screen">
        <div className="spinner" />
        <span>Connecting to Trajectory…</span>
      </div>
    );
  }

  const activeSession = session ?? ready.session;
  if (!activeSession) {
    return (
      <div className="boot-screen">
        <div className="state-icon">◇</div>
        <h2>No session open</h2>
        <p>Open a chat, then return to Trajectory.</p>
      </div>
    );
  }

  return (
    <TrajectorySurface
      key={`${activeSession.id}:${ready.directory ?? ""}`}
      host={host}
      ready={ready}
      session={activeSession}
    />
  );
};

const TrajectorySurface: React.FC<{
  host: HostClient;
  ready: HostReadyContext;
  session: SessionSnapshot;
}> = ({ host, ready, session }) => {
  const directory = ready.directory ?? null;
  const { snapshot, failure, error, loading, refresh } = useLedger(host, session.id, directory);
  const [query, setQuery] = React.useState("");
  const [collapsed, setCollapsed] = React.useState<Set<number>>(() => new Set());
  const [selected, setSelected] = React.useState<TrajectoryRow | null>(null);
  const [detail, setDetail] = React.useState<RowDetail | null>(null);
  const [detailLoading, setDetailLoading] = React.useState(false);
  const [detailError, setDetailError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const followingRef = React.useRef(true);
  const [following, setFollowing] = React.useState(true);

  const items = React.useMemo(
    () => (snapshot ? buildItems(snapshot, query.trim(), collapsed) : []),
    [snapshot, query, collapsed],
  );

  React.useEffect(() => {
    if (!selected) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    void fetchRow(host, session.id, directory, selected.id)
      .then((value) => {
        if (!cancelled) setDetail(value);
      })
      .catch((reason) => {
        if (!cancelled) setDetailError(describeError(reason).message);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [host, session.id, directory, selected?.id]);

  const onScroll = React.useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const next = element.scrollHeight - element.scrollTop - element.clientHeight < 140;
    followingRef.current = next;
    setFollowing(next);
  }, []);

  const toggleTurn = React.useCallback((index: number) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const selectRow = React.useCallback((row: TrajectoryRow) => {
    setSelected(row);
  }, []);

  const stats = snapshot?.stats;
  const status = snapshot
    ? snapshot.turns.some((turn) => turn.status === "running")
      ? "running"
      : "idle"
    : "idle";

  return (
    <div className="app" data-surface={ready.surface}>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">⌁</span>
          <div className="brand-copy">
            <strong>Trajectory</strong>
            <span className="session-title" title={session.title}>{session.title || session.id}</span>
          </div>
          <span className={`status-dot ${status}`} title={status} />
          {snapshot ? <span className="live-label">live</span> : null}
        </div>

        <div className="topbar-stats">
          <StatChip label="Turns" value={String(snapshot?.totalTurns ?? 0)} />
          <StatChip label="Steps" value={String(stats?.steps ?? 0)} />
          <StatChip label="Tools" value={String(stats?.tools ?? 0)} />
          <StatChip
            label="Tokens"
            value={formatTokens(stats ? stats.usage.input + stats.usage.output + stats.usage.reasoning + stats.usage.cacheRead + stats.usage.cacheWrite : 0)}
            title="input + output + reasoning + cache"
          />
          <StatChip label="Cost" value={formatCost(stats?.cost ?? 0)} />
        </div>

        <div className="topbar-actions">
          <label className="search">
            <span className="search-icon">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search trajectory"
              spellCheck={false}
            />
            {query ? (
              <button type="button" className="icon-button" onClick={() => setQuery("")} title="Clear search">
                ×
              </button>
            ) : null}
          </label>
          <button type="button" className="icon-button" onClick={refresh} title="Refresh">
            ↻
          </button>
        </div>
      </header>

      {failure ? (
        <FailurePanel failure={failure} host={host} onRetry={refresh} />
      ) : error && !snapshot ? (
        <div className="state-panel compact">
          <h2>Trajectory unavailable</h2>
          <p>{error}</p>
          <button type="button" className="btn" onClick={refresh}>Retry</button>
        </div>
      ) : loading && !snapshot ? (
        <div className="boot-screen">
          <div className="spinner" />
          <span>Loading trajectory…</span>
        </div>
      ) : snapshot ? (
        <>
          <Timeline
            snapshot={snapshot}
            selectedId={selected?.id ?? null}
            onSelect={selectRow}
          />
          <div className="workspace">
            <div className="ledger-column">
              <Ledger
                items={items}
                snapshot={snapshot}
                selectedId={selected?.id ?? null}
                collapsed={collapsed}
                following={following}
                scrollRef={scrollRef}
                onScroll={onScroll}
                onToggleTurn={toggleTurn}
                onSelect={selectRow}
                onJumpLatest={() => {
                  const element = scrollRef.current;
                  if (element) element.scrollTop = element.scrollHeight;
                  followingRef.current = true;
                  setFollowing(true);
                }}
              />
            </div>
            <Inspector
              host={host}
              sessionId={session.id}
              directory={directory}
              selected={selected}
              detail={detail}
              loading={detailLoading}
              error={detailError}
              onClose={() => setSelected(null)}
            />
          </div>
        </>
      ) : (
        <div className="state-panel compact">
          <h2>Waiting for the collector</h2>
          <p>Open the session once and the collector will attach on the next model step.</p>
          <button type="button" className="btn" onClick={refresh}>Retry</button>
        </div>
      )}
    </div>
  );
};
