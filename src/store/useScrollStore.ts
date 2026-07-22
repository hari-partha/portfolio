import { create } from 'zustand';

interface ScrollState {
  progress: number; // 0..1
  setProgress: (progress: number) => void;
  activeSectionIndex: number;
  setActiveSectionIndex: (index: number) => void;
  isExploring: boolean;
  setExploring: (e: boolean) => void;

  // Interaction State (New)
  hoveredSectionIndex: number | null;
  setHoveredSectionIndex: (index: number | null) => void;
  hoveredAtomPosition: { x: number; y: number } | null;
  setHoveredAtomPosition: (pos: { x: number; y: number } | null) => void;
  isHoveringCard: boolean;
  setHoveringCard: (h: boolean) => void;
  isLocked: boolean;
  setLocked: (l: boolean) => void;
  /** On touch, the sector whose auto-sheet the user dismissed; cleared when a new sector scrolls in. */
  mobileSheetDismissedFor: number | null;
  setMobileSheetDismissedFor: (i: number | null) => void;
  isMobile: boolean;
  setIsMobile: (m: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  activeSectionIndex: 0,
  setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
  isExploring: false,
  setExploring: (isExploring) => set({ isExploring }),

  // New State Init
  hoveredSectionIndex: null,
  setHoveredSectionIndex: (index) => set({ hoveredSectionIndex: index }),
  hoveredAtomPosition: null,
  setHoveredAtomPosition: (pos) => set({ hoveredAtomPosition: pos }),
  isHoveringCard: false,
  setHoveringCard: (h) => set({ isHoveringCard: h }),
  isLocked: false,
  setLocked: (l) => set({ isLocked: l }),
  mobileSheetDismissedFor: null,
  setMobileSheetDismissedFor: (mobileSheetDismissedFor) => set({ mobileSheetDismissedFor }),
  isMobile: false,
  setIsMobile: (m) => set({ isMobile: m }),
}));
