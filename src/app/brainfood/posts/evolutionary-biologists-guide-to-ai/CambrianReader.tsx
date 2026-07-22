'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProfileAvatar } from '@/components/blog/reader/ProfileAvatar';
import { INTRO_HTML, S0_HTML, S1_BEFORE_YC, S1_AFTER_YC } from './cambrianContent';
import { S2_HTML, S3_HTML, S4_HTML, S5_HTML, S6_HTML } from './cambrianContentNext';
import { YCCompanyMap } from './YCCompanyMap';
import './cambrian.css';

type SectionId = 'intro' | 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6';

type Tab = {
  id: string;
  num: string;
  title: string;
  locked?: boolean;
};

const TABS: Tab[] = [
  { id: 'intro', num: 'INTRO', title: 'A Boy, A Fossil, A Thought' },
  { id: 's0', num: '0', title: 'Welcome to Cambria' },
  { id: 's1', num: 'I', title: 'Speciation at Hyperscale' },
  { id: 's2', num: 'II', title: 'Transforming the Landscape' },
  { id: 's3', num: 'III', title: 'Body Plans & Exoskeletons', locked: true },
  { id: 's4', num: 'IV', title: 'Organic Spatial Hierarchy', locked: true },
  { id: 's5', num: 'V', title: 'Pinnacle of Evolution is a Crab?!', locked: true },
  { id: 's6', num: 'VI', title: 'Finches and Futures', locked: true },
];

// Locked section ids derived from TABS — single source of truth for gating.
const LOCKED_IDS = new Set(TABS.filter((t) => t.locked).map((t) => t.id));

const BYLINE = { name: 'Hari Parthasarathy', meta: "M.E.T. '26 · UC Berkeley · Independent Investor & VC Scout" };

const SECTIONS: Record<SectionId, { eyebrow: string; title: string; dek: string; date: string; bg: string }> = {
  intro: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'A Boy, A Fossil, A Thought',
    dek: 'On 538-million-year-old animals, transformer-shaped body plans, and defining what the next phylogeny of intelligence may look like.',
    date: 'June 2026 · Series Introduction',
    bg: 'museum',
  },
  s0: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Welcome to Cambria',
    dek: "The Cambrian Explosion, evolution's Big Bang — setting the base case and grounding the analogy in real biology before applying it to AI.",
    date: 'June 2026 · Section 0 of VI',
    bg: 'ocean',
  },
  s1: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Speciation at Hyperscale',
    dek: 'If the Cambrian produced 20 phyla in 20 million years, AI is producing frontier model variants at double the scale per week — grounded in evidence from capital markets to chips to the application layer.',
    date: 'June 2026 · Section I of VI',
    bg: 'forest',
  },
  s2: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Transforming the Landscape',
    dek: 'How a modest 2017 translation paper became the Ediacaran–Cambrian boundary of AI — and what it quietly plowed under.',
    date: 'June 2026 · Section II of VI',
    bg: 'boundary',
  },
  s3: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Body Plans & Exoskeletons',
    dek: 'Contingency or convergence? Gould and Conway Morris were both right — on different axes — and that split decides how to underwrite AI.',
    date: 'August 2026 · Section III of VI',
    bg: 'reef',
  },
  s4: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Organic Spatial Hierarchy',
    dek: "Pry one species off the rock and watch what collapses — Robert Paine's crowbar test is how you find the labs that actually structure the ecosystem.",
    date: 'August 2026 · Section IV of VI',
    bg: 'foodweb',
  },
  s5: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Pinnacle of Evolution is a Crab?!',
    dek: 'Line up every 2024–26 flagship like pinned specimens, and the rivals turn out to be the same animal. They have all become crabs.',
    date: 'August 2026 · Section V of VI',
    bg: 'crab',
  },
  s6: {
    eyebrow: "The Evolutionary Biologist's Guide to AI",
    title: 'Finches and Futures',
    dek: 'Short-run the niches fill, medium-run the agents go to work, and long-run the next phylum is already hiding in plain sight.',
    date: 'August 2026 · Section VI of VI',
    bg: 'finches',
  },
};

function SectionBody({ id }: { id: SectionId }) {
  if (LOCKED_IDS.has(id)) {
    return (
      <div className="cambrian">
        <div className="camb-locked-note">
          <div className="camb-locked-badge">Coming August 2026</div>
          <p>This section is still being written. It publishes in August 2026, alongside the rest of the series.</p>
        </div>
      </div>
    );
  }
  if (id === 'intro') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: INTRO_HTML }} />;
  if (id === 's0') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S0_HTML }} />;
  if (id === 's2') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S2_HTML }} />;
  if (id === 's3') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S3_HTML }} />;
  if (id === 's4') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S4_HTML }} />;
  if (id === 's5') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S5_HTML }} />;
  if (id === 's6') return <div className="cambrian" dangerouslySetInnerHTML={{ __html: S6_HTML }} />;
  // Section I: prose around the YC company map (real favicon logos).
  return (
    <div className="cambrian">
      <div dangerouslySetInnerHTML={{ __html: S1_BEFORE_YC }} />
      <YCCompanyMap />
      <div dangerouslySetInnerHTML={{ __html: S1_AFTER_YC }} />
    </div>
  );
}

