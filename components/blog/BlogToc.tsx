"use client";

import { useEffect, useState } from "react";

type Section = { id: string; heading: string };

type Props = {
  sections: Section[];
  heading: string;
};

export function BlogToc({ sections, heading }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 xl:sticky xl:top-24 xl:h-fit">
      <p className="mb-3 text-sm font-semibold text-white/85">{heading}</p>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block border-l-2 pl-3 transition ${
                  isActive
                    ? "border-brand font-medium text-brand"
                    : "border-transparent text-white/70 hover:text-brand"
                }`}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
