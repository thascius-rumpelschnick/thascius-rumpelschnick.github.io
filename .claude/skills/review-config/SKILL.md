---
name: ecc-review-config
description: Review this repo's configuration files (package.json, tsconfig, framework config, lint config, .gitignore, Claude Code settings, CI workflows) for security issues, stale pins, and misconfigurations. Use when asked to audit or review the project configuration.
model: opus
effort: xhigh
disable-model-invocation: true
metadata:
  author: Florian Zapf
  version: "1.1"
---

Review this repository's configuration for security issues, stale pins, and misconfigurations. There is no `pom.xml` or `.env` here; this is a pnpm-managed web app deployed to GitHub Pages.

Read these files when they exist at the repo root:

- `package.json`: scripts, dependency ranges, `engines` / `packageManager`, and whether `pnpm-lock.yaml` is committed and in sync.
- `tsconfig*.json`: strictness flags, `include` coverage, unused-code checks.
- Framework config (`vite.config.*`, `next.config.*`, or similar): output must be a static export with no base path, because this is a user site served from the domain root.
- Lint and format config (`eslint.config.*`, `.eslintrc*`, `.prettierrc*`): rules that are disabled or downgraded.
- `.gitignore`: build output, `node_modules`, `.claude/settings.local.json`, and any `.env*` file must be ignored.
- `.claude/settings.json` and `.mcp.json`: hooks, permissions, and MCP servers a teammate would inherit.
- `.github/workflows/*.yml`: pinned action versions, minimal `permissions`, secrets used.

Never open a `.env` file even if one exists; report only whether it is gitignored.

Report findings grouped by severity (security, correctness, hygiene). For each, name the file, quote the offending value, and give the concrete fix. Do not edit anything; this skill reports only.
