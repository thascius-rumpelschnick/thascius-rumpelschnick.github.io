# Project

Version: 0.1
Date: 2026-09-12

## Purpose

Personal website of Florian Zapf ("Fullstack Software Engineer"), published at `https://thascius-rumpelschnick.github.io`. It replaces the hand-written static site preserved under `legacy/` with a React app while keeping the content and behaviour the same. Two things live on the site:

1. **CV page** (`legacy/index.html`): a single scrolling page with a header nav and the sections `about`, `what`, `who`, `portfolio`, `interests`, `experience`, `education`, `contact`, followed by a footer. The nav links to the section anchors.
2. **TI visualizers** (`legacy/ti/`): two interactive pages for the Embedded Reber Grammar, one as a finite state machine (`fsm.html`) and one as a Turing machine (`tm.html`). Each shows a transition table and an SVG state diagram and animates the machine step by step through an input. Their UI text is German ("Zustand", "Eingabe", "Folgezustand").

## Content contract

- `legacy/` is the single source of content. Visible text, links, images and section order are reproduced verbatim; nothing is rewritten, translated or "improved" during the port.
- Content moves over one section at a time via `/port-legacy <section>` so every diff stays reviewable.
- Images come from `legacy/images/` and `legacy/ti/assets/`. Nothing references a `legacy/` path at runtime.

## Routes

| Route | Content | Status |
|---|---|---|
| `/` | CV page | decided |
| `/ti/fsm/` | FSM visualizer | proposed, mirrors `legacy/ti/fsm.html` |
| `/ti/tm/` | Turing machine visualizer | proposed, mirrors `legacy/ti/tm.html` |

Routes end in a trailing slash because the site is exported as `<route>/index.html` files.

## Key Constraints

- **Static files only.** GitHub Pages serves the exported files; there is no server, no runtime API and no place for secrets. Every feature must work as prerendered HTML plus client-side JavaScript.
- **User site at the domain root.** No base path or asset prefix anywhere.
- **`legacy/` is read-only.** It is never edited, moved or deleted; it is the contract the new app is checked against.
- **pnpm only.** `npm` and `npx` are not available on the development machine.
- **No tests exist yet.** The quality gate is lint plus a successful static build (`/verify`).

## Non-goals (for now)

No CMS, no blog, no i18n framework, no server-side features, no redesign of the copy. A visual refresh is possible later but is not part of the port.

## Open questions

- Is the animated landing splash (`legacy/landing.html`, a "click on me" link to the CV) part of the site to keep, or dropped?
- Do the old `.html` URLs (`/ti/fsm.html`, `/ti/tm.html`) need to keep working, e.g. via redirect stubs in `public/`?
- Route naming for the visualizers (`/ti/...` as in legacy, or something more descriptive) is a proposal, not yet ratified.
