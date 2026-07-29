"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { BracketsCurly } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * "Old Way vs New Way" — a single card that morphs from the "before" state
 * to the "after" state as the user scrolls through it. A liquid-glass dial
 * turns continuously with scroll progress along a visible arc track, then
 * holds its final position once the card has flipped — that flip happens
 * at THRESHOLD (not the midpoint) so the "after" state gets most of the
 * scroll dwell time instead of being scrolled past immediately. Each list
 * row reveals in a stepwise cascade (per-item transition-delay) the moment
 * its layer becomes active.
 *
 * Adapted from a reference "FintechX" template the user shared — kept the
 * dial mechanic, dropped the fabricated stat numbers (68%, 3X Faster, etc.)
 * since we have no real data to back those for Imagine Sites, and kept
 * X/check icon shape (not red/green) as the state signal, per this
 * project's monochrome-plus-one-accent rule (see GUIDELINES.md §8).
 *
 * Everything is driven by direct ref/classList mutation inside a single
 * scroll handler — no React state, no re-renders per frame — the same
 * pattern as the Hero's scroll-linked effects elsewhere on this page.
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

const CARD_LIGHT = "bg-surface-primary";
const CARD_DARK = "bg-[#0d0d0d]";
const LABEL_ACTIVE = "text-content-primary";
const LABEL_INACTIVE = "text-content-tertiary";

// The flip happens at 35% through the scroll track (not 50%) so the "after"
// state — the payoff — gets ~65% of the dwell time instead of being
// scrolled past the moment it appears.
const THRESHOLD = 0.35;
const KNOB_R = 66;
const KNOB_BOX = KNOB_R * 2 + 24;
const ARC_DEG = 150;
const ARC_CIRC = 2 * Math.PI * KNOB_R;
const ARC_LEN = (ARC_DEG / 360) * ARC_CIRC;

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
    <span className="shrink-0 mt-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-accent text-white">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

/** Each row starts hidden + shifted down; JS only ever flips the two
 * "hidden" classes off/on, but every row has its own transitionDelay set at
 * render time, so the shared class flip cascades into a stepwise reveal. */
function Row({
  children,
  index,
  icon,
  textClass,
}: {
  children: string;
  index: number;
  icon: React.ReactNode;
  textClass: string;
}) {
  return (
    <li
      className="comparison-row flex items-start gap-3 font-sans text-[15px] leading-[1.5] opacity-0 translate-y-2 transition-all duration-500 ease-out"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {icon}
      <span className={textClass}>{children}</span>
    </li>
  );
}

