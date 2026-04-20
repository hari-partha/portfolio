const posts = [
  {
    title: 'The 5Ts: A Scout Framework for Startups',
    summary: 'A long-form framework for evaluating early-stage startups through TAM, team, technology, traction, and term-sheet design.',
    href: '/brainfood/posts/5ts-framework',
    tag: 'Venture',
    date: 'Apr 2026',
  },
  {
    title: 'Brainfood Chapter 1 | Venturing into the Caves of Steel',
    summary: 'What Asimov can still teach us about AI, biology, and the essence of being human.',
    href: '/brainfood/posts/caves-of-steel',
    tag: 'Brainfood',
    date: 'Nov 2025',
  },
];

export default function BrainfoodPage() {
  return (
    <main className="editorial-theme min-h-screen">
      <section className="editorial-cover">
        <div className="editorial-cover-label">Brainfood Blog · Essays & Field Notes</div>
        <h1 className="editorial-cover-title">Long-form writing on biotech, venture, and system design.</h1>
        <p className="editorial-cover-sub">
          A curated hub for polished essays and frameworks. Every post now follows a consistent editorial style designed for depth and readability.
        </p>
        <div className="editorial-cover-byline">
          <div className="editorial-avatar">H</div>
          <div>
            <div className="editorial-byline-name">Hari Parthasarathy</div>
            <div className="editorial-byline-meta">Researcher · Builder · Strategist</div>
          </div>
        </div>
      </section>

      <section className="editorial-intro-band">
        <p className="editorial-kicker">Navigate</p>
        <p className="editorial-p" style={{ marginBottom: 0 }}>Browse musings, archives, and portfolio context from one place.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#musings" className="rounded-full border border-[#1d4ed8]/30 bg-[#dbeafe] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#1e3a8a] transition-colors hover:bg-[#bfdbfe]">Musings</a>
          <a href="#archives" className="rounded-full border border-[#cbd5e1] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#334155] transition-colors hover:border-[#1d4ed8]/40 hover:text-[#1e3a8a]">Archives</a>
          <a href="/" className="rounded-full border border-[#cbd5e1] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#334155] transition-colors hover:border-[#1d4ed8]/40 hover:text-[#1e3a8a]">Back to Portfolio</a>
        </div>
      </section>

      <section id="musings" className="editorial-article">
        <div className="editorial-intro-section">
          <p className="editorial-kicker">Musings</p>
          <h2 className="editorial-section-title">Hi, I&apos;m Hari.</h2>
          <p className="editorial-p">
            I&apos;m a researcher, tinkerer, and product-minded strategist with a strong biotech focus. I believe synthesizing new frontiers like space, agentic AI, and wearables with traditional biosciences can augment drug discovery and development, and create better healthcare outcomes. I&apos;m working to build and back moonshots in these spaces.
          </p>
          <p className="editorial-p">
            Growing up in the Bay Area, I&apos;ve been inspired by the region&apos;s role in modern genetics and Silicon Valley. Over time, that inspiration became a call to action: understanding how biosciences can learn from tech-forward deployment and how technology often mirrors biological patterns, including how the AI boom can resemble a Cambrian-style explosion of forms and capabilities.
          </p>
          <p className="editorial-p">
            At Cal, I&apos;ve focused on making science faster, smarter, and more human-centered: from building drug discovery infrastructure for rare genetic diseases to designing computational tools that quantify spaceflight effects on inflammation and skin biology. As a strategist, I&apos;ve also helped scale startups, supported product and design teams through customer validation loops, and studied investor conviction in AI and deeptech.
          </p>
          <p className="editorial-p">
            Outside work, I explore new frontiers through travel, cinema and television, and niche hobbies like tessellation origami, Indian EDM fusion, and historical trivia. Most of all, I love learning from and building alongside extraordinary people. Reach out any time at hari [dot] parthasararthy [at] berkeley [dot] edu.
          </p>
        </div>
      </section>

      <section id="archives" className="editorial-article pb-16">
        <div className="editorial-section">
          <p className="editorial-kicker">Archives</p>
          <h2 className="editorial-section-title">Latest posts</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <a key={post.title} href={post.href} className="group rounded-lg border border-[#cbd5e1] bg-white p-6 transition-colors hover:border-[#1d4ed8]/40">
                <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                  <span style={{ color: '#1d4ed8' }}>{post.tag}</span>
                  <span style={{ color: '#64748b' }}>{post.date}</span>
                </div>
                <h3 className="font-serif text-2xl leading-tight text-[#0f172a] transition-colors group-hover:text-[#1e3a8a]">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#334155]">{post.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
