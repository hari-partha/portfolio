import type {
  BarChartBar,
  ContentBlock,
  ParseDocBlocksResult,
  PostBrand,
  PostFormat,
  PostMeta,
  SectionNavEntry,
  StatMeta,
} from './types';

export class ParseDocBlocksError extends Error {
  constructor(
    message: string,
    public line: number,
  ) {
    super(`Line ${line}: ${message}`);
    this.name = 'ParseDocBlocksError';
  }
}

const BLOCK_TYPES = new Set([
  'paragraph',
  'subsection',
  'section',
  'pullQuote',
  'statRow',
  'callout',
  'table',
  'barChart',
  'figure',
  'frameworkCard',
  'diptych',
]);

type ParsedRegion = {
  type: string;
  attrs: Record<string, string>;
  body: string;
  line: number;
};

function parseAttrs(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(attrString)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function splitFrontmatter(text: string): { metaText: string; bodyText: string; metaLine: number } {
  const trimmed = text.replace(/^\uFEFF/, '').trimStart();
  if (!trimmed.startsWith('---')) {
    throw new ParseDocBlocksError('Document must start with --- meta --- frontmatter', 1);
  }

  const endIndex = trimmed.indexOf('\n---', 3);
  if (endIndex === -1) {
    throw new ParseDocBlocksError('Unclosed meta frontmatter (missing closing ---)', 1);
  }

  const metaText = trimmed.slice(3, endIndex).trim();
  const bodyText = trimmed.slice(endIndex + 4).trim();
  const metaLine = 1;
  return { metaText, bodyText, metaLine };
}

function parseMeta(metaText: string, metaLine: number): PostMeta {
  const raw: Record<string, string> = {};
  const lines = metaText.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === 'meta') continue;
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      throw new ParseDocBlocksError(`Invalid meta line (expected key: value): "${line}"`, metaLine + i + 1);
    }
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    raw[key] = value;
  }

  const brand = raw.brand as PostBrand | undefined;
  const format = raw.format as PostFormat | undefined;

  if (!brand || (brand !== 'brainfood' && brand !== 'soulfood')) {
    throw new ParseDocBlocksError('meta.brand is required (brainfood | soulfood)', metaLine);
  }
  if (!format || (format !== 'bitsize' && format !== 'bytesize')) {
    throw new ParseDocBlocksError('meta.format is required (bitsize | bytesize)', metaLine);
  }
  if (!raw.title) {
    throw new ParseDocBlocksError('meta.title is required', metaLine);
  }
  if (!raw.subtitle) {
    throw new ParseDocBlocksError('meta.subtitle is required', metaLine);
  }
  if (!raw.seriesLabel) {
    throw new ParseDocBlocksError('meta.seriesLabel is required', metaLine);
  }

  const meta: PostMeta = {
    brand,
    format,
    title: raw.title,
    subtitle: raw.subtitle,
    seriesLabel: raw.seriesLabel,
  };

  if (raw.date) meta.date = raw.date;
  if (raw.lede) meta.lede = raw.lede;
  if (raw.breadcrumb) meta.breadcrumb = raw.breadcrumb;
  if (raw.authorName) meta.authorName = raw.authorName;
  if (raw.authorMeta) meta.authorMeta = raw.authorMeta;
  if (raw.footer) meta.footer = raw.footer;
  if (raw.signoff) meta.signoff = raw.signoff;

  return meta;
}

function lineNumberAt(text: string, index: number): number {
  return text.slice(0, index).split('\n').length;
}

function parseOpener(openerContent: string): { type: string; attrs: Record<string, string>; dropCap?: boolean } {
  const trimmed = openerContent.trim();
  const spaceIndex = trimmed.indexOf(' ');
  const baseType = spaceIndex === -1 ? trimmed : trimmed.slice(0, spaceIndex);
  const rest = spaceIndex === -1 ? '' : trimmed.slice(spaceIndex + 1).trim();

  if (baseType === 'paragraph' && rest === 'dropCap') {
    return { type: 'paragraph', attrs: {}, dropCap: true };
  }

  return { type: baseType, attrs: parseAttrs(rest) };
}

