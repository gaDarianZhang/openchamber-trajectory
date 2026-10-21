# OpenChamber Trajectory

[![CI](https://github.com/gaDarianZhang/openchamber-trajectory/actions/workflows/ci.yml/badge.svg)](https://github.com/gaDarianZhang/openchamber-trajectory/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/openchamber-trajectory-collector.svg)](https://www.npmjs.com/package/openchamber-trajectory-collector)

A Trajectory panel for [OpenChamber](https://openchamber.dev), modelled on the
DeepSeek Harness trajectory view. It shows what the agent did, step by step:
messages, tools, timing, tokens, compaction and errors, with a live timing
overview and a per-record inspector.

The project has two parts:

- **OpenCode collector** (`collector/`) — a read-only OpenCode 2 plugin that
  captures request headers, steps, tools, retries, compaction and usage, then
  serves a small JSON ledger over loopback.
- **OpenChamber extension** (repository root) — a sandboxed panel plus a small
  host service that discovers the collector and proxies its data.

The extension never receives an OpenCode password and never talks to the
OpenCode API. The collector never mutates a session, never sends a prompt, and
never writes into your project.

## Features

- Turns, steps and request numbers
- TTFT, decode time, total duration and throughput
- Input / output / reasoning / cache-read / cache-write tokens and cost
- Tool calls with arguments, results, errors and exact timing
- Compaction, retries, failures, system/synthetic/skill notices
- Request context: system prompt, tool schemas, options, model and agent
- Live updates while a session is running
- Timing overview with wheel zoom (1×–128×), drag-to-pan, +/− controls and reset
- Click an overview bar to select the record and scroll the ledger to it
- Inspector with Summary, Input, Output, Timing, Usage, Request and Raw tabs
- Search, follow-tail and load-earlier

## Requirements

- OpenChamber **2.5.0 or newer** on web or desktop
- OpenCode **2.x**
- The collector and OpenChamber must run on the same machine (or the same
  container network), because the service reaches the collector over loopback

Extensions do not load in VS Code or the mobile app.

## Install

### 1. Collector (OpenCode plugin)

```bash
opencode plugin add openchamber-trajectory-collector
```

Or add `openchamber-trajectory-collector` to the `plugins` array in
`opencode.json(c)`.

For a local checkout, link `collector/` instead:

```bash
mkdir -p .opencode/plugins
ln -s /absolute/path/to/openchamber-trajectory/collector \
  .opencode/plugins/trajectory-collector
```

### 2. Extension (OpenChamber)

Settings → Extensions → add:

```text
https://github.com/gaDarianZhang/openchamber-trajectory
```

You can also download the extension zip from
[Releases](https://github.com/gaDarianZhang/openchamber-trajectory/releases)
and add the zip file.

Approve the `service` capability when prompted. Then open a chat and click the
Trajectory icon on the right rail, or use the session action **Open trajectory**.

### 3. Verify

The panel header shows **LIVE** when the collector is connected. If it shows
“Collector not running”, check:

```bash
opencode plugin list
ls ~/.local/share/openchamber/trajectory/instances
```

## How it works

```text
OpenCode 2
  collector/index.js
    ctx.session.hook("context")  -> system prompt, tools, options, model, agent
    ctx.session.hook("retry")    -> retry facts
    ctx.tool.hook("execute.*")   -> tool args/results/timing
    ctx.event.subscribe()        -> live step/text/tool/compaction events
    ctx.session.context()        -> historical backfill
    loopback HTTP + 0600 runtime file
            |
            v
OpenChamber host
  service/main.js
    discovers the collector, proxies /ledger /row /header
            |
            v
panel/main.js (sandboxed iframe)
  timeline + ledger + inspector
```

The collector keeps request headers in memory and rebuilds durable transcripts
with `ctx.session.context()`. Historical timing, tokens and tools are
recoverable; system prompts and tool schemas exist only for requests made while
the collector was loaded.

## Privacy and security

- The collector binds `127.0.0.1` on a random port with a random bearer token.
- The discovery file is written with mode `0600` under
  `~/.local/share/openchamber/trajectory/instances`.
- The panel never sees the collector port or token; only the host service does.
- No telemetry, no external requests, no prompt content written to the project.
- `collector.log` contains errors only, not prompt or tool content.
- The collector has the same local access as the OpenCode process. Review the
  source before installing, as with any plugin.

Data directory: `~/.local/share/openchamber/trajectory`  
Override with `OPENCHAMBER_TRAJECTORY_DATA_DIR`.

## Development

```bash
bun install
bun run build       # bundles panel/main.js
bun run test        # collector ledger tests
bun run check       # build + syntax checks + tests
bun run package     # creates dist/ release artifacts
```

`panel/main.js` is the built guest bundle and must be committed or shipped with
the extension. OpenChamber caches guest bundles by extension version; bump
`package.json` `version` and reinstall after panel changes.

Key files:

- `collector/ledger.js` — pure projection from durable messages and live events
- `collector/index.js` — OpenCode plugin entry and loopback server
- `src/` — React panel source
- `service/main.js` — OpenChamber host service
- `panel/` — built panel assets

## Release

Tags of the form `v*` build and attach:

- `openchamber-trajectory-extension-<version>.zip`
- `openchamber-trajectory-collector-<version>.tgz`

The release workflow can publish the collector to npm when the repository has
an `NPM_TOKEN` secret.

## Known limitations

- **Panel only.** OpenChamber 2.5.0's full-page guest surface did not reliably
  mount this guest in testing, so the `page` entry is not shipped yet.
- **Local only.** Remote/external OpenCode servers need a different transport.
- **No inline subagent tree.** `task` tool calls are shown as tool rows.
- **Request headers are not historical.** They start at collector install time.
- **No Chat tab.** OpenChamber extensions cannot register a conversation view.
- **OpenCode plugin API changes** may require a collector update.

## License

MIT. See [LICENSE](LICENSE).

This is an independent project and is not affiliated with OpenChamber, OpenCode
or DeepSeek.
