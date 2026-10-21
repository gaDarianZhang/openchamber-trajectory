# OpenChamber Trajectory extension

The repository root is the OpenChamber extension package. It contains:

- `package.json` — the `openchamber` manifest
- `panel/index.html`, `panel/main.js`, `panel/styles.css` — the sandboxed panel
- `service/main.js` — the host-side service that discovers the OpenCode
  collector and proxies its JSON API

It requires the collector from `collector/` to be loaded in OpenCode.

## Install

Settings → Extensions → add the repository URL:

```text
https://github.com/gaDarianZhang/openchamber-trajectory
```

Or download the extension zip from Releases and add the zip file. Approve the
`service` capability.

## Manifest

- panel id: `trajectory`
- icon: `pulse`
- session action: `open-trajectory` (“Open trajectory”)
- no `page` entry in the current build

## Build

From the repository root:

```bash
bun run build
```

This rewrites `panel/main.js`.
