import type { ContentBlock, PostBrand, PostFormat } from '@/lib/contentBlocks/types';
import { ReaderBarChart } from './ReaderBarChart';
import {
  ReaderCallout,
  ReaderFrameworkCard,
  ReaderParagraph,
  ReaderPullQuote,
  ReaderSectionMarker,
  ReaderStatRow,
  ReaderSubsection,
} from './ReaderBlocks';
import { ReaderDataTable } from './ReaderDataTable';
import { ReaderDiptych } from './ReaderDiptych';
import { ReaderFigure } from './ReaderFigure';

type ContentRendererProps = {
  blocks: ContentBlock[];
  format: PostFormat;
  brand: PostBrand;
};

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderBlock(block: ContentBlock, format: PostFormat, brand: PostBrand, key: string) {
  switch (block.type) {
    case 'paragraph':
      return (
        <ReaderParagraph key={key} dropCap={block.dropCap}>
          {renderInlineText(block.text)}
        </ReaderParagraph>
      );

    case 'subsection':
      if (format === 'bytesize') {
        console.warn('[ContentRenderer] subsection blocks are Bitsize-only; skipping.');
        return null;
      }
      return (
        <ReaderSubsection key={key} kicker={block.kicker} title={block.title}>
          {block.children.map((child, childIndex) =>
            renderBlock(child, format, brand, `${key}-child-${childIndex}`),
          )}
        </ReaderSubsection>
      );

    case 'section':
      if (format === 'bitsize') {
        console.warn('[ContentRenderer] section blocks are Bytesize-only; skipping.');
        return null;
      }
      return (
        <ReaderSectionMarker
          key={key}
          id={block.id}
          num={block.num}
          pillar={block.pillar}
          title={block.title}
        >
          {block.children.map((child, childIndex) =>
            renderBlock(child, format, brand, `${key}-child-${childIndex}`),
          )}
        </ReaderSectionMarker>
      );

    case 'pullQuote':
      return (
        <ReaderPullQuote key={key} cite={block.cite}>
          {renderInlineText(block.text)}
        </ReaderPullQuote>
      );

    case 'statRow':
      return <ReaderStatRow key={key} stats={block.stats} title={block.title} />;

    case 'callout':
      return (
        <ReaderCallout key={key} label={block.label}>
          <p>{renderInlineText(block.text)}</p>
        </ReaderCallout>
      );

    case 'table':
      return (
        <ReaderDataTable key={key} caption={block.caption} headers={block.headers} rows={block.rows} />
      );

    case 'barChart':
      return <ReaderBarChart key={key} label={block.label} caption={block.caption} bars={block.bars} />;

    case 'figure':
      return (
        <ReaderFigure
          key={key}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          fullWidth={block.fullWidth}
        />
      );

    case 'frameworkCard':
      if (format === 'bitsize') {
        console.warn('[ContentRenderer] frameworkCard blocks are Bytesize-only; skipping.');
        return null;
      }
      return (
        <ReaderFrameworkCard
          key={key}
          title={block.title}
          rows={block.rows.map((row) => ({
            label: row.label,
            text: renderInlineText(row.text),
          }))}
        />
      );

    case 'diptych':
      return <ReaderDiptych key={key} left={block.left} right={block.right} />;

    default: {
      const _exhaustive: never = block;
      void _exhaustive;
      void brand;
      return null;
    }
  }
}

export function ContentRenderer({ blocks, format, brand }: ContentRendererProps) {
  return (
    <>
      {blocks.map((block, index) => renderBlock(block, format, brand, `block-${index}`))}
    </>
  );
}
