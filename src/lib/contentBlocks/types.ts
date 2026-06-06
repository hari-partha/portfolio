export type PostBrand = 'brainfood' | 'soulfood';
export type PostFormat = 'bitsize' | 'bytesize';

export type FrameworkCardMeta = {
  title: string;
  rows: { label: string; text: string }[];
};

export type StatMeta = {
  value: string;
  label: string;
};

export type PostMeta = {
  brand: PostBrand;
  format: PostFormat;
  title: string;
  subtitle: string;
  seriesLabel: string;
  date?: string;
  lede?: string;
  breadcrumb?: string;
  authorName?: string;
  authorMeta?: string;
  footer?: string;
  signoff?: string;
  frameworkCard?: FrameworkCardMeta;
  stats?: StatMeta[];
};

export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
  dropCap?: boolean;
};

export type SubsectionBlock = {
  type: 'subsection';
  title: string;
  kicker?: string;
  children: ContentBlock[];
};

export type SectionBlock = {
  type: 'section';
  id: string;
  num: string;
  pillar: string;
  title: string;
  shortLabel: string;
  children: ContentBlock[];
};

export type PullQuoteBlock = {
  type: 'pullQuote';
  text: string;
  cite?: string;
};

export type StatRowBlock = {
  type: 'statRow';
  stats: StatMeta[];
};

export type CalloutBlock = {
  type: 'callout';
  label: string;
  text: string;
};

export type TableBlock = {
  type: 'table';
  caption?: string;
  headers?: string[];
  rows: string[][];
};

export type BarChartBar = {
  label: string;
  value: number;
  variant?: 'light' | 'accent';
};

export type BarChartBlock = {
  type: 'barChart';
  label?: string;
  caption?: string;
  bars: BarChartBar[];
};

export type FigureBlock = {
  type: 'figure';
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
};

export type FrameworkCardBlock = {
  type: 'frameworkCard';
  title: string;
  rows: { label: string; text: string }[];
};

export type DiptychPanel = {
  src: string;
  alt: string;
  caption?: string;
};

export type DiptychBlock = {
  type: 'diptych';
  left: DiptychPanel;
  right: DiptychPanel;
};

export type ContentBlock =
  | ParagraphBlock
  | SubsectionBlock
  | SectionBlock
  | PullQuoteBlock
  | StatRowBlock
  | CalloutBlock
  | TableBlock
  | BarChartBlock
  | FigureBlock
  | FrameworkCardBlock
  | DiptychBlock;

export type SectionNavEntry = {
  id: string;
  num: string;
  shortLabel: string;
  pillar: string;
  title: string;
};

export type ParseDocBlocksResult = {
  meta: PostMeta;
  blocks: ContentBlock[];
  sections: SectionNavEntry[];
};
