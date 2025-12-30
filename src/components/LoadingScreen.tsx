'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Bubbles() {
  const bubbles = useRef<THREE.Group>(null);
  const bubbleCount = 40;
  const bubbleData = useMemo(() => {
    return Array.from({ length: bubbleCount }).map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 5,
      speed: 0.01 + Math.random() * 0.02,
      size: 0.02 + Math.random() * 0.04
    }));
  }, []);

  useFrame(() => {
    if (bubbles.current) {
      bubbles.current.children.forEach((child, i) => {
        child.position.y += bubbleData[i].speed;
        if (child.position.y > 5) child.position.y = -5;
      });
    }
  });

  return (
    <group ref={bubbles}>
      {bubbleData.map((b, i) => (
        <Sphere key={i} args={[b.size, 8, 8]} position={[b.x, b.y, b.z]}>
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.2} />
        </Sphere>
      ))}
    </group>
  );
}

function MiniHelix() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate around Y axis for vertical standing look
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  const spheres = useMemo(() => {
    const s = [];
    const count = 50; // More spheres for better helix definition
    for (let i = 0; i < count; i++) {
      const angle = i * 0.3;
      const x = Math.cos(angle) * 1.8;
      const y = (i - count / 2) * 0.2;
      const z = Math.sin(angle) * 1.8;

      const angle2 = angle + Math.PI;
      const x2 = Math.cos(angle2) * 1.8;
      const z2 = Math.sin(angle2) * 1.8;

      s.push({ pos: [x, y, z] as [number, number, number], color: '#ECB365' });
      s.push({ pos: [x2, y, z2] as [number, number, number], color: '#FFFFFF' });
    }
    return s;
  }, []);

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <Sphere key={i} args={[0.04, 12, 12]} position={s.pos}>
          <meshPhongMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={1}
            transparent
            opacity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000); // Slight delay for full bar visibility
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-bg-dark-teal flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Helix Background Layer - Now handled by HelixScene behind this overlay */}
      <div className="absolute inset-0 z-0 bg-transparent" />

      {/* Foreground UI Layer */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="font-serif text-[18vw] text-white/90 select-none leading-none mb-2 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.floor(progress).toString().padStart(2, '0')}
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <div className="font-ui text-[10px] tracking-[1em] uppercase text-accent-gold/60 font-medium">
            Mapping Genetic Sequence
          </div>

          {/* Loading Bar Container */}
          <div className="w-80 h-[2px] bg-white/10 relative overflow-hidden rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent-gold shadow-[0_0_15px_rgba(236,179,101,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            <div className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/40">
              System Status: Optimal
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

