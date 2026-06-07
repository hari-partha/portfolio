import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import {
  ReaderAbridged,
  ReaderParagraph,
  ReaderSubsection,
} from '@/components/blog/reader/ReaderBlocks';
import {
  admissionsInsights,
  admissionsIntroParagraphs,
  admissionsRollingNote,
} from './admissionsInsightsData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions Insights from a Graduating Senior · Hari Parthasarathy',
  description:
    'LinkedIn-style admissions notes from a graduating MET senior at Berkeley — April insights for admitted students and families.',
};

export default function AprilAdmissionsPostPage() {
  return (
    <BitsizeReaderLayout
      brand="soulfood"
      seriesLabel="Soulfood · Bitsize"
      title="Admissions Insights from a Graduating Senior"
      subtitle="April is admissions season — short notes for admitted students, families, and friends. A living post; more days land here as I write them."
      authorName="Hari Parthasarathy"
      authorMeta="MET '26, UC Berkeley"
      date="Apr 2026"
      readingTime="16 min read"
      introText="LinkedIn-length dispatches through April — for admits, parents, and friends. New days are added here as I write them."
      footer="Hari Parthasarathy · MET '26, UC Berkeley"
    >
      {admissionsIntroParagraphs.map((paragraph, index) => (
        <ReaderParagraph key={paragraph.slice(0, 48)} dropCap={index === 0}>
          {paragraph}
        </ReaderParagraph>
      ))}

      <p className="reader-source-note" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0, fontStyle: 'italic' }}>
        {admissionsRollingNote}
      </p>

      {admissionsInsights.map((insight) => (
        <ReaderSubsection key={insight.heading} title={insight.heading}>
          <ReaderAbridged>{insight.abridged}</ReaderAbridged>
          {insight.paragraphs.map((paragraph) => (
            <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
          ))}
        </ReaderSubsection>
      ))}
    </BitsizeReaderLayout>
  );
}
