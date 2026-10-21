# OpenChamber Trajectory

A Trajectory panel for OpenChamber, modelled on the DeepSeek Harness trajectory
view. It has two parts:

- **OpenCode collector** (`collector/`) — a read-only OpenCode 2 plugin that
  captures request headers, steps, tools, retries, compaction and usage, and
  serves a small JSON ledger over loopback.
- **OpenChamber extension** (`extension/`) — a sandboxed panel, plus a small
  service that discovers the collector and proxies its data.

The extension never receives an OpenCode password and never talks to the
OpenCode API. The collector never mutates a session, never sends a prompt, and
never writes into the project.

## What it shows

- Turns and steps, with request numbers
- TTFT, decode time, total duration, throughput
- Input / output / reasoning / cache read / cache write tokens and cost
- Tool calls with arguments, results, errors and exact timing
- Compaction, retries, failures, system/synthetic/skill notices
- Request context: system prompt, tool schemas, options, model, agent
- Live updates while the session is running
- A timing overview strip with wheel zoom (1×–128×), drag-to-pan, +/- controls and reset
- Click an overview bar to select the record and scroll the ledger to it
  (expanding its turn and clearing a search filter first)

## Current shape

- **Panel only.** The extension installs a rail panel, plus a session action.
  The `page` entry is intentionally not shipped yet: OpenChamber 2.5.0's
  full-page guest surface did not reliably mount this guest in testing.
- **Local only.** The collector's loopback server must be reachable from the
  OpenChamber service. OpenCode and the OpenChamber server should run on the
  same machine (or the same container network).
- **New sessions only for request headers.** Historical sessions are rebuilt
  through `ctx.session.context()`, so their timing/tokens/tools are available,
  but system prompt and tool schemas exist only for requests made while the
  collector was loaded.
- **Web and Desktop.** Extensions are not loaded in VS Code or the mobile app.

## Install (development)

1. Install the OpenCode collector. For a local checkout, add it to the
   project's `.opencode/plugins/` or to the `plugins` array in
   `opencode.json(c)`:

   ```bash
   ln -s /absolute/path/to/openchamber-trajectory/collector \
     .opencode/plugins/trajectory-collector
   ```

   For a published package:

   ```bash
   opencode plugin add @openchamber/opencode-trajectory-collector
   ```

2. Install the OpenChamber extension: Settings → Extensions → paste the
   absolute path to `extension/` (or a zip of it).

3. The extension asks for the `service` capability. Approve it.

4. Open a chat, then click the Trajectory icon on the right rail (or use the
   session's “Open trajectory” action).

## Build

```bash
bun install
bun run build       # bundles extension/panel/main.js
bun run test        # collector ledger tests
bun run check       # build + syntax checks
```

`extension/panel/main.js` is the built guest bundle and must be committed or
shipped with the extension.

## Data flow

```
OpenCode 2
  collector/index.js
    ctx.session.hook("context")  -> request headers
    ctx.session.hook("retry")    -> retry facts
    ctx.tool.hook("execute.*")   -> tool args/results/timing
    ctx.event.subscribe()        -> live step/text/tool/compaction events
    ctx.session.context()        -> historical backfill
    loopback HTTP + 0600 runtime file
            |
            v
OpenChamber host
  extension/service/main.js
    discovers the collector, proxies /ledger /row /header
            |
            v
extension/panel/main.js (sandboxed iframe)
  timeline + ledger + inspector
```

## Data directory

Default: `~/.local/share/openchamber/trajectory`

- `instances/<pid>-<random>.json` — discovery record (`0600`)
- `collector.log` — collector errors only (`0600`)

Override with `OPENCHAMBER_TRAJECTORY_DATA_DIR`.

## Development notes

- `collector/ledger.js` is a pure projection from durable messages and live
  events. It has no OpenCode imports and is covered by
  `collector/ledger.test.js`.
- `collector/index.js` is the OpenCode plugin entry. It opens one loopback
  server per loaded OpenCode location.
- `extension/src/` is the React source for the panel. `extension/panel/main.js`
  is built by `scripts/build.mjs` as an IIFE.
- The collector is loaded by OpenCode; after editing it, OpenCode hot-reloads
  the plugin and the panel reconnects automatically. After editing the panel,
  rebuild and reopen the panel (or bump the extension version and reinstall).
- OpenChamber caches guest bundles by extension version. When testing panel
  changes, bump `extension/package.json` `version` and reinstall, or restart
  OpenChamber.

## Known limitations

- No Chat tab. OpenChamber's extension SDK only provides panel/page surfaces.
- No inline subagent tree yet; `task` tool calls link to the child session only
  as a metadata row.
- Request headers before the collector was installed are not recoverable.
- The collector is a public-API plugin; OpenCode plugin API changes may require
  an update.
- Page surface is deferred (see “Current shape”).
