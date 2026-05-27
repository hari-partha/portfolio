import { EditorialTemplate } from '@/components/blog/EditorialTemplate';
import { AdmissionsPostBody } from './AdmissionsPostBody';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions Insights from a Graduating Senior · Hari Parthasarathy',
  description:
    'LinkedIn-style admissions notes from a graduating MET senior at Berkeley — April insights for admitted students and families.',
};

export default function AprilAdmissionsPostPage() {
  return (
    <EditorialTemplate
      brand="soulfood"
      backToMusings
      coverLabel="Soulfood · Bitsize"
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
