import { EditorialTemplate } from '@/components/blog/EditorialTemplate';
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
    <EditorialTemplate
      brand="soulfood"
      backToMusings
      coverLabel="Soulfood · Bitsize"
      title={<>Cooking up a Theory</>}
      subtitle="A theory about kitchens, parents, and what your recipe style says about the way you move through the world."
      authorName="Hari Parthasarathy"
      authorMeta={"M.E.T. '26 · UC Berkeley"}
      introKicker="Soulfood"
      introBandText="On recipes, improvisation, and the personalities hiding in plain sight at the stove."
      footer={"Hari Parthasarathy · M.E.T. '26, UC Berkeley"}
    >
      <section className="editorial-essay-flow">
        {paragraphs.slice(0, 5).map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="editorial-p">
            {paragraph}
          </p>
        ))}

        <blockquote className="editorial-pull-quote">
          <p>{pullQuote}</p>
        </blockquote>

        {paragraphs.slice(5).map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="editorial-p">
            {paragraph}
          </p>
        ))}

        <p className="editorial-signoff editorial-p">A food for thought, — Hari</p>
      </section>
    </EditorialTemplate>
  );
}
