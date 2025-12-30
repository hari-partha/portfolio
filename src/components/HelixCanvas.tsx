'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useScrollStore } from '@/store/useScrollStore';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

function Helix({
  geomTurns = 8,
  height = 18,
  radius = 1,
  pairsDesktop = 320,
  pairsMobile = 180,
  uiSpins = 3
}) {
  const group = useRef<THREE.Group>(null);
  const progress = useScrollStore((s) => s.progress);
  const isMobile = useIsMobile();
  const pairs = isMobile ? pairsMobile : pairsDesktop;

  const data = useMemo(() => {
    const positionsA: number[] = [];
    const positionsB: number[] = [];
    for (let i = 0; i < pairs; i++) {
      const t = (i / (pairs - 1)) * (Math.PI * 2 * geomTurns);
      const y = (i / (pairs - 1)) * height - height / 2;
      positionsA.push(Math.cos(t) * radius, y, Math.sin(t) * radius);
      positionsB.push(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius);
    }
    return { positionsA, positionsB };
  }, [geomTurns, height, radius, pairs]);

  const rungRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (!rungRef.current) return;
    const { positionsA, positionsB } = data;
    const tmp = new THREE.Object3D();
    const count = Math.ceil(pairs / 4);
    for (let k = 0; k < count; k++) {
      const i = k * 4;
      const ax = positionsA[i * 3 + 0];
      const ay = positionsA[i * 3 + 1];
      const az = positionsA[i * 3 + 2];
      const bx = positionsB[i * 3 + 0];
      const by = positionsB[i * 3 + 1];
      const bz = positionsB[i * 3 + 2];
      const pA = new THREE.Vector3(ax, ay, az);
      const pB = new THREE.Vector3(bx, by, bz);
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(pB, pA);
      const len = dir.length();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(1, 0, 0),
        dir.clone().normalize()
      );
      const thickness = isMobile ? 0.026 : 0.03;
      tmp.position.copy(mid);
      tmp.quaternion.copy(quat);
      tmp.scale.set(len, thickness, thickness);
      tmp.updateMatrix();
      rungRef.current.setMatrixAt(k, tmp.matrix);
    }
    rungRef.current.instanceMatrix.needsUpdate = true;
  }, [data, pairs, isMobile]);

  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = THREE.MathUtils.lerp(height / 2, -height / 2, progress);
    group.current.rotation.y = progress * Math.PI * 2 * uiSpins;
  });

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3(
              Array.from({ length: pairs }, (_, i) => {
                const t = (i / (pairs - 1)) * (Math.PI * 2 * geomTurns);
                const y = (i / (pairs - 1)) * height - height / 2;
                return new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius);
              })
            ),
            isMobile ? 420 : 800,
            isMobile ? 0.04 : 0.05,
            8,
            false,
          ]}
        />
        <meshStandardMaterial color="#49c5b6" roughness={0.2} metalness={0.1} />
      </mesh>

      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3(
              Array.from({ length: pairs }, (_, i) => {
                const t = (i / (pairs - 1)) * (Math.PI * 2 * geomTurns) + Math.PI;
                const y = (i / (pairs - 1)) * height - height / 2;
                return new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius);
              })
            ),
            isMobile ? 420 : 800,
            isMobile ? 0.04 : 0.05,
            8,
            false,
          ]}
        />
        <meshStandardMaterial color="#9fb2c8" roughness={0.3} metalness={0.05} />
      </mesh>

      <instancedMesh ref={rungRef} args={[undefined as any, undefined as any, Math.ceil(pairs / 4)]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e6f0ff" />
      </instancedMesh>

      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <directionalLight position={[-3, -4, -2]} intensity={0.4} />
    </group>
  );
}

export function HelixCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Helix />
      </Canvas>
    </div>
  );
}

