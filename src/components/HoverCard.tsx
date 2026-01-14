'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';

export function HoverCard() {
    const { hoveredSectionIndex, isLocked } = useScrollStore();

    const activeSection = hoveredSectionIndex !== null ? sections[hoveredSectionIndex] : null;

    return (
        <AnimatePresence mode="wait">
            {activeSection && (
                <div
                    onMouseEnter={() => useScrollStore.setState({ isHoveringCard: true })}
                    onMouseLeave={() => {
                        // Only close if NOT locked
                        if (!isLocked) {
                            useScrollStore.setState({ isHoveringCard: false, hoveredSectionIndex: null, hoveredAtomPosition: null });
                        }
                    }}
                >
                    <motion.div
                        key={activeSection.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed md:right-12 md:top-1/2 md:-translate-y-1/2 md:w-[min(450px,94vw)] 
                                   bottom-0 left-0 w-full rounded-t-2xl md:rounded-lg
                                   z-50 pointer-events-none"
                    >
                        {/* Glass Panel */}
                        <div className="bg-bg-dark-teal/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative group pointer-events-auto">

                            {/* Colored Accent Line */}
                            <div
                                className="absolute top-0 left-0 w-1 h-full"
                                style={{ backgroundColor: activeSection.color }}
                            />

                            {/* Close Button (Visible if Locked) */}
                            {isLocked && (
                                <button
                                    onClick={() => useScrollStore.setState({ isLocked: false, hoveredSectionIndex: null })}
                                    className="absolute top-4 right-4 z-50 p-2 text-white/40 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}

                            {/* Header */}
                            <div className="p-8 pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                                        SECTOR_{String(hoveredSectionIndex).padStart(2, '0')}
                                    </span>
                                    <div className="flex gap-1" style={{ opacity: 0.6 }}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    </div>
                                </div>

                                <h2 className="font-serif text-4xl text-white mb-2 leading-tight">
                                    {activeSection.title}
                                </h2>

                                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                                    {activeSection.summary}
                                </p>
                            </div>

                            {/* Items Grid */}
                            <div className="p-8 pt-0 pb-8 flex flex-col gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar md:max-h-[70vh] overscroll-contain">
                                {activeSection.items?.map((item, i) => (
                                    <div key={i}>
                                        {/* Dropdown / Sub-items logic */}
                                        {item.subItems ? (
                                            <details className="group/details">
                                                <summary className="list-none flex items-start gap-4 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                                                    {/* Image Thumbnail */}
                                                    <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden relative shrink-0 border border-white/10 group-hover/details:border-accent-gold/50 transition-colors">
                                                        {item.img ? (
                                                            <img src={item.img} className="w-full h-full object-contain p-2 opacity-80 group-hover/details:opacity-100 transition-opacity" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs text-white/20 font-mono">IMG</div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-white font-sans text-lg font-medium group-hover/details:text-accent-gold transition-colors truncate">
                                                                {item.title}
                                                            </h3>
                                                            <div className="text-accent-gold text-xs transition-transform group-open/details:rotate-180 transform duration-200">▼</div>
                                                        </div>
                                                        <p className="text-xs text-accent-gold/80 font-mono uppercase tracking-wide mb-1">
                                                            {item.subtitle}
                                                        </p>
                                                        {item.description && (
                                                            <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </summary>

                                                {/* Dropdown Content */}
                                                <div className="pl-6 ml-8 border-l border-white/10 mt-2 flex flex-col gap-2">
                                                    {item.subItems.map((sub, j) => (
                                                        <a
                                                            key={j}
                                                            href={sub.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block py-1 px-2 text-sm text-white/60 hover:text-accent-gold hover:bg-white/5 rounded transition-colors"
                                                        >
                                                            {sub.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            </details>
                                        ) : (
                                            /* Standard Link Item */
                                            <a
                                                href={item.href || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-4 group/item cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                            >
                                                {/* Image Thumbnail */}
                                                <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden relative shrink-0 border border-white/10 group-hover/item:border-accent-gold/50 transition-colors">
                                                    {item.img ? (
                                                        <img src={item.img} className="w-full h-full object-contain p-2 opacity-80 group-hover/item:opacity-100 transition-opacity" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-white/20 font-mono">IMG</div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-white font-sans text-lg font-medium group-hover/item:text-accent-gold transition-colors truncate">
                                                            {item.title}
                                                        </h3>
                                                        <div className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                                                            <span className="text-accent-gold text-[8px]">↗</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-accent-gold/80 font-mono uppercase tracking-wide mb-1">
                                                        {item.subtitle}
                                                    </p>
                                                    {item.description && (
                                                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Footer scanline */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent bottom-0 absolute" />
                        </div>
                    </motion.div>
                </div>
            )
            }
        </AnimatePresence >
    );
}
