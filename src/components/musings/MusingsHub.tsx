'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { ArchivePost, PostBrand } from '@/data/brainfoodPosts';
import { formatTileLabel } from '@/data/brainfoodPosts';

const BRAND_COPY: Record<
  PostBrand,
  { coverTitle: string; introTitle: string; intro: string }
> = {
  brainfood: {
    coverTitle: 'Welcome to Brainfood',
    introTitle: 'Brainfood',
    intro:
      'As a bioengineer, I spend a lot of time thinking about where AI, biology, and technology are headed — and the capital markets that shape them. Brainfood is my forum for working that out: synthesizing what I\'m learning into frameworks, predictions, theories, and opinions on the landscape ahead.',
  },
  soulfood: {
    coverTitle: 'Welcome to Soulfood',
    introTitle: 'Soulfood',
    intro:
      'The other side of the feed. I love storytelling, and documenting the conversations I share with people. These essays are less technical — pieces that don\'t fit frameworks. Transitions worth documenting, questions I still carry, advice built on experiences I\'ve gathered over the last few years. Less polished. More honest. Genuinely authentic.',
  },
};

type MusingsHubProps = {
  brainfoodPosts: ArchivePost[];
  soulfoodPosts: ArchivePost[];
};

export function MusingsHub({ brainfoodPosts, soulfoodPosts }: MusingsHubProps) {
  const [brand, setBrand] = useState<PostBrand>('brainfood');
  const copy = BRAND_COPY[brand];
  const posts = brand === 'brainfood' ? brainfoodPosts : soulfoodPosts;

  const themeClass =
    brand === 'soulfood'
      ? 'musings-hub editorial-theme editorial-theme--soulfood min-h-screen'
      : 'musings-hub editorial-theme min-h-screen';

  const setBrainfood = useCallback(() => setBrand('brainfood'), []);
  const setSoulfood = useCallback(() => setBrand('soulfood'), []);

  return (
    <main className={themeClass}>
      <section className="editorial-cover">
        <div className="editorial-cover-label">Musings · Hari Parthasarathy</div>
        <h1 className="editorial-cover-title">{copy.coverTitle}</h1>
        <p className="editorial-cover-sub">
          Essays and field notes — switch between technical Brainfood and personal Soulfood.
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

        <p className="editorial-kicker musings-intro-kicker">{copy.introTitle}</p>
        <p className="editorial-p musings-intro-text">{copy.intro}</p>

        <div className="musings-nav">
          <Link href="/" className="musings-nav-link">
            Back to Portfolio
          </Link>
        </div>
      </section>

      <section className="editorial-article pb-16">
        <div className="editorial-section musings-posts-section">
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => {
              const tag = formatTileLabel(post.brand, post.format);

              if (post.comingSoon || !post.href) {
                return (
                  <div
                    key={post.title}
                    className="archive-card archive-card--soon"
                    aria-label={`${post.title} — coming ${post.date}`}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em]">
                      <span className="archive-card-tag">{tag}</span>
                      <span className="archive-card-badge">Coming {post.date}</span>
                    </div>
                    <h3 className="archive-card-title">{post.title}</h3>
                    <p className="archive-card-summary">{post.summary}</p>
                  </div>
                );
              }

              return (
                <Link key={post.title} href={post.href} className="archive-card archive-card--live group">
                  <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                    <span className="archive-card-tag">{tag}</span>
                    <span className="archive-card-date">{post.date}</span>
                  </div>
                  <h3 className="archive-card-title">{post.title}</h3>
                  <p className="archive-card-summary">{post.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
