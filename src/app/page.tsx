'use client';
import { useState, useEffect, useMemo } from 'react';
import { HelixScene } from '@/components/HelixScene';
import { HomePage } from '@/components/HomePage';
import { HoverCard } from '@/components/HoverCard';
import { HoverTooltip } from '@/components/HoverTooltip';
import { Icons } from '@/components/Icons';
import { InteractionHint } from '@/components/InteractionHint';
import { useReducedMotion, motion } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';
import { Navigation } from '@/components/Navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollHint() {
  const progress = useScrollStore((s) => s.progress);
  const opacity = Math.max(0, 1 - progress * 10);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <div className="font-ui text-[10px] tracking-[0.3em] uppercase opacity-40 flex flex-col items-center gap-4">
        <span>Scroll to Transcribe</span>
        <div className="w-px h-12 bg-white/20" />
      </div>
    </motion.div>
  );
}

function ScrollHandler() {
  const setProgress = useScrollStore((s) => s.setProgress);
  const setActiveSectionIndex = useScrollStore((s) => s.setActiveSectionIndex);

  useEffect(() => {
    let st: ScrollTrigger | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    // Skip ScrollTrigger.refresh() on the vertical resize the mobile URL bar
    // causes as it shows/hides — that refresh is what makes the helix jump.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Single source of truth for progress. Deriving the active sector here (not
    // from a competing scroll listener) keeps the helix and the mobile bottom
    // sheet in sync and removes the momentum-scroll jitter of two writers.
    const applyProgress = (p: number) => {
      setProgress(p);
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (p >= sections[i].marker) idx = i;
      }
      setActiveSectionIndex(idx);
    };

    const setup = () => {
      const footer = document.getElementById('footer');
      const main = document.querySelector('main');

      if (!main) return;

      st?.kill();
      st = ScrollTrigger.create({
        trigger: main,
        start: 'top top',
        end: footer ? 'top top' : 'bottom bottom',
        endTrigger: footer || undefined,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });

      ScrollTrigger.refresh();
    };

    // Only re-setup on a real WIDTH change (orientation). Height-only resizes are
    // the mobile URL bar showing/hiding — ignoring them keeps the helix from jumping.
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };

    timer = setTimeout(setup, 200);
    window.addEventListener('resize', onResize);

    return () => {
      if (timer) clearTimeout(timer);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      if (st) st.kill();
    };
  }, [setProgress, setActiveSectionIndex]);

  return null;
}

function ScrollSpacers() {
  const blocks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: `block-${i}`, heightVh: 100 })), []);

  return (
    <div className="relative w-full">
      {blocks.map((b) => (
        <section
          key={b.id}
          style={{ height: `${b.heightVh}vh` }}
          className="pointer-events-none"
        />
      ))}
    </div>
  );
}

/**
 * Accessible fallback for prefers-reduced-motion: the scroll-driven helix and
 * its hover cards are unreachable without motion, so render the same content as
 * a plain, keyboard- and screen-reader-navigable index instead of empty spacers.
 */
