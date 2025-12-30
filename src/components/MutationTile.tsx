'use client';
import { motion, useSpring } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';
import { HELIX_CONFIG } from '@/config/helix-config';

type MutationTileProps = {
  title: string;
  subtitle?: string;
  href?: string;
  img?: string;
  index: number;
  totalTiles: number;
  isActive?: boolean;
  trackerIndex?: number;
};

export function MutationTile({
  title,
  subtitle,
  href,
  img,
  index,
  totalTiles,
  isActive = false,
  trackerIndex = 0
}: MutationTileProps) {
  const progress = useScrollStore((s) => s.progress);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Sync with sections to get the correct "mutation" color
  const activeSection = useMemo(() => {
    return sections.find((s, i) => {
      const next = sections[i + 1];
      return progress >= s.marker && (!next || progress < next.marker);
    }) || sections[0];
  }, [progress]);

  const { atomPosition } = useScrollStore();

  // Projection Logic (Sync with MolecularHelix.tsx & HELIX_CONFIG)
  const tilePosition = useMemo(() => {
    // 1. Get exact 3D position of the target base pair
    // Use the passed trackerIndex if available, otherwise fall back to config map
    const basePairIndex = trackerIndex;

    const height = HELIX_CONFIG.pairs * HELIX_CONFIG.risePerBasePair;
    const halfHeight = height / 2;

    // Original Helix Geometry Math
    const yHelix = (basePairIndex * HELIX_CONFIG.risePerBasePair) - halfHeight;
    const angleHelix = basePairIndex * HELIX_CONFIG.twistPerBasePair;

    // Helix Group Rotation (driven by scroll)
    // mirroring MolecularHelix logic: targetRotZ = (progress * ... )
    const groupRotation = progress * Math.PI * 2 * HELIX_CONFIG.scrollRotationTurns;

    // Combine Angles
    const totalAngle = angleHelix + groupRotation;

    // Calculate World Position (Strand 1 Backbone)
    // We strictly use the strand 1 position as the anchor
    const xWorld = Math.cos(totalAngle) * HELIX_CONFIG.radius;
    const zWorld = Math.sin(totalAngle) * HELIX_CONFIG.radius;
    // yWorld is just yHelix (the group rotates Y, so Y doesn't change relative to world if axis is vertical)
    const yWorld = yHelix;

    // Camera Projection
    // Helper to simulate PerspectiveCamera projection
    // Basic assumption: Camera is at (0, 0, 15) roughly looking at (0,0,0)
    // HelixScene uses a predefined camera position.
    // Ideally we'd use the matrixWorld, but for "fake" projection we can approximate.
    // Camera is at Z=15 for exploration usually.
    const cameraZ = 15;

    const focalLength = 1100; // Tuned for standard 15 unit distance
    const dist = cameraZ - zWorld;
    const scaleFactor = dist > 0 ? focalLength / dist : 0;

    const pixelX = xWorld * scaleFactor + windowSize.width / 2;
    // Y must be inverted for screen coords? Usually 3D Y up, Screen Y down.
    // pixelY = windowHeight/2 - (yWorld * scaleFactor)
    const pixelY = windowSize.height / 2 - (yWorld * scaleFactor);

    return {
      x: pixelX,
      y: pixelY,
      z: zWorld,
      scale: Math.max(0, scaleFactor / 200),
      // Rotate tile slightly to face camera / follow helix curve
      rotateY: (xWorld / HELIX_CONFIG.radius) * 15,
      rotateX: (yWorld / height) * -10,
      zIndex: Math.floor(zWorld * 100)
    };
  }, [index, progress, windowSize]);

  // If this is the active tile and we have a precise tracked position from the 3D scene, use it!
  // The store's atomPosition comes from the actual 3D mesh projection matrix.
  const finalX = (isActive && atomPosition) ? atomPosition.x : tilePosition.x;
  const finalY = (isActive && atomPosition) ? atomPosition.y : tilePosition.y;

  // Offset the Card from the anchor point
  const CARD_OFFSET_X = 120; // 120px to the right of the atom

  const opacityValue = isActive ? 1 : 0;
  const scaleValue = isActive ? 1 : 0.6;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? tilePosition.scale : tilePosition.scale * 0.8,
        x: finalX + CARD_OFFSET_X,
        y: finalY,
        rotateY: tilePosition.rotateY,
        rotateX: tilePosition.rotateX,
      }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        translateY: '-50%',
        translateX: '0%', // Anchor left side to the calculated X
        zIndex: 50 + tilePosition.zIndex,
        perspective: '1000px',
        pointerEvents: isActive ? 'auto' : 'none',
        transformOrigin: 'center left'
      }}
    >
      {/* Leader Line towards Helix (Left) */}
      <div
        className="absolute right-full top-1/2 h-px bg-gradient-to-l from-accent-gold/50 to-transparent origin-right"
        style={{
          width: CARD_OFFSET_X, // Dynamic width based on offset
          transform: 'translateY(-50%)'
        }}
      />

      {/* Editorial Card */}
      <a
        href={href || '#'}
        target="_blank"
        rel="noreferrer"
        className="block w-[400px] bg-bg-dark-teal/80 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden group hover:border-accent-gold/40 transition-all duration-500"
      >
        <div className="flex flex-col relative">

          {/* Top Meta Bar */}
          <div className="flex justify-between items-center px-6 py-3 border-b border-white/5 bg-black/20">
            <span className="font-mono text-[9px] tracking-[0.2em] text-accent-gold uppercase">
              Seq_ID: {index.toString().padStart(2, '0')}
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-accent-gold' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <h3 className="font-sans text-3xl text-white font-light tracking-tight leading-none mb-3">
              {title}
            </h3>

            <div className="h-px w-12 bg-accent-gold/30 mb-4 group-hover:w-full transition-all duration-700 ease-out" />

            {subtitle && (
              <div className="font-sans text-xs text-text-secondary leading-relaxed opacity-80 mb-6">
                {subtitle}
              </div>
            )}

            <div className="flex justify-between items-end">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                Confirmed Vector
              </span>
              <span className="text-accent-gold text-lg transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
