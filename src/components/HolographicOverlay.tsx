'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';
import { useMemo, useState, useEffect } from 'react';

export function HolographicOverlay() {
    const { progress, activeSectionIndex, atomPosition } = useScrollStore();
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeContent = sections[activeSectionIndex] || sections[0];
    const items = activeContent.items || [];

    // For the demo, we just show the MAIN SECTION CARD, not individual items yet.
    // Or we cycle through items based on progress?
    // Let's stick to showing the Section Info + First Item for now to keep it clean.

    // Layout Logic:
    // If atom is on Left side of screen, put card on Right.
    // If atom is on Right, put card on Left.
    const isLeft = (atomPosition?.x || 0) < (windowSize.width / 2);

    // Card Position (Fixed anchors)
    const cardX = isLeft ? windowSize.width - 500 : 100;
    const cardY = (atomPosition?.y || windowSize.height / 2);

    // SVG Leader Line Path
    const linePath = useMemo(() => {
        if (!atomPosition) return '';

        const startX = atomPosition.x;
        const startY = atomPosition.y;

        const endX = isLeft ? cardX : cardX + 400; // Connect to closest side of card
        const endY = cardY;

        // Elbow connector
        const midX = (startX + endX) / 2;

        return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    }, [atomPosition, cardX, cardY, isLeft]);

    if (!atomPosition) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ECB365" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ECB365" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ECB365" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={linePath}
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                />
                {/* Reticle on Atom */}
                <circle cx={atomPosition.x} cy={atomPosition.y} r="6" stroke="#ECB365" strokeWidth="2" fill="none" />
                <circle cx={atomPosition.x} cy={atomPosition.y} r="12" stroke="#ECB365" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>

            {/* Holographic Card */}
            <motion.div
                className="absolute w-[400px] flex flex-col"
                style={{
                    left: isLeft ? undefined : cardX,
                    right: isLeft ? windowSize.width - (cardX + 400) : undefined,
                    top: cardY - 100 // Center vertically on line roughly
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Tech Header */}
                <div className="flex justify-between items-center text-accent-gold font-mono text-[10px] tracking-[0.2em] mb-2">
                    <span>SCAN_ID: {activeSectionIndex.toString().padStart(3, '0')}</span>
                    <span>COORDS: {atomPosition.x.toFixed(0)}:{atomPosition.y.toFixed(0)}</span>
                </div>

                {/* Glass Panel */}
                <div className="bg-bg-dark-teal/80 backdrop-blur-xl border-l-2 border-accent-gold p-8 shadow-2xl relative overflow-hidden group pointer-events-auto">

                    {/* Corner Brackets */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

                    {/* Animated Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-gold/50 shadow-[0_0_10px_#ECB365] animate-scan-fast opacity-50" />

                    <h2 className="font-sans text-4xl text-white font-light tracking-tight mb-4">
                        {activeContent.title}
                    </h2>

                    <p className="font-sans text-sm text-text-secondary leading-relaxed opacity-80 mb-6">
                        {activeContent.summary || "Analyzing genetic sequence data..."}
                    </p>

                    {items.length > 0 && (
                        <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                            <span className="font-mono text-[9px] uppercase text-white/40 tracking-widest">Detected Mutation</span>
                            <div className="text-white font-sans text-lg">{items[0].title}</div>
                            <span className="text-accent-gold text-xs hover:underline cursor-pointer">
                                View Full Analysis →
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
