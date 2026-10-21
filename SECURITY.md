# Security

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Use GitHub's private vulnerability reporting:

<https://github.com/gaDarianZhang/openchamber-trajectory/security/advisories/new>

Include:

- what is affected (collector, service, panel)
- a minimal reproduction
- the impact you believe it has

You should get an acknowledgement within a few days.

## Security model

- The collector runs inside the OpenCode process and can read the session data
  that process can read. Install it only if you trust the code.
- The collector serves JSON on `127.0.0.1` with a random bearer token. The
  discovery file is `0600`.
- The panel runs in a sandboxed iframe and reaches the host only through
  `serviceRequest`; it never receives the collector token.
- No telemetry or external network requests are made by this project.
- `collector.log` is intended for errors only. Do not add prompt, tool or
  credential content to it.

## Supported versions

Security fixes target the latest release.
