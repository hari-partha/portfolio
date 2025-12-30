'use client';
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/store/useScrollStore';
import { sections } from '@/data/sections';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollOrchestrator() {
  const setProgress = useScrollStore((s) => s.setProgress);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let st: ScrollTrigger | null = null;

    const setupScrollTrigger = () => {
      if (!rootRef.current) return;

      const footer = document.getElementById('footer');

      st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: footer ? 'top top' : 'bottom bottom',
        endTrigger: footer || undefined,
        scrub: 1, // Add slight delay for smoothness
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(setupScrollTrigger, 200);

    const handleResize = () => {
      if (st) st.kill();
      setupScrollTrigger();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
    };
  }, [setProgress]);

  // Create markers based on sections to define vertical scroll space
  const blocks = useMemo(() => {
    // We want a long scroll journey (about 800vh total for 6 milestones)
    return Array.from({ length: 8 }, (_, i) => ({
      id: `block-${i}`,
      heightVh: 100
    }));
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      {blocks.map((b) => (
        <section
          key={b.id}
          style={{ height: `${b.heightVh}vh` }}
          className="pointer-events-none"
        />
      ))}
    </div>
  );
}
