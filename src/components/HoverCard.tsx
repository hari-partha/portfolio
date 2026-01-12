'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';

export function HoverCard() {
    const { hoveredSectionIndex } = useScrollStore();

    const activeSection = hoveredSectionIndex !== null ? sections[hoveredSectionIndex] : null;

    return (
        <AnimatePresence mode="wait">
            {activeSection && (
                <div
                    onMouseEnter={() => useScrollStore.setState({ isHoveringCard: true })}
                    onMouseLeave={() => {
                        useScrollStore.setState({ isHoveringCard: false, hoveredSectionIndex: null, hoveredAtomPosition: null });
                    }}
                >
                    <motion.div
                        key={activeSection.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 w-[min(450px,94vw)]"
                    >
                        {/* Glass Panel */}
                        <div className="bg-bg-dark-teal/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative group">

                            {/* Colored Accent Line */}
                            <div
                                className="absolute top-0 left-0 w-1 h-full"
                                style={{ backgroundColor: activeSection.color }}
                            />

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
                            <div className="p-8 pt-0 flex flex-col gap-4">
                                {activeSection.items?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
                                        {/* Image Thumbnail */}
                                        <div className="w-16 h-16 bg-white/5 rounded-none overflow-hidden relative">
                                            {item.img ? (
                                                <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover/item:opacity-100 transition-opacity" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-white/20 font-mono">IMG</div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-white font-sans text-lg group-hover/item:text-accent-gold transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-white/40 font-mono uppercase tracking-wide">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                                            <span className="text-accent-gold text-[10px]">↗</span>
                                        </div>
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
