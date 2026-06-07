import type { ReactNode } from 'react';
import { ProfileAvatar } from './ProfileAvatar';

type ReaderArticleHeroProps = {
  title: ReactNode;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  date?: string;
  readingTime?: string;
  lede?: string;
  /** Shown once under the nav; omit on Bitsize to avoid duplicating the breadcrumb. */
  eyebrow?: string;
};

function monogramFor(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : 'H';
}

export function ReaderArticleHero({
  title,
  subtitle,
  authorName,
  authorMeta,
  date,
  readingTime,
  lede,
  eyebrow,
}: ReaderArticleHeroProps) {
  const subline = [authorMeta, date, readingTime].filter(Boolean).join(' · ');

  return (
    <header className="reader-hero">
      {eyebrow && <p className="reader-eyebrow">{eyebrow}</p>}
      <h1 className="reader-title">{title}</h1>
      <p className="reader-dek">{subtitle}</p>
      <div className="reader-meta">
        <ProfileAvatar size={46} monogram={monogramFor(authorName)} alt={authorName} />
        <div className="reader-meta-text">
          <span className="reader-meta-author">{authorName}</span>
          {subline && <span className="reader-meta-line">{subline}</span>}
        </div>
      </div>
      {lede && <p className="reader-lede">{lede}</p>}
    </header>
  );
}
