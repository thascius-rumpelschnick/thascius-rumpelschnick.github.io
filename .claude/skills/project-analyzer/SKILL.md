---
name: ecc-project-analyzer
description: Use this skill proactively at the start of any new conversation in a codebase, AND when the user asks "what is this project?", "explain this codebase", "give me an overview", "analyze this project", "what am I looking at here?", "how does this work?", "walk me through this repo", "what does this do?", or any similar orientation question. Also trigger when the user seems to be orienting themselves in an unfamiliar repo, even without asking directly. Make sure to use this skill whenever someone wants to understand a codebase they've just encountered.
model: fable
effort: xhigh
metadata:
   author: <author>
   version: "1.0"
---

# Project Analyzer

Helps you quickly understand what a project is, why it exists, and how it achieves its goals — calibrated to the depth the user actually needs.

## When Invoked

1. Ask the user which depth they want (unless they already specified):

   > "Which depth?
   > **1** — two-paragraph summary (what it does + how)
   > **2** — structured overview (purpose, stack, architecture, modules, entry points)
   > **3** — deep dive (everything in 2, plus data/control flow, design patterns, notable decisions, dependency map)"

2. Explore the project according to the depth strategy below.

3. Deliver the output in the matching format.

---

## Exploration Strategy

### Level 1 — Quick (~5 reads)

Read in this order; stop when you have enough to answer:
- README (README.md, readme.txt, docs/README.md, or similar)
- Root-level package descriptor: `pom.xml`, `package.json`, `build.gradle`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `composer.json`, etc.
- Main entry point if it's obvious from the descriptor (e.g., `main` class in a Maven project, `main.py`, `index.js`)
- Any `docs/` or `wiki/` folder index

### Level 2 — Overview (~15 reads)

Everything in Level 1, plus:
- Top-level source directory structure (list dirs, don't read all files)
- Core module/package listing — note names and infer purpose from them
- Key configuration files: `application.yml`, `application.properties`, `.env.example`, `config/`
- 2–3 central abstractions — the classes, interfaces, or modules whose names suggest they're at the heart of things
- Test directory scan: what kinds of tests exist, what do they cover?

### Level 3 — Deep Dive (thorough)

Everything in Level 2, plus:
- Read key files fully (not just a skim)
- Trace one primary use-case end-to-end through the code — follow the data from input to output
- Map external dependencies and what role each plays
- Identify design patterns (DI container, event bus, CQRS, pipeline, strategy, etc.)
- Note any non-obvious architectural decisions or constraints

---

## Output Formats

### Level 1

Two plain paragraphs — no headers, no bullet points:

1. What the project is and who it's for.
2. The core mechanism: what it takes in, what it does, what it produces or enables.

Keep it under 150 words total.

### Level 2

```
## Project: <name>

**What it is:** <one clear sentence>

**Tech stack:** <comma-separated list of languages, frameworks, and key tools>

**Architecture:** <2–3 sentences describing the overall structure and how the main pieces relate>

**Key modules:**
- `<module/package>` — <what it does>
- `<module/package>` — <what it does>
- ...

**Entry points:** <how to build, run, or invoke the system>
```

### Level 3

Everything in Level 2, plus these additional sections:

```
## Data / Control Flow

<Narrative: trace one primary use-case from input through the code to output. Name the specific classes/functions involved.>

## Key Design Patterns

- **<Pattern>** — <where it's used and why>
- ...

## Notable Decisions

<Any non-obvious choices worth knowing: why this framework, a significant tradeoff, a deliberate constraint, something that would surprise a newcomer.>

## External Dependencies

| Dependency | Version | Role |
|------------|---------|------|
| ...        | ...     | ...  |
```

---

## Tips for a Good Analysis

- **README and package descriptors state intent explicitly** — read them first, they often give you the "what" directly.
- **Test files are the best behavioral documentation** — scanning them reveals what the code actually does, not just what it's supposed to do.
- **Generated code isn't the real logic** — if you spot protobuf stubs, JOOQ-generated classes, OpenAPI clients, or similar, note their existence but don't analyze them as if they were hand-written design.
- **If the project or domain name is unfamiliar**, look it up before diving into the code — understanding the domain dramatically speeds up understanding the code.
- **For Level 2+**, if there's no README, compensate by reading more source files and inferring intent from naming and structure.
