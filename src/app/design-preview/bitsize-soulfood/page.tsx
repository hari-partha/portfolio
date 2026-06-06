import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import { ReaderParagraph, ReaderPullQuote } from '@/components/blog/reader/ReaderBlocks';
import { FIGHT_OR_FLIGHT } from '@/app/soulfood/posts/fight-or-flight-freeze-and-frame/fightOrFlightData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview · Fight or Flight (Bitsize Soulfood)',
  robots: { index: false, follow: false },
};

export default function BitsizeSoulfoodPreviewPage() {
  const { pullQuote, paragraphs } = FIGHT_OR_FLIGHT;

  return (
    <BitsizeReaderLayout
      brand="soulfood"
      seriesLabel="Soulfood · Bitsize"
      title="Fight or Flight. Freeze and Frame"
      subtitle="A byte-sized observation about arguments, relationships, and what we only understand later on."
      authorName="Hari Parthasarathy"
      authorMeta={"M.E.T. '26 · UC Berkeley"}
      date="May 2026"
      introText="On friction, memory, and the wisdom that only shows up when we stop trying to win."
      footer={"Hari Parthasarathy · M.E.T. '26, UC Berkeley"}
    >
      {paragraphs.slice(0, 4).map((paragraph) => (
        <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
      ))}

      <ReaderPullQuote>{pullQuote}</ReaderPullQuote>

      {paragraphs.slice(4).map((paragraph) => (
        <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
      ))}

      <p className="reader-signoff">A food for thought, — Hari</p>
    </BitsizeReaderLayout>
  );
}
