'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { useState } from 'react';

type HomePageProps = {
  onEnter: () => void;
};

export function HomePage({ onEnter }: HomePageProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExplore = () => {
    setIsTransitioning(true);
    // Wait for fade out animation before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[20] pointer-events-none flex flex-col justify-between p-12"
        >
          {/* Top Left: Stacked Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-30 pointer-events-auto"
          >
            <div className="font-serif text-2xl tracking-[0.05em] uppercase leading-none font-light">
              <span className="block opacity-90">Hari</span>
              <span className="block text-accent-gold font-normal">Parthasarathy</span>
            </div>
          </motion.div>


          {/* Bottom Layout Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-12">
            {/* Bottom Left: Paragraph & Explore */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-md z-30 pointer-events-auto"
            >
              <div className="w-16 h-px bg-accent-gold/50 mb-8" />
              <p className="font-sans text-base text-text-secondary leading-loose mb-12 font-light tracking-wide">
                Mapping the intersection of <span className="text-white hover:text-accent-gold transition-colors duration-300">biotechnology</span>, <span className="text-white hover:text-accent-gold transition-colors duration-300">venture capital</span>, and <span className="text-white hover:text-accent-gold transition-colors duration-300">design</span> through the lens of genetic transcription and systemic evolution.
              </p>

              <motion.button
                onClick={handleExplore}
                className="group relative flex flex-col items-start gap-3 pointer-events-auto py-2"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl italic tracking-wide text-white group-hover:text-accent-gold transition-colors duration-500">
                    Explore Synthesis
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-accent-gold text-2xl">→</span>
                </div>
                <div className="h-px w-12 bg-white/30 group-hover:w-full group-hover:bg-accent-gold transition-all duration-700 ease-in-out" />
              </motion.button>
            </motion.div>

            {/* Bottom Right: Socials & Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-end gap-8 font-mono text-[11px] tracking-[0.2em] uppercase z-30 pointer-events-auto"
            >
              <div className="flex gap-12">
                <a href="https://linkedin.com" target="_blank" className="hover:text-accent-gold transition-colors hover:scale-110 display-block">LI</a>
                <a href="https://twitter.com" target="_blank" className="hover:text-accent-gold transition-colors hover:scale-110 display-block">TW</a>
                <a href="mailto:email@example.com" className="hover:text-accent-gold transition-colors hover:scale-110 display-block">EM</a>
              </div>
              <div className="flex flex-col items-end gap-2 opacity-50 text-right border-r border-white/20 pr-4">
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
