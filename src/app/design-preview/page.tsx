import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article Design Preview · Hari Parthasarathy',
  robots: { index: false, follow: false },
};

const previews = [
  {
    href: '/design-preview/bitsize-soulfood',
    label: 'Soulfood · Bitsize',
    title: 'Fight or Flight. Freeze and Frame',
    description: 'Simple cream reader — sticky back nav, no section bar. Rust/sienna accents.',
    variant: 'soulfood' as const,
  },
  {
    href: '/design-preview/bitsize-brainfood',
    label: 'Brainfood · Bitsize',
    title: 'Genetic Alphabets meet Cognitive Benchmarks',
    description: 'Same minimal layout with blue Brainfood accents and stat row.',
    variant: 'brainfood' as const,
  },
  {
    href: '/design-preview/bytesize',
    label: 'Brainfood · Bytesize',
    title: 'Speciation at Hyperscale',
    description: 'Multi-section reader with sticky section nav, framework card, and pillar markers.',
    variant: 'brainfood' as const,
  },
];

export default function DesignPreviewHubPage() {
  return (
    <main className="design-preview-hub">
      <div className="design-preview-inner">
        <span className="design-preview-badge">Branch preview only · not on production</span>
        <h1 className="design-preview-title">Article Design Refresh</h1>
        <p className="design-preview-desc">
          Preview the new reader layouts on localhost. Production posts on <code>main</code> are unchanged.
          Run <code>npm run dev</code> on branch <code>feature/article-design-refresh</code>.
        </p>

        <div className="design-preview-grid">
          {previews.map((preview) => (
            <Link
              key={preview.href}
              href={preview.href}
              className={`design-preview-card design-preview-card--${preview.variant}`}
            >
              <div className="design-preview-card-label">{preview.label}</div>
              <div className="design-preview-card-title">{preview.title}</div>
              <p className="design-preview-card-sub">{preview.description}</p>
            </Link>
          ))}
        </div>

        <p className="design-preview-desc" style={{ marginTop: 40, marginBottom: 0 }}>
          <Link href="/musings" style={{ color: '#b8622a' }}>
            ← Back to Musings
          </Link>{' '}
          (current production layout)
        </p>
      </div>
    </main>
  );
}
