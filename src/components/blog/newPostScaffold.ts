import { TocItem } from './EditorialTemplate';

export type EditorialPostConfig = {
  coverLabel: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  introKicker: string;
  introBandText: string;
  tocItems?: TocItem[];
  footer?: string;
};

export const defaultEditorialPostConfig: EditorialPostConfig = {
  coverLabel: 'Brainfood · Draft',
  title: 'Post title here',
  subtitle: 'One-sentence subtitle that frames the essay.',
  authorName: 'Hari Parthasarathy',
  authorMeta: 'Bio x AI x Systems',
  introKicker: 'Context',
  introBandText: 'Use this area for section overview or framing statement.',
  tocItems: [],
  footer: 'Footer note / attribution',
};
