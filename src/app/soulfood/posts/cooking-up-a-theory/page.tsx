import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import { ReaderParagraph, ReaderPullQuote } from '@/components/blog/reader/ReaderBlocks';
import { COOKING_UP_THEORY } from './cookingUpTheoryData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cooking up a Theory · Hari Parthasarathy',
  description:
    'A theory about kitchens, parents, and what your recipe style says about the way you move through the world.',
};

export default function CookingUpTheoryPostPage() {
  const { pullQuote, paragraphs } = COOKING_UP_THEORY;

  return (
    <BitsizeReaderLayout
      brand="soulfood"
      seriesLabel="Soulfood · Bitsize"
      title="Cooking up a Theory"
      subtitle="A theory about kitchens, parents, and what your recipe style says about the way you move through the world."
      authorName="Hari Parthasarathy"
      authorMeta="M.E.T. '26 · UC Berkeley"
      date="May 2026"
      readingTime="4 min read"
      introText="On recipes, improvisation, and the personalities hiding in plain sight at the stove."
      footer="Hari Parthasarathy · M.E.T. '26, UC Berkeley"
    >
      {paragraphs.slice(0, 5).map((paragraph, index) => (
        <ReaderParagraph key={paragraph.slice(0, 48)} dropCap={index === 0}>
          {paragraph}
        </ReaderParagraph>
      ))}

      <ReaderPullQuote>{pullQuote}</ReaderPullQuote>

      {paragraphs.slice(5).map((paragraph) => (
        <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
      ))}

      <p className="reader-signoff">A food for thought, — Hari</p>
    </BitsizeReaderLayout>
  );
}
