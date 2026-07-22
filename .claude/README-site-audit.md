# Site polish audit system

A reusable, on-demand pipeline that keeps the site presentation-ready: it **audits the live site as a visitor**, **implements the fixes on a branch**, and **opens a PR to `main`** for you to approve. Nothing ships without your merge.

## Run it
- Type **`/site-audit`** (optionally `/site-audit https://your-preview-url`), or just ask: *"run the site audit."*
- It will start a dev server if needed, then run the `site-polish` workflow.

## What happens (the `site-polish` workflow)
1. **Map** — enumerates every user-facing route (from `src/app`), skipping internal `/design-preview/*`.
2. **Audit** — fans out ~30 subagents: one **site-experience-auditor** per endpoint (embodying a visitor at phone/tablet/desktop) plus cross-cutting lens auditors (color & contrast, typography, spacing, responsive/overflow, touch, data accuracy, accessibility). Auditors use the Chrome browser tools when available, and fall back to rigorous static analysis otherwise. WebSearch is available for grounding.
3. **Synthesize** — dedupes and ranks everything into one prioritized report; user-facing copy proposals get a **stop-slop** cleanup.
4. **Implement** — the **site-polish-implementer** applies surgical fixes on a `polish/site-audit-*` branch, preserving the desktop design and reusing existing tokens, then runs the build.
5. **Verify** — build (and tests) must be green.
6. **PR** — opens a pull request to `main` with the report and an owner checklist. It never commits to `main`, force-pushes, or merges.

## Pieces
- `.claude/agents/site-experience-auditor.md` — the visitor/QA auditor.
- `.claude/agents/site-polish-implementer.md` — the branch + PR implementer.
- `.claude/workflows/site-polish.js` — the orchestration.
- `.claude/commands/site-audit.md` — the `/site-audit` entry point.

## Requirements
- A running dev server (the command starts one if needed).
- `gh` authenticated for the PR step.
- The Chrome extension connected is **optional** — it makes the audit visual ("embodied"); without it the auditors still run statically.
