export const meta = {
  name: 'site-polish',
  description:
    'Audit the whole site as a visitor (color/format/style/responsive/data), synthesize a prioritized report, implement fixes on a branch, and open a PR to main.',
  whenToUse:
    'On demand before sharing the site, or on a schedule, to keep it polished and device-compatible. Spawns ~30 subagents and opens a PR (never merges).',
  phases: [
    { title: 'Map', detail: 'enumerate user-facing endpoints' },
    { title: 'Audit', detail: '~30 auditors: per-endpoint (embodied) + cross-cutting lenses' },
    { title: 'Synthesize', detail: 'dedupe + rank into one prioritized report' },
    { title: 'Implement', detail: 'fixes on a branch → build → PR to main' },
  ],
}

// ── Inputs ────────────────────────────────────────────────────────────────
const baseUrl =
  (args && typeof args === 'object' && args.baseUrl) || 'http://localhost:3000'
const VIEWPORTS = 'phone ~390x844, tablet ~834x1112, desktop ~1440x900'
const LENSES = [
  'color-and-contrast (WCAG AA, consistent accent use, legibility on colored bands)',
  'typography-and-hierarchy (scale, fluidity, no clipping, no sub-11px labels)',
  'spacing-alignment-and-rhythm (gutters, balance, alignment)',
  'responsive-and-overflow (no horizontal scroll, no 100vh jump, grids reflow, images/tables contained)',
  'touch-and-interaction (>=44px targets, no hover-only traps, dismissable sheets, focus states)',
  'data-accuracy-and-links (dead/# links, placeholders, stale/contradictory dates, broken images)',
  'accessibility (landmarks, alt text, focus order, reduced-motion, keyboard reachability)',
]

// ── Map ─────────────────────────────────────────────────────────────────
phase('Map')
const mapText = await agent(
  `Enumerate this Next.js (App Router) app's USER-FACING route endpoints. Run \`find src/app -name 'page.tsx'\`, convert each file to its URL path (strip the leading \`src/app\` and trailing \`/page.tsx\`; the root becomes \`/\`). EXCLUDE any \`/design-preview\` routes (internal). Output ONLY the route paths, one per line, nothing else.`,
  { label: 'map:endpoints', phase: 'Map' },
)
let routes = (mapText || '')
  .split('\n')
  .map((s) => s.trim())
  .filter((r) => r.startsWith('/') && !r.startsWith('/design-preview'))
if (routes.length === 0) routes = ['/', '/musings']
// Keep the fan-out bounded but generous.
routes = routes.slice(0, 20)
log(`Auditing ${routes.length} endpoints + ${LENSES.length} lenses at ${baseUrl}`)

// ── Audit (fan out ~30) ───────────────────────────────────────────────────
phase('Audit')
const endpointAuditors = routes.map(
  (route) => () =>
    agent(
      `Audit the route \`${route}\` at base URL ${baseUrl} across viewports: ${VIEWPORTS}. Embody a first-time visitor (use the Chrome tools if available; otherwise audit statically and say so). Exercise the primary interaction on this page. Return your structured findings list per your instructions.`,
      { label: `audit:${route}`, phase: 'Audit', agentType: 'site-experience-auditor' },
    ),
)
const lensAuditors = LENSES.map(
  (lens) => () =>
    agent(
      `Cross-cutting audit of the WHOLE site through the ${lens} lens. Base URL ${baseUrl}. Routes to consider: ${routes.join(', ')}. Viewports: ${VIEWPORTS}. Return your structured findings list per your instructions, tagging each finding with the route it occurs on.`,
      { label: `lens:${lens.split(' ')[0]}`, phase: 'Audit', agentType: 'site-experience-auditor' },
    ),
)
const rawFindings = (await parallel([...endpointAuditors, ...lensAuditors])).filter(Boolean)
log(`Collected findings from ${rawFindings.length} auditors`)

// ── Synthesize ────────────────────────────────────────────────────────────
phase('Synthesize')
const report = await agent(
  `You are the lead reviewer. Below are raw findings from ${rawFindings.length} independent auditors of the same site. Merge duplicates, resolve contradictions, drop anything speculative or unverifiable, and produce ONE prioritized markdown report titled "Site polish report". Group by severity (High / Medium / Low); within each, one bullet per issue as: \`(category) route @viewport — problem → concrete fix (file:line when known)\`. End with a short "Data accuracy" section listing any wrong/stale content or dead links. For any user-facing COPY you propose as a fix, write it plainly and humanly — no clichés or AI tells (run it through the stop-slop skill if available). Output only the report.\n\n=== RAW FINDINGS ===\n${rawFindings
    .map((f, i) => `--- auditor ${i + 1} ---\n${f}`)
    .join('\n\n')}`,
  { label: 'synthesize:report', phase: 'Synthesize', effort: 'high' },
)

// ── Implement → build → PR ────────────────────────────────────────────────
phase('Implement')
const outcome = await agent(
  `Implement the fixes in the polish report below, per your operating rules (dedicated \`polish/site-audit-*\` branch, surgical diffs that preserve the desktop design, reuse existing tokens, keep desktop max sizes when making type fluid, plain human copy). Then run the build, and if green, open a PR to \`main\` with \`gh pr create\` whose body includes this report and a "For the owner to finalize" checklist. Never commit to main, never merge. Return the branch name, the PR URL, what you changed, and what you deliberately skipped.\n\n=== SITE POLISH REPORT ===\n${report}`,
  { label: 'implement:branch-and-pr', phase: 'Implement', agentType: 'site-polish-implementer', effort: 'high' },
)

return { baseUrl, routes, report, outcome }
