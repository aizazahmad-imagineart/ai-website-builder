"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Sparkle, UploadSimple } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

const MARQUEE_CARDS = ["Chat / prompt", "Customize", "Live preview", "Code viewer", "Deploy"];
const MAX_SCALE = 1.22;
const FALLOFF_PX = 260;

/** A lightweight rAF loop that reads each card's live screen position every
 * frame and scales up whichever one is nearest the row's horizontal center.
 * The CSS marquee animation owns `translateX` on the track; this only ever
 * writes `transform: scale()` on the individual cards, so the two never
 * fight over the same property on the same element. */
function useCenterScale(trackRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const tick = () => {
      const track = trackRef.current;
      const container = track?.parentElement;
      if (track && container) {
        const centerX = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        for (const card of Array.from(track.children) as HTMLElement[]) {
          const rect = card.getBoundingClientRect();
          const dist = Math.abs(rect.left + rect.width / 2 - centerX);
          const scale = 1 + (MAX_SCALE - 1) * Math.max(0, 1 - dist / FALLOFF_PX);
          card.style.transform = `scale(${scale})`;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [trackRef]);
}

/** A card row that drifts slowly right-to-left forever (the existing
 * `.animate-marquee` CSS keyframe, just slowed down), pinned to the bottom
 * of the hero's viewport-height area. Whichever card is nearest center
 * scales up as it drifts through, and both edges fade to white — plain
 * gradient divs, not `mask-image` (see pitfalls.md: masking this exact kind
 * of element previously caused a headless-screenshot compositing bug).
 * This page's signature visual — deliberately different from the sibling
 * AI Presentation Maker page's scroll-linked screenshot zoom, and from an
 * earlier static-fan / spinning-orbit version of this same section.
 * PENDING REAL ASSET — see chat: each slot is an honest placeholder for a
 * real Imagine Sites screen, not a fabricated mockup. */
function HeroMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  useCenterScale(trackRef);

  return (
    <div className="hidden lg:block relative w-full overflow-hidden py-6">
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[900px] h-[260px] blur-[90px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, var(--color-accent) 0%, var(--color-accent-secondary) 55%, transparent 75%)",
        }}
      />

      <div
        ref={trackRef}
        className="flex items-center gap-6 w-max animate-marquee"
        style={{ animationDuration: "40s" }}
      >
        {[...MARQUEE_CARDS, ...MARQUEE_CARDS].map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="w-[260px] aspect-video shrink-0 rounded-xl border border-border-secondary bg-white shadow-[0_20px_48px_rgba(0,0,0,0.1)] flex items-center justify-center"
          >
            <p className="font-mono text-[10px] text-content-tertiary text-center px-3">
              Pending real asset — {label}
            </p>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
}

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const generateHref = `https://www.imagine.art/sites${prompt.trim() ? `?prompt=${encodeURIComponent(prompt.trim())}` : ""}`;

  return (
    <section className="relative border-b border-border-primary overflow-hidden lg:min-h-screen lg:flex lg:flex-col">
      <div className="container-page pt-[120px] pb-4 md:pt-[144px] md:pb-6">
        {/* Signature accent sparkles — this page's violet, distinct from
            the sibling Presentation Maker page's orange. */}
        <Sparkle
          size={46}
          weight="fill"
          className="hidden lg:block absolute left-[16%] top-[18%] rotate-[-12deg] text-accent"
        />
        <Sparkle
          size={22}
          weight="fill"
          className="hidden lg:block absolute right-[18%] top-[30%] rotate-[10deg] opacity-70 text-accent"
        />

        <Reveal className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-[7px] text-[13px] font-medium text-content-secondary mb-7">
            <Sparkle size={14} weight="fill" className="text-content-primary" />
            Describe it in plain English. Watch it appear in seconds.
          </span>

          <h1
            className="font-display font-semibold capitalize leading-[1.04] tracking-[-1.5px] text-content-primary m-0"
            style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
          >
            The AI Website Builder That Builds{" "}
            <span className="font-serif-accent italic font-normal normal-case tracking-normal">Everything</span>
          </h1>

          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] max-w-[540px] mt-5" style={{ fontSize: "clamp(16px, 1.6vw, 19px)" }}>
            Type what you want, and Imagine Computer&apos;s AI website builder turns it into a
            real, working site — no code required.
          </p>

          <p className="text-[13px] text-content-tertiary mt-5">Free to start. No credit card required.</p>
        </Reveal>

        {/* Try-it input bar */}
        <Reveal delay={100} className="max-w-[600px] mx-auto mt-8">
          <div
            className="flex items-center gap-2 rounded-[14px] border border-border-secondary bg-white p-2 pl-5 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <UploadSimple size={18} weight="regular" className="text-content-tertiary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A modern portfolio for a photographer, an online store for handmade candles…"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] text-content-primary placeholder:text-content-tertiary"
            />
            <ButtonLink href={generateHref} size="md" variant="brand" className="shrink-0">
              Generate
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      {/* Pinned to the bottom of the hero's viewport-height area */}
      <div className="hidden lg:block mt-auto">
        <HeroMarquee />
      </div>

      {/* Mobile / tablet fallback — no marquee, just one honest placeholder */}
      <div className="lg:hidden container-page pb-16">
        <div className="rounded-2xl border border-dashed border-border-secondary bg-surface-primary aspect-video flex items-center justify-center">
          <p className="font-mono text-[12px] text-content-tertiary text-center px-6">
            Pending real asset — Imagine Sites chat + live preview screenshot
          </p>
        </div>
      </div>
    </section>
  );
}
