'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { ArchivePost, PostBrand } from '@/data/brainfoodPosts';
import { formatTileLabel } from '@/data/brainfoodPosts';

const BRAND_COPY: Record<PostBrand, { welcome: string; intro: string }> = {
  brainfood: {
    welcome: 'Welcome to Brainfood',
    intro:
      'As a bioengineer, I spend a lot of time thinking about where AI, biology, and technology are headed — and the capital markets that shape them. Brainfood is my forum for working that out: synthesizing what I\'m learning into frameworks, predictions, theories, and opinions on the landscape ahead.',
  },
  soulfood: {
    welcome: 'Welcome to Soulfood',
    intro:
      'The other side of the feed. I love storytelling, and documenting the conversations I share with people. These essays are less technical — pieces that don\'t fit frameworks. Transitions worth documenting, questions I still carry, advice built on experiences I\'ve gathered over the last few years. Less polished. More honest. Genuinely authentic.',
  },
};

type MusingsHubProps = {
  brainfoodPosts: ArchivePost[];
  soulfoodPosts: ArchivePost[];
};

function PostTile({ post }: { post: ArchivePost }) {
  const tag = formatTileLabel(post.brand, post.format);

  if (post.comingSoon || !post.href) {
    return (
      <div
        className="archive-card archive-card--soon"
        aria-label={`${post.title} — coming ${post.date}`}
      >
        <div className="archive-card-meta">
          <span className="archive-card-tag">{tag}</span>
          <span className="archive-card-badge">Coming {post.date}</span>
        </div>
        <h3 className="archive-card-title">{post.title}</h3>
        <p className="archive-card-summary">{post.summary}</p>
      </div>
    );
  }

  return (
    <Link href={post.href} className="archive-card archive-card--live group">
      <div className="archive-card-meta">
        <span className="archive-card-tag">{tag}</span>
        <span className="archive-card-date">{post.date}</span>
      </div>
      <h3 className="archive-card-title">{post.title}</h3>
      <p className="archive-card-summary">{post.summary}</p>
    </Link>
  );
}

export function MusingsHub({ brainfoodPosts, soulfoodPosts }: MusingsHubProps) {
  const [brand, setBrand] = useState<PostBrand>('brainfood');
  const copy = BRAND_COPY[brand];
  const posts = brand === 'brainfood' ? brainfoodPosts : soulfoodPosts;

  const brandPanelClass =
    brand === 'soulfood'
      ? 'musings-brand-panel editorial-theme editorial-theme--soulfood'
      : 'musings-brand-panel editorial-theme';

  const setBrainfood = useCallback(() => setBrand('brainfood'), []);
  const setSoulfood = useCallback(() => setBrand('soulfood'), []);

  return (
    <main className="musings-hub editorial-theme min-h-screen">
      <section className="editorial-cover musings-cover">
        <div className="musings-cover-inner">
          <Link href="/" className="editorial-back-musings editorial-back-musings--cover musings-back-arrow-cover" aria-label="Back to portfolio">
            ←
          </Link>
          <div className="editorial-cover-label">Essays & Field Notes</div>
          <h1 className="editorial-cover-title">Welcome to Musings</h1>
          <p className="editorial-cover-sub">
            Technical Brainfood and personal Soulfood — frameworks, predictions, and stories from the road.
          </p>
          <div className="editorial-cover-byline">
            <div className="editorial-avatar">H</div>
            <div>
              <div className="editorial-byline-name">Hari Parthasarathy</div>
              <div className="editorial-byline-meta">Researcher · Builder · Strategist</div>
            </div>
          </div>
        </div>
      </section>

      <section className="musings-bio">
        <div className="musings-bio-inner">
          <h2 className="musings-bio-title">Hi, I&apos;m Hari.</h2>
          <div className="musings-about">
            <p className="editorial-p">
              I&apos;m a researcher, tinkerer, and product-minded strategist with a strong biotech focus. I believe
              synthesizing new frontiers like space, agentic AI, and wearables with traditional biosciences can augment drug
              discovery and development, and create better healthcare outcomes. I&apos;m working to build and back moonshots in
              these spaces.
            </p>
            <p className="editorial-p">
              Growing up in the Bay Area, I&apos;ve been inspired by the region&apos;s role in modern genetics and Silicon Valley.
              Over time, that inspiration became a call to action: understanding how biosciences can learn from tech-forward
              deployment and how technology often mirrors biological patterns, including how the AI boom can resemble a
              Cambrian-style explosion of forms and capabilities.
            </p>
            <p className="editorial-p">
              At Cal, I&apos;ve focused on making science faster, smarter, and more human-centered: from building drug discovery
              infrastructure for rare genetic diseases to designing computational tools that quantify spaceflight effects on
              inflammation and skin biology. As a strategist, I&apos;ve also helped scale startups, supported product and design
              teams through customer validation loops, and studied investor conviction in AI and deeptech.
            </p>
            <p className="editorial-p">
              Outside work, I explore new frontiers through travel, cinema and television, and niche hobbies like tessellation
              origami, Indian EDM fusion, and historical trivia. Most of all, I love learning from and building alongside
              extraordinary people. Reach out any time at hari [dot] parthasararthy [at] berkeley [dot] edu.
            </p>
          </div>
        </div>
      </section>

      <div className={brandPanelClass}>
        <section className="musings-feed-section">
          <div className="musings-feed-layout">
            <aside className="musings-feed-aside">
              <div className="musings-toggle" role="tablist" aria-label="Feed">
                <button
                  type="button"
                  role="tab"
                  aria-selected={brand === 'brainfood'}
                  className={`musings-toggle-btn ${brand === 'brainfood' ? 'musings-toggle-btn--active' : ''}`}
                  onClick={setBrainfood}
                >
                  Brainfood
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={brand === 'soulfood'}
                  className={`musings-toggle-btn ${brand === 'soulfood' ? 'musings-toggle-btn--active' : ''}`}
                  onClick={setSoulfood}
                >
                  Soulfood
                </button>
              </div>
              <h3 className="musings-brand-welcome">{copy.welcome}</h3>
              <p className="musings-brand-intro">{copy.intro}</p>
            </aside>

            <div className="musings-feed-posts">
              <div className="musings-posts-grid">
                {posts.map((post) => (
                  <PostTile key={post.title} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
