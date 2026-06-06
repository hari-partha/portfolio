import { EditorialTemplate } from '@/components/blog/EditorialTemplate';
import { FIGHT_OR_FLIGHT } from './fightOrFlightData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fight or Flight. Freeze and Frame · Hari Parthasarathy',
  description:
    'A byte-sized observation about arguments, relationships, and what we only understand later on.',
};

export default function FightOrFlightPostPage() {
  const { pullQuote, paragraphs } = FIGHT_OR_FLIGHT;

  return (
    <EditorialTemplate
      brand="soulfood"
      backToMusings
      coverLabel="Soulfood · Bitsize"
      title={<>Fight or Flight. Freeze and Frame</>}
      subtitle="A byte-sized observation about arguments, relationships, and what we only understand later on."
      authorName="Hari Parthasarathy"
      authorMeta={"M.E.T. '26 · UC Berkeley"}
      introKicker="Soulfood"
      introBandText="On friction, memory, and the wisdom that only shows up when we stop trying to win."
      footer={"Hari Parthasarathy · M.E.T. '26, UC Berkeley"}
    >
      <section className="editorial-essay-flow">
        {paragraphs.slice(0, 4).map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="editorial-p">
            {paragraph}
          </p>
        ))}

        <blockquote className="editorial-pull-quote">
          <p>{pullQuote}</p>
        </blockquote>

        {paragraphs.slice(4).map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="editorial-p">
            {paragraph}
          </p>
        ))}

        <p className="editorial-signoff editorial-p">A food for thought, — Hari</p>
      </section>
    </EditorialTemplate>
  );
}
