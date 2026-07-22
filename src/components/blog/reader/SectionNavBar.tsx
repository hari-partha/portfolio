'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReaderSectionNavItem } from './types';

type SectionNavBarProps = {
  sections: ReaderSectionNavItem[];
};

export function SectionNavBar({ sections }: SectionNavBarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sections
      .filter((section) => !section.locked)
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  // Keep the active tab visible within the horizontally-scrolling nav strip.
  // Scroll the strip only — never the page vertically.
  useEffect(() => {
    const container = innerRef.current;
    if (!container || !activeId) return;

    const link = container.querySelector<HTMLElement>(
      `[data-section-id="${activeId}"]`,
    );
    if (!link) return;

    // Manually adjust scrollLeft (rather than scrollIntoView) so there is no
    // chance of the page scrolling vertically to bring the strip into view.
    const target =
      link.offsetLeft - container.clientWidth / 2 + link.clientWidth / 2;
    const max = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: 'smooth',
    });
  }, [activeId]);

  return (
    <nav className="reader-section-nav" aria-label="Article sections">
      <div className="reader-section-nav-inner" ref={innerRef}>
        {sections.map((section) =>
          section.locked ? (
            <span
              key={section.id}
              data-section-id={section.id}
              className="reader-section-nav-link reader-section-nav-link--locked"
              aria-disabled="true"
              aria-label={`${section.title} — coming soon`}
              title={`${section.title} — coming soon`}
            >
              <span className="reader-section-nav-num">{section.num}</span>
              {section.shortLabel}
              <span className="reader-section-nav-lock" aria-hidden="true">
                {' '}
                🔒
              </span>
              <span className="reader-section-nav-soon" aria-hidden="true">
                Soon
              </span>
            </span>
          ) : (
            <a
              key={section.id}
              data-section-id={section.id}
              href={`#${section.id}`}
              className={`reader-section-nav-link${activeId === section.id ? ' reader-section-nav-link--active' : ''}`}
              onClick={() => setActiveId(section.id)}
            >
              <span className="reader-section-nav-num">{section.num}</span>
              {section.shortLabel}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
