import { APRIL_ADMISSIONS_PUBLISH_AT } from '@/lib/aprilAdmissionsSchedule';

export type BrainfoodPost = {
  title: string;
  summary: string;
  /** Omit when `comingSoon` — card is not a link. */
  href?: string;
  tag: string;
  date: string;
  /** If set, card is hidden until this instant (inclusive). Live posts only. */
  publishAt?: Date;
  /** Teaser tile; no navigation until the essay ships. */
  comingSoon?: boolean;
};

const allPosts: BrainfoodPost[] = [
  {
    title: 'The 5Ts: A Scout Framework for Startups',
    summary:
      'A long-form framework for evaluating early-stage startups through TAM, team, technology, traction, and term-sheet design.',
    href: '/brainfood/posts/5ts-framework',
    tag: 'Venture',
    date: 'Apr 2026',
  },
  {
    title: 'Brainfood Chapter 1 | Venturing into the Caves of Steel',
    summary: 'What Asimov can still teach us about AI, biology, and the essence of being human.',
    href: '/brainfood/posts/caves-of-steel',
    tag: 'Brainfood',
    date: 'Nov 2025',
  },
  {
    title: 'Admissions Insights from a Graduating Senior',
    summary:
      'April admissions notes from a graduating MET senior — say no with conviction, admit weekends, comb-shaped depth, finesse, and community. Updated over time.',
    href: '/brainfood/posts/april-admissions',
    tag: 'Brainfood',
    date: 'Apr 2026',
    publishAt: APRIL_ADMISSIONS_PUBLISH_AT,
  },
  {
    title: 'Brainfood Chapter 2 | AI in its Cambrian Evolution Era coming soon',
    summary: 'How the AI wave maps onto biological metaphors — form, selection pressure, and what survives. In the works.',
    tag: 'Brainfood',
    date: 'Summer 2026',
    comingSoon: true,
  },
  {
    title: 'The Life Matrix | Systems Biology meets Productivity, Motivation & Growth coming soon',
    summary: 'A systems-biology lens on how we work, rest, and compound — productivity and motivation without the hustle clichés.',
    tag: 'Brainfood',
    date: 'Summer 2026',
    comingSoon: true,
  },
];

export function getVisibleBrainfoodPosts(now: Date = new Date()): BrainfoodPost[] {
  if (process.env.NEXT_PUBLIC_UNLOCK_APRIL_ADMISSIONS === '1') {
    return allPosts;
  }
  return allPosts.filter((post) => {
    if (post.comingSoon) return true;
    if (!post.publishAt) return true;
    return now.getTime() >= post.publishAt.getTime();
  });
}
