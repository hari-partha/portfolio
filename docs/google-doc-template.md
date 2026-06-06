# Google Doc Authoring Template — Brainfood / Soulfood Posts

Copy this template into a Google Doc when drafting a new article. Use fenced `::block::` markers so the export script can convert your doc into typed content blocks.

## Workflow

1. Copy this template into a new Google Doc
2. Fill in the meta block at the top
3. Write content using block markers below
4. **File → Download → Plain text (.txt)**
5. Run the converter:

```bash
npm run convert:post -- ./exports/my-post.txt --slug my-post-slug --brand brainfood --format bitsize
```

For design-preview pilots, add `--preview bitsize-brainfood` (or another preview route folder).

---

## Meta block (required)

Place at the very top of the document:

```
---
meta
brand: brainfood
format: bitsize
title: Your Post Title
subtitle: One-line description.
seriesLabel: Brainfood · Bitsize
date: May 2026
lede: Optional one-line intro shown below the byline.
authorName: Hari Parthasarathy
authorMeta: M.E.T. '26 · UC Berkeley
footer: Optional footer note
signoff: A food for thought, — Hari
---
```

### Meta fields

| Field | Required | Notes |
|-------|----------|-------|
| `brand` | Yes | `brainfood` or `soulfood` |
| `format` | Yes | `bitsize` or `bytesize` |
| `title` | Yes | Article headline |
| `subtitle` | Yes | Deck line under title |
| `seriesLabel` | Yes | Shown above title (e.g. `Brainfood · Bitsize`) |
| `date` | No | Publication date string |
| `lede` | No | Italic intro below byline (Bitsize) |
| `breadcrumb` | No | Bytesize top bar breadcrumb |
| `authorName` | No | Defaults in page if omitted |
| `authorMeta` | No | Byline detail |
| `footer` | No | Closing footer text |
| `signoff` | No | Bitsize sign-off line |

---

## Authoring rules

1. **One block type per fenced region** — each block starts with `::type::` on its own line
2. **Close multi-line blocks** with `::end::` on its own line
3. **Single-line blocks** (`::paragraph::`) do not need `::end::` unless followed by another block on the same line
4. **Blank line** after every `::type::` opener (recommended for readability)
5. **Tables and charts** use `value | label` or `col1 | col2` pipe syntax (tabs also work)
6. **Bitsize** uses `::subsection::` for in-flow section heads — **no sticky nav**
7. **Bytesize** uses `::section::` for pillar markers — **auto-populates section bar**
8. Inline emphasis: `**bold**` and `*italic*` inside paragraph and quote text

---

## Block catalog

### Paragraph

```
::paragraph::
Normal body text. Supports **bold** and *italic*.
```

### Paragraph with drop cap (Bytesize opens)

```
::paragraph dropCap::
First paragraph with decorative drop cap.
```

### Subsection (Bitsize only)

Light kicker + italic H2. No ghost numeral, no sticky nav.

```
::subsection title="What's Changed" kicker="Section 2"::
::paragraph::
Body text inside the subsection.

::pullQuote::
Optional quote inside subsection.
::end::
::end::
```

### Section (Bytesize only)

Full pillar marker + section bar registration.

```
::section id="section-01" num="01" pillar="Pillar 1 — Capital" title="The sedimentary layer" shortLabel="Capital"::
::paragraph::
Section body text.
::end::
```

Required attributes: `id`, `num`, `pillar`, `title`, `shortLabel`

### Pull quote

```
::pullQuote cite="Optional attribution"::
The quote text.
::end::
```

### Stat row

```
::statRow::
$0.22 | of every AI dollar → AI for Health
82.6% | Claude on expert-level bio
::end::
```

### Callout

```
::callout label="Key idea"::
Definition or framework note.
::end::
```

### Table

```
::table caption="Source: PitchBook 2025"::
Year | AI share
2024 | 37%
2025 | 52.5%
::end::
```

First row is treated as headers when it contains text labels.

### Bar chart

```
::barChart label="AI Share of Global VC" caption="Source note"::
2022 | 15 | light
2025 | 52.5 | accent
::end::
```

Variant column: `light` or `accent` (optional).

### Figure

```
::figure src="/images/posts/my-chart.png" alt="Chart description" caption="Figure caption"::
::end::
```

Add `fullWidth="true"` attribute for edge-to-edge layout.

### Framework card (Bytesize)

```
::frameworkCard title="The Series At A Glance"::
I | **Speciation at Hyperscale** — How fast are new forms appearing?
II | The Transformer as Meteor
::end::
```

### Diptych (two images side by side)

```
::diptych leftSrc="/images/a.png" leftAlt="Left panel" leftCaption="Caption A" rightSrc="/images/b.png" rightAlt="Right panel" rightCaption="Caption B"::
::end::
```

---

## Format-specific rules

| Block | Bitsize | Bytesize |
|-------|---------|----------|
| `subsection` | ✅ In-flow heads | ❌ Use `section` |
| `section` | ❌ Use `subsection` | ✅ + nav bar |
| `frameworkCard` | ⚠️ Skipped at render | ✅ Header card |
| `paragraph dropCap` | Optional | ✅ Typical opener |

---

## Example: Bitsize post (minimal)

```
---
meta
brand: brainfood
format: bitsize
title: Genetic Alphabets meet Cognitive Benchmarks
subtitle: Have LLMs officially entered the Biotech AI Landscape?
seriesLabel: Brainfood · Bitsize
lede: AI is changing the world — but only $0.22 of every venture dollar reaches healthcare.
---

::paragraph::
Opening paragraph.

::statRow::
$0.22 | of every AI dollar → AI for Health
::end::

::subsection title="What's Changed" kicker="Section 1"::
::paragraph::
Section body.
::end::
```

---

## Example: Bytesize post (minimal)

```
---
meta
brand: brainfood
format: bytesize
title: Speciation at Hyperscale
subtitle: How fast are new AI forms appearing?
seriesLabel: Brainfood Bytesize · Section I
breadcrumb: Brainfood · Bytesize · Section I
---

::statRow::
52.5% | of global VC captured by AI in 2025
::end::

::paragraph dropCap::
Opening with drop cap.

::section id="section-01" num="01" pillar="Pillar 1 — Capital" title="The sedimentary layer" shortLabel="Capital"::
::paragraph::
Section content.
::end::
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `meta.title is required` | Add `title:` under the meta block |
| `subsection blocks are Bitsize-only` | Change `format: bitsize` or use `::section::` |
| `section blocks are Bytesize-only` | Change `format: bytesize` or use `::subsection::` |
| `statRow row must be "value \| label"` | Use pipe between value and label |
| Line numbers in errors | Check the cited line in your exported `.txt` file |

See also: [`src/app/brainfood/posts/TEMPLATE.md`](../src/app/brainfood/posts/TEMPLATE.md) for page wiring after conversion.
