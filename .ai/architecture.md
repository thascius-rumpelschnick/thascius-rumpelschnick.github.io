# Architecture

Version: 0.1
Date: 2026-09-12

## Stack

Next.js 16 (App Router, Turbopack) with React 19 and TypeScript, built as a **static export** and served by GitHub Pages. pnpm 12 is the only package manager. The scaffold was created by hand from the Next.js manual-installation guide, so there is no Tailwind, no global stylesheet and no create-next-app boilerplate; those remain open choices below.

## Delivery

- `pnpm build` runs `next build` with `output: "export"` and writes the deployable site to `out/`. `trailingSlash` is on so nested routes become `<route>/index.html`. `next/image` optimization is off because it needs a server.
- `public/.nojekyll` is copied into `out/` so GitHub Pages serves the underscore-prefixed `_next/` folder.
- **How `out/` reaches GitHub Pages is not decided** (GitHub Actions workflow, `gh-pages` branch, or committing the output). Nothing is set up.

## Source layout

- `src/app/` holds the App Router tree (`layout.tsx`, `page.tsx`); `@/*` resolves to `src/*`. `public/` holds files served as-is from the domain root.
- Component and styling layout are decided at the first port (see Open decisions), not upfront.
- `legacy/` is excluded from TypeScript and ESLint; it is content, not code.

## Decision log

| # | Decision | Why | Alternatives set aside | Revisit when |
|---|---|---|---|---|
| 1 | Next.js App Router instead of the earlier Vite + React SPA scaffold | Chosen by the owner. What makes it fit: file-based routing for the CV page plus two visualizer pages, prerendered HTML instead of an empty SPA shell, first-class TypeScript and static export in one framework | Vite + React SPA (deleted 2026-09-12), plain static HTML | Only if server features ever become necessary, which Pages cannot host anyway |
| 2 | Static export (`output: "export"`) | GitHub Pages serves files only | Vercel or another host with a Node runtime | Hosting changes |
| 3 | GitHub Pages user site at the domain root, no base path | Existing domain `thascius-rumpelschnick.github.io` | Project site under a sub-path | Never, unless the repo is renamed |
| 4 | TypeScript with `strict: true`; `typescript` is an npm alias for `@typescript/typescript6` | TypeScript 7 is the native compiler and ships no JavaScript API, so typescript-eslint (and with it `eslint-config-next`) cannot load against it; Microsoft documents the alias as the bridge | Running TypeScript 7 and dropping ESLint's TypeScript rules | typescript-eslint supports the TS 7.1+ API |
| 5 | ESLint 9 flat config with `eslint-config-next` (core-web-vitals + typescript) | Next's own config; ESLint 10 is outside the peer ranges of the react, import and jsx-a11y plugins it pulls in | ESLint 10 (npm marks 9.x deprecated), Biome | Those plugins declare ESLint 10 support |
| 6 | pnpm 12 with settings in `pnpm-workspace.yaml`; postinstall scripts blocked unless allowed explicitly (`allowBuilds`) | pnpm is the only toolchain on the machine; pnpm 12 fails installs on unreviewed build scripts by default, which is a supply-chain guard worth keeping | npm / yarn | Never |
| 7 | Lint plus build as the only quality gate | No tests exist yet; `next build` type-checks and prerenders every route | Adding a test runner now | The first pure logic lands (the machine core of the visualizers) |

## Open decisions

- **Styling.** Legacy uses plain CSS (`normalize.css`, `base.css`, `style.css`, local Font Awesome). Candidates: port to CSS Modules per component, or a single global stylesheet ported as-is. Tailwind is not installed; adding it would be a separate decision. Decide at the first `/port-legacy` of a CV section.
- **Component layout.** Folder per component versus flat files under `src/`; the port-legacy skill asks before creating the first one.
- **Visualizer port.** Legacy `ti/` pulls Materialize CSS, Material Icons and `svg-inject` from CDNs and drives the SVG by direct DOM mutation (`renderer.ts` toggles classes via `querySelector`). Leaning: keep `machine.ts`, `fsm.ts`, `tm.ts` as pure TypeScript state logic, render the diagram and table from React state, and drop Materialize. Not ratified.
- **Deployment mechanism** for `out/`, see Delivery.
- **Formatter.** None configured; Prettier or Biome, or ESLint only.
