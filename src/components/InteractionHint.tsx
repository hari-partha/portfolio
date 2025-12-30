'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { useEffect, useState } from 'react';

export function InteractionHint() {
    const { isExploring } = useScrollStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isExploring) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000); // Show for 4 seconds
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [isExploring]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="fixed top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div className="bg-bg-dark-teal/80 backdrop-blur-md border border-accent-gold/40 rounded-full px-8 py-3 shadow-[0_0_30px_-5px_var(--color-accent-gold)]">
                        <span className="text-accent-gold font-ui text-xs tracking-[0.2em] uppercase font-bold">
                            Hover Over Gold Regions to View Projects
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