function StaticSections() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-28 pb-24">
      <p className="font-ui text-[11px] tracking-[0.3em] uppercase text-accent-gold/80 mb-10">
        The Genome — Index
      </p>
      <div className="flex flex-col gap-14">
        {sections.map((s) => (
          <section key={s.id} aria-labelledby={`static-${s.id}`}>
            <h2 id={`static-${s.id}`} className="font-serif text-3xl text-white mb-2">
              {s.title}
            </h2>
            {s.summary && <p className="font-sans text-sm text-text-secondary mb-5">{s.summary}</p>}
            <ul className="flex flex-col gap-4">
              {s.items?.map((item, i) => (
                <li key={i} className="border-l border-white/10 pl-4">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white transition-colors hover:text-accent-gold"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{item.title}</span>
                  )}
                  {item.subtitle && (
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wide text-accent-gold/70">
                      {item.subtitle}
                    </span>
                  )}
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.description}</p>
                  )}
                  {item.subItems && (
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {item.subItems.map((sub, j) => (
                        <li key={j}>
                          <a
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/60 transition-colors hover:text-accent-gold"
                          >
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

export default function MainPage() {
  const { isExploring, setExploring, setProgress, setIsMobile } = useScrollStore();
  const reduced = useReducedMotion();

  // Mobile Detection
  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateInputMode = () => setIsMobile(media.matches);

    updateInputMode();
    media.addEventListener('change', updateInputMode);
    return () => media.removeEventListener('change', updateInputMode);
  }, [setIsMobile]);

  // Ref for the main container to act as the event source for 3D interaction
  const containerRef = useState<HTMLDivElement | null>(null);

  const tileMarkers = useMemo(() => {
    const markers: number[] = [];
    sections.forEach((sec) => {
      if (sec.summary) markers.push(sec.marker);
      sec.items?.forEach((it, i) => markers.push(sec.marker + (i + 1) * 0.05));
    });
    return markers.sort((a, b) => a - b);
  }, []);

  return (
    <div
      ref={containerRef[1]}
      className="bg-bg-dark-teal selection:bg-accent-gold selection:text-bg-dark-teal min-h-screen relative w-full"
    >
      {/* 1. Background Layer (Text) */}
      {!isExploring && (
        <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-serif text-[18vw] whitespace-nowrap select-none tracking-tight"
          >
            SYNTHESIS
          </motion.h1>
        </div>
      )}

      {/* 2. Unified 3D Layer - Always present to maintain WebGL context */}
      {/* 2. Unified 3D Layer - Always present to maintain WebGL context */}
      {/* Pass the container ref as the event source */}
      {!reduced && (
        <div className="fixed inset-0 z-0">
          <HelixScene tileMarkers={tileMarkers} eventSource={containerRef[0]} />
        </div>
      )}

      {/* Cinematic Vignette Overlay (Contrast Fix) - NOW POINTER EVENTS NONE */}
      <div
        className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-bg-dark-teal via-bg-dark-teal/60 to-transparent pointer-events-none z-10"
      />

      {/* 3. Foreground Content Layer */}
      {isExploring && !reduced && (
        <>
          <HoverCard />
          <HoverTooltip />
          <InteractionHint />
        </>
      )}

      {/* 4. Foreground UI (Nav, etc) */}
      {!isExploring && (
        <HomePage onEnter={() => {
          setExploring(true);
          window.scrollTo({ top: 0, behavior: 'auto' });
          setProgress(0);
          // Clear any stale sheet/lock state so re-entering the experience is clean.
          useScrollStore.setState({ hoveredSectionIndex: null, mobileSheetDismissedFor: null, isLocked: false });
        }} />
      )}

      {isExploring && (
        <>
          {reduced ? (
            <StaticSections />
          ) : (
            <>
              <Navigation />
              {/* Main scroll container — native scroll drives the helix transcription */}
              <main className="relative z-10 w-full overflow-x-hidden">
                <ScrollHint />
                <ScrollHandler />
                <ScrollSpacers />
                {/* Extra scrolling room to reveal the last sector before the footer */}
                <div className="h-[50vh] w-full pointer-events-none" />
              </main>
            </>
          )}

          <footer
            id="footer"
            className="relative z-20 bg-bg-dark-teal/40 backdrop-blur-2xl border-t border-white/5 min-h-[40svh] py-[clamp(3rem,10vw,6rem)] px-[clamp(1.25rem,6vw,3rem)]"
          >
            <div className="container flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
              <div className="font-serif">
                <h2 className="text-[clamp(1.9rem,7vw,3rem)] mb-4 text-white">Synthesis of Bio & Capital</h2>
                <p className="font-ui text-sm text-text-secondary max-w-sm leading-relaxed">
                  Exploring the fundamental code of venture and design. Built with Three.js and Framer Motion.
                </p>
              </div>

              <div className="flex flex-col items-end gap-8 font-ui uppercase tracking-[0.2em] text-[11px]">
                {/* Socials (Replaces Email) */}
                <div className="flex gap-8 md:gap-12 text-base">
                  <a href="https://linkedin.com/in/hari-a-parthasarathy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center min-h-11 min-w-11 text-white hover:text-accent-gold transition-colors hover:scale-110">
                    <Icons.LinkedIn className="w-5 h-5" />
                  </a>
                  <a href="tel:+14084427278" aria-label="Call" className="inline-flex items-center justify-center min-h-11 min-w-11 text-white hover:text-accent-gold transition-colors hover:scale-110">
                    <Icons.Phone className="w-5 h-5" />
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hari.parthasarathy@berkeley.edu" target="_blank" rel="noopener noreferrer" aria-label="Email" className="inline-flex items-center justify-center min-h-11 min-w-11 text-white hover:text-accent-gold transition-colors hover:scale-110">
                    <Icons.Email className="w-5 h-5" />
                  </a>
                </div>

                {/* Functional Links */}
                <div className="flex gap-8 text-white/40 mt-4">
                  <a href="/musings" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Musings</a>
                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setProgress(0);
                    }}
                    className="inline-flex items-center min-h-11 hover:text-white transition-colors uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Back to Top
                  </button>
                </div>

                <span className="opacity-20 text-white mt-2">© 2025 Hari Parthasarathy</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
