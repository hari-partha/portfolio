import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';

export function HoverTooltip() {
    const { hoveredAtomPosition, hoveredSectionIndex } = useScrollStore();

    if (!hoveredAtomPosition || hoveredSectionIndex === null) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="fixed pointer-events-none z-50 flex flex-col items-center"
                style={{
                    left: hoveredAtomPosition.x,
                    top: hoveredAtomPosition.y - 60, // Position above the cursor/atom
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(236,179,101,0.3)]">
                    <span className="text-xs font-mono tracking-widest text-[#ECB365] uppercase">
                        Sector {String(hoveredSectionIndex).padStart(2, '0')} // Access Detected
                    </span>
                </div>
                <div className="h-4 w-[1px] bg-gradient-to-b from-[#ECB365] to-transparent"></div>
            </motion.div>
        </AnimatePresence>
    );
}
