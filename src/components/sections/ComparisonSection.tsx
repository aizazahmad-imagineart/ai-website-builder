"use client";

import { Reveal } from "@/components/primitives/Reveal";

/**
 * "Old Way vs New Way" comparison — ported from the shared Guidelines kit's
 * ComparisonSection.tsx. Monochrome by design: the positive ("With") column
 * uses a solid near-black check chip, the negative column stays neutral —
 * state is carried by icon shape alone, never by color (see GUIDELINES.md §8).
 */

const WITHOUT: string[] = [
  "Brief a developer or designer, then wait",
  "Juggle a page builder, a CMS, and a hosting dashboard separately",
  "Re-explain every small change",
  "Guess whether the site is even indexable",
];

const WITH: string[] = [
  "Describe the site once, in your own words",
  "Get code, backend, preview, and deploy in the same place",
  "Ask for a change and watch it happen",
  "SEO-ready structure from the first generation",
];

function XMark() {
  return (
    <span className="shrink-0 mt-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-black/[0.05] text-content-tertiary">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span className="shrink-0 mt-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-content-primary text-white">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function Column({
  label,
  note,
  items,
  positive = false,
  delay = 0,
}: {
  label: string;
  note: string;
  items: string[];
  positive?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={[
          "h-full flex flex-col gap-6 rounded-3xl p-7 md:p-9",
          "border border-border-primary bg-white/60 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_2px_16px_rgba(0,0,0,0.045)]",
          "transition-[transform,box-shadow] duration-300 ease-out",
          "hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]",
          positive ? "bg-white/70" : "",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1.5 pb-5 border-b border-border-primary">
          <span
            className="font-sans font-semibold text-content-primary"
            style={{ fontSize: "clamp(17px, 1.6vw, 20px)" }}
          >
            {label}
          </span>
          <span className="font-sans italic text-[13.5px] text-content-tertiary">
            {note}
          </span>
        </div>

        <ul className="flex flex-col gap-4 m-0 p-0 list-none">
          {items.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 font-sans text-[15px] leading-[1.5] text-content-secondary"
            >
              {positive ? <CheckMark /> : <XMark />}
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function ComparisonSection() {
  return (
    <section id="old-vs-new" className="border-b border-border-primary bg-surface-primary">
      <div className="container-page">
        <div className="py-16 md:py-24">
          <Reveal className="max-w-[720px] mb-12 md:mb-16">
            <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
              Old Way vs. New Way
            </p>
            <h2
              className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              The Old Way vs. Imagine Sites
            </h2>
            <p
              className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0"
              style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
            >
              Building a site used to mean juggling tools and waiting on
              someone else&apos;s calendar. Imagine Sites replaces all of it
              with one prompt-based workflow.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            <Column
              label="Without Imagine Sites"
              note="Juggling tools, days of waiting"
              items={WITHOUT}
              delay={0}
            />
            <Column
              label="With Imagine Sites"
              note="One workspace, minutes"
              items={WITH}
              positive
              delay={80}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
