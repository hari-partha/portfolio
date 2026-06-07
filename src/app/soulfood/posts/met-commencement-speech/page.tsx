import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import { ReaderParagraph, ReaderSubsection } from '@/components/blog/reader/ReaderBlocks';
import { COMMENCEMENT_ACTS } from './commencementSpeechData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MET Commencement Speech · Hari Parthasarathy',
  description:
    'Act I: Speed. Act II: Serendipity. Act III: What to carry — a commencement address for the UC Berkeley M.E.T. Class of 2026.',
};

export default function MetCommencementSpeechPage() {
  return (
    <BitsizeReaderLayout
      brand="soulfood"
      seriesLabel="Soulfood · Bitsize"
      title={
        <>
          MET Commencement Speech{' '}
          <span style={{ color: 'var(--reader-accent)' }}>· Class of 2026</span>
        </>
      }
      subtitle="Speed, serendipity, and what to carry — a three-act farewell to the cohort that built with me."
      authorName="Hari Parthasarathy"
      authorMeta="M.E.T. '26 · UC Berkeley"
      date="May 2026"
      readingTime="8 min read"
      introText="Delivered to the entire M.E.T. Class of 2026 cohort at our Commencement Reception — friends, families, faculty, and the village that got us here."
      footer="Hari Parthasarathy · M.E.T. '26, UC Berkeley"
    >
      {COMMENCEMENT_ACTS.map((act, actIndex) => (
        <ReaderSubsection key={act.act} title={`${act.act} · ${act.theme}`}>
          {act.paragraphs.map((paragraph, paragraphIndex) => (
            <ReaderParagraph
              key={paragraph.slice(0, 48)}
              dropCap={actIndex === 0 && paragraphIndex === 0}
            >
              {paragraph}
            </ReaderParagraph>
          ))}
        </ReaderSubsection>
      ))}

      <p className="reader-signoff">Go Do Good, — Hari</p>
    </BitsizeReaderLayout>
  );
}
