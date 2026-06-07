import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import {
  ReaderParagraph,
  ReaderPullQuote,
  ReaderStatRow,
  ReaderSubsection,
} from '@/components/blog/reader/ReaderBlocks';
import { GENETIC_ALPHABETS } from './geneticAlphabetsData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Genetic Alphabets meet Cognitive Benchmarks · Hari Parthasarathy',
  description:
    'Have LLMs officially entered the biotech AI landscape? On AlphaFold 3, BioMysteryBench, and the $0.22 opportunity in AI for health.',
};

export default function GeneticAlphabetsPostPage() {
  const { pullQuote, introParagraphs, stats, sections } = GENETIC_ALPHABETS;

  return (
    <BitsizeReaderLayout
      brand="brainfood"
      seriesLabel="Brainfood · Bitsize"
      title={
        <>
          Genetic Alphabets meet{' '}
          <span style={{ color: 'var(--reader-accent)' }}>Cognitive Benchmarks</span>
        </>
      }
      subtitle="Have LLMs officially entered the Biotech AI Landscape?"
      authorName="Hari Parthasarathy"
      authorMeta="M.E.T. '26 · UC Berkeley"
      date="May 2026"
      readingTime="7 min read"
      introText="AI is changing the world — but only $0.22 of every venture dollar reaches healthcare. That gap might be the story."
      footer="Hari Parthasarathy · M.E.T. '26, UC Berkeley"
    >
      {introParagraphs.map((paragraph, index) => (
        <ReaderParagraph key={paragraph.slice(0, 48)} dropCap={index === 0}>
          {paragraph}
        </ReaderParagraph>
      ))}

      <ReaderStatRow stats={stats.map((stat) => ({ value: stat.value, label: stat.label }))} />

      {sections.map((section, sectionIndex) => (
        <ReaderSubsection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
          ))}
          {sectionIndex === 0 && <ReaderPullQuote>{pullQuote}</ReaderPullQuote>}
        </ReaderSubsection>
      ))}

      <p className="reader-signoff">A food for thought, — Hari</p>
    </BitsizeReaderLayout>
  );
}
