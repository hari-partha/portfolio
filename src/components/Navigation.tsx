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

        // Automatically "open" the tile by setting selected state
        useScrollStore.setState({
            hoveredSectionIndex: index,
        });
    };

    if (!isExploring) return null;

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
            <div className="bg-bg-dark-teal/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-2xl flex gap-8">
                {sections.map((section, i) => (
                    <button
                        key={section.id}
                        onClick={() => handleScrollTo(section.marker, i)}
                        className="group flex flex-col items-center gap-1 cursor-pointer"
                    >
                        <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-accent-gold transition-colors whitespace-nowrap">
                            {section.id}
                        </span>
                        <div className="w-0 h-px bg-accent-gold transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