// Prev/next wiring across the three live sections.
const ORDER: SectionId[] = ['intro', 's0', 's1', 's2', 's3', 's4', 's5', 's6'];

export function CambrianReader() {
  const [active, setActive] = useState<SectionId>('intro');

  // Deep-link support: open the section named in the URL hash (#s0 / #s1 / #intro).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['intro', 's0', 's1', 's2', 's3', 's4', 's5', 's6'].includes(hash)) setActive(hash as SectionId);
  }, []);

  const go = (id: SectionId) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const section = SECTIONS[active];
  const idx = ORDER.indexOf(active);
  const prev = idx > 0 ? ORDER[idx - 1] : null;
  const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

  return (
    <main className="reader-theme reader-theme--brainfood reader-theme--bytesize">
      <header className="reader-top-bar reader-top-bar--bytesize">
        <div className="reader-top-bar-row">
          <Link href="/musings" className="reader-back-link">
            ← Back to Musings
          </Link>
          <span className="reader-breadcrumb">
            Brainfood · Bytesize · The Evolutionary Biologist&apos;s Guide to AI
          </span>
        </div>
        <nav className="camb-tabstrip" aria-label="Sections">
          <div className="camb-tabs">
            {TABS.map((tab) =>
              tab.locked ? (
                <span
                  key={tab.id}
                  className="camb-tab camb-tab--locked"
                  aria-disabled="true"
                  title={`${tab.title} — Coming August 2026`}
                >
                  <span className="camb-tab-num">{tab.num}</span>
                  <span className="camb-tab-sep">|</span>
                  {tab.title}
                  <span className="camb-tab-lock" aria-hidden="true">
                    {' '}
                    🔒
                  </span>
                  <span className="camb-tab-soon">Aug 2026</span>
                </span>
              ) : (
                <button
                  key={tab.id}
                  type="button"
                  className={`camb-tab${active === tab.id ? ' camb-tab--active' : ''}`}
                  aria-current={active === tab.id ? 'page' : undefined}
                  onClick={() => go(tab.id as SectionId)}
                >
                  <span className="camb-tab-num">{tab.num}</span>
                  <span className="camb-tab-sep">|</span>
                  {tab.title}
                </button>
              ),
            )}
          </div>
        </nav>
      </header>

      <article className="camb-page">
        <header className={`camb-hero camb-hero--${section.bg}`}>
          <div className="camb-hero-bg" aria-hidden="true" />
          <div className="camb-hero-scrim" aria-hidden="true" />
          <div className="camb-hero-inner">
            <div className="camb-hero-bc">{section.eyebrow}</div>
            <h1 className="camb-hero-title">{section.title}</h1>
            <p className="camb-hero-dek">{section.dek}</p>
            <div className="camb-hero-byline">
              <ProfileAvatar size={42} />
              <div className="camb-hero-byline-text">
                <div className="camb-hero-name">{BYLINE.name}</div>
                <div className="camb-hero-meta">
                  {BYLINE.meta} · {section.date}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="camb-wrap">
          <SectionBody id={active} />
        </div>

        <footer className="camb-foot">
          <div className="camb-foot-inner">
            {prev ? (
              <button type="button" className="camb-foot-btn" onClick={() => go(prev)}>
                <span className="camb-foot-lbl">← Previous</span>
                <span className="camb-foot-name">{SECTIONS[prev].title}</span>
              </button>
            ) : (
              <span className="camb-foot-btn camb-foot-ghost" aria-hidden="true">
                <span className="camb-foot-lbl">← Previous</span>
                <span className="camb-foot-name">&nbsp;</span>
              </span>
            )}
            <span className="camb-foot-center">
              The Evolutionary Biologist&apos;s Guide to AI <span className="camb-foot-pipe">|</span> Brainfood
            </span>
            {next ? (
              <button type="button" className="camb-foot-btn camb-foot-next" onClick={() => go(next)}>
                <span className="camb-foot-lbl">Next →</span>
                <span className="camb-foot-name">{SECTIONS[next].title}</span>
              </button>
            ) : (
              <span className="camb-foot-btn camb-foot-next camb-foot-ghost" aria-hidden="true">
                <span className="camb-foot-lbl">Fin</span>
                <span className="camb-foot-name">Thanks for reading</span>
              </span>
            )}
          </div>
        </footer>
      </article>
    </main>
  );
}
