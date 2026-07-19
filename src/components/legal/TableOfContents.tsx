"use client";

import { useEffect, useState, useRef } from "react";
import { PRIVACY_SECTIONS } from "@/data/privacy-policy";
import { cn } from "@/lib/utils";

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    });

    PRIVACY_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-6"
    >
      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 px-3">
        Table of Contents
      </h2>
      <ul className="space-y-1 relative border-l border-zinc-200 dark:border-zinc-800 ml-3">
        {PRIVACY_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className="relative group">
              {isActive && (
                <div className="absolute -left-px top-0 bottom-0 w-[2px] bg-zinc-900 dark:bg-zinc-100 transition-all duration-300" />
              )}
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={cn(
                  "block py-2 px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:text-zinc-950 dark:focus:text-white rounded-r-md",
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {section.title.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
