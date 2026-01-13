import { create } from 'zustand';

interface ScrollState {
  progress: number; // 0..1
  setProgress: (progress: number) => void;
  activeSectionIndex: number;
  setActiveSectionIndex: (index: number) => void;
  activeTileIndex: number;
  setActiveTileIndex: (index: number) => void;
  isExploring: boolean;
  setExploring: (e: boolean) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Tracker for the Atomic Scanner HUD
  atomPosition: { x: number; y: number } | null;
  setAtomPosition: (pos: { x: number; y: number } | null) => void;

  // Interaction State (New)
  hoveredSectionIndex: number | null;
  setHoveredSectionIndex: (index: number | null) => void;
  hoveredAtomPosition: { x: number; y: number } | null;
  setHoveredAtomPosition: (pos: { x: number; y: number } | null) => void;
  isHoveringCard: boolean;
  setHoveringCard: (h: boolean) => void;
  isLocked: boolean;
  setLocked: (l: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  activeSectionIndex: 0,
  setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
  activeTileIndex: -1,
  setActiveTileIndex: (index) => set({ activeTileIndex: index }),
  isExploring: false,
  setExploring: (isExploring) => set({ isExploring }),
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),
  atomPosition: null,
  setAtomPosition: (atomPosition) => set({ atomPosition }),

  // New State Init
  hoveredSectionIndex: null,
  setHoveredSectionIndex: (index) => set({ hoveredSectionIndex: index }),
  hoveredAtomPosition: null,
  setHoveredAtomPosition: (pos) => set({ hoveredAtomPosition: pos }),
  isHoveringCard: false,
  setHoveringCard: (h) => set({ isHoveringCard: h }),
  isLocked: false,
  setLocked: (l) => set({ isLocked: l }),
}));
