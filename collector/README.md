# @openchamber/opencode-trajectory-collector

Read-only OpenCode 2 plugin that collects the data the OpenChamber Trajectory
extension renders.

It captures:

- request headers through `ctx.session.hook("context")` — system prompt, tool
  schemas, options, model, agent;
- retries through `ctx.session.hook("retry")`;
- tool args/results through `ctx.tool.hook("execute.before" / "execute.after")`;
- live step/text/reasoning/tool/compaction events through `ctx.event.subscribe()`;
- historical messages through `ctx.session.context({ sessionID })`.

It serves a JSON ledger on `127.0.0.1` with a random port and bearer token. A
`0600` runtime file under `~/.local/share/openchamber/trajectory/instances/`
lets the OpenChamber extension service discover it. Nothing is written into the
project and no content leaves the machine.

## Install

```bash
opencode plugin add openchamber-trajectory-collector
```

Or add the package/path to the `plugins` array in `opencode.json(c)`.

## Local development

Point OpenCode at this folder with a project-local plugin:

```text
.opencode/plugins/trajectory-collector -> /path/to/openchamber-trajectory/collector
```

OpenCode 2 loads `.opencode/plugins/*` automatically and hot-reloads it.

## Data directory

Override with `OPENCHAMBER_TRAJECTORY_DATA_DIR`. Default:

- macOS/Linux: `~/.local/share/openchamber/trajectory`
- Windows: `%LOCALAPPDATA%\openchamber\trajectory` (via `os.homedir()` fallback)

Files:

- `instances/<pid>-<random>.json` — discovery record (`0600`)
- `collector.log` — errors only (`0600`)

## Notes

- Live request headers and retry records are kept in memory. After an OpenCode
  restart, the durable transcript is rebuilt with `session.context`; system
  prompt/tools for requests made before the restart are reported as
  “not recorded”.
- The collector never mutates a session, never sends a prompt, and never writes
  to the project.
