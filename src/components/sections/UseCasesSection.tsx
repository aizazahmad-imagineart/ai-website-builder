"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Megaphone,
  IdentificationCard,
  SquaresFour,
  GameController,
  Storefront,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { BUILD_TYPES, type BuildType } from "@/lib/data/buildTypes";

/**
 * Use Cases now carries the heavier visual treatment on this page — a
 * variety of real output examples benefits from the extra room a pinned
 * sticky visual gives it, unlike How It Works' simple 3-4 step journey
 * (see HowItWorks.tsx, now the plain numbered grid instead). Same
 * sticky-step-through pattern as this project's other sibling pages:
 * IntersectionObserver tracks which row is nearest the viewport center,
 * a `position: sticky` column on the right swaps to match.
 *
 * PENDING REAL ASSETS — see chat: no per-persona output screenshots exist
 * yet, so the sticky visual shows each persona's own icon large instead of
 * a fabricated mockup, with an explicit "pending" label.
 */
const ICON_COMPONENTS: Record<BuildType["icon"], ComponentType<{ size?: number; weight?: "regular" | "fill" }>> = {
  marketing: Megaphone,
  portfolio: IdentificationCard,
  dashboard: SquaresFour,
  games: GameController,
  store: Storefront,
};

function useActiveRow(count: number) {
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

export function UseCasesSection() {
  const { active, refs } = useActiveRow(BUILD_TYPES.length);
  const ActiveIcon = ICON_COMPONENTS[BUILD_TYPES[active].icon];

  return (
    <section id="use-cases" className="border-b border-border-primary bg-[#0a0a0a] relative">
      {/* No overflow-hidden here — this section holds a `position: sticky`
          child (the pinned visual), and an ancestor with any overflow other
          than visible breaks sticky positioning for descendants. The dot-grid
          background below is sized exactly to the section via `inset-0`, so
          it doesn't need clipping to stay contained. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-page relative py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            Use Cases
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            What you can <span className="font-serif-accent italic font-normal">build</span> with this website creator
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Flexible enough for founders, marketers, designers, and hobbyists
            alike.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-16">
          {/* Rows — normal document flow, each tall enough to trigger the observer cleanly */}
          <div className="flex flex-col">
            {BUILD_TYPES.map((bt, i) => {
              const Icon = ICON_COMPONENTS[bt.icon];
              return (
                <div
                  key={bt.title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="py-12 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center"
                >
                  <span
                    className="font-mono text-[13px] tracking-[0.5px] transition-colors duration-300"
                    style={{ color: active === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex items-center gap-3 mt-3 mb-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] text-white shrink-0">
                      <Icon size={18} weight="regular" />
                    </span>
                    <h3 className="font-sans font-semibold text-white text-[20px] md:text-[24px]">{bt.title}</h3>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.6] text-white/55 m-0 max-w-[42ch]">{bt.body}</p>

                  {/* Placeholder follows inline on mobile, since sticky needs the md+ two-column layout */}
                  <div className="md:hidden mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.03] aspect-video flex flex-col items-center justify-center gap-3">
                    <Icon size={40} weight="regular" />
                    <p className="font-mono text-[11px] text-white/30 text-center px-4">
                      Pending real asset — {bt.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky visual — desktop only, vertically centered in the viewport
              while pinned, swapping icon + label as the active row changes */}
          <div className="hidden md:block relative">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full aspect-video rounded-xl border border-dashed border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center gap-4 text-white/30 transition-colors duration-500">
                <ActiveIcon size={56} weight="regular" />
                <p className="font-mono text-[12px] text-center px-6 transition-opacity duration-300">
                  Pending real asset — {BUILD_TYPES[active].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
