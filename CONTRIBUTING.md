# Contributing

Thanks for taking a look. This project is a small OpenCode plugin plus an
OpenChamber extension.

## Development

```bash
bun install
bun run check
bun run dev   # rebuild panel/main.js on changes
```

Requirements:

- Bun 1.4+
- Node 22+ for the collector tests
- OpenChamber 2.5+ and OpenCode 2.x for an end-to-end test

## What to test

- `bun run check` must pass.
- For collector changes, test against a real OpenCode session and confirm
  `context`, `tool` and live events still arrive.
- For panel changes, bump `package.json` `version`, rebuild, reinstall the
  extension, and reopen the panel. OpenChamber caches guest bundles by version.
- Keep the collector read-only. Do not add session mutations, prompt sends or
  project writes.

## Pull requests

- Keep changes focused.
- Add a `CHANGELOG.md` entry for user-visible changes.
- Do not commit personal session data, screenshots containing private chats,
  tokens, logs or `~/.local` paths.
- Update `README.md` if install or behavior changes.

## Code layout

```text
collector/        OpenCode plugin and pure ledger projection
src/              React panel source
panel/            built panel assets (main.js is committed)
service/          OpenChamber host service
scripts/          build and package scripts
```

## License

By contributing, you agree that your contribution is licensed under the MIT
license in [LICENSE](LICENSE).
