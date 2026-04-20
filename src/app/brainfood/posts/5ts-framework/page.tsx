const frameworkItems = [
  { t: 'T1', title: 'TAM + Threats', subtitle: 'Market size plus competitive pressure' },
  { t: 'T2', title: 'Team + Talent', subtitle: 'Current founders plus hiring velocity' },
  { t: 'T3', title: 'Technology + Trademark', subtitle: 'Technical depth plus defensibility' },
  { t: 'T4', title: 'Traction + Timeline', subtitle: 'Signals today plus time-to-scale' },
  { t: 'T5', title: 'Term Sheet + Thesis', subtitle: 'Deal structure plus core investment belief' },
];

export default function FiveTsFrameworkPostPage() {
  return (
    <main className="min-h-screen bg-bg-dark-teal text-white">
      <header className="border-b border-white/10 bg-gradient-to-br from-bg-dark-teal via-bg-deep-teal to-bg-dark-teal px-6 py-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-ui text-[11px] uppercase tracking-[0.25em] text-accent-gold/80">Brainfood / Venture</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
            The 5Ts: A Scout&apos;s Framework for Evaluating Startups
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            A practical framework shaped by real diligence calls and early-stage memos. Each T has a second-order lens that reveals
            risk before it becomes obvious.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/brainfood" className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-accent-gold">
              Back to Brainfood
            </a>
            <a href="/brainfood#manifesto" className="rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent-gold">
              Manifesto
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10 md:px-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {frameworkItems.map((item) => (
            <div key={item.t} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="font-serif text-2xl text-accent-gold">{item.t}</p>
              <p className="mt-2 font-ui text-xs uppercase tracking-[0.12em] text-white/90">{item.title}</p>
              <p className="mt-1 text-xs text-text-secondary">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <section className="border-t border-white/10 py-10">
          <h2 className="font-serif text-3xl">Why this exists</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            The original 5Ts checklist is useful, but easy to apply mechanically. The upgraded version forces second-order questions:
            who can outcompete this team, where execution bottlenecks live, what assumptions are hidden in timing, and whether the
            deal still works under realistic downside scenarios.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h3 className="font-serif text-2xl text-accent-gold">T1 — TAM + Threats</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            TAM sets the ceiling. Threats set the floor. A believable memo includes SAM/SOM math, incumbent behavior, and a clear
            explanation of why larger platforms will not collapse the startup&apos;s wedge in 12-24 months.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h3 className="font-serif text-2xl text-accent-gold">T2 — Team + Talent</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            Team quality is not static. The key diligence question is whether founders can recruit the missing operators needed for
            the next stage. Hiring velocity and role clarity are often stronger leading indicators than founder pedigree alone.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h3 className="font-serif text-2xl text-accent-gold">T3 — Technology + Trademark</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            Technology should be difficult to replicate exactly when scale begins. Trademark here means the defensibility layer:
            patents, proprietary datasets, protected workflows, and ownership clarity across universities, labs, and prior employers.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h3 className="font-serif text-2xl text-accent-gold">T4 — Traction + Timeline</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            Traction must prove a specific behavior (not vanity growth). Timeline maps whether runway and milestones align with real
            market constraints like procurement cycles or clinical phases.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h3 className="font-serif text-2xl text-accent-gold">T5 — Term Sheet + Thesis</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            Terms define downside and incentives. Thesis defines why this is the right bet now. If the thesis cannot be written in one
            falsifiable sentence, the diligence is not finished yet.
          </p>
        </section>
      </article>
    </main>
  );
}
