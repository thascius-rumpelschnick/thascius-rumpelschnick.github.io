---
name: verify
description: Run this project's verification gate (the lint, test, and build scripts from the root package.json, in that order) and report exact failures. Use before claiming any change is complete, before committing, and when the user asks to "verify", "check", or "make sure it builds".
---

Run from the repo root. Stop at the first failure.

1. If there is no `package.json` at the root, stop and say the app has not been scaffolded yet. Do not run `pnpm install`; it would create a bare manifest.
2. If `node_modules/` is missing, run `pnpm install`.
3. Read `scripts` in `package.json`. Run, in order, whichever of these exist: `pnpm lint`, `pnpm test` (only if it is a real runner, not the `npm init` placeholder that exits 1), `pnpm build`. Never start `dev`, `start`, or `preview`; those are servers, not checks.

Report the outcome:

- On success, one line per step confirming it passed, and name any step skipped because the script does not exist.
- On failure, quote the failing command's output verbatim in a code block, name the file and line, and fix the root cause. Never add a disable comment, loosen a `tsconfig.json` flag, or lower a warning threshold to get green.
