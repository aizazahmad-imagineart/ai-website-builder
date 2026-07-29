"use client";

import { useEffect, useRef } from "react";

/**
 * A softly "breathing" radial gradient — continuously pulsing in size via a
 * `requestAnimationFrame` loop that only ever touches this one div's own
 * `background` style directly (no React state, no re-renders). Adapted
 * from a framer-motion-based reference component into this project's
 * existing plain-CSS-effect convention (the same pattern as the Hero
 * marquee's center-scale and the old-vs-new dial elsewhere on this page) —
 * this project has no shadcn/ui setup and avoids animation-library
 * dependencies by design, so framer-motion wasn't added just for this.
 * Colors default to this page's own violet/teal accent duo, not the
 * reference's multi-hue rainbow.
 *
 * Entrance: stays invisible (opacity-0, offset down) until an
 * IntersectionObserver reports the element has scrolled into view, then
 * fades/rises in and only then starts the breathing loop — so it "arrives"
 * from the bottom rather than being visible from first paint.
 *
 * `aspect` stretches the gradient into an ellipse ([scaleX, scaleY] applied
 * to `size`) so it can hug a wide bottom edge without reaching as tall.
 */
export function AnimatedGradientBackground({
  className = "",
  colors = ["var(--color-accent)", "var(--color-accent-secondary)", "#0a0a0a"],
  stops = [0, 35, 72],
  position = "50% 20%",
  aspect = [1, 1],
  startingSize = 120,
  breathingRange = 14,
  speed = 0.035,
}: {
  className?: string;
  colors?: string[];
  stops?: number[];
  position?: string;
  aspect?: [number, number];
  startingSize?: number;
  breathingRange?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const stopsString = stops.map((s, i) => `${colors[i]} ${s}%`).join(", ");
    const [aspectX, aspectY] = aspect;
    const paint = (size: number) => {
      node.style.background = `radial-gradient(ellipse ${size * aspectX}% ${size * aspectY}% at ${position}, ${stopsString})`;
    };
    paint(startingSize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const reveal = () => {
      node.classList.remove("opacity-0", "translate-y-16");
      node.classList.add("opacity-100", "translate-y-0");
      if (reduceMotion) return;

      let size = startingSize;
      let direction = 1;
      const tick = () => {
        if (size >= startingSize + breathingRange) direction = -1;
        if (size <= startingSize - breathingRange) direction = 1;
        size += direction * speed;
        paint(size);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [colors, stops, position, aspect, startingSize, breathingRange, speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none opacity-0 translate-y-16 transition-all duration-[1400ms] ease-out ${className}`}
    />
  );
}
