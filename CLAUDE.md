# CLAUDE.md

**ALWAYS** use the **DocsExplorer** agent when looking for the latest information / documentation on programming languages, libraries, frameworks, etc.

## Response Style

Be concise, precise, and clear. Focus on the essential information needed to answer the request.

Avoid:

- unnecessary explanation
- filler or fluff
- repetition
- overly long code snippets
- stylistic embellishment that reduces clarity

Write in a plain, direct style inspired by William Zinsser’s *On Writing Well*: simple, useful, and
understandable.

## Code Guidance

When writing code, choose the simplest effective solution that satisfies the requirement.

Prefer:

- clear structure
- minimal complexity
- maintainability
- idiomatic patterns for the language or framework

Do not over-engineer.

## Uncertainty

Never invent facts or guess silently.

If requirements, context, or constraints are unclear, ask for clarification before proceeding. If a
reasonable assumption is necessary, state it explicitly.

## Toolchain

- Use **pnpm** (pinned via `packageManager` in `package.json`). `npm` and `npx` are not on PATH.
- No `npx`: launch one-off CLIs and MCP servers with `pnpm dlx`. Project MCP servers are defined in `.mcp.json`.
- Run `pnpm install` before any script.
- pnpm settings live in `pnpm-workspace.yaml`, not in `package.json`. pnpm 12 fails an install when a dependency has an unreviewed postinstall script (`strictDepBuilds` defaults to on), so a new dependency with a build script needs an `allowBuilds` verdict there. `unrs-resolver` is deliberately `false`; its script only installs a WASM fallback that the native bindings make unnecessary.
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript 6. The app was scaffolded by hand from the Next.js manual-installation guide, so there is no Tailwind, no global stylesheet, and no create-next-app boilerplate. Routes live in `src/app/`; `@/*` resolves to `src/*`.
- `typescript` is an npm alias for `@typescript/typescript6`. TypeScript 7 is the native compiler and ships no JavaScript API, so typescript-eslint, and with it `eslint-config-next`, refuses to load against it. Microsoft documents the alias as the bridge until tools support the TS 7.1+ API. Do not bump `typescript` to 7 until `pnpm lint` works with it.
- ESLint is pinned to major 9. `eslint-config-next` itself accepts 10, but the react, import and jsx-a11y plugins it pulls in do not declare support for it yet, and create-next-app pins `^9` too. npm marks 9.x as deprecated; move to 10 once those plugins declare support for it.
- Scripts:
  - `pnpm dev` starts the dev server. Never run it as a check.
  - `pnpm build` type-checks (`strict` is on) and writes the static site to `out/`. It is the only type-check step; there is no separate `tsc` script.
  - `pnpm lint` / `pnpm lint:fix` run ESLint (flat config in `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript presets). Since Next 16, `next build` no longer lints, so lint must run explicitly.
  - There is no `start` script on purpose: `next start` does not work with `output: "export"`. To preview the export, serve `out/` with any static server, e.g. `pnpm dlx serve out`.
- Static-export quirks: no server features (no route handlers, server actions, middleware, or `next/image` optimization; dynamic routes need `generateStaticParams`). `trailingSlash` is on, so link to `/ti/`, not `/ti`. `public/.nojekyll` must stay: without it GitHub Pages drops the `_next/` folder.
- `legacy/` and `.remember/` (Remember plugin scratch) are excluded from both `tsconfig.json` and ESLint. If either starts reporting files there, fix the exclude; never edit `legacy/`.
- Generated and gitignored: `.next/`, `out/`, `next-env.d.ts`.
- There are no tests. Run `/verify` before declaring work done.

## Repo layout

- `src/app/` is the App Router tree (`layout.tsx`, `page.tsx`). `public/` holds files served as-is from the domain root.
- `legacy/` is a **read-only content source**. `legacy/index.html` (CV site) and `legacy/ti/` (FSM / Turing-machine visualizer) are what the new app should reproduce. Never edit anything under `legacy/`; use `/port-legacy <section>` to bring content over.

## GitHub Pages

- This is a user site (`thascius-rumpelschnick.github.io`) served from the domain root, so no base path, `basePath`, or `assetPrefix` is needed. Static export is configured in `next.config.ts` (`output: "export"`, `trailingSlash`, unoptimized images); `pnpm build` produces the deployable `out/` directory.
- How `out/` gets deployed is not decided yet (no workflow, no gh-pages branch). Do not set one up without asking.

## Git

- Work on a feature branch and open a PR to `main`.
- Commit subject: `[<branch-name>] Imperative summary`, e.g. `[transform-to-react-app] Add nav component`.
- `.claude/` and `.ai/` are committed. `.claude/settings.local.json` is personal and gitignored.

## Design decisions

Project and architecture decisions live in `.ai/` and are the source of truth for design choices. They are inlined below.

@.ai/project.md
@.ai/architecture.md
