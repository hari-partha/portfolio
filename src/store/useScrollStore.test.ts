import { describe, it, expect } from 'vitest';
import { useScrollStore } from './useScrollStore';

describe('useScrollStore', () => {
  it('clamps progress to [0,1]', () => {
    const setProgress = useScrollStore.getState().setProgress;
    setProgress(-1);
    expect(useScrollStore.getState().progress).toBe(0);
    setProgress(2);
    expect(useScrollStore.getState().progress).toBe(1);
  });

  it('sets active section id', () => {
    useScrollStore.getState().setActive('about');
    expect(useScrollStore.getState().active).toBe('about');
  });
});

