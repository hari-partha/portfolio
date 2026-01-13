'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { Icons } from './Icons';
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
          // ... initial/animate props same ...
          className="fixed inset-0 z-[20] pointer-events-none flex flex-col justify-between p-8 md:p-12"
        >
          {/* Top Left: Stacked Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-30 pointer-events-auto"
          >
            <div className="font-serif text-xl md:text-2xl tracking-[0.05em] uppercase leading-none font-light">
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
              className="max-w-xl z-30 pointer-events-auto bg-black/20 backdrop-blur-sm rounded-xl p-6 -ml-6 md:ml-0 md:bg-transparent md:backdrop-blur-none"
            >
              <div className="w-16 h-px bg-accent-gold/50 mb-6 md:mb-8" />
              <p className="font-sans text-sm md:text-base text-text-secondary leading-loose mb-8 md:mb-12 font-light tracking-wide">
                Welcome to my portfolio. Mapping the intersection of <span className="text-white hover:text-accent-gold transition-colors duration-300">biotechnology</span>, <span className="text-white hover:text-accent-gold transition-colors duration-300">venture capital</span>, and <span className="text-white hover:text-accent-gold transition-colors duration-300">design</span> through the lens of genetic transcription and systemic evolution.
              </p>

              <motion.button
                onClick={handleExplore}
                className="group relative flex flex-col items-start gap-1 pointer-events-auto py-2 w-full"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-3xl md:text-5xl italic tracking-wide text-white group-hover:text-accent-gold transition-colors duration-500">
                    Explore the Genome
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-accent-gold text-2xl">→</span>
                </div>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50 group-hover:text-accent-gold/80 transition-colors">Portfolio Unlocked</span>
                <div className="h-px w-12 bg-white/30 group-hover:w-full group-hover:bg-accent-gold transition-all duration-700 ease-in-out mt-1" />
              </motion.button>
            </motion.div>

            {/* Bottom Right: Socials & Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-start md:items-end gap-8 font-mono text-[11px] tracking-[0.2em] uppercase z-30 pointer-events-auto"
            >
              <div className="flex gap-8">
                <a href="https://linkedin.com/in/hari-a-parthasarathy" target="_blank" className="text-white/60 hover:text-accent-gold transition-colors hover:scale-110 p-2">
                  <Icons.LinkedIn className="w-5 h-5" />
                </a>
                <a href="tel:+14084427278" className="text-white/60 hover:text-accent-gold transition-colors hover:scale-110 p-2">
                  <Icons.Phone className="w-5 h-5" />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hari.parthasarathy@berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent-gold transition-colors hover:scale-110 p-2">
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
