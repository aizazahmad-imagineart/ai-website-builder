"use client";

import { useEffect, useRef, useState } from "react";

/** Tracks which row of a step-through list is nearest the viewport center,
 * for driving a `position: sticky` visual that swaps to match as the user
 * scrolls past each row. Shared by any section using this sticky-step
 * pattern (see UseCasesSection, FeaturesSection). */
export function useActiveRow(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { active, refs };
}
