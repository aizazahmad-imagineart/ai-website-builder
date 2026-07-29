"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";

/** PENDING REAL ASSETS — see chat: each step needs a real Imagine Sites
 * screenshot (chat/prompt panel, customize-via-prompt, live preview,
 * deploy confirmation). `shot` is a placeholder label, not an image path. */
const STEPS: { title: string; body: string; shot: string }[] = [
  {
    title: "Describe your site",
    body: "Just say what you're building — \"a modern portfolio for a photographer\" or \"an online store for handmade candles.\" The AI site generator gets to work.",
    shot: "Chat / prompt screen",
  },
  {
    title: "Customize without code",
    body: "Ask for changes the same way you asked for the first draft. Move a section, swap a color, rewrite a headline — Imagine Sites responds to instructions, not menus.",
    shot: "Customize-via-prompt screen",
  },
  {
    title: "Preview instantly",
    body: "See exactly what visitors will see in a live preview window before anything goes live, and make adjustments as you go.",
    shot: "Live preview window",
  },
  {
    title: "Deploy in one click",
    body: "Deploy your finished site on Vercel with one click. Every site is shareable and production-ready in seconds.",
    shot: "Deploy confirmation screen",
  },
];

/** Tracks which step block is nearest the viewport center — same cheap
 * IntersectionObserver approach as Reveal, just keyed to an index instead
 * of a single boolean. */
function useActiveStep(count: number) {
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

export function HowItWorks() {
  const { active, refs } = useActiveStep(STEPS.length);

  return (
    <section id="how-it-works" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-20">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            How It Works
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            From idea to live website in <span className="font-serif-accent italic font-normal">minutes</span>
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] mt-3.5 mb-0 max-w-[52ch]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            At its core, Imagine Sites is a prompt-based website builder — describe
            what you want in plain English, and the AI handles the layout, the
            copy, and the styling in the background.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-16">
          {/* Steps — normal document flow, each block tall enough to trigger the observer cleanly */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="py-14 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center"
              >
                <span
                  className="font-mono text-[13px] tracking-[0.5px] transition-colors duration-300"
                  style={{ color: active === i ? "var(--color-content-primary)" : "var(--color-content-tertiary)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-sans font-semibold text-content-primary text-[22px] md:text-[26px] mt-3 mb-2.5">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.6] text-content-secondary m-0 max-w-[38ch]">
                  {step.body}
                </p>

                {/* Placeholder follows inline on mobile, since sticky needs the md+ two-column layout */}
                <div className="md:hidden mt-8 rounded-xl border border-dashed border-border-secondary bg-surface-primary aspect-video flex items-center justify-center">
                  <p className="font-mono text-[11px] text-content-tertiary text-center px-4">
                    Pending real asset — {step.shot}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky visual — desktop only, vertically centered in the viewport
              while pinned, scaled up a touch on larger screens */}
          <div className="hidden md:block relative">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full aspect-video rounded-xl border border-dashed border-border-secondary bg-surface-primary overflow-hidden xl:scale-110 2xl:scale-[1.2] transition-transform duration-500 flex items-center justify-center">
                <p className="font-mono text-[12px] text-content-tertiary text-center px-6 transition-opacity duration-300">
                  Pending real asset — {STEPS[active].shot}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
