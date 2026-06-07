'use client';

import { useEffect, useRef } from 'react';

type MusingsHeroBackdropProps = {
  /** Hex color (e.g. "#345583") for the cells; matches the active brand. */
  color: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// Base glider; rotated 0–3 times to vary travel direction.
const GLIDER: [number, number][] = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
];

function rotate(offsets: [number, number][], times: number): [number, number][] {
  let out = offsets;
  for (let t = 0; t < times; t += 1) out = out.map(([x, y]) => [2 - y, x] as [number, number]);
  return out;
}

/**
 * Ambient Conway's Game of Life backdrop for the Musings header. Standard B3/S23
 * rules evolve about once a minute (organically randomised) on a faint graph-paper
 * grid, with live cells drawn as crisp brand-colored squares at low opacity — quiet
 * background texture, not a focal point. Each generation cross-fades over its whole
 * interval so motion is continuous, never a snap; gentle re-seeding keeps it alive.
 * Reduced-motion renders a single static frame.
 */
export function MusingsHeroBackdrop({ color }: MusingsHeroBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const cv = canvas;
    const par = parent;
    const context = ctx;

    const CELL = 20;
    const MIN_INTERVAL = 8000; // ms — a generation roughly every ~10s, organically paced
    const MAX_INTERVAL = 13000;
    const FADE_MS = 600; // short, discrete transition between generations (true Conway feel)
    const CELL_ALPHA = 0.14; // square fill opacity (low → stays well behind the text)
    const GRID_ALPHA = 0.05;
    const SOUP = 0.12;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let alive = new Uint8Array(0);
    let fade = new Float32Array(0);
    let popHistory: number[] = [];
    let gensSinceSeed = 0;
    let genInterval = MIN_INTERVAL;
    let nextStepAt = 0;
    let lastFrame = 0;
    let raf = 0;

    const idx = (c: number, r: number) => r * cols + c;
    const wrapC = (c: number) => (c + cols) % cols;
    const wrapR = (r: number) => (r + rows) % rows;
    const randInterval = () => MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);

    function placeGlider(c0: number, r0: number) {
      for (const [dx, dy] of rotate(GLIDER, Math.floor(Math.random() * 4))) {
        alive[idx(wrapC(c0 + dx), wrapR(r0 + dy))] = 1;
      }
    }

    function seed() {
      alive.fill(0);
      for (let i = 0; i < alive.length; i += 1) alive[i] = Math.random() < SOUP ? 1 : 0;
      const gliders = Math.max(2, Math.round(cols / 14));
      for (let i = 0; i < gliders; i += 1) {
        placeGlider(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows));
      }
      popHistory = [];
      gensSinceSeed = 0;
    }

    function inject(clusters: number) {
      for (let k = 0; k < clusters; k += 1) {
        const c0 = Math.floor(Math.random() * cols);
        const r0 = Math.floor(Math.random() * rows);
        if (Math.random() < 0.5) {
          placeGlider(c0, r0);
        } else {
          for (let dy = 0; dy < 3; dy += 1) {
            for (let dx = 0; dx < 3; dx += 1) {
              if (Math.random() < 0.5) alive[idx(wrapC(c0 + dx), wrapR(r0 + dy))] = 1;
            }
          }
        }
      }
      gensSinceSeed = 0;
    }

    function stepGeneration() {
      const next = new Uint8Array(cols * rows);
      let pop = 0;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          let n = 0;
          for (let dr = -1; dr <= 1; dr += 1) {
            for (let dc = -1; dc <= 1; dc += 1) {
              if (dr === 0 && dc === 0) continue;
              n += alive[idx(wrapC(c + dc), wrapR(r + dr))];
            }
          }
          const live = alive[idx(c, r)] === 1;
          if (live ? n === 2 || n === 3 : n === 3) {
            next[idx(c, r)] = 1;
            pop += 1;
          }
        }
      }
      alive = next;
      gensSinceSeed += 1;

      popHistory.push(pop);
      if (popHistory.length > 4) popHistory.shift();
      const stalled = popHistory.length === 4 && popHistory.every((p) => p === popHistory[0]);
      if (pop === 0) {
        seed();
      } else if (stalled || gensSinceSeed > 14) {
        inject(Math.max(2, Math.round(cols / 22)));
      }
    }

    function build() {
      const rect = par.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      alive = new Uint8Array(cols * rows);
      fade = new Float32Array(cols * rows);
      seed();
      for (let s = 0; s < 3; s += 1) stepGeneration();
      for (let i = 0; i < alive.length; i += 1) fade[i] = alive[i];
    }

    function draw(dt: number) {
      const [r, g, b] = hexToRgb(colorRef.current);
      context.clearRect(0, 0, width, height);

      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${GRID_ALPHA})`;
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x <= width; x += CELL) {
        context.moveTo(Math.round(x) + 0.5, 0);
        context.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = 0; y <= height; y += CELL) {
        context.moveTo(0, Math.round(y) + 0.5);
        context.lineTo(width, Math.round(y) + 0.5);
      }
      context.stroke();

      const fadeStep = FADE_MS > 0 ? Math.min(1, dt / FADE_MS) : 1;
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const i = idx(col, row);
          const target = alive[i] === 1 ? 1 : 0;
          fade[i] += (target - fade[i]) * fadeStep;
          if (fade[i] > 0.01) {
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${fade[i] * CELL_ALPHA})`;
            context.fillRect(col * CELL, row * CELL, CELL, CELL);
          }
        }
      }
    }

    function scheduleNext(now: number) {
      genInterval = randInterval();
      nextStepAt = now + genInterval;
    }

    function loop(now: number) {
      const dt = lastFrame ? now - lastFrame : 16;
      lastFrame = now;
      if (now >= nextStepAt) {
        stepGeneration();
        scheduleNext(now);
      }
      draw(dt);
      raf = requestAnimationFrame(loop);
    }

    function handleResize() {
      build();
      if (reduceMotion) draw(16);
    }

    build();
    if (reduceMotion) {
      draw(16);
    } else {
      const now = performance.now();
      scheduleNext(now);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="musings-r-hero-backdrop" aria-hidden="true" />;
}