function extractRegions(bodyText: string): ParsedRegion[] {
  const regions: ParsedRegion[] = [];
  const openerRegex = /^::(?!end::)(.+?)::\s*$/gm;
  let match: RegExpExecArray | null;

  while ((match = openerRegex.exec(bodyText)) !== null) {
    const { type, attrs, dropCap } = parseOpener(match[1]);
    if (dropCap) {
      attrs.dropCap = 'true';
    }
    const openerEnd = match.index + match[0].length;
    const line = lineNumberAt(bodyText, match.index);

    if (!BLOCK_TYPES.has(type)) {
      throw new ParseDocBlocksError(`Unknown block type "${type}"`, line);
    }

    const afterOpener = bodyText.slice(openerEnd);
    const nextOpener = afterOpener.search(/^::(?!end::)\S/m);
    const endMarker = afterOpener.search(/^::end::\s*$/m);

    let body: string;
    if (endMarker !== -1 && (nextOpener === -1 || endMarker < nextOpener)) {
      body = afterOpener.slice(0, endMarker).trim();
      openerRegex.lastIndex = openerEnd + endMarker + '::end::'.length;
    } else if (nextOpener !== -1) {
      body = afterOpener.slice(0, nextOpener).trim();
      openerRegex.lastIndex = openerEnd + nextOpener;
    } else {
      body = afterOpener.trim();
      openerRegex.lastIndex = bodyText.length;
    }

    regions.push({ type, attrs, body, line });
  }

  if (regions.length === 0) {
    throw new ParseDocBlocksError('No content blocks found (expected ::blockType:: markers)', 1);
  }

  return regions;
}

function splitRow(line: string): string[] {
  if (line.includes('|')) {
    return line.split('|').map((cell) => cell.trim());
  }
  if (line.includes('\t')) {
    return line.split('\t').map((cell) => cell.trim());
  }
  return [line.trim()];
}

function parseStatRow(body: string, line: number): StatMeta[] {
  const stats: StatMeta[] = [];
  const rows = body.split('\n').filter((row) => row.trim());

  for (const row of rows) {
    const parts = splitRow(row);
    if (parts.length < 2) {
      throw new ParseDocBlocksError(`statRow row must be "value | label": "${row}"`, line);
    }
    stats.push({ value: parts[0], label: parts.slice(1).join(' | ') });
  }

  if (stats.length === 0) {
    throw new ParseDocBlocksError('statRow block requires at least one row', line);
  }

  return stats;
}

function parseTable(body: string, line: number): { headers?: string[]; rows: string[][] } {
  const rows = body
    .split('\n')
    .map((row) => row.trim())
    .filter(Boolean)
    .map(splitRow);

  if (rows.length === 0) {
    throw new ParseDocBlocksError('table block requires at least one row', line);
  }

  const hasHeaderHint = rows[0].some((cell) => /[a-zA-Z]/.test(cell) && !/^\d/.test(cell));
  if (hasHeaderHint && rows.length > 1) {
    return { headers: rows[0], rows: rows.slice(1) };
  }

  return { rows };
}

function parseBarChart(body: string, line: number): BarChartBar[] {
  const bars: BarChartBar[] = [];
  const rows = body.split('\n').filter((row) => row.trim());

  for (const row of rows) {
    const parts = splitRow(row);
    if (parts.length < 2) {
      throw new ParseDocBlocksError(`barChart row must be "label | value [| variant]": "${row}"`, line);
    }
    const value = Number.parseFloat(parts[1]);
    if (Number.isNaN(value)) {
      throw new ParseDocBlocksError(`barChart value must be numeric: "${parts[1]}"`, line);
    }
    const variant = parts[2] === 'accent' || parts[2] === 'light' ? parts[2] : undefined;
    bars.push({ label: parts[0], value, variant });
  }

  if (bars.length === 0) {
    throw new ParseDocBlocksError('barChart block requires at least one bar', line);
  }

  return bars;
}

function parseFrameworkRows(body: string, line: number): { label: string; text: string }[] {
  const rows: { label: string; text: string }[] = [];
  const lines = body.split('\n').filter((row) => row.trim());

  for (const row of lines) {
    const parts = splitRow(row);
    if (parts.length < 2) {
      throw new ParseDocBlocksError(`frameworkCard row must be "label | text": "${row}"`, line);
    }
    rows.push({ label: parts[0], text: parts.slice(1).join(' | ') });
  }

  if (rows.length === 0) {
    throw new ParseDocBlocksError('frameworkCard block requires at least one row', line);
  }

  return rows;
}

function parseDiptychPanel(prefix: string, attrs: Record<string, string>, line: number) {
  const src = attrs[`${prefix}Src`];
  const alt = attrs[`${prefix}Alt`];
  if (!src || !alt) {
    throw new ParseDocBlocksError(`diptych requires ${prefix}Src and ${prefix}Alt attributes`, line);
  }
  return {
    src,
    alt,
    caption: attrs[`${prefix}Caption`],
  };
}

