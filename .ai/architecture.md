# Architecture

Version: 0.3
Date: 2026-09-12

## Stack

Next.js 16 (App Router, Turbopack) with React 19 and TypeScript, built as a **static export** and served by GitHub Pages. pnpm 12 is the only package manager. The scaffold was created by hand from the Next.js manual-installation guide, so there is no Tailwind and no create-next-app boilerplate. Styles are SCSS Modules compiled by `sass` (decisions 10 and 13).

## Delivery

- `pnpm build` runs `next build` with `output: "export"` and writes the deployable site to `out/`. `trailingSlash` is on so nested routes become `<route>/index.html`. `next/image` optimization is off because it needs a server.
- `public/.nojekyll` is copied into `out/` so GitHub Pages serves the underscore-prefixed `_next/` folder.
- `out/` reaches GitHub Pages through the GitHub Actions workflow `.github/workflows/deploy.yml` (decision 8). A push to `main`, or a manual run, installs with pnpm, runs `pnpm lint` and `pnpm build`, uploads `out/` with `actions/upload-pages-artifact` and deploys it with `actions/deploy-pages`. Feature branches never deploy. The Pages source in the repo settings must be switched from "Deploy from a branch" to "GitHub Actions" once, by hand, before the first merge to `main`; until then Pages keeps serving the legacy files at the root of `main`.

## Source layout

- `src/app/` holds the App Router tree (`layout.tsx`, `page.tsx`); `@/*` resolves to `src/*`. `public/` holds files served as-is from the domain root.
- `src/components/<name>/` holds one folder per component: `Name.tsx`, `Name.module.scss` and the images it imports (decision 9). `src/app/globals.scss` carries design tokens, the reset and base element styles; page chrome lives in `src/app/page.module.scss` (decision 10). Shared Sass mixins (the legacy breakpoints) live in `src/styles/_mixins.scss` and are pulled in with a relative `@use` (decision 13).
- Icons are inline SVG rendered by `src/components/icons/Icon.tsx` from a name-to-path map (decision 11). Kumbh Sans is self-hosted through `next/font/local` from `src/app/fonts/` (decision 12).
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
| 8 | Deploy `out/` with a GitHub Actions workflow (`.github/workflows/deploy.yml`) triggered by push to `main` | Chosen by the owner on 2026-09-12. Build output stays out of git, lint and build run on every deploy, and the official Pages actions need no deploy token | `gh-pages` branch (build output in git history), committing `out/` to `main` (a generated diff on every change) | Hosting changes, or feature branches need a preview environment |
| 9 | Folder per component under `src/components/<name>/`, with module CSS and imported images colocated | Chosen by the owner on 2026-09-12 at the first `/port-legacy`. Each section's markup, styles and assets stay in one reviewable diff | Flat files under `src/components/` with a shared `src/assets/` | A shared component library or a second consumer of the components appears |
| 10 | CSS Modules per component plus a small global `globals.css` (tokens, minireset, body, headings, links); section ids stay plain attributes and styling hangs off a module class | Chosen by the owner on 2026-09-12. Legacy selectors port almost verbatim (`#about` becomes `.about`), nothing leaks between the CV page and the visualizer routes, and anchor ids keep working because a module would hash `#about` | One global stylesheet ported as-is (id selectors leak across routes, one file for every section), Tailwind (a redesign, out of scope) | A visual refresh replaces the legacy CSS |
| 11 | Icons as inline SVG paths copied from the legacy Font Awesome 5.14 `svgs/` folder into `Icon.tsx` (CC BY 4.0 attribution kept in the file) | Chosen by the owner on 2026-09-12. Zero dependencies, a few hundred bytes per icon, and nothing to fetch on a static export | `@fortawesome/fontawesome-free` CSS (full webfonts for ~19 icons), `react-fontawesome` (four packages) | The icon count grows well past the legacy ~19 or an icon needs styling the map cannot express |
| 12 | Kumbh Sans through `next/font/local` with the three legacy TTFs at weights 300/400/700; body weight 300 | Self-hosted, no layout shift, works with static export. Legacy declared `@font-face { font-weight: lighter }`, an invalid descriptor, so its Light face never registered; 300 is the evident intent | `@font-face` in `globals.css` with files in `public/` | Never, unless the font changes |
| 13 | SCSS Modules (`*.module.scss`, `globals.scss`) compiled by the `sass` dev dependency; shared mixins in `src/styles/_mixins.scss`, imported by relative `@use` | Chosen by the owner on 2026-09-12. Next 16 supports Sass natively with the same module scoping rules; nesting mirrors the legacy selector structure and mixins remove the media queries and the button rule that legacy repeats across sections. Plain CSS is valid SCSS, so nothing was rewritten. `@parcel/watcher`, sass's optional watcher, has an install script that is a no-op without `npm_config_build_from_source`; it is allowed in `pnpm-workspace.yaml` | Plain CSS Modules (native nesting via Lightning CSS, but no mixins), `sass-embedded` (native binary, faster, more platform packages), `sassOptions.loadPaths` instead of relative `@use` (one more config knob) | Turbopack's Sass support changes, or the mixin count stays at two |

## Open decisions

- **Visualizer port.** Legacy `ti/` pulls Materialize CSS, Material Icons and `svg-inject` from CDNs and drives the SVG by direct DOM mutation (`renderer.ts` toggles classes via `querySelector`). Leaning: keep `machine.ts`, `fsm.ts`, `tm.ts` as pure TypeScript state logic, render the diagram and table from React state, and drop Materialize. Not ratified.
- **Formatter.** None configured; Prettier or Biome, or ESLint only.
