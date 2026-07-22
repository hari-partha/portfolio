'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useRef, useState, useEffect } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useScrollStore } from '@/store/useScrollStore';
import { MolecularHelix } from './MolecularHelix';

// Hoisted so the per-frame camera lerp and the Canvas props allocate nothing.
const CAM_TARGET = new THREE.Vector3();
const DPR_MOBILE: [number, number] = [1, 1.5];
const DPR_DESKTOP: [number, number] = [1, 2];

function SceneContent() {
  // Field selectors only — a bare useScrollStore() would re-render the whole
  // scene graph on every scroll-progress tick.
  const isExploring = useScrollStore((s) => s.isExploring);
  const isMobile = useScrollStore((s) => s.isMobile);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    if (!isExploring) {
      // Landing: wide view — pushed further back on mobile to clear the hero text.
      cameraRef.current.position.lerp(CAM_TARGET.set(0, 0, isMobile ? 30 : 15), 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    } else {
      // Exploration: closer, but kept further back on mobile so tiles don't crowd.
      cameraRef.current.position.lerp(CAM_TARGET.set(0, 0, isMobile ? 20 : 15), 0.05);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} ref={cameraRef} />

      {/* Studio Lighting - Interstellar Setup */}
      <ambientLight intensity={0.2} /> {/* Soft Fill */}

      {/* Key Light (Warm Sun) */}
      <spotLight
        position={[20, 20, 20]}
        angle={0.2}
        penumbra={0.5}
        intensity={2.5}
        color="#fff7ed"
        castShadow
      />

      {/* Rim Light (Teal Sci-fi) */}
      <spotLight
        position={[-20, 0, -10]}
        angle={0.4}
        penumbra={0.4}
        intensity={3}
        color="#2dd4bf"
      />

      {/* Bottom Uplight (Subtle) */}
      <pointLight position={[0, -15, 0]} intensity={0.8} color="#99f6e4" />

      <Suspense fallback={null}>
        <MolecularHelix />
        {/* HDR image-based lighting + bloom are the two heaviest mobile-GPU
            costs here; the spot/point lights above carry the look on touch
            devices, so both are gated off there to hold framerate. */}
        {!isMobile && <Environment preset="studio" />}
        {!isMobile && (
          <EffectComposer enableNormalPass={false}>
            {/* Subtle, soft bloom - not neon */}
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.4} radius={0.7} />
            <Vignette darkness={1.1} offset={0.1} />
          </EffectComposer>
        )}
      </Suspense>
    </>
  );
}

export function HelixScene({ eventSource }: { eventSource?: HTMLElement | null }) {
  // Derive the boolean INSIDE the selector. Selecting raw `progress` re-renders
  // this component every tick, and R3F's <Canvas> re-renders its whole scene
  // graph with it — which silently defeated the render-loop optimisation.
  // 0.92 (not 0.99) because the scroll runway tops out near 0.93, so the old
  // threshold was unreachable and this fade never fired at all.
  const shouldHide = useScrollStore((s) => s.progress >= 0.92);
  const isMobile = useScrollStore((s) => s.isMobile);
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDomElement(document.body);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
      style={{ opacity: shouldHide ? 0 : 1 }}
    >
      <Canvas
        // Cap DPR on mobile: pixel work scales with DPR², so an uncapped 3x
        // phone renders ~9x the fragments of DPR 1 and drops frames.
        dpr={isMobile ? DPR_MOBILE : DPR_DESKTOP}
        gl={{ antialias: true, alpha: true }}
        eventSource={eventSource ?? domElement ?? undefined}
        eventPrefix="client"
        style={{ touchAction: 'pan-y', pointerEvents: 'none' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
