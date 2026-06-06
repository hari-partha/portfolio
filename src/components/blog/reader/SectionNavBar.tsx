'use client';

import { useEffect, useState } from 'react';
import type { ReaderSectionNavItem } from './types';

type SectionNavBarProps = {
  sections: ReaderSectionNavItem[];
};

export function SectionNavBar({ sections }: SectionNavBarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
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

  return (
    <nav className="reader-section-nav" aria-label="Article sections">
      <div className="reader-section-nav-inner">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`reader-section-nav-link${activeId === section.id ? ' reader-section-nav-link--active' : ''}`}
            onClick={() => setActiveId(section.id)}
          >
            <span className="reader-section-nav-num">{section.num}</span>
            {section.shortLabel}
          </a>
        ))}
      </div>
    </nav>
  );
}