function parseRegion(region: ParsedRegion, format: PostFormat): ContentBlock {
  const { type, attrs, body, line } = region;

  if (type === 'paragraph') {
    const text = body.trim();
    if (!text) {
      throw new ParseDocBlocksError('paragraph block cannot be empty', line);
    }
    return {
      type: 'paragraph',
      text,
      dropCap: attrs.dropCap === 'true',
    };
  }

  if (type === 'subsection') {
    if (!attrs.title) {
      throw new ParseDocBlocksError('subsection requires title="..." attribute', line);
    }
    if (format === 'bytesize') {
      throw new ParseDocBlocksError('subsection blocks are Bitsize-only; use ::section:: for Bytesize', line);
    }
    const children = parseNestedBlocks(body, format, line);
    return {
      type: 'subsection',
      title: attrs.title,
      kicker: attrs.kicker,
      children,
    };
  }

  if (type === 'section') {
    for (const field of ['id', 'num', 'pillar', 'title', 'shortLabel'] as const) {
      if (!attrs[field]) {
        throw new ParseDocBlocksError(`section requires ${field}="..." attribute`, line);
      }
    }
    if (format === 'bitsize') {
      throw new ParseDocBlocksError('section blocks are Bytesize-only; use ::subsection:: for Bitsize', line);
    }
    const children = parseNestedBlocks(body, format, line);
    return {
      type: 'section',
      id: attrs.id,
      num: attrs.num,
      pillar: attrs.pillar,
      title: attrs.title,
      shortLabel: attrs.shortLabel,
      children,
    };
  }

  if (type === 'pullQuote') {
    const text = body.trim();
    if (!text) {
      throw new ParseDocBlocksError('pullQuote block cannot be empty', line);
    }
    return { type: 'pullQuote', text, cite: attrs.cite };
  }

  if (type === 'statRow') {
    return { type: 'statRow', stats: parseStatRow(body, line) };
  }

  if (type === 'callout') {
    if (!attrs.label) {
      throw new ParseDocBlocksError('callout requires label="..." attribute', line);
    }
    const text = body.trim();
    if (!text) {
      throw new ParseDocBlocksError('callout block cannot be empty', line);
    }
    return { type: 'callout', label: attrs.label, text };
  }

  if (type === 'table') {
    const parsed = parseTable(body, line);
    return {
      type: 'table',
      caption: attrs.caption,
      headers: parsed.headers,
      rows: parsed.rows,
    };
  }

  if (type === 'barChart') {
    return {
      type: 'barChart',
      label: attrs.label,
      caption: attrs.caption,
      bars: parseBarChart(body, line),
    };
  }

  if (type === 'figure') {
    if (!attrs.src || !attrs.alt) {
      throw new ParseDocBlocksError('figure requires src="..." and alt="..." attributes', line);
    }
    return {
      type: 'figure',
      src: attrs.src,
      alt: attrs.alt,
      caption: attrs.caption,
      fullWidth: attrs.fullWidth === 'true',
    };
  }

  if (type === 'frameworkCard') {
    if (!attrs.title) {
      throw new ParseDocBlocksError('frameworkCard requires title="..." attribute', line);
    }
    return {
      type: 'frameworkCard',
      title: attrs.title,
      rows: parseFrameworkRows(body, line),
    };
  }

  if (type === 'diptych') {
    return {
      type: 'diptych',
      left: parseDiptychPanel('left', attrs, line),
      right: parseDiptychPanel('right', attrs, line),
    };
  }

  throw new ParseDocBlocksError(`Unhandled block type "${type}"`, line);
}

function parseNestedBlocks(text: string, format: PostFormat, parentLine: number): ContentBlock[] {
  if (!text.trim()) return [];

  const hasBlockMarkers = /^::.+::/m.test(text);
  if (!hasBlockMarkers) {
    return [{ type: 'paragraph', text: text.trim() }];
  }

  try {
    const regions = extractRegions(text);
    return regions.map((region) => parseRegion(region, format));
  } catch (error) {
    if (error instanceof ParseDocBlocksError) {
      throw error;
    }
    throw new ParseDocBlocksError(`Failed to parse nested blocks: ${String(error)}`, parentLine);
  }
}

function deriveSections(blocks: ContentBlock[]): SectionNavEntry[] {
  return blocks
    .filter((block): block is Extract<ContentBlock, { type: 'section' }> => block.type === 'section')
    .map((block) => ({
      id: block.id,
      num: block.num,
      shortLabel: block.shortLabel,
      pillar: block.pillar,
      title: block.title,
    }));
}

export function parseDocBlocks(text: string): ParseDocBlocksResult {
  const { metaText, bodyText } = splitFrontmatter(text);
  const meta = parseMeta(metaText, 1);
  const regions = extractRegions(bodyText);
  const blocks = regions.map((region) => parseRegion(region, meta.format));
  const sections = deriveSections(blocks);

  return { meta, blocks, sections };
}
