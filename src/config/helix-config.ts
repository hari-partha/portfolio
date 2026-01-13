export const HELIX_CONFIG = {
    // Geometry
    radius: 2.5, // Increased slightly for better spread
    risePerBasePair: 0.8, // Slightly taller
    twistPerBasePair: Math.PI / 8, // 22.5 degrees twist
    pairs: 150, // Increased to extend scroll range for final Library section

    // Animation / Scroll
    scrollRotationTurns: 3, // Restored Asimovian speed

    // Camera / Scene
    helixYOffset: 3, // Lifted to compensate for centered geometry (Visual Match)

    // Target Indices for Projects/Sections
    // Matches the index of the tile to the specific base-pair index on the helix
    targetIndices: [15, 40, 65, 90],

    // Anchors for specific Tiles (7 tiles total)
    tileAnchors: [10, 30, 40, 60, 70, 85, 95]
};
