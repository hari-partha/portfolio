import type { ReactNode } from 'react';

export type ReaderBrand = 'brainfood' | 'soulfood';

export type ReaderSectionNavItem = {
  id: string;
  num: string;
  shortLabel: string;
  pillar: string;
  title: string;
};

export type ReaderStat = {
  value: string;
  label: string;
};

export type FrameworkRow = {
  label: string;
  text: ReactNode;
};
