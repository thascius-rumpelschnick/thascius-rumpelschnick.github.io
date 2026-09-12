---
name: port-legacy
description: Port one section of the legacy static site into a React component in the app at the repo root. Use when the user runs /port-legacy <section> (e.g. /port-legacy about, /port-legacy experience, /port-legacy nav, /port-legacy fsm) or asks to port, migrate, or bring over a piece of the old site. legacy/ is read-only; this skill never edits it.
disable-model-invocation: true
---

Port the legacy section named in `$ARGUMENTS` into the app at the repo root.

If there is no `package.json` at the repo root, stop: the app has not been scaffolded yet.

## Locate the source

- CV site sections are the `<section id="...">` blocks in `legacy/index.html`: `about`, `what`, `who`, `portfolio`, `interests`, `experience`, `education`, `contact`. `nav` (the `<header>` with `#mobile-menu`) and `footer` are the surrounding chrome in the same file.
- `fsm` and `tm` are the visualizer pages `legacy/ti/fsm.html` and `legacy/ti/tm.html`. Their logic is in `legacy/ti/js/src/` (`fsm.ts`, `tm.ts`, `machine.ts`, `renderer.ts`) and design notes in `legacy/ti/fsm.md` and `legacy/ti/tm.md`.
- Styles live in `legacy/styles/` and `legacy/ti/css/`. Images live in `legacy/images/` and `legacy/ti/assets/`.

If `$ARGUMENTS` is empty or matches none of these, list the valid names and stop.

## Port it

1. Read the whole source section, the CSS rules that target its ids and classes, and any script in `legacy/scripts/` or `legacy/ti/js/src/` that touches it. Inventory every visible string, link, and image before writing code. Content is the contract; the old markup is not.
2. Follow the component and file layout already present in the app's source directory. If this is the first component, propose a layout (folder per component vs. flat files) and ask before creating it.
3. Keep all visible text verbatim. Do not rewrite, translate, or "improve" copy.
4. Copy the images the section uses into the app's asset directory and import them, or into its static directory if they must be served by URL. Never reference a `legacy/` path at runtime.
5. Port only the styles the section needs. Convert `class` to `className` and inline handlers to React handlers.
6. Mount the component in the app's root component in the same order it appears on the legacy page.
7. Run `/verify`.

## Never

- Edit, move, or delete anything under `legacy/`.
- Port more than the one section named. One section per invocation keeps diffs reviewable.

## Report

List the files created or changed, then anything from the source you dropped or could not port and why.
