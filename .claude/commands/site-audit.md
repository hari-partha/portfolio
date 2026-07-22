---
description: End-to-end site polish audit → fixes on a branch → PR to main for you to approve
argument-hint: "[base-url]  (default http://localhost:3000)"
allowed-tools: Workflow, Bash, Read
---

Run the **`site-polish`** workflow: an experience auditor embodies a visitor across phone, tablet, and desktop, walks every user-facing endpoint scrutinizing color, formatting, styling, responsiveness, touch, and data accuracy; the findings are synthesized into one prioritized report; an implementer applies the fixes on a fresh branch, runs the build, and opens a pull request to `main` for you to finalize and approve.

Do this:
1. Make sure a dev server is reachable. If nothing is serving, start one: `npm run dev` in the background, and wait until it responds. Use the base URL from `$ARGUMENTS` if given, otherwise `http://localhost:3000`.
2. Invoke the workflow: call the **Workflow** tool with `{ name: "site-polish", args: { baseUrl: "<resolved base url>" } }`.
3. When it finishes, report back the prioritized findings summary, the branch name, and the **PR URL** so the owner can review, finalize, and merge.

This is billable multi-agent work (it can spawn ~30 subagents). Only run it when the owner asked for a site audit.
