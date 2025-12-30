import { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/useScrollStore';
import { HELIX_CONFIG } from '@/config/helix-config';

export function MolecularHelix() {
    const groupRef = useRef<THREE.Group>(null);
    const whiteAtomsRef = useRef<THREE.InstancedMesh>(null);
    const goldAtomsRef = useRef<THREE.InstancedMesh>(null);
    const bondsMeshRef = useRef<THREE.InstancedMesh>(null);
    const hitboxMeshRef = useRef<THREE.InstancedMesh>(null);

    const {
        isExploring, progress, activeSectionIndex, activeTileIndex, setAtomPosition,
        setHoveredSectionIndex, setHoveredAtomPosition
    } = useScrollStore();

    // Define 5 Hotspots (clusters of base pairs)
    // HELIX_CONFIG.pairs is usually around 100? Let's check or assume.
    // We'll distribute them evenly.
    const HOTSPOTS = useMemo(() => {
        const total = HELIX_CONFIG.pairs;
        const gap = Math.floor(total / 5);
        return [0, 1, 2, 3, 4].map(i => {
            const start = (i * gap) + 10; // Offset start
            return {
                sectionIndex: i,
                startPair: start,
                endPair: start + 3 // 3 base pairs long (Reduced from 6 to fix "too many" comment)
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
            const t = i / SETTINGS.pairs;
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

            // --- EXTRA ATOMS (Detail) ---
            // Add smaller atoms along the rung to look "molecular"
            // 2 small atoms per rung
            const atomPos1 = new THREE.Vector3().lerpVectors(pos1, pos2, 0.35);
            const atomPos2 = new THREE.Vector3().lerpVectors(pos1, pos2, 0.65);

            dummy.rotation.set(0, 0, 0);
            dummy.scale.setScalar(0.6); // Smaller internal atoms

            dummy.position.copy(atomPos1);
            dummy.updateMatrix();
            aTransforms.push(dummy.matrix.clone());

            dummy.position.copy(atomPos2);
            dummy.updateMatrix();
            aTransforms.push(dummy.matrix.clone());

            // VERTICAL BONDS REMOVED TO CLEAR ARTIFACTS
        }

        return { atomTransforms: aTransforms, bondTransforms: bTransforms };
    }, []);

    useLayoutEffect(() => {
        const whiteMatrices: THREE.Matrix4[] = [];
        const goldMatrices: THREE.Matrix4[] = [];

        // Sort atoms
        atomTransforms.forEach((matrix, i) => {
            const basePairIndex = Math.floor(i / 4);
            const hotspot = HOTSPOTS.find(h => basePairIndex >= h.startPair && basePairIndex <= h.endPair);

            if (hotspot) {
                const m = matrix.clone();
                m.scale(new THREE.Vector3(1.4, 1.4, 1.4)); // Make gold atoms larger anchors
                goldMatrices.push(m);
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
    }, [atomTransforms, bondTransforms, HOTSPOTS]);


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


    // --- TRACKING LOGIC ---
    const markerMeshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Pulse the gold atoms
        const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.3; // 1 to 1.3 intensity
        goldPulseMaterial.emissiveIntensity = 0.5 * pulse;

        let targetRotZ = 0;

        if (!isExploring) {
            targetRotZ = state.clock.getElapsedTime() * 0.1;
        } else {
            // Sync scroll (Reverse direction: Top to Bottom feel)
            targetRotZ = -(progress * Math.PI * 2 * HELIX_CONFIG.scrollRotationTurns) + (state.clock.getElapsedTime() * 0.05);
        }

        // Smooth Rotate
        groupRef.current.rotation.y = targetRotZ;
        // Strictly lock other axes to prevent wobble
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;

        // Vertical Scroll Translation
        // Centered Geometry: -Height/2 to +Height/2
        if (isExploring) {
            const height = HELIX_CONFIG.pairs * HELIX_CONFIG.risePerBasePair;
            const range = (height / 2) * 0.85; // Scroll from Bottom to Top

            const targetY = THREE.MathUtils.lerp(range, -range, progress);

            groupRef.current.position.y = targetY;
            groupRef.current.position.x = 0;
            groupRef.current.position.z = 0;
        } else {
            // Reset on landing
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
        }

        // --- TRACKING ---
        if (isExploring) {
            // Prefer tracking the specific active tile key
            let basePairIndex = HELIX_CONFIG.targetIndices[activeSectionIndex] || 0;

            if (activeTileIndex >= 0 && HELIX_CONFIG.tileAnchors[activeTileIndex] !== undefined) {
                basePairIndex = HELIX_CONFIG.tileAnchors[activeTileIndex];
            }

            // 4 atoms per iteration: Strand1, Strand2, Detail1, Detail2
            const atomIndex = basePairIndex * 4;

            const matrix = new THREE.Matrix4();
            // We need to get the matrix from the correct instanced mesh (white or gold)
            // For tracking, we can just use the original atomTransforms as they represent the base positions
            // Or, if we want to track the *visual* gold atom, we'd need to find its index in goldMatrices.
            // For simplicity and consistency with hitbox, let's use the original atomTransforms.
            // If the tracked atom is a gold atom, its position will be slightly scaled up.
            if (whiteAtomsRef.current && goldAtomsRef.current) {
                const hotspot = HOTSPOTS.find(h => basePairIndex >= h.startPair && basePairIndex <= h.endPair);
                if (hotspot) {
                    // Find the corresponding gold atom's matrix
                    // This is complex as goldMatrices is a filtered list.
                    // A simpler approach for tracking is to use the original atomTransforms and apply the scale.
                    // Or, just get the matrix from the hitbox which contains all original positions.
                    hitboxMeshRef.current?.getMatrixAt(atomIndex, matrix);
                    matrix.scale(new THREE.Vector3(1.4, 1.4, 1.4)); // Apply the same scale as gold atoms
                } else {
                    hitboxMeshRef.current?.getMatrixAt(atomIndex, matrix);
                }
            } else {
                // Fallback if refs aren't ready
                return;
            }

            // Get local position from matrix
            const position = new THREE.Vector3();
            position.setFromMatrixPosition(matrix);

            // Convert to World Position
            position.applyMatrix4(groupRef.current.matrixWorld);

            // Move Marker Mesh (Visual Debug + Cool Effect)
            if (markerMeshRef.current) {
                markerMeshRef.current.position.copy(position);
            }

            // Project to Screen
            position.project(state.camera);
            const x = (position.x * .5 + .5) * state.size.width;
            const y = (position.y * -.5 + .5) * state.size.height;

            setAtomPosition({ x, y });
        }
    });


    return (
        <group ref={groupRef}>
            {/* White Atoms (Standard) */}
            <instancedMesh
                ref={whiteAtomsRef}
                args={[undefined, undefined, atomTransforms.length]} // Max count, will be less usually
            >
                <sphereGeometry args={[0.32, 16, 16]} />
                <primitive object={atomMaterial} />
            </instancedMesh>

            {/* Gold Atoms (Hotspots - Pulsing) */}
            <instancedMesh
                ref={goldAtomsRef}
                args={[undefined, undefined, atomTransforms.length]}
            >
                <sphereGeometry args={[0.32, 16, 16]} />
                <primitive object={goldPulseMaterial} />
            </instancedMesh>

            {/* Hit Box Layer for Interaction (Transparent but captures events) */}
            <instancedMesh
                ref={hitboxMeshRef} // Attached Ref
                args={[undefined, undefined, atomTransforms.length]}
                onPointerMove={(e) => {
                    if (!isExploring) return;
                    e.stopPropagation();

                    // Check if we are hitting a hotspot
                    const instanceId = e.instanceId;
                    if (instanceId !== undefined) {
                        const basePairIndex = Math.floor(instanceId / 4);
                        const hotspot = HOTSPOTS.find(h => basePairIndex >= h.startPair && basePairIndex <= h.endPair);

                        if (hotspot) {
                            // Store hover state
                            useScrollStore.setState({
                                hoveredSectionIndex: hotspot.sectionIndex,
                                hoveredAtomPosition: { x: e.clientX, y: e.clientY }
                            });
                            document.body.style.cursor = 'pointer';
                        } else {
                            // We are on the helix, but NOT a hotspot. Clear hover.
                            useScrollStore.setState({ hoveredSectionIndex: null, hoveredAtomPosition: null });
                            document.body.style.cursor = 'auto';
                        }
                    }
                }}
                onPointerOut={() => {
                    useScrollStore.setState({ hoveredSectionIndex: null, hoveredAtomPosition: null });
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[1.6, 8, 8]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} color="red" />
            </instancedMesh>

            {/* Visual Indicators (Rings) - REMOVED */}

            {/* Bonds */}

            {/* Bonds */}
            <instancedMesh
                ref={bondsMeshRef}
                args={[undefined, undefined, bondTransforms.length]}
            >
                <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
                <primitive object={bondMaterial} />
            </instancedMesh>

            {/* Active Marker Atom (Gold) - Only visible when exploring */}
            <mesh ref={markerMeshRef} visible={isExploring}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshPhysicalMaterial
                    color="#ECB365"
                    emissive="#ECB365"
                    emissiveIntensity={2}
                    roughness={0.2}
                    metalness={1}
                />
            </mesh>
        </group>
    );
}
