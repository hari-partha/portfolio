import type { ReactNode } from 'react';

export type ReaderBrand = 'brainfood' | 'soulfood';

export type ReaderSectionNavItem = {
  id: string;
  num: string;
  shortLabel: string;
  pillar: string;
  title: string;
  /** Upcoming section: shown greyed + non-clickable, excluded from scroll tracking. */
  locked?: boolean;
};

export type ReaderStat = {
  value: string;
  label: string;
};

export type FrameworkRow = {
  label: string;
  text: ReactNode;
};