export function ComparisonSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const knobAccentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardGlowRef = useRef<HTMLDivElement>(null);
  const beforeLabelRef = useRef<HTMLSpanElement>(null);
  const afterLabelRef = useRef<HTMLSpanElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const afterLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setActive = (isAfter: boolean) => {
      knobAccentRef.current?.classList.toggle("opacity-0", !isAfter);
      cardRef.current?.classList.toggle(CARD_DARK, isAfter);
      cardRef.current?.classList.toggle(CARD_LIGHT, !isAfter);
      cardGlowRef.current?.classList.toggle("opacity-0", !isAfter);
      beforeLabelRef.current?.classList.toggle(LABEL_ACTIVE, !isAfter);
      beforeLabelRef.current?.classList.toggle(LABEL_INACTIVE, isAfter);
      afterLabelRef.current?.classList.toggle(LABEL_ACTIVE, isAfter);
      afterLabelRef.current?.classList.toggle(LABEL_INACTIVE, !isAfter);
      beforeLayerRef.current?.classList.toggle("opacity-0", isAfter);
      afterLayerRef.current?.classList.toggle("opacity-0", !isAfter);

      const activeRows = (isAfter ? afterLayerRef : beforeLayerRef).current?.querySelectorAll(".comparison-row");
      const inactiveRows = (isAfter ? beforeLayerRef : afterLayerRef).current?.querySelectorAll(".comparison-row");
      activeRows?.forEach((row) => {
        row.classList.remove("opacity-0", "translate-y-2");
      });
      inactiveRows?.forEach((row) => {
        row.classList.add("opacity-0", "translate-y-2");
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (knobRef.current) knobRef.current.style.transform = "rotate(55deg)";
      setActive(true);
      return;
    }

    // Reveal the initial "before" rows immediately — the change-detection
    // guard below only fires setActive on an actual flip, so without this
    // the very first (matching) state would never get its rows un-hidden.
    setActive(false);

    let frame = 0;
    let wasAfter = false;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const vh = window.innerHeight;
        const total = track.offsetHeight - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total);
        const p = scrolled / total; // 0 -> 1 across the pinned distance

        // Dial turns over the first THRESHOLD of the scroll, then holds.
        const turnP = Math.min(p / THRESHOLD, 1);
        if (knobRef.current) {
          knobRef.current.style.transform = `rotate(${-55 + 110 * turnP}deg)`;
        }

        const isAfter = p >= THRESHOLD;
        if (isAfter !== wasAfter) {
          wasAfter = isAfter;
          setActive(isAfter);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="old-vs-new" className="border-b border-border-primary">
      <div className="container-page">
        <div className="pt-16 md:pt-24">
          <Reveal className="max-w-[720px] mb-4">
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
              someone else&apos;s calendar. Scroll to see what changes with
              Imagine Sites.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll-linked morph: pinned for one viewport height while this
          (long) track scrolls by, giving plenty of dwell time in the
          "after" state before the section releases. */}
      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-[640px] mx-auto px-5 md:px-0">
            {/* Before / dial / After */}
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
              <span ref={beforeLabelRef} className={`font-sans text-[14px] md:text-[15px] font-medium transition-colors duration-500 ${LABEL_ACTIVE}`}>
                Before Imagine Sites
              </span>

              <div className="relative shrink-0" style={{ width: KNOB_BOX, height: KNOB_BOX }}>
                {/* Visible arc track the pointer sweeps along */}
                <svg
                  aria-hidden="true"
                  width={KNOB_BOX}
                  height={KNOB_BOX}
                  viewBox={`0 0 ${KNOB_BOX} ${KNOB_BOX}`}
                  className="absolute inset-0"
                  style={{ transform: "rotate(-165deg)" }}
                >
                  <circle
                    cx={KNOB_BOX / 2}
                    cy={KNOB_BOX / 2}
                    r={KNOB_R}
                    fill="none"
                    stroke="var(--color-border-secondary)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray={`${ARC_LEN} ${ARC_CIRC - ARC_LEN}`}
                  />
                </svg>

                {/* The dial itself — liquid glass, rotates continuously */}
                <div
                  ref={knobRef}
                  className="absolute rounded-full shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                  style={{
                    width: KNOB_R * 1.15,
                    height: KNOB_R * 1.15,
                    left: "50%",
                    top: "50%",
                    marginLeft: -(KNOB_R * 1.15) / 2,
                    marginTop: -(KNOB_R * 1.15) / 2,
                    transform: "rotate(-55deg)",
                  }}
                >
                  {/* Needle */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 rounded-full bg-content-tertiary"
                    style={{ width: 3, height: KNOB_R * 0.62, transform: "translate(-50%, -100%)" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 rounded-full bg-content-secondary"
                    style={{ width: 6, height: 6, top: `calc(50% - ${KNOB_R * 0.62}px - 3px)`, transform: "translateX(-50%)" }}
                  />

                  {/* Glass base — visible border, frosted, subtle sheen */}
                  <div className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-xl backdrop-saturate-150 border-2 border-border-secondary" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-[3px] rounded-full opacity-70"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9), transparent 60%)" }}
                  />

                  {/* "Before" icon — curly braces, fades out */}
                  <div className="absolute inset-0 rounded-full flex items-center justify-center">
                    <BracketsCurly size={KNOB_R * 0.5} weight="bold" className="text-content-secondary" />
                  </div>

                  {/* "After" icon — Imagine logo on the accent-gradient glass, fades in */}
                  <div
                    ref={knobAccentRef}
                    className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-500 border-2 border-white/40"
                    style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))" }}
                  >
                    <img src="/footer/logo-icon.svg" alt="" aria-hidden="true" style={{ width: KNOB_R * 0.42, height: KNOB_R * 0.42 }} />
                  </div>
                </div>
              </div>

              <span ref={afterLabelRef} className={`font-sans text-[14px] md:text-[15px] font-medium transition-colors duration-500 ${LABEL_INACTIVE}`}>
                After Imagine Sites
              </span>
            </div>

            {/* The morphing card — two content layers stacked in the same
                grid cell, crossfading opacity as the background swaps. */}
            <div ref={cardRef} className={`relative overflow-hidden rounded-3xl border border-border-primary p-8 md:p-10 transition-colors duration-500 ${CARD_LIGHT}`}>
              {/* After-state accent glow — emphasizes the "better" state
                  instead of leaving the dark card flat. */}
              <div
                ref={cardGlowRef}
                aria-hidden="true"
                className="absolute -right-16 -bottom-16 w-[320px] h-[320px] rounded-full blur-[90px] opacity-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-secondary) 55%, transparent 75%)",
                }}
              />

              <div className="relative grid">
                <div ref={beforeLayerRef} className="col-start-1 row-start-1 transition-opacity duration-500">
                  <h3 className="font-sans font-semibold text-content-primary text-[20px] md:text-[24px] mb-1">
                    Without Imagine Sites
                  </h3>
                  <p className="font-sans italic text-[13.5px] text-content-tertiary mb-6">
                    Juggling tools, days of waiting
                  </p>
                  <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                    {WITHOUT.map((t, i) => (
                      <Row key={t} index={i} icon={<XMark />} textClass="text-content-secondary">
                        {t}
                      </Row>
                    ))}
                  </ul>
                </div>

                <div ref={afterLayerRef} className="col-start-1 row-start-1 opacity-0 transition-opacity duration-500">
                  <h3 className="font-sans font-semibold text-white text-[20px] md:text-[24px] mb-1">
                    With Imagine Sites
                  </h3>
                  <p className="font-sans italic text-[13.5px] text-white/50 mb-6">
                    One workspace, minutes
                  </p>
                  <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                    {WITH.map((t, i) => (
                      <Row key={t} index={i} icon={<CheckMark />} textClass="text-white/70">
                        {t}
                      </Row>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
