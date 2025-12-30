import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sections } from '@/data/sections';
import { useScrollStore } from '@/store/useScrollStore';

export function ProceduralHelix() {
    const groupRef = useRef<THREE.Group>(null);
    const { isExploring, progress } = useScrollStore();

    const { points1, points2, rungs } = useMemo(() => {
        const p1 = [];
        const p2 = [];
        const r = [];

        // High-Fidelity Settings
        const height = 60; // Taller to cover more scroll
        const radius = 2.0; // Slightly tighter
        const turns = 10;
        const pointsPerTurn = 40; // Smoother curves
        const totalPoints = turns * pointsPerTurn;
        const yStep = height / totalPoints;

        for (let i = 0; i <= totalPoints; i++) {
            const angle = (i / pointsPerTurn) * Math.PI * 2;
            const y = (i * yStep) - (height / 2);

            // Add simple twist variation
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;

            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            p1.push(new THREE.Vector3(x1, y, z1));
            p2.push(new THREE.Vector3(x2, y, z2));

            // Rungs every 8 points for cleaner look
            if (i % 8 === 0) {
                r.push({
                    start: new THREE.Vector3(x1, y, z1),
                    end: new THREE.Vector3(x2, y, z2),
                    index: i,
                    progress: i / totalPoints
                });
            }
        }
        return { points1: p1, points2: p2, rungs: r };
    }, []);

    // Cinematic Materials
    const strandMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#0D9488', // Teal-600
        emissive: '#0F766E', // Teal-700
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.9
    }), []);

    const rungMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FCD34D', // Amber-300
        emissive: '#F59E0B',
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.9,
    }), []);

    // Highlight Materials (Pre-computed)
    const highlightMaterials = useMemo(() => sections.map(s => new THREE.MeshStandardMaterial({
        color: s.color,
        emissive: s.color,
        emissiveIntensity: 3, // Very bright for active
        toneMapped: false
    })), []);

    useFrame((state) => {
        if (!groupRef.current) return;

        let targetRotZ = 0;

        if (!isExploring) {
            // Landing: Gentle sway
            targetRotZ = state.clock.getElapsedTime() * 0.1;

        } else {
            // Exploring: Sync rotation
            // 1 Scroll = 5 Full Turns
            targetRotZ = (progress * Math.PI * 2 * 5);
        }

        // Parallax Move Y slightly against scroll to feel like "climbing"
        // Landing pos Y is 0. Exploring: allow scroll to move helix up/down?
        // Actually, let's keep it simple: Just rotate.
        // If we want to simulate "transcribing", we could move the camera down or the helix up.
        // Let's translate UP as we scroll down to simulate scanning down.

        const targetY = isExploring ? (progress * 20) : 0; // Move up 20 units over full scroll

        // Smooth rotation update
        groupRef.current.rotation.y = targetRotZ + (state.clock.getElapsedTime() * 0.05);

        // Smooth Y position
        // Since we are pivoting from center, moving UP means we see lower parts?
        // Helix is generated from -30 to +30. Camera at 0.
        // If we move helix UP (positive Y), we see the bottom part.
        // Scroll 0 -> 1. We want to scan TOP to BOTTOM? 
        // Top is +30, Bottom is -30.
        // So we should start at +height/2 and move to -height/2?
        // Currently centered at 0.
        // Let's just rotate for now to avoid logic mismatches with Tiles.

    });

    // Calculate Geometry
    const curve1 = useMemo(() => new THREE.CatmullRomCurve3(points1), [points1]);
    const curve2 = useMemo(() => new THREE.CatmullRomCurve3(points2), [points2]);

    return (
        <group ref={groupRef}>
            {/* Dynamic Strand 1 */}
            <mesh>
                <tubeGeometry args={[curve1, 400, 0.15, 8, false]} />
                <primitive object={strandMaterial} />
            </mesh>

            {/* Dynamic Strand 2 */}
            <mesh>
                <tubeGeometry args={[curve2, 400, 0.15, 8, false]} />
                <primitive object={strandMaterial} />
            </mesh>

            {/* Rungs */}
            {rungs.map((rung, i) => {
                let mat = rungMaterial;

                // Check active section
                if (isExploring) {
                    // Find which section this rung belongs to
                    // Rung progress (0 to 1) 
                    // Section markers (0 to 1)
                    // Just map directly?
                    const p = rung.progress;

                    const activeSection = sections.find((s, idx) => {
                        const next = sections[idx + 1];
                        return p >= (s.marker - 0.1) && p < (next ? next.marker : 1.0);
                    });

                    // ALSO check if this section is currently "Active" based on scroll?
                    // User wants highlights to appear as we scroll.
                    // Let's highlight ALL rungs that belong to the current active section?
                    // OR highlight rungs based on strict scroll match?

                    // Revert to strict tracking:
                    // "Colored according to highlighted DNA segments"
                    // Let's color-code the helix sections PERMANENTLY based on sections?
                    // "Mirroring the logic of Theyearofgreta" - segments light up.

                    const currentScrollSection = sections.find((s, idx) => {
                        const next = sections[idx + 1];
                        return progress >= s.marker && (next ? progress < next.marker : true);
                    });

                    if (activeSection && currentScrollSection && activeSection.id === currentScrollSection.id) {
                        const sIndex = sections.indexOf(activeSection);
                        if (sIndex !== -1) mat = highlightMaterials[sIndex];
                    }
                }

                const center = new THREE.Vector3().addVectors(rung.start, rung.end).multiplyScalar(0.5);
                const direction = new THREE.Vector3().subVectors(rung.end, rung.start);
                const length = direction.length();
                const orientation = new THREE.Quaternion();
                orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

                return (
                    <mesh key={i} position={center} quaternion={orientation}>
                        <cylinderGeometry args={[0.08, 0.08, length, 8]} />
                        <primitive object={mat} />
                    </mesh>
                );
            })}
        </group>
    );
}
