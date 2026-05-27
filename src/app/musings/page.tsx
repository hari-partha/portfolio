import { MusingsHub } from '@/components/musings/MusingsHub';
import { getPostsForBrand } from '@/data/brainfoodPosts';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Musings · Hari Parthasarathy',
  description: 'Brainfood and Soulfood — essays on biotech, venture, AI, and personal stories.',
};

export default function MusingsPage() {
  return (
    <MusingsHub
      brainfoodPosts={getPostsForBrand('brainfood')}
      soulfoodPosts={getPostsForBrand('soulfood')}
    />
  );
}
