import Link from 'next/link';
import type { ReactNode } from 'react';
import { ReaderArticleHero } from './ReaderArticleHero';
import type { ReaderBrand } from './types';

type BitsizeReaderLayoutProps = {
  brand: ReaderBrand;
  seriesLabel: string;
  title: ReactNode;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  date?: string;
  readingTime?: string;
  introText?: string;
  footer?: string;
  children: ReactNode;
};

export function BitsizeReaderLayout({
  brand,
  seriesLabel,
  title,
  subtitle,
  authorName,
  authorMeta,
  date,
  readingTime,
  introText,
  footer,
  children,
}: BitsizeReaderLayoutProps) {
  const themeClass =
    brand === 'soulfood'
      ? 'reader-theme reader-theme--soulfood reader-theme--bitsize'
      : 'reader-theme reader-theme--brainfood reader-theme--bitsize';

  return (
    <main className={themeClass}>
      <header className="reader-top-bar">
        <Link href="/musings" className="reader-back-link">
          ← Back to Musings
        </Link>
        <span className="reader-breadcrumb">{seriesLabel}</span>
      </header>

      <div className="reader-hero-band">
        <div className="reader-hero-band-inner">
          <ReaderArticleHero
            title={title}
            subtitle={subtitle}
            authorName={authorName}
            authorMeta={authorMeta}
            date={date}
            readingTime={readingTime}
            lede={introText}
          />
        </div>
      </div>

      <div className="reader-wrapper">
        <article className="reader-article">{children}</article>

        {footer && (
          <>
            <hr className="reader-closing-rule" />
            <footer className="reader-footer">{footer}</footer>
          </>
        )}
      </div>
    </main>
  );
}
