'use client';

import { MotionConfig } from 'framer-motion';

/**
 * App-wide client providers. MotionConfig reducedMotion="user" makes every
 * Framer entrance/transition respect prefers-reduced-motion automatically
 * (the R3F helix + Conway backdrop are already gated separately).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
