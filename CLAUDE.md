# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

The root app is being re-scaffolded. The Vite scaffold still in `HEAD` was deleted from the working tree on purpose; do not restore it. `createreactapp/` (also deleted, uncommitted) and any stray `cg/` or `thascius-rumpelschnick/` directory at the root are leftovers, not code to build on. Until a new `package.json` exists at the root there is nothing to install, build, or lint. After scaffolding, fill in the Toolchain section and delete this one.

## Toolchain

- Use **pnpm**. `npm` and `npx` are not on PATH.
- Run `pnpm install` before any script. Never run it before `package.json` exists: pnpm silently creates a bare manifest when none is present.
- Scripts and their quirks: _fill in after scaffolding_.
- There are no tests. Run `/verify` before declaring work done.

## Repo layout

- `legacy/` is a **read-only content source**. `legacy/index.html` (CV site) and `legacy/ti/` (FSM / Turing-machine visualizer) are what the new app should reproduce. `legacy/thascius-rumpelschnick/` is an abandoned Next.js attempt. Never edit anything under `legacy/`; use `/port-legacy <section>` to bring content over.

## GitHub Pages

- This is a user site (`thascius-rumpelschnick.github.io`) served from the domain root, so no base path, `basePath`, or `assetPrefix` is needed. If the chosen framework renders on a server by default, configure static export.
- How the build output gets deployed is not decided yet (no workflow, no gh-pages branch). Do not set one up without asking.

## Git

- Work on a feature branch and open a PR to `main`.
- Commit subject: `[<branch-name>] Imperative summary`, e.g. `[transform-to-react-app] Add nav component`.
- `.claude/` and `.ai/` are committed. `.claude/settings.local.json` is personal and gitignored.

## Design decisions

Project and architecture decisions live in `.ai/` and are the source of truth for design choices. They are inlined below.

@.ai/project.md
@.ai/architecture.md
