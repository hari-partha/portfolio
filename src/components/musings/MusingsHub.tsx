'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ProfileAvatar } from '@/components/blog/reader/ProfileAvatar';
import { MusingsHeroBackdrop } from './MusingsHeroBackdrop';
import type { ArchivePost, PostBrand } from '@/data/brainfoodPosts';
import { formatTileLabel } from '@/data/brainfoodPosts';

const HERO_TAGS = ['AI', 'Biotech', 'Venture', 'Storytelling'];

const BRAND_ACCENT_DARK: Record<PostBrand, string> = {
  brainfood: '#345583',
  soulfood: '#785416',
};

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

const BIO_PARAGRAPHS = [
  'I\'m a researcher, tinkerer, and product-minded strategist with a strong biotech focus. I believe synthesizing new frontiers like space, agentic AI, and wearables with traditional biosciences can augment drug discovery and development, and create better healthcare outcomes. I\'m working to build and back moonshots in these spaces.',
  'Growing up in the Bay Area, I\'ve been inspired by the region\'s role in modern genetics and Silicon Valley. Over time, that inspiration became a call to action: understanding how biosciences can learn from tech-forward deployment and how technology often mirrors biological patterns, including how the AI boom can resemble a Cambrian-style explosion of forms and capabilities.',
  'At Cal, I\'ve focused on making science faster, smarter, and more human-centered: from building drug discovery infrastructure for rare genetic diseases to designing computational tools that quantify spaceflight effects on inflammation and skin biology. As a strategist, I\'ve also helped scale startups, supported product and design teams through customer validation loops, and studied investor conviction in AI and deeptech.',
  'Outside work, I explore new frontiers through travel, cinema and television, and niche hobbies like tessellation origami, Indian EDM fusion, and historical trivia. Most of all, I love learning from and building alongside extraordinary people. Reach out any time at hari [dot] parthasararthy [at] berkeley [dot] edu.',
];

type MusingsHubProps = {
  brainfoodPosts: ArchivePost[];
  soulfoodPosts: ArchivePost[];
};

function PostTile({ post }: { post: ArchivePost }) {
  const tag = formatTileLabel(post.brand, post.format);

  if (post.comingSoon || !post.href) {
    return (
      <div
        className="musings-r-card musings-r-card--soon"
        aria-label={`${post.title} — coming ${post.date}`}
      >
        <div className="musings-r-card-meta">
          <span className="musings-r-card-tag">{tag}</span>
          <span className="musings-r-card-badge">Coming {post.date}</span>
        </div>
        <h3 className="musings-r-card-title">{post.title}</h3>
        <p className="musings-r-card-summary">{post.summary}</p>
      </div>
    );
  }

  return (
    <Link href={post.href} className="musings-r-card group">
      <div className="musings-r-card-meta">
        <span className="musings-r-card-tag">{tag}</span>
        <span className="musings-r-card-date">{post.date}</span>
      </div>
      <h3 className="musings-r-card-title">{post.title}</h3>
      <p className="musings-r-card-summary">{post.summary}</p>
    </Link>
  );
}

export function MusingsHub({ brainfoodPosts, soulfoodPosts }: MusingsHubProps) {
  const [brand, setBrand] = useState<PostBrand>('brainfood');
  const copy = BRAND_COPY[brand];
  const posts = brand === 'brainfood' ? brainfoodPosts : soulfoodPosts;

  const themeClass =
    brand === 'soulfood'
      ? 'musings-reader reader-theme reader-theme--soulfood'
      : 'musings-reader reader-theme reader-theme--brainfood';

  const setBrainfood = useCallback(() => setBrand('brainfood'), []);
  const setSoulfood = useCallback(() => setBrand('soulfood'), []);

  return (
    <main className={themeClass}>
      <header className="reader-top-bar">
        <Link href="/" className="reader-back-link">
          ← Back to portfolio
        </Link>
        <span className="reader-breadcrumb">Musings</span>
      </header>

      <section className="musings-r-hero">
        <MusingsHeroBackdrop color={BRAND_ACCENT_DARK[brand]} />
        <div className="musings-r-hero-scrim" aria-hidden="true" />
        <div className="musings-r-hero-inner">
          <p className="reader-eyebrow">Essays &amp; Field Notes</p>
          <h1 className="musings-r-title">Musings</h1>
          <p className="musings-r-dek">
            Technical Brainfood and personal Soulfood — frameworks, predictions, and stories from the road. A working
            notebook on where AI, biology, and the capital that funds them are headed, alongside the human stories I
            collect along the way.
          </p>
          <div className="musings-r-tags">
            {HERO_TAGS.map((tag) => (
              <span key={tag} className="musings-r-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="musings-r-byline">
            <ProfileAvatar size={50} />
            <div className="musings-r-byline-text">
              <div className="musings-r-byline-name">Hari Parthasarathy</div>
              <div className="musings-r-byline-meta">Researcher · Builder · Strategist</div>
            </div>
          </div>
        </div>
        <a
          className="musings-r-hero-credit"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conway&apos;s Game of Life ↗
        </a>
      </section>

      <section className="musings-r-bio">
        <h2 className="musings-r-bio-title">Hi, I&apos;m Hari.</h2>
        <div className="musings-r-bio-body">
          {BIO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="musings-r-feed">
        <div className="musings-r-feed-inner">
          <div className="musings-r-toggle" role="tablist" aria-label="Feed">
            <div className="musings-r-toggle-track">
              <button
                type="button"
                role="tab"
                aria-selected={brand === 'brainfood'}
                className={`musings-r-toggle-btn ${brand === 'brainfood' ? 'musings-r-toggle-btn--active' : ''}`}
                onClick={setBrainfood}
              >
                Brainfood
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={brand === 'soulfood'}
                className={`musings-r-toggle-btn ${brand === 'soulfood' ? 'musings-r-toggle-btn--active' : ''}`}
                onClick={setSoulfood}
              >
                Soulfood
              </button>
            </div>
          </div>

          <div className="musings-r-feed-head">
            <h3 className="musings-r-welcome">{copy.welcome}</h3>
            <p className="musings-r-intro">{copy.intro}</p>
          </div>

          <div className="musings-r-grid">
            {posts.map((post) => (
              <PostTile key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
