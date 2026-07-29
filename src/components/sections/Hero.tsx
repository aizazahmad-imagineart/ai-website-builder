"use client";

import { useRef, useState } from "react";
import { ArrowDown, Sparkle, UploadSimple } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedGradientBackground } from "@/components/primitives/AnimatedGradientBackground";
import { ButtonLink } from "@/components/Button";

/**
 * Hero, third iteration — a dark, pinned "brand moment" (giant animated
 * gradient wordmark, grain texture) that a bold one-line statement slides
 * up to cover as the user scrolls, revealing the rest of the page. Adapted
 * from midu.design's hero: a tall pin-wrapper holds a `sticky` hero layer,
 * and the very next section is pulled up by exactly one viewport height
 * (`-mt-[100vh]`) so it starts scrolling in from behind/below the pinned
 * hero instead of just appearing after it — pure CSS, no JS, no scroll
 * listener needed for the overlap itself (unlike the marquee/dial
 * elsewhere on this page, which do need one).
 *
 * The giant "SITES" wordmark is a decorative graphic, not heading text —
 * it's the one deliberate exception to this project's font-semibold-max
 * rule, the same way the italic serif accent word is.
 *
 * Because the hero is dark from the very top now (not just a dark band
 * further down the page), SiteNav's "at top" text/logo/button colors were
 * also switched to their light styling — see SiteNav.tsx.
 *
 * PENDING REAL ASSET — see chat: no product screenshot in this version;
 * the giant wordmark carries the hero instead.
 */

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const generateHref = `https://www.imagine.art/sites${prompt.trim() ? `?prompt=${encodeURIComponent(prompt.trim())}` : ""}`;

  return (
    <>
      {/* Pin wrapper — 100vh taller than the sticky hero, giving it that
          much extra scroll room before it releases. */}
      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none z-10"
            style={{ backgroundImage: NOISE_BG }}
          />

          {/* Giant animated-gradient wordmark, cropped by the section edge */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none"
            style={{ transform: "translateY(28%)" }}
          >
            <span
              className="animate-wordmark-shift font-display font-black leading-none"
              style={{
                fontSize: "26vw",
                backgroundImage:
                  "linear-gradient(120deg, var(--color-accent), var(--color-accent-secondary), #f5f0ff, var(--color-accent))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              SITES
            </span>
          </div>

          {/* Foreground content */}
          <div className="relative z-20 container-page h-full flex flex-col">
            <div className="pt-[130px] md:pt-[150px] flex justify-end">
              <Reveal className="max-w-[440px] text-right">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-[7px] text-[13px] font-medium text-white/60 mb-6">
                  <Sparkle size={14} weight="fill" className="text-accent" />
                  Describe it in plain English. Watch it appear in seconds.
                </span>
                <h1
                  className="font-display font-semibold capitalize leading-[1.1] tracking-[-0.5px] text-white m-0"
                  style={{ fontSize: "clamp(29px, 3.5vw, 46px)" }}
                >
                  The AI Website Builder That Builds Everything
                </h1>

                <div className="mt-6 flex items-center gap-2 rounded-[14px] border border-white/15 bg-white/[0.06] backdrop-blur-md p-2 pl-5 cursor-text" onClick={() => inputRef.current?.focus()}>
                  <UploadSimple size={18} weight="regular" className="text-white/40 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A portfolio for a photographer…"
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[14px] text-white placeholder:text-white/30"
                  />
                  <ButtonLink href={generateHref} size="md" variant="brand" className="shrink-0">
                    Generate
                  </ButtonLink>
                </div>
                <p className="text-[12.5px] text-white/35 mt-4">Free to start. No credit card required.</p>
              </Reveal>
            </div>

            {/* Studio-style meta strip */}
            <div className="mt-auto pb-8 flex items-end justify-between">
              <p className="font-sans text-[13px] text-white/40 m-0">
                AI Website Builder <span className="text-white/20 mx-1.5">·</span> Imagine Computer
              </p>
              <p className="font-sans text-[13px] text-white/40 m-0 flex items-center gap-1.5">
                Scroll to explore <ArrowDown size={13} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statement — slides up to cover the pinned hero as the page
          continues scrolling through the wrapper's extra 100vh. */}
      <section className="relative z-30 -mt-[100vh] min-h-screen bg-[#0a0a0a] rounded-t-[40px] shadow-[0_-40px_80px_rgba(0,0,0,0.5)] flex items-center justify-center px-6 overflow-hidden">
        <AnimatedGradientBackground
          position="50% 100%"
          aspect={[1.7, 0.9]}
          startingSize={70}
          breathingRange={10}
          speed={0.09}
          stops={[0, 30, 85]}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: NOISE_BG }}
        />
        <Reveal className="relative z-10 max-w-[900px] text-center">
          <p
            className="font-display font-semibold leading-[1.15] tracking-[-1px] text-white m-0"
            style={{ fontSize: "clamp(30px, 5.5vw, 68px)" }}
          >
            One prompt. A live website.
          </p>
        </Reveal>
      </section>
    </>
  );
}
