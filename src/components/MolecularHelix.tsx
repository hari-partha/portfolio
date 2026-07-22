import { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/useScrollStore';
import { HELIX_CONFIG } from '@/config/helix-config';

import { sections } from '@/data/sections';

export function MolecularHelix() {
    const groupRef = useRef<THREE.Group>(null);
    const whiteAtomsRef = useRef<THREE.InstancedMesh>(null);
    const goldAtomsRef = useRef<THREE.InstancedMesh>(null);
    const bondsMeshRef = useRef<THREE.InstancedMesh>(null);
    const hitboxMeshRef = useRef<THREE.InstancedMesh>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Only subscribe to state the RENDER actually needs. Volatile values
    // (progress / activeSectionIndex) are read via getState() inside useFrame so
    // scrolling never triggers a React re-render of the scene graph.
    const isMobile = useScrollStore((s) => s.isMobile);
    const isExploring = useScrollStore((s) => s.isExploring);

    // Debounce Ref for Mobile
    const lastScrollUpdateRef = useRef<number>(0);

    const HOTSPOTS = useMemo(() => {
        const total = HELIX_CONFIG.pairs;
        const count = sections.length;
        const gap = Math.floor(total / count);
        return Array.from({ length: count }, (_, i) => {
            const start = (i * gap) + 8;
            return {
                sectionIndex: i,
                startPair: start,
                endPair: start + 3
            };
        });
    }, []);

    // B-DNA Parameters
    const SETTINGS = {
        height: HELIX_CONFIG.pairs * HELIX_CONFIG.risePerBasePair,
        radius: HELIX_CONFIG.radius,
        risePerBasePair: HELIX_CONFIG.risePerBasePair,
        twistPerBasePair: HELIX_CONFIG.twistPerBasePair,
        pairs: HELIX_CONFIG.pairs,
        majorGroove: 1.2,
        minorGroove: 0.8,
    };

    const { atomTransforms, bondTransforms } = useMemo(() => {
        const aTransforms: THREE.Matrix4[] = [];
        const bTransforms: THREE.Matrix4[] = [];

        const dummy = new THREE.Object3D();

        for (let i = 0; i < SETTINGS.pairs; i++) {
            // Position along the helix
            // Center geometry perfectly around (0,0,0) for correct rotation
            const totalHeight = SETTINGS.pairs * SETTINGS.risePerBasePair;
            const yOffset = totalHeight / 2;
            const y = (i * SETTINGS.risePerBasePair) - yOffset;

            const angle = i * SETTINGS.twistPerBasePair;

            // Backbone Positions
            const x1 = Math.cos(angle) * SETTINGS.radius;
            const z1 = Math.sin(angle) * SETTINGS.radius;
            const x2 = Math.cos(angle + Math.PI) * SETTINGS.radius;
            const z2 = Math.sin(angle + Math.PI) * SETTINGS.radius;

            const pos1 = new THREE.Vector3(x1, y, z1);
            const pos2 = new THREE.Vector3(x2, y, z2);

            // --- ATOMS (Backbone Phosphates) ---
            // Strand 1
            dummy.position.copy(pos1);
            dummy.scale.setScalar(1);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            aTransforms.push(dummy.matrix.clone());

            // Strand 2
            dummy.position.copy(pos2);
            dummy.updateMatrix();
            aTransforms.push(dummy.matrix.clone());

            // --- BONDS (Rungs/Base Pairs) --- 
            // Connect pos1 to pos2?
            // Actually, DNA base pairs are two molecules meeting in the middle.
            // Let's visualize as a rod connecting them + center hydrogen bonds?
            // Simpler: One rod for valid sci-fi look.

            const center = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);
            const dist = pos1.distanceTo(pos2);

            dummy.position.copy(center);
            dummy.lookAt(pos1); // Point rod at strand
            dummy.rotateX(Math.PI / 2); // Cylinder orientation correction

            // Make rung slightly shorter so it doesn't clip into atoms
            dummy.scale.set(1, dist * 0.85, 1);
            dummy.updateMatrix();
            bTransforms.push(dummy.matrix.clone());

            // Keep only the two backbone atoms per pair for a cleaner center.
        }

        return { atomTransforms: aTransforms, bondTransforms: bTransforms };
    }, []);

    useLayoutEffect(() => {
        const whiteMatrices: THREE.Matrix4[] = [];
        const goldMatrices: THREE.Matrix4[] = [];

        // Sort atoms
        atomTransforms.forEach((matrix, i) => {
            const basePairIndex = Math.floor(i / 2);
            const hotspot = HOTSPOTS.find(h => basePairIndex >= h.startPair && basePairIndex <= h.endPair);

            if (hotspot) {
                goldMatrices.push(matrix);
            } else {
                whiteMatrices.push(matrix);
            }
        });

        // Fill White Mesh
        if (whiteAtomsRef.current) {
            whiteMatrices.forEach((m, i) => whiteAtomsRef.current!.setMatrixAt(i, m));
            whiteAtomsRef.current.instanceMatrix.needsUpdate = true;
        }

        // Fill Gold Mesh
        if (goldAtomsRef.current) {
            goldMatrices.forEach((m, i) => goldAtomsRef.current!.setMatrixAt(i, m));
            goldAtomsRef.current.instanceMatrix.needsUpdate = true;
        }

        // SYNC HITBOX POSITIONS (Keep all for raycasting)
        // Desktop only — the mesh is not rendered on touch, so this is a no-op there.
        // `isMobile` is a dep so the matrices are refilled if the mesh remounts.
        if (hitboxMeshRef.current) {
            atomTransforms.forEach((matrix, i) => {
                hitboxMeshRef.current!.setMatrixAt(i, matrix);
            });
            hitboxMeshRef.current.instanceMatrix.needsUpdate = true;
        }

        if (bondsMeshRef.current) {
            bondTransforms.forEach((matrix, i) => bondsMeshRef.current!.setMatrixAt(i, matrix));
            bondsMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [atomTransforms, bondTransforms, HOTSPOTS, isMobile]);


    // --- MATERIALS ---
    const atomMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#F9FAFB',
        roughness: 0.5,
        metalness: 0.1,
    }), []);

    const goldPulseMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#ECB365',
        emissive: '#ECB365',
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
    }), []);

    const bondMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#E5E7EB',
        roughness: 0.4,
        metalness: 0.2,
    }), []);


    useFrame((state) => {
        if (!groupRef.current) return;

        // Read volatile scroll state imperatively — subscribing would re-render
        // this component (and remount 4 instanced meshes' props) every tick.
        const st = useScrollStore.getState();

        // Color Lerp REMOVED - User requested just Gold
        // const targetColorHex = computedSectionIndex !== -1 ? sections[computedSectionIndex].color : '#ECB365';
        // const targetColor = new THREE.Color(targetColorHex);

        // goldPulseMaterial.color.lerp(targetColor, 0.05);
        // goldPulseMaterial.emissive.lerp(targetColor, 0.05);

        // Pulse the gold atoms
        const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.3; // 1 to 1.3 intensity
        goldPulseMaterial.emissiveIntensity = 0.5 * pulse;

        let targetRotZ = 0;

        if (!st.isExploring) {
            targetRotZ = state.clock.getElapsedTime() * 0.1;
        } else {
            // Sync scroll (Reverse direction: Top to Bottom feel)
            targetRotZ = -(st.progress * Math.PI * 2 * HELIX_CONFIG.scrollRotationTurns) + (state.clock.getElapsedTime() * 0.05);
        }

        // Smooth Rotate
        groupRef.current.rotation.y = targetRotZ;
        // Strictly lock other axes to prevent wobble
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;

        // Vertical Scroll Translation
        // Centered Geometry: -Height/2 to +Height/2
        if (st.isExploring) {
            const height = HELIX_CONFIG.pairs * HELIX_CONFIG.risePerBasePair;
            const range = (height / 2) * 0.85; // Scroll from Bottom to Top

            const targetY = THREE.MathUtils.lerp(range, -range, st.progress);

            groupRef.current.position.y = targetY;
            groupRef.current.position.x = 0;
            groupRef.current.position.z = 0;
        } else {
            // Reset on landing
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
        }

        // --- MOBILE AUTO-TRIGGER (scroll-synced bottom sheet) ---
        // Touch has no hover, so the sheet follows the scroll: it surfaces the
        // sector whose marker band the helix is currently transcribing.
        if (isMobile && st.isExploring && st.activeSectionIndex !== -1) {
            // Throttle to ~10fps to avoid render spam / scroll jank.
            const now = Date.now();
            if (now - lastScrollUpdateRef.current > 100) {
                lastScrollUpdateRef.current = now;
                const activeSectionIndex = st.activeSectionIndex;
                // Scrolling into a new sector clears an earlier dismissal.
                if (st.mobileSheetDismissedFor !== null && st.mobileSheetDismissedFor !== activeSectionIndex) {
                    useScrollStore.setState({ mobileSheetDismissedFor: null });
                }
                const dismissed = useScrollStore.getState().mobileSheetDismissedFor === activeSectionIndex;
                // Don't fight a tap-locked card, and don't re-open a dismissed one.
                if (!dismissed && !st.isLocked && st.hoveredSectionIndex !== activeSectionIndex) {
                    useScrollStore.setState({ hoveredSectionIndex: activeSectionIndex });
                }
            }
        }
    });


    return (
        <group ref={groupRef}>
            {/* White Atoms (Standard) */}
            <instancedMesh
                ref={whiteAtomsRef}
                args={[undefined, undefined, atomTransforms.length]} // Max count, will be less usually
            >
                <sphereGeometry args={[0.32, isMobile ? 10 : 16, isMobile ? 10 : 16]} />
                <primitive object={atomMaterial} />
            </instancedMesh>

            {/* Gold Atoms (Hotspots - Pulsing) */}
            <instancedMesh
                ref={goldAtomsRef}
                args={[undefined, undefined, atomTransforms.length]}
                visible={isExploring} // FIX: Hide on landing to remove "Yellow Artifact"
            >
                <sphereGeometry args={[0.32, isMobile ? 10 : 16, isMobile ? 10 : 16]} />
                <primitive object={goldPulseMaterial} />
            </instancedMesh>

            {/* Hit Box Layer for Interaction (transparent, captures events).
                Kept mounted on every device: R3F binds events to document.body,
                not the canvas, so touch DOES raycast — and gating this off broke
                iPad, which reports `pointer: coarse` yet gets the desktop hover
                layout. Instead the clear-branches below are guarded so a stray
                touch move can't dismiss the scroll-driven mobile sheet. */}
            <instancedMesh
                ref={hitboxMeshRef} // Attached Ref
                args={[undefined, undefined, atomTransforms.length]}
                onPointerMove={(e) => {
                    if (!isExploring) return;
                    e.stopPropagation();

                    // CLEAR TIMEOUT immediately to prevent "residual tile" bug
                    // If we are moving *within* the helix, we don't want the previous 'out' event
                    // to fire later and clear our state.
                    if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                    }

                    // Check if we are hitting a hotspot
                    const instanceId = e.instanceId;
                    if (instanceId !== undefined) {
                        const basePairIndex = Math.floor(instanceId / 2);
                        const hotspot = HOTSPOTS.find(h => basePairIndex >= h.startPair && basePairIndex <= h.endPair);

                        if (hotspot) {
                            // Store hover state
                            useScrollStore.setState({
                                hoveredSectionIndex: hotspot.sectionIndex,
                                hoveredAtomPosition: { x: e.clientX, y: e.clientY }
                            });
                            document.body.style.cursor = 'pointer';
                        } else if (!isMobile) {
                            // On the helix but NOT a hotspot. Skipped entirely on
                            // touch: hitboxes overlap ~4 deep, so a stray tap often
                            // resolves to a non-hotspot and would dismiss the card
                            // the scroll just opened ("I tapped it and it closed").
                            const { isHoveringCard } = useScrollStore.getState();
                            if (!isHoveringCard) {
                                useScrollStore.setState({ hoveredSectionIndex: null, hoveredAtomPosition: null });
                                document.body.style.cursor = 'auto';
                            }
                        }
                    }
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                    if (isMobile) return; // scroll owns the mobile sheet — don't clear it
                    // Add grace period
                    hoverTimeoutRef.current = setTimeout(() => {
                        const { isHoveringCard } = useScrollStore.getState();
                        if (!isHoveringCard) {
                            useScrollStore.setState({ hoveredSectionIndex: null, hoveredAtomPosition: null });
                        }
                    }, 1000);
                }}
            >
                <sphereGeometry args={[1.6, 8, 8]} />
                <meshBasicMaterial
                    transparent
                    opacity={0}
                    depthWrite={false}
                    color="black"
                    visible={true}
                />
            </instancedMesh>

            {/* Visual Indicators (Rings) - REMOVED */}

            {/* Bonds */}

            {/* Bonds */}
            <instancedMesh
                ref={bondsMeshRef}
                args={[undefined, undefined, bondTransforms.length]}
            >
                <cylinderGeometry args={[0.12, 0.12, 1, isMobile ? 6 : 8]} />
                <primitive object={bondMaterial} />
            </instancedMesh>

            {/* Active Marker Atom (Gold) - Removed as per user request */}
        </group>
    );
}
