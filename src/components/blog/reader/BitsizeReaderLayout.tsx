import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ReaderBrand } from './types';

type BitsizeReaderLayoutProps = {
  brand: ReaderBrand;
  seriesLabel: string;
  title: ReactNode;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  date?: string;
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
  introText,
  footer,
  children,
}: BitsizeReaderLayoutProps) {
  const themeClass =
    brand === 'soulfood' ? 'reader-theme reader-theme--soulfood' : 'reader-theme reader-theme--brainfood';

  return (
    <main className={themeClass}>
      <header className="reader-top-bar">
        <Link href="/musings" className="reader-back-link">
          ← Back to Musings
        </Link>
        <span className="reader-breadcrumb">{seriesLabel}</span>
      </header>

      <div className="reader-wrapper">
        <p className="reader-series-label">{seriesLabel}</p>
        <h1 className="reader-title">{title}</h1>
        <p className="reader-subtitle">{subtitle}</p>
        <hr className="reader-divider" />
        <div className="reader-byline">
          <strong>{authorName}</strong>
          <span className="reader-byline-sep">·</span>
          {authorMeta}
        </div>
        {date && <p className="reader-date">{date}</p>}

        {introText && <p className="reader-lede">{introText}</p>}

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
