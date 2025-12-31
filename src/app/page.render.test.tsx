import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import HomePage from './page';

// Mock gsap ScrollTrigger to avoid matchMedia issues in tests
vi.mock('gsap/ScrollTrigger', () => ({
  default: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    registerPlugin: vi.fn(),
  },
}));

vi.mock('framer-motion', async (orig) => {
  const mod: any = await orig();
  return { ...mod, useReducedMotion: () => true };
});

describe('HomePage', () => {
  it('renders header and footer', () => {
    render(<HomePage />);
    expect(screen.getAllByText(/Hari Parthasarathy/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Back to top/)).toBeInTheDocument();
  });
});

