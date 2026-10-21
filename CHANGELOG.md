# Changelog

All notable changes to this project are documented here.

## [0.1.14] - 2026-10-21

### Fixed

- Clicking an Overview bar now scrolls the ledger to the selected record even
  before the user has scrolled the ledger manually. Tail-follow no longer
  overrides the programmatic scroll.

### Changed

- Maximum Overview zoom raised from 32× to 128×.
- Extension icon changed from `route` to `pulse` so it no longer matches the
  OpenChamber “导读” icon.

## [0.1.13] - 2026-10-21

### Added

- Overview zoom and pan: wheel zoom, drag-to-pan, +/− controls and reset.

## [0.1.12] - 2026-10-21

### Changed

- Timeline click selects the record and scrolls the ledger to it.
- Timeline selection clears search and expands the target turn.

## [0.1.0] - 2026-10-21

### Added

- OpenCode trajectory collector: request headers, retries, tools, live events,
  durable backfill, loopback API and discovery file.
- OpenChamber panel: turns, steps, tools, timing, tokens, compaction, notices,
  search, follow-tail, load-earlier and inspector.
- Collector ledger tests.
