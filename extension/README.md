# OpenChamber Trajectory extension

This folder is the OpenChamber extension package. It contains:

- `panel/index.html`, `panel/main.js`, `panel/styles.css` — the sandboxed panel
- `service/main.js` — the host-side service that discovers the OpenCode
  trajectory collector and proxies its JSON API

It requires the collector from `../collector/` to be loaded in OpenCode.

## Install

Settings → Extensions → add the absolute path to this folder (or a zip/git
URL containing it). Approve the `service` capability.

## Manifest

- panel id: `trajectory`
- icon: `route`
- session action: `open-trajectory` (“Open trajectory”)
- no `page` entry in the current build

## Build

From the repository root:

```bash
bun run build
```

This rewrites `panel/main.js`.
