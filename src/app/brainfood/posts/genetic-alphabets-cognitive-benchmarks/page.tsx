import { EditorialSection, EditorialTemplate } from '@/components/blog/EditorialTemplate';
import { GENETIC_ALPHABETS } from './geneticAlphabetsData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Genetic Alphabets meet Cognitive Benchmarks · Hari Parthasarathy',
  description:
    'Have LLMs officially entered the biotech AI landscape? On AlphaFold 3, BioMysteryBench, and the $0.22 opportunity in AI for health.',
};

const tocItems = GENETIC_ALPHABETS.sections.map((section, index) => ({
  number: String(index + 1),
  label: section.title,
  sub: `Section ${index + 1}`,
}));

export default function GeneticAlphabetsPostPage() {
  const { pullQuote, introParagraphs, stats, sections } = GENETIC_ALPHABETS;

  return (
    <EditorialTemplate
      backToMusings
      coverLabel="Brainfood · Bitsize"
      title={
        <>
          Genetic Alphabets meet{' '}
          <span style={{ color: 'var(--ed-highlight, #93c5fd)' }}>Cognitive Benchmarks</span>
        </>
      }
      subtitle="Have LLMs officially entered the Biotech AI Landscape?"
      authorName="Hari Parthasarathy"
      authorMeta={"M.E.T. '26 · UC Berkeley"}
      introKicker="Field note"
      introBandText="AI is changing the world — but only $0.22 of every venture dollar reaches healthcare. That gap might be the story."
      tocItems={tocItems}
      footer={"Hari Parthasarathy · M.E.T. '26, UC Berkeley"}
    >
      <section className="editorial-essay-flow">
        {introParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="editorial-p">
            {paragraph}
          </p>
        ))}

        <div className="editorial-recap">
          <div className="editorial-recap-row editorial-recap-row--two">
            {stats.slice(0, 2).map((stat) => (
              <div key={stat.value} className="editorial-recap-pill">
                <strong>{stat.value}</strong> {stat.label}
              </div>
            ))}
          </div>
          <div className="editorial-recap-row editorial-recap-row--two">
            {stats.slice(2).map((stat) => (
              <div key={stat.value} className="editorial-recap-pill">
                <strong>{stat.value}</strong> {stat.label}
              </div>
            ))}
          </div>
        </div>

        {sections.map((section, sectionIndex) => (
          <EditorialSection key={section.title} badge={String(sectionIndex + 1)} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="editorial-p">
                {paragraph}
              </p>
            ))}
            {sectionIndex === 0 && (
              <blockquote className="editorial-pull-quote">
                <p>{pullQuote}</p>
              </blockquote>
            )}
          </EditorialSection>
        ))}

        <p className="editorial-signoff editorial-p">A food for thought, — Hari</p>
      </section>
    </EditorialTemplate>
  );
}
