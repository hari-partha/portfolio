import { EditorialSection, EditorialTemplate } from '@/components/blog/EditorialTemplate';
import { COMMENCEMENT_ACTS } from './commencementSpeechData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MET Commencement Speech · Hari Parthasarathy',
  description:
    'Act I: Speed. Act II: Serendipity. Act III: What to carry — a commencement address for the UC Berkeley M.E.T. Class of 2026.',
};

const tocItems = COMMENCEMENT_ACTS.map((act) => ({
  number: act.act.replace('Act ', ''),
  label: act.theme,
  sub: act.act,
}));

export default function MetCommencementSpeechPage() {
  return (
    <EditorialTemplate
      brand="soulfood"
      backToMusings
      coverLabel="Soulfood · Bitsize"
      title={
        <>
          MET Commencement Speech{' '}
          <span style={{ color: '#ECB365' }}>· Class of 2026</span>
        </>
      }
      subtitle="Speed, serendipity, and what to carry — a three-act farewell to the cohort that built with me."
      authorName="Hari Parthasarathy"
      authorMeta="M.E.T. '26 · UC Berkeley"
      introKicker="Draft 1"
      introBandText="Delivered in spirit to the M.E.T. Class of 2026 — friends, families, faculty, and the village that got us here."
      tocItems={tocItems}
      footer={"Hari Parthasarathy · M.E.T. '26, UC Berkeley"}
    >
      <section className="editorial-essay-flow">
        {COMMENCEMENT_ACTS.map((act) => (
          <EditorialSection key={act.act} actRoman={act.roman} title={act.theme}>
            {act.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="editorial-p">
                {paragraph}
              </p>
            ))}
          </EditorialSection>
        ))}
      </section>
    </EditorialTemplate>
  );
}
