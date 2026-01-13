'use client';

import { sections } from '@/data/sections';
import { useScrollStore } from '@/store/useScrollStore';
import { motion } from 'framer-motion';

export function Navigation() {
    const { isExploring } = useScrollStore();

    const handleScrollTo = (marker: number, index: number) => {
        // Calculate target scroll position
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Target Y:
        // If it's the last section (Projects, index === sections.length - 1), 
        // we scroll all the way to the bottom to ensure full rotation and visibility.
        let targetY = marker * scrollableHeight;

        if (index === sections.length - 1) {
            targetY = scrollableHeight;
        }

        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });

        // Automatically "open" and LOCK the tile so it stays up
        useScrollStore.setState({
            hoveredSectionIndex: index,
            isLocked: true
        });
    };

    if (!isExploring) return null;

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-4 w-full justify-center px-4"
        >
            {/* Back to Landing Button */}
            <button
                onClick={() => {
                    useScrollStore.setState({ isExploring: false, progress: 0 });
                    window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 items-center gap-2 text-white/50 hover:text-accent-gold transition-colors group"
            >
                <span className="text-xl">←</span>
                <span className="font-ui text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">Orbit</span>
            </button>

            {/* Mobile Back Button (Top Left) */}
            <button
                onClick={() => {
                    useScrollStore.setState({ isExploring: false, progress: 0 });
                    window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 border border-white/10 active:scale-95 transition-transform"
            >
                ←
            </button>

            <div className="bg-bg-dark-teal/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-2xl flex gap-8 overflow-x-auto max-w-[90vw] md:max-w-none no-scrollbar">
                {sections.map((section, i) => (
                    <button
                        key={section.id}
                        onClick={() => handleScrollTo(section.marker, i)}
                        className="group flex flex-col items-center gap-1 cursor-pointer shrink-0"
                    >
                        <span className="font-ui text-xs md:text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-accent-gold transition-colors whitespace-nowrap">
                            {section.id}
                        </span>
                        <div className="w-0 h-px bg-accent-gold transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
