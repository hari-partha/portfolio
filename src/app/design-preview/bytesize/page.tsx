import { BytesizeReaderLayout } from '@/components/blog/reader/BytesizeReaderLayout';
import { ContentRenderer } from '@/components/blog/reader/ContentRenderer';
import type { ContentBlock } from '@/lib/contentBlocks/types';
import { CONTENT_BLOCKS, POST_META, SECTION_NAV } from './contentBlocks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview · Speciation at Hyperscale (Bytesize)',
  robots: { index: false, follow: false },
};

function extractHeaderBlocks(blocks: ContentBlock[]) {
  const frameworkCardBlock = blocks.find((block) => block.type === 'frameworkCard');
  const statRowBlock = blocks.find((block) => block.type === 'statRow');
  const bodyBlocks = blocks.filter((block) => block.type !== 'frameworkCard' && block.type !== 'statRow');

  return {
    frameworkCard:
      frameworkCardBlock?.type === 'frameworkCard'
        ? { title: frameworkCardBlock.title, rows: frameworkCardBlock.rows }
        : undefined,
    stats: statRowBlock?.type === 'statRow' ? statRowBlock.stats : undefined,
    bodyBlocks,
  };
}

export default function BytesizePreviewPage() {
  const { brand, breadcrumb, seriesLabel, title, subtitle, date, authorName, authorMeta, footer } = POST_META;
  const { frameworkCard, stats, bodyBlocks } = extractHeaderBlocks(CONTENT_BLOCKS);

  return (
    <BytesizeReaderLayout
      brand={brand}
      breadcrumb={breadcrumb ?? seriesLabel}
      seriesLabel={seriesLabel}
      title={title}
      subtitle={subtitle}
      authorName={authorName ?? 'Hari Parthasarathy'}
      authorMeta={authorMeta ?? "M.E.T. '26 · UC Berkeley"}
      date={date}
      sections={SECTION_NAV}
      frameworkCard={frameworkCard}
      stats={stats}
      footer={footer}
    >
      <ContentRenderer blocks={bodyBlocks} format="bytesize" brand={brand} />
    </BytesizeReaderLayout>
  );
}
