import { EditorialSection, EditorialTemplate } from '@/components/blog/EditorialTemplate';

export default function CavesOfSteelPostPage() {
  return (
    <EditorialTemplate
      coverLabel="Brainfood Chapter 1 · Nov 2025"
      title={<>Venturing into the Caves of Steel</>}
      subtitle="What Asimov's robots can still teach us about AI, biology, and the essence of being human."
      authorName="Hari Parthasarathy"
      authorMeta="Berkeley · Bio x AI x Systems"
      introKicker="Context"
      introBandText="A reflection on how science fiction, biology, and modern AI converge around the same human questions."
      footer="Read the original post on Substack: hariparthasarathy.substack.com"
    >
      <section className="editorial-intro-section">
        <p className="editorial-intro-lead">
          Asimov didn&apos;t just imagine robots. He used them to investigate what makes humans irreducibly human.
        </p>
        <p className="editorial-p">
          Walking through Berkeley, it is easy to notice how often AI conversations oscillate between hype and fear. The volume has
          changed, but the underlying tension is old. In that sense, The Caves of Steel feels less like retro-futurism and more like a
          mirror held up to the present.
        </p>
      </section>

      <EditorialSection
        title="Technology as mirror"
        subtitle="Why Asimov still feels modern"
      >
        <p className="editorial-p">
          In Asimov&apos;s world, the machine is not the final subject. The human response to the machine is. Baley&apos;s discomfort with
          Daneel parallels contemporary reactions to LLMs: skepticism, iterative trust-building, and eventual practical dependence.
        </p>
        <p className="editorial-p">
          That progression is less about fiction and more about adaptation curves. We rarely adopt new systems because they are perfect.
          We adopt them when utility outruns anxiety.
        </p>
      </EditorialSection>

      <EditorialSection
        title="Biology as differentiator"
        subtitle="Logic can be simulated; lived cognition is different"
      >
        <p className="editorial-p">
          Asimov&apos;s scientific background gives the work unusual depth. His robots are computationally elegant, but his humans remain
          biochemical: emotion, memory, instinct, ambiguity, and contradiction all shape how choices are made under uncertainty.
        </p>
        <p className="editorial-p">
          That distinction still matters in modern AI systems. Models can emulate language and preference, but emulation is not
          equivalent to embodied experience. Product design that ignores this gap usually breaks at the trust layer.
        </p>
      </EditorialSection>

      <EditorialSection
        title="What this means for builders"
        subtitle="Build systems that amplify human depth, not flatten it"
      >
        <p className="editorial-p">
          The opportunity in AI is not just better automation. It is better collaboration between computation and human judgment. That
          requires technical rigor and philosophical clarity.
        </p>
        <p className="editorial-p">
          If machines increasingly reflect us, then building responsible systems means being explicit about what we value in ourselves:
          curiosity, empathy, accountability, and meaning.
        </p>
        <p className="editorial-p">
          Read the original full essay on{' '}
          <a
            href="https://hariparthasarathy.substack.com/p/brainfood-chapter-1-venturing-into"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1d4ed8', textDecoration: 'underline' }}
          >
            Substack
          </a>.
        </p>
      </EditorialSection>
    </EditorialTemplate>
  );
}
