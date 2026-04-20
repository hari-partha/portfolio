const posts = [
  {
    title: 'The 5Ts: A Scout Framework for Startups',
    summary: 'A practical lens for evaluating early-stage companies through TAM, team, technology, traction, and terms.',
    href: '/brainfood/posts/5ts-framework',
    tag: 'Venture',
    date: 'Apr 2026',
  },
  {
    title: 'Designing Bio x Capital Narratives',
    summary: 'How scientific depth and market storytelling can coexist in biotech investing.',
    href: '#',
    tag: 'Manifesto',
    date: 'Coming Soon',
  },
  {
    title: 'Systems Thinking in Translational Biotech',
    summary: 'Mapping technical risk, regulatory timelines, and go-to-market structure into one coherent thesis.',
    href: '#',
    tag: 'Research',
    date: 'Coming Soon',
  },
];

export default function BrainfoodPage() {
  return (
    <main className="min-h-screen bg-bg-dark-teal text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-bg-dark-teal via-bg-deep-teal to-bg-dark-teal px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-ui text-[11px] uppercase tracking-[0.25em] text-accent-gold/80">Brainfood Blogs</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Long-form writing on biotech, venture, and system design.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            A curated hub for essays, frameworks, and field notes. This replaces the external manifesto/archive links so everything lives in one place.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#manifesto"
              className="rounded-full border border-accent-gold/40 bg-accent-gold/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-accent-gold transition-colors hover:bg-accent-gold/20"
            >
              Manifesto
            </a>
            <a
              href="#archives"
              className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
            >
              Archives
            </a>
            <a
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
            >
              Back to Portfolio
            </a>
          </div>
        </div>
      </section>

      <section id="manifesto" className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
          <p className="font-ui text-[11px] uppercase tracking-[0.25em] text-accent-gold/80">Manifesto</p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">Synthesis as a method.</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-text-secondary">
            The goal is not to separate biology, capital, and design into silos. The goal is to read them as one evolving system.
            These essays focus on first-principles thinking, long-cycle execution, and the craft of asking better questions.
          </p>
        </div>
      </section>

      <section id="archives" className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.25em] text-accent-gold/80">Archives</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Latest + upcoming posts</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent-gold/40 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                <span className="text-accent-gold/80">{post.tag}</span>
                <span className="text-white/40">{post.date}</span>
              </div>
              <h3 className="font-serif text-2xl leading-tight text-white transition-colors group-hover:text-accent-gold">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{post.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
