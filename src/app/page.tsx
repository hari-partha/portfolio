'use client';
import { useState, useEffect, useMemo } from 'react';
import { HelixScene } from '@/components/HelixScene';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HomePage } from '@/components/HomePage';
import { HoverCard } from '@/components/HoverCard';
import { HoverTooltip } from '@/components/HoverTooltip';
import { TileCloud } from '@/components/TileCloud';
import { useReducedMotion, motion } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';
import { ScrollOrchestrator } from '@/components/ScrollOrchestrator';

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

export default function MainPage() {
  const { isExploring, setExploring, setProgress, isLoading, setLoading } = useScrollStore();
  const reduced = useReducedMotion();

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
      className="bg-bg-dark-teal selection:bg-accent-gold selection:text-bg-dark-teal min-h-screen relative w-full h-full"
    >
      {/* 1. Background Layer (Text) */}
      {!isLoading && !isExploring && (
        <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-serif text-[28vw] whitespace-nowrap select-none tracking-tight"
          >
            GENOMIC
          </motion.h1>
        </div>
      )}

      {/* 2. Unified 3D Layer - Always present to maintain WebGL context */}
      {/* Pass the container ref as the event source */}
      {!reduced && <HelixScene tileMarkers={tileMarkers} eventSource={containerRef[0]} />}

      {/* Cinematic Vignette Overlay (Contrast Fix) */}
      <div
        className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-bg-dark-teal via-bg-dark-teal/60 to-transparent pointer-events-none z-[1]"
      />

      {/* 3. Foreground Content Layer */}
      {isExploring && !reduced && (
        <>
          <TileCloud tileMarkers={tileMarkers} />
          <HoverCard />
          <HoverTooltip />
        </>
      )}

      {/* 4. Foreground UI (Nav, etc) */}
      {isLoading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!isLoading && !isExploring && (
        <HomePage onEnter={() => {
          setExploring(true);
          window.scrollTo({ top: 0, behavior: 'auto' });
          setProgress(0);
        }} />
      )}

      {isExploring && (
        <>
          {/* Main Scroll Container - Pointer Events ENABLED for native scrolling */}
          <main className="relative z-10 w-full overflow-x-hidden">
            <ScrollHint />
            <ScrollOrchestrator />
            {/* Extra scrolling room to allow hovering last sector before footer */}
            <div className="h-[50vh] w-full pointer-events-none" />
          </main>

          <footer
            id="footer"
            className="relative z-20 bg-bg-dark-teal/40 backdrop-blur-2xl border-t border-white/5 min-h-[40vh] py-24 px-12"
          >
            <div className="container flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="font-serif">
                <h2 className="text-5xl mb-4 text-white">The Synthesis</h2>
                <p className="font-ui text-sm text-text-secondary max-w-sm leading-relaxed">
                  Exploring the fundamental code of venture and design. Built with Three.js and Framer Motion.
                </p>
              </div>

              <div className="flex flex-col items-end gap-8 font-ui uppercase tracking-[0.2em] text-[11px]">
                {/* Socials (Replaces Email) */}
                <div className="flex gap-12 text-base">
                  <a href="https://linkedin.com/in/hari-a-parthasarathy" target="_blank" className="text-white hover:text-accent-gold transition-colors hover:scale-110">LI</a>
                  <a href="https://twitter.com" target="_blank" className="text-white hover:text-accent-gold transition-colors hover:scale-110">TW</a>
                  <a href="mailto:hari.parthasarathy@berkeley.edu" className="text-white hover:text-accent-gold transition-colors hover:scale-110">EM</a>
                </div>

                {/* Functional Links */}
                <div className="flex gap-8 text-white/40 mt-4">
                  <a href="#" className="hover:text-white transition-colors">Archive</a>
                  <a href="#" className="hover:text-white transition-colors">Manifesto</a>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      // Optional: reset logic if needed, but native scroll drives the state
                    }}
                    className="hover:text-white transition-colors uppercase tracking-[0.2em]"
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
