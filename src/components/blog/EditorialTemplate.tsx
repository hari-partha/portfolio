import Link from 'next/link';
import { ReactNode } from 'react';

export type TocItem = {
  number: string;
  label: string;
  sub: string;
};

type EditorialTemplateProps = {
  coverLabel: string;
  title: ReactNode;
  subtitle: string;
  authorName: string;
  authorMeta: string;
  introKicker: string;
  introBandText: string;
  tocItems?: TocItem[];
  children: ReactNode;
  footer?: string;
  /** Shows a compact control to return to the Brainfood musings landing page. */
  backToMusings?: boolean;
};

export function EditorialTemplate({
  coverLabel,
  title,
  subtitle,
  authorName,
  authorMeta,
  introKicker,
  introBandText,
  tocItems = [],
  children,
  footer,
  backToMusings = false,
}: EditorialTemplateProps) {
  return (
    <main className="editorial-theme min-h-screen">
      <section className="editorial-cover">
        <div className="editorial-cover-label">{coverLabel}</div>
        <h1 className="editorial-cover-title">{title}</h1>
        <p className="editorial-cover-sub">{subtitle}</p>
        <div className="editorial-cover-byline">
          <div className="editorial-avatar">H</div>
          <div>
            <div className="editorial-byline-name">{authorName}</div>
            <div className="editorial-byline-meta">{authorMeta}</div>
          </div>
        </div>
      </section>

      <section className="editorial-intro-band">
        <p className="editorial-kicker">{introKicker}</p>
        <p className="editorial-p" style={{ marginBottom: tocItems.length ? 0 : 8 }}>{introBandText}</p>
        {tocItems.length > 0 && (
          <div className="editorial-toc-grid">
            {tocItems.map((item) => (
              <div key={`${item.number}-${item.label}`} className="editorial-toc-item">
                <div className="editorial-toc-number">{item.number}</div>
                <div className="editorial-toc-label">{item.label}</div>
                <div className="editorial-toc-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <article className="editorial-article">
        {backToMusings && (
          <div className="editorial-post-nav">
            <Link href="/brainfood#musings" className="editorial-back-musings">
              ← Back to Musings
            </Link>
          </div>
        )}
        {children}
      </article>
      {footer && <footer className="editorial-footer">{footer}</footer>}
    </main>
  );
}

type EditorialSectionProps = {
  badge?: string;
  title: string;
  subTag?: string;
  subtitle?: string;
  children: ReactNode;
};

export function EditorialSection({ badge, title, subTag, subtitle, children }: EditorialSectionProps) {
  return (
    <section className="editorial-section">
      <div className="editorial-section-header">
        {badge && <div className="editorial-badge">{badge}</div>}
        <div>
          <h2 className="editorial-section-title">
            {title}
            {subTag && <span className="editorial-sub-tag">{subTag}</span>}
          </h2>
          {subtitle && <p className="editorial-section-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function EditorialCaseStudy({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="editorial-case">
      <div className="editorial-case-header">
        <span className="editorial-case-chip">Case Study</span>
        <span className="editorial-case-name">{name}</span>
      </div>
      <div className="editorial-case-body">{children}</div>
    </div>
  );
}
