import Link from 'next/link';
import type { ReactNode } from 'react';
import { ReaderArticleHero } from './ReaderArticleHero';
import { SectionNavBar } from './SectionNavBar';
import type { ReaderBrand, ReaderSectionNavItem, ReaderStat } from './types';
import { ReaderFrameworkCard, ReaderStatRow } from './ReaderBlocks';
import type { FrameworkRow } from './types';

type BytesizeReaderLayoutProps = {
  brand: ReaderBrand;
  breadcrumb: string;
  seriesLabel: string;
  title: ReactNode;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  date?: string;
  sections: ReaderSectionNavItem[];
  frameworkCard?: { title: string; rows: FrameworkRow[] };
  stats?: ReaderStat[];
  footer?: ReactNode;
  children: ReactNode;
};

export function BytesizeReaderLayout({
  brand,
  breadcrumb,
  seriesLabel,
  title,
  subtitle,
  authorName,
  authorMeta,
  date,
  sections,
  frameworkCard,
  stats,
  footer,
  children,
}: BytesizeReaderLayoutProps) {
  const themeClass =
    brand === 'soulfood' ? 'reader-theme reader-theme--soulfood' : 'reader-theme reader-theme--brainfood';

  return (
    <main className={`${themeClass} reader-theme--bytesize`}>
      <header className="reader-top-bar reader-top-bar--bytesize">
        <div className="reader-top-bar-row">
          <Link href="/musings" className="reader-back-link">
            ← Back to Musings
          </Link>
          <span className="reader-breadcrumb">{breadcrumb}</span>
        </div>
        <SectionNavBar sections={sections} />
      </header>

      <div className="reader-wrapper reader-wrapper--bytesize">
        <ReaderArticleHero
          eyebrow={seriesLabel}
          title={title}
          subtitle={subtitle}
          authorName={authorName}
          authorMeta={authorMeta}
          date={date}
        />

        {frameworkCard && <ReaderFrameworkCard title={frameworkCard.title} rows={frameworkCard.rows} />}
        {stats && stats.length > 0 && <ReaderStatRow stats={stats} />}

        <article className="reader-article">{children}</article>

        {footer && (
          <>
            <div className="reader-section-end">· · ·</div>
            <hr className="reader-closing-rule" />
            <footer className="reader-footer">{footer}</footer>
          </>
        )}
      </div>
    </main>
  );
}
