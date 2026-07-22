'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icons } from './Icons';
import { useEffect, useState } from 'react';

type HomePageProps = {
  onEnter: () => void;
};

export function HomePage({ onEnter }: HomePageProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openMusings = () => {
    window.location.href = '/musings';
  };

  const handleExplore = () => {
    setIsTransitioning(true);
    // Wait for fade out animation before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTransitioning) return;
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      if (target?.isContentEditable || tagName === 'input' || tagName === 'textarea' || tagName === 'select') return;

      if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        openMusings();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          // ... initial/animate props same ...
          className="fixed inset-0 z-[20] pointer-events-none flex flex-col justify-between p-6 md:p-12 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          {/* Top Left: Stacked Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-30 pointer-events-auto"
          >
            <h1 className="font-serif text-xl md:text-2xl tracking-[0.05em] uppercase leading-none font-light m-0">
              <span className="block opacity-90">Hari</span>
              <span className="block text-accent-gold font-normal">Parthasarathy</span>
            </h1>
          </motion.div>


          {/* Bottom Layout Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-12">
            {/* Bottom Left: Paragraph & Explore */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl z-30 pointer-events-auto bg-black/20 backdrop-blur-sm rounded-xl p-6 -ml-6 md:ml-0 md:bg-transparent md:backdrop-blur-none"
            >
              <div className="w-16 h-px bg-accent-gold/50 mb-6 md:mb-8" />
              <p className="font-sans text-[clamp(0.9rem,2.5vw,1rem)] text-text-secondary leading-loose mb-8 md:mb-12 font-light tracking-wide">
                Welcome to my portfolio. Mapping the intersection of <span className="text-white hover:text-accent-gold transition-colors duration-300">biotechnology</span>, <span className="text-white hover:text-accent-gold transition-colors duration-300">venture capital</span>, and <span className="text-white hover:text-accent-gold transition-colors duration-300">design</span> through the lens of genetic transcription and systemic evolution.
              </p>

              <motion.button
                type="button"
                onClick={handleExplore}
                className="group pointer-events-auto w-full max-w-lg text-left rounded-2xl border border-white/25 bg-black/35 px-5 py-4 md:px-6 md:py-5 shadow-[0_0_0_1px_rgba(212,175,55,0.12)] backdrop-blur-md transition-all duration-300 hover:border-accent-gold/55 hover:bg-black/45 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
                aria-label="Unlock portfolio — Explore the Genome"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif text-[clamp(1.5rem,5vw,2.25rem)] italic tracking-wide text-white transition-colors duration-300 group-hover:text-accent-gold leading-tight">
                    Explore the Genome
                  </span>
                  <span className="mt-1 shrink-0 text-accent-gold/80 text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <span className="mt-3 block text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] text-white/65 group-hover:text-accent-gold/90 transition-colors">
                  Click here to unlock the portfolio
                </span>
                <div className="mt-3 h-px w-full max-w-[10rem] bg-gradient-to-r from-accent-gold/60 to-transparent opacity-80 group-hover:max-w-full transition-all duration-500" />
              </motion.button>

              <div className="mt-6 flex flex-col items-start gap-2 pointer-events-auto">
                <Link
                  href="/musings"
                  className="inline-flex items-center rounded-full border border-accent-gold/45 bg-black/30 px-5 py-2.5 text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm transition-colors hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold"
                >
                  Musings
                </Link>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">Optional shortcut · M</span>
              </div>
            </motion.div>

            {/* Bottom Right: Socials & Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-start md:items-end gap-8 font-mono text-[11px] tracking-[0.2em] uppercase z-30 pointer-events-auto"
            >
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <a
                  href="https://linkedin.com/in/hari-a-parthasarathy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 text-white/60 hover:text-accent-gold transition-colors hover:scale-110"
                >
                  <Icons.LinkedIn className="w-5 h-5" />
                </a>
                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume (PDF)"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 text-white/60 hover:text-accent-gold transition-colors hover:scale-110"
                >
                  <Icons.Resume className="w-5 h-5" />
                </a>
                <a href="tel:+14084427278" className="inline-flex items-center justify-center min-h-11 min-w-11 text-white/60 hover:text-accent-gold transition-colors hover:scale-110">
                  <Icons.Phone className="w-5 h-5" />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hari.parthasarathy@berkeley.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-11 min-w-11 text-white/60 hover:text-accent-gold transition-colors hover:scale-110">
                  <Icons.Email className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 opacity-50 text-left md:text-right border-l md:border-l-0 md:border-r border-white/20 pl-4 md:pl-0 md:pr-4">
                <span>Synthesis v.01</span>
                <span>Est. 2025</span>
                <span className="text-accent-gold">System: Online</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
