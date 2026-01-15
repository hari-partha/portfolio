'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { EffectComposer, Bloom, Vignette, DepthOfField as DepthOfFieldImpl, Noise as NoiseImpl } from '@react-three/postprocessing';
import { useScrollStore } from '@/store/useScrollStore';

import React from 'react';

// Fix for library type definitions
// Fix for library type definitions
import { sections } from '@/data/sections';
import { MolecularHelix } from './MolecularHelix';

// Fix for library type definitions
const Noise = (props: any): any => <NoiseImpl {...props} />;
const DepthOfField = (props: any): any => <DepthOfFieldImpl {...props} />;

// Preload the model
if (typeof window !== 'undefined') {
  useLoader.preload(OBJLoader, '/models/dna.obj');
}

function Bubbles({ count = 20 }) {
  return (
    <group>
      <Sparkles count={count} scale={10} size={1} speed={0.4} opacity={0.2} color="#FFFFFF" />
      <Sparkles count={count * 2} scale={15} size={0.5} speed={0.2} opacity={0.1} color="#FFFFFF" />
    </group>
  );
}

function MiniHelix() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
  });

  const spheres = useMemo(() => {
    const s = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      const angle = i * 0.3;
      const x = Math.cos(angle) * 1.8;
      const y = (i - count / 2) * 0.2;
      const z = Math.sin(angle) * 1.8;
      s.push({ pos: [x, y, z] as [number, number, number], color: '#FFFFFF' });
      s.push({ pos: [Math.cos(angle + Math.PI) * 1.8, y, Math.sin(angle + Math.PI) * 1.8] as [number, number, number], color: '#FFFFFF' });
    }
    return s;
  }, []);

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhongMaterial color={s.color} emissive={s.color} emissiveIntensity={1} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function DNAModel() {
  const obj = useLoader(OBJLoader, '/models/dna.obj');
  const groupRef = useRef<THREE.Group>(null);
  const { progress, isExploring } = useScrollStore();

  const { meshes, baseMaterial, highlightMaterials, goldMaterial } = useMemo(() => {
    const cloned = obj.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizeScale = 15 / (maxDim || 1);

    const m: THREE.Mesh[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = child.geometry.clone();
        child.geometry.translate(-center.x, -center.y, -center.z);
        child.geometry.scale(normalizeScale, normalizeScale, normalizeScale);
        child.position.set(0, 0, 0);
        m.push(child);
      }
    });

    const base = new THREE.MeshPhysicalMaterial({
      color: '#FFFFFF',
      roughness: 0.1,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });

    const gold = new THREE.MeshPhysicalMaterial({
      color: '#ECB365',
      emissive: '#ECB365',
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 1,
      side: THREE.DoubleSide,
    });

    const highlights = sections.map(s => new THREE.MeshPhysicalMaterial({
      color: s.color,
      emissive: s.color,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
      side: THREE.DoubleSide,
    }));

    return { meshes: m, baseMaterial: base, highlightMaterials: highlights, goldMaterial: gold };
  }, [obj]);

  const dnaGroup = useMemo(() => {
    const g = new THREE.Group();
    meshes.forEach(m => g.add(m));
    return g;
  }, [meshes]);

  useFrame((state) => {
    if (!groupRef.current) return;

    let scale: number;
    let rotationZ: number;

    if (!isExploring) {
      scale = 0.8;
      rotationZ = state.clock.getElapsedTime() * 0.15;
    } else {
      const zoomProgress = Math.min(1, progress / 0.15);
      scale = THREE.MathUtils.lerp(0.8, 1.3, zoomProgress);

      const rotationProgress = Math.max(0, (progress - 0.05) / 0.95);
      rotationZ = rotationProgress * Math.PI * 14;
    }

    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.x = Math.PI / 2;
    groupRef.current.rotation.z = rotationZ;

    const activeSectionIndex = sections.findIndex((s, i) => {
      const next = sections[i + 1];
      return progress >= s.marker && (!next || progress < next.marker);
    });

    // Dynamic Gold Color Transition
    // We want the 'goldMaterial' (which is used for the non-highlighted gold strands) 
    // to match the active section's color theme.
    if (activeSectionIndex !== -1) {
      const targetColor = new THREE.Color(sections[activeSectionIndex].color);
      // Lerp current color to target
      goldMaterial.color.lerp(targetColor, 0.05);
      goldMaterial.emissive.lerp(targetColor, 0.05);
    } else {
      // Fallback to default gold
      goldMaterial.color.lerp(new THREE.Color('#ECB365'), 0.05);
      goldMaterial.emissive.lerp(new THREE.Color('#ECB365'), 0.05);
    }

    meshes.forEach((mesh, i) => {
      const isBasePair = i % 4 === 0;
      const sectionForMesh = Math.floor((i / meshes.length) * sections.length);

      if (isExploring && sectionForMesh === activeSectionIndex && isBasePair) {
        mesh.material = highlightMaterials[activeSectionIndex];
      } else if (isExploring && isBasePair) {
        mesh.material = goldMaterial;
      } else {
        mesh.material = baseMaterial;
      }
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
      <primitive object={dnaGroup} ref={groupRef} />
    </Float>
  );
}

function SceneContent() {
  const { progress, isExploring, isLoading, isMobile } = useScrollStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    if (isLoading) {
      cameraRef.current.position.lerp(new THREE.Vector3(0, 0, isMobile ? 15 : 10), 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    } else if (!isExploring) {
      // Landing: Wide view - Push back to 30 on mobile to clear text
      cameraRef.current.position.lerp(new THREE.Vector3(0, 0, isMobile ? 30 : 15), 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    } else {
      // Exploration: Closer view
      // On mobile, keep it further back (20) so tiles don't overlap too much
      const targetPos = new THREE.Vector3(0, 0, isMobile ? 20 : 15);
      cameraRef.current.position.lerp(targetPos, 0.05);
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
        {isLoading ? (
          <MiniHelix />
        ) : (
          <MolecularHelix />
        )}
        <Environment preset="studio" />

        <EffectComposer enableNormalPass={false}>
          {/* Subtle, soft bloom - not neon */}
          {(
            <>
              <Bloom
                luminanceThreshold={0.8}
                mipmapBlur
                intensity={0.4}
                radius={0.7}
              />
              <Vignette darkness={1.1} offset={0.1} />
              {/* Film grain for cinematic feel */}
              {/* <Noise opacity={0.03} />
              <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={4}
                height={480}
              /> */}
            </>
          ) as any}
        </EffectComposer>
      </Suspense >
    </>
  );
}

export function HelixScene({ tileMarkers, eventSource }: { tileMarkers: number[], eventSource?: HTMLElement | null }) {
  const progress = useScrollStore((s) => s.progress);
  const shouldHide = progress >= 0.99;
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
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        eventSource={eventSource ?? domElement ?? undefined}
        eventPrefix="client"
        style={{ touchAction: 'pan-y', pointerEvents: 'auto' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
