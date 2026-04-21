import { EditorialTemplate } from '@/components/blog/EditorialTemplate';
import { isAprilAdmissionsPostPublished } from '@/lib/aprilAdmissionsSchedule';
import { AdmissionsPostBody } from './AdmissionsPostBody';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const published = isAprilAdmissionsPostPublished();
  return {
    title: published
      ? 'Admissions Insights from a Graduating Senior · Hari Parthasarathy'
      : 'Coming April 25 · Admissions insights',
    description: published
      ? 'LinkedIn-style admissions notes from a graduating MET senior at Berkeley — April insights for admitted students and families.'
      : 'This essay unlocks April 25, 2026 (Pacific).',
  };
}

export default function AprilAdmissionsPostPage() {
  const published = isAprilAdmissionsPostPublished();

  if (!published) {
    return (
      <main className="editorial-theme min-h-screen">
        <section className="editorial-cover">
          <div className="editorial-cover-label">Brainfood · Scheduled</div>
          <h1 className="editorial-cover-title">Admissions Insights from a Graduating Senior</h1>
          <p className="editorial-cover-sub">
            This rolling essay unlocks at midnight Pacific on <strong>April 25, 2026</strong>. Check back then.
          </p>
          <div className="editorial-cover-byline">
            <div className="editorial-avatar">H</div>
            <div>
              <div className="editorial-byline-name">Hari Parthasarathy</div>
              <div className="editorial-byline-meta">MET &apos;26, UC Berkeley</div>
            </div>
          </div>
        </section>
        <section className="editorial-intro-band">
          <p className="editorial-kicker">Not yet public</p>
          <p className="editorial-p" style={{ marginBottom: 0 }}>
            Preview locally before the release date by setting{' '}
            <code className="rounded bg-white/80 px-1.5 py-0.5 text-[13px] text-[#1e3a8a]">
              NEXT_PUBLIC_UNLOCK_APRIL_ADMISSIONS=1
            </code>{' '}
            in <code className="rounded bg-white/80 px-1.5 py-0.5 text-[13px]">.env.local</code>.
          </p>
        </section>
        <article className="editorial-article pb-16">
          <p className="editorial-p">
            <Link href="/brainfood#musings" className="font-medium text-[#1d4ed8] underline underline-offset-2">
              ← Back to Musings
            </Link>
          </p>
        </article>
      </main>
    );
  }

  return (
    <EditorialTemplate
      backToMusings
      coverLabel="Brainfood · April 2026"
      title={<>Admissions Insights from a Graduating Senior</>}
      subtitle="April is admissions season — short notes for admitted students, families, and friends. A living post; more days land here as I write them."
      authorName="Hari Parthasarathy"
      authorMeta={"MET '26, UC Berkeley"}
      introKicker="Rolling essay"
      introBandText="LinkedIn-length dispatches through April — for admits, parents, and friends. New days are added here as I write them."
      footer={"Hari Parthasarathy · MET '26, UC Berkeley"}
    >
      <section className="editorial-essay-flow">
        <AdmissionsPostBody />
      </section>
    </EditorialTemplate>
  );
}
