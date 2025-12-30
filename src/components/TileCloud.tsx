'use client';
import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sections } from '@/data/sections';
import { MutationTile } from './MutationTile';
import { useScrollStore } from '@/store/useScrollStore';
import { HELIX_CONFIG } from '@/config/helix-config';

export function TileCloud({ tileMarkers }: { tileMarkers: number[] }) {
  const { progress, setActiveTileIndex } = useScrollStore();

  // Flatten sections and items into a list of tiles
  const tiles = useMemo(() => {
    const t: any[] = [];
    sections.forEach((sec) => {
      if (sec.summary) {
        t.push({
          key: `${sec.id}-summary`,
          title: sec.title,
          subtitle: sec.summary,
          marker: sec.marker,
        });
      }
      sec.items?.forEach((it, i) => {
        t.push({
          key: `${sec.id}-${i}`,
          title: it.title,
          subtitle: it.subtitle,
          href: it.href,
          img: it.img,
          marker: sec.marker + (i + 1) * 0.05,
        });
      });
    });
    return t;
  }, []);

  // Simple active index based on scroll range
  const activeTileIndex = useMemo(() => {
    if (progress <= 0.05) return -1;
    // Map progress (0.05 - 0.9) to tile index
    const normalized = (progress - 0.05) / 0.85;
    const idx = Math.floor(normalized * tiles.length);
    return Math.min(Math.max(0, idx), tiles.length - 1);
  }, [progress, tiles.length]);

  // Sync active tile with store for 3D tracking
  useEffect(() => {
    setActiveTileIndex(activeTileIndex);
  }, [activeTileIndex, setActiveTileIndex]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10]">
      <div className="relative w-full h-full">
        {tiles.map((tile, index) => (
          <MutationTile
            key={tile.key}
            title={tile.title}
            subtitle={tile.subtitle}
            href={tile.href}
            img={tile.img}
            index={index}
            totalTiles={tiles.length}
            trackerIndex={HELIX_CONFIG.tileAnchors[index] || 0}
            isActive={index === activeTileIndex}
          />
        ))}

        {/* Contact block - The final Synthesis */}
        {progress > 0.9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-12 pointer-events-auto"
          >
            <div className="max-w-2xl text-center">
              <div className="font-ui text-[10px] tracking-[0.5em] uppercase text-accent-gold mb-8">Transcription Finalized</div>
              <h2 className="font-serif text-6xl text-white mb-10 leading-tight">Synthesis of Bio & Capital.</h2>
              <div className="flex flex-col items-center gap-6">
                <p className="font-ui text-sm text-text-secondary opacity-60 leading-loose">
                  Let's explore the next mutation together. Reach out for collaborations in neuro-tech, synthetic biology, or venture design.
                </p>
                <div className="h-px w-24 bg-white/20 my-4" />
                <a
                  href="mailto:hari.parthasarathy@berkeley.edu"
                  className="font-serif text-2xl italic hover:text-accent-gold transition-colors"
                >
                  hari.parthasarathy@berkeley.edu
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
