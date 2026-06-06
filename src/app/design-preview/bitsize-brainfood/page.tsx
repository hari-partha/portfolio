import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import { ContentRenderer } from '@/components/blog/reader/ContentRenderer';
import { CONTENT_BLOCKS, POST_META } from './contentBlocks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview · Genetic Alphabets (Bitsize Brainfood)',
  robots: { index: false, follow: false },
};

export default function BitsizeBrainfoodPreviewPage() {
  const { brand, seriesLabel, title, subtitle, date, lede, authorName, authorMeta, footer, signoff } = POST_META;

  return (
    <BitsizeReaderLayout
      brand={brand}
      seriesLabel={seriesLabel}
      title={title}
      subtitle={subtitle}
      authorName={authorName ?? 'Hari Parthasarathy'}
      authorMeta={authorMeta ?? "M.E.T. '26 · UC Berkeley"}
      date={date}
      introText={lede}
      footer={footer}
    >
      <ContentRenderer blocks={CONTENT_BLOCKS} format="bitsize" brand={brand} />
      {signoff && <p className="reader-signoff">{signoff}</p>}
    </BitsizeReaderLayout>
  );
}
