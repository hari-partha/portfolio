export type PostBrand = 'brainfood' | 'soulfood';
export type PostFormat = 'bitsize' | 'bytesize';

export type ArchivePost = {
  title: string;
  summary: string;
  brand: PostBrand;
  format: PostFormat;
  /** Omit when `comingSoon` — card is not a link. */
  href?: string;
  date: string;
  /** If set, card is hidden until this instant (inclusive). Live posts only. */
  publishAt?: Date;
  comingSoon?: boolean;
};

const allPosts: ArchivePost[] = [
  {
    brand: 'brainfood',
    format: 'bitsize',
    title: 'The 5Ts: A Scout Framework for Startups',
    summary:
      'A long-form framework for evaluating early-stage startups through TAM, team, technology, traction, and term-sheet design.',
    href: '/brainfood/posts/5ts-framework',
    date: 'Apr 2026',
  },
  {
    brand: 'brainfood',
    format: 'bitsize',
    title: 'Venturing into the Caves of Steel',
    summary: 'What Asimov can still teach us about AI, biology, and the essence of being human.',
    href: '/brainfood/posts/caves-of-steel',
    date: 'Nov 2025',
  },
  {
    brand: 'brainfood',
    format: 'bitsize',
    title: 'Genetic Alphabets meet Cognitive Benchmarks',
    summary:
      'Have LLMs officially entered the biotech AI landscape? On AlphaFold 3, BioMysteryBench, clinical proof-of-concept, and the $0.22 opportunity in AI for health.',
    href: '/brainfood/posts/genetic-alphabets-cognitive-benchmarks',
    date: 'May 2026',
  },
  {
    brand: 'soulfood',
    format: 'bitsize',
    title: 'Admissions Insights from a Graduating Senior',
    summary:
      'April admissions notes from a graduating MET senior — say no with conviction, admit weekends, comb-shaped depth, finesse, and community. Updated over time.',
    href: '/soulfood/posts/april-admissions',
    date: 'Apr 2026',
  },
  {
    brand: 'soulfood',
    format: 'bitsize',
    title: 'MET Commencement Speech',
    summary:
      'Act I: Speed. Act II: Serendipity. Act III: What to carry — a farewell to the MET Class of 2026.',
    href: '/soulfood/posts/met-commencement-speech',
    date: 'May 2026',
  },
  {
    brand: 'brainfood',
    format: 'bytesize',
    title: 'The Evolutionary Biologist\'s Guide to AI',
    summary:
      'A multi-part series drawing a formal parallel between the biological Cambrian explosion and the AI landscape — speciation at hyperscale, body plans, decimation, and what survives. Sections 0–II are live; III–VI arrive August 2026.',
    href: '/brainfood/posts/evolutionary-biologists-guide-to-ai',
    date: 'Jun 2026',
  },
  {
    brand: 'brainfood',
    format: 'bytesize',
    title: 'The Life Matrix',
    summary:
      'Systems biology meets productivity, motivation, and growth — without the hustle clichés. In the works.',
    date: 'Late 2026',
    comingSoon: true,
  },
  {
    brand: 'soulfood',
    format: 'bitsize',
    title: 'Fight or Flight. Freeze and Frame',
    summary:
      'A byte-sized observation about arguments, relationships, and what we only understand later on — friction, memory, and relishing the discomfort.',
    href: '/soulfood/posts/fight-or-flight-freeze-and-frame',
    date: 'May 2026',
  },
  {
    brand: 'soulfood',
    format: 'bitsize',
    title: 'Cooking up a Theory',
    summary:
      'A theory about kitchens, parents, and what your recipe style says about the way you move through the world.',
    href: '/soulfood/posts/cooking-up-a-theory',
    date: 'May 2026',
  },
];

const FORMAT_ORDER: Record<PostFormat, number> = { bitsize: 0, bytesize: 1 };

export function getVisibleArchivePosts(now: Date = new Date()): ArchivePost[] {
  return allPosts.filter((post) => {
    if (post.comingSoon) return true;
    if (!post.publishAt) return true;
    return now.getTime() >= post.publishAt.getTime();
  });
}

/** Tile label on the musings grid, e.g. "Brainfood Bitsize". */
export function formatTileLabel(brand: PostBrand, format: PostFormat): string {
  const line = brand === 'brainfood' ? 'Brainfood' : 'Soulfood';
  const size = format === 'bitsize' ? 'Bitsize' : 'Bytesize';
  return `${line} ${size}`;
}

export function getPostsForBrand(brand: PostBrand, now: Date = new Date()): ArchivePost[] {
  return getVisibleArchivePosts(now)
    .filter((post) => post.brand === brand)
    .sort((a, b) => {
      if (a.comingSoon !== b.comingSoon) return a.comingSoon ? 1 : -1;
      const formatDiff = FORMAT_ORDER[a.format] - FORMAT_ORDER[b.format];
      if (formatDiff !== 0) return formatDiff;
      return a.title.localeCompare(b.title);
    });
}
