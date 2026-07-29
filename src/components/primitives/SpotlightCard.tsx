"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Wraps a card with a thin gradient ring that only lights up near the
 * cursor on hover — the glow tracks the pointer via CSS custom properties
 * rather than JS-driven layout, so it stays cheap on large grids.
 */
export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(255,255,255,0.9)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} className={`group relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          padding: 1,
          background: `radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glow}, rgba(255,255,255,0.35) 38%, transparent 68%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
