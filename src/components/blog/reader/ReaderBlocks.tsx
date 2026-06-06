import type { ReactNode } from 'react';
import type { FrameworkRow, ReaderStat } from './types';

export function ReaderStatRow({ stats }: { stats: ReaderStat[] }) {
  return (
    <div className="reader-stat-row">
      {stats.map((stat) => (
        <div key={stat.value} className="reader-stat-cell">
          <span className="reader-stat-num">{stat.value}</span>
          <span className="reader-stat-lbl">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ReaderFrameworkCard({ title, rows }: { title: string; rows: FrameworkRow[] }) {
  return (
    <div className="reader-framework-card">
      <h3>{title}</h3>
      <div className="reader-framework-grid">
        {rows.map((row) => (
          <div key={row.label} className="reader-framework-row">
            <span className="reader-fw-label">{row.label}</span>
            <span className="reader-fw-text">{row.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReaderSectionMarker({
  id,
  num,
  pillar,
  title,
  children,
}: {
  id: string;
  num: string;
  pillar: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reader-section">
      <div className="reader-section-marker">
        <span className="reader-section-num">{num}</span>
        <div className="reader-section-label-block">
          <span className="reader-section-pillar">{pillar}</span>
          <h2 className="reader-section-head">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

export function ReaderSubHead({ children }: { children: ReactNode }) {
  return <h3 className="reader-sub-head">{children}</h3>;
}

export function ReaderParagraph({ children, dropCap }: { children: ReactNode; dropCap?: boolean }) {
  return <p className={`reader-p${dropCap ? ' reader-drop-cap' : ''}`}>{children}</p>;
}

export function ReaderPullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="reader-pull">
      {children}
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}

export function ReaderCallout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="reader-callout">
      <div className="reader-callout-label">{label}</div>
      {children}
    </div>
  );
}

export function ReaderSubsection({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="reader-subsection">
      {kicker && <span className="reader-subsection-kicker">{kicker}</span>}
      <h2 className="reader-subsection-title">{title}</h2>
      {children}
    </div>
  );
}
