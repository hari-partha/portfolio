import { getArchiveSectionsWithPosts, seriesTag } from '@/data/brainfoodPosts';
import type { PostBrand } from '@/data/brainfoodPosts';

export const dynamic = 'force-dynamic';

function sectionAccentClass(brand: PostBrand): string {
  return brand === 'soulfood' ? 'archive-section--soulfood' : 'archive-section--brainfood';
}

export default function BrainfoodPage() {
  const sections = getArchiveSectionsWithPosts();

  return (
    <main className="editorial-theme min-h-screen">
      <section className="editorial-cover">
        <div className="editorial-cover-label">Brainfood & Soulfood · Essays & Field Notes</div>
        <h1 className="editorial-cover-title">Long-form writing on biotech, venture, system design — and the personal stories behind them.</h1>
        <p className="editorial-cover-sub">
          Brainfood (blue) holds technical musings and longer series work. Soulfood (gold) holds personal essays — admissions, commencement, and what comes next.
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
        <p className="editorial-p" style={{ marginBottom: 0 }}>
          Browse musings, archives, and portfolio context from one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#musings"
            className="rounded-full border border-[#1d4ed8]/30 bg-[#dbeafe] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#1e3a8a] transition-colors hover:bg-[#bfdbfe]"
          >
            Musings
          </a>
          <a
            href="#archives"
            className="rounded-full border border-[#cbd5e1] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#334155] transition-colors hover:border-[#1d4ed8]/40 hover:text-[#1e3a8a]"
          >
            Archives
          </a>
          <a
            href="/"
            className="rounded-full border border-[#cbd5e1] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#334155] transition-colors hover:border-[#1d4ed8]/40 hover:text-[#1e3a8a]"
          >
            Back to Portfolio
          </a>
        </div>
      </section>

      <section id="musings" className="editorial-article">
        <div className="editorial-intro-section">
          <p className="editorial-kicker">Musings</p>
          <h2 className="editorial-section-title">Hi, I&apos;m Hari.</h2>
          <p className="editorial-p">
            I&apos;m a researcher, tinkerer, and product-minded strategist with a strong biotech focus. I believe synthesizing new
            frontiers like space, agentic AI, and wearables with traditional biosciences can augment drug discovery and development,
            and create better healthcare outcomes. I&apos;m working to build and back moonshots in these spaces.
          </p>
          <p className="editorial-p">
            Growing up in the Bay Area, I&apos;ve been inspired by the region&apos;s role in modern genetics and Silicon Valley. Over
            time, that inspiration became a call to action: understanding how biosciences can learn from tech-forward deployment and
            how technology often mirrors biological patterns, including how the AI boom can resemble a Cambrian-style explosion of forms
            and capabilities.
          </p>
          <p className="editorial-p">
            At Cal, I&apos;ve focused on making science faster, smarter, and more human-centered: from building drug discovery
            infrastructure for rare genetic diseases to designing computational tools that quantify spaceflight effects on inflammation
            and skin biology. As a strategist, I&apos;ve also helped scale startups, supported product and design teams through customer
            validation loops, and studied investor conviction in AI and deeptech.
          </p>
          <p className="editorial-p">
            Outside work, I explore new frontiers through travel, cinema and television, and niche hobbies like tessellation origami,
            Indian EDM fusion, and historical trivia. Most of all, I love learning from and building alongside extraordinary people. Reach
            out any time at hari [dot] parthasararthy [at] berkeley [dot] edu.
          </p>
        </div>
      </section>

      <section id="archives" className="editorial-article pb-16">
        <div className="editorial-section">
          <p className="editorial-kicker">Archives</p>
          <h2 className="editorial-section-title">Posts by line</h2>
          <p className="editorial-p mt-2 max-w-2xl text-[#475569]">
            Bite-size pieces are shorter stand-alone essays. Bytesize pieces are longer series and manuscripts in progress.
          </p>

          <div className="mt-12 space-y-14">
            {sections.map((section) => (
              <div key={`${section.brand}-${section.format}`} className={sectionAccentClass(section.brand)}>
                <div className="archive-section-header">
                  <h3 className="archive-section-title">{section.title}</h3>
                  <p className="archive-section-subtitle">{section.subtitle}</p>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {section.posts.map((post) => {
                    const tag = seriesTag(post.brand, post.format);
                    const isSoulfood = post.brand === 'soulfood';

                    if (post.comingSoon || !post.href) {
                      return (
                        <div
                          key={post.title}
                          className={`archive-card archive-card--soon ${isSoulfood ? 'archive-card--soulfood' : 'archive-card--brainfood'}`}
                          aria-label={`${post.title} — coming ${post.date}`}
                        >
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em]">
                            <span className="archive-card-tag">{tag}</span>
                            <span className="archive-card-badge">Coming {post.date}</span>
                          </div>
                          <h4 className="font-serif text-2xl leading-tight">{post.title}</h4>
                          <p className="mt-3 text-sm leading-relaxed">{post.summary}</p>
                        </div>
                      );
                    }

                    return (
                      <a
                        key={post.title}
                        href={post.href}
                        className={`archive-card archive-card--live group ${isSoulfood ? 'archive-card--soulfood' : 'archive-card--brainfood'}`}
                      >
                        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                          <span className="archive-card-tag">{tag}</span>
                          <span className="archive-card-date">{post.date}</span>
                        </div>
                        <h4 className="font-serif text-2xl leading-tight transition-colors">{post.title}</h4>
                        <p className="mt-3 text-sm leading-relaxed">{post.summary}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
