"use client";

import { Reveal } from "@/components/primitives/Reveal";

/**
 * ComparisonSection — an "Old vs New" / "Without vs With" two-column comparison.
 *
 * Design-kit rules applied (see GUIDELINES.md):
 * - Eyebrow + Title-Case H2 + body is the standard section-header rhythm.
 * - This site is monochrome (no colored accent). The positive ("With") column
 *   uses a solid near-black check chip (`content-primary`); the negative column
 *   stays neutral (opacity-on-black). No hues, no green/red for good/bad —
 *   state is carried by the icon shape alone.
 * - Weights top out at `font-semibold` (600). No bold.
 * - Glass is expressed with opacity-on-white + backdrop-blur, a hairline
 *   `border-border-primary`, and a soft low-opacity shadow.
 * - Cards are equal height (grid `items-stretch` + `h-full`).
 *
 * Content is inlined below so the component is self-contained; lift the two
 * arrays out to `@/lib/data/*` if you prefer to share them.
 */

const WITHOUT: string[] = [
  "A separate app for every task: one for docs, one for slides, one for images, one for video",
  "Manually research a topic and track down sources before you can even start writing",
  "Copy-paste between five tabs to pull a deck or a resume together",
  "Re-explain your brand and context to every new tool",
  "Re-upload the same brief or assets to every app",
  "No way to automate any of it",
];

const WITH: string[] = [
  "One prompt, and Computer plans the steps for you",
  "Deep Research finds and cites sources automatically",
  "Docs, slides, resumes, images, video, music and your website, all built in the same workspace",
  "Remembers your brand, your project and your past work",
  "One brief in, every asset out",
  "Schedule it to run again, automatically",
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
    <section id="workflow" className="border-t border-border-primary bg-background">
      <div className="container-page">
        <div className="py-16 md:py-24">
          {/* Eyebrow + Title-Case heading + body */}
          <Reveal className="max-w-[720px] mb-12 md:mb-16">
            <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
              Old vs New
            </p>
            <h2
              className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              You Shouldn&apos;t Need A Dozen Tools When You Have One AI Computer
            </h2>
            <p
              className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0"
              style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
            >
              Juggling tools and switching tabs is a thing of the past. Imagine
              Computer replaces the traditional workflow with a single AI
              workspace where every tool lives together.
            </p>
          </Reveal>

          {/* Two equal-height comparison columns */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            <Column
              label="Without Imagine Computer"
              note="Juggling tools, 30+ minutes"
              items={WITHOUT}
              delay={0}
            />
            <Column
              label="With Imagine Computer"
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
