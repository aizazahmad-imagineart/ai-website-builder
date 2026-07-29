"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkle, UploadSimple } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedGradientBackground } from "@/components/primitives/AnimatedGradientBackground";
import { ButtonLink } from "@/components/Button";

/** Example prompts cycled as an animated typed hint inside the (empty)
 * input — every competitor in this space leads with a prompt box, so it
 * needs to demonstrate what it does, not just wait passively. Only ever
 * feeds the native `placeholder` attribute — never overlaid on top of real
 * typed input — so it disappears the instant the user starts typing. */
const PROMPT_EXAMPLES = [
  "A portfolio for a photographer…",
  "An online store for handmade candles…",
  "A landing page for a fitness coach…",
  "A dashboard to track my expenses…",
];

function useTypedHint(examples: string[], enabled: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(examples[0]);
      return;
    }

    let cancelled = false;
    let exampleIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = (charIndex: number) => {
      if (cancelled) return;
      const full = examples[exampleIndex];
      if (charIndex <= full.length) {
        setText(`${full.slice(0, charIndex)}▍`);
        timeoutId = setTimeout(() => type(charIndex + 1), 38);
      } else {
        timeoutId = setTimeout(() => erase(full.length), 1600);
      }
    };
    const erase = (charIndex: number) => {
      if (cancelled) return;
      if (charIndex >= 0) {
        setText(`${examples[exampleIndex].slice(0, charIndex)}▍`);
        timeoutId = setTimeout(() => erase(charIndex - 1), 22);
      } else {
        exampleIndex = (exampleIndex + 1) % examples.length;
        timeoutId = setTimeout(() => type(0), 300);
      }
    };
    timeoutId = setTimeout(() => type(0), 500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [examples, enabled]);

  return enabled ? text : "";
}

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
  const typedHint = useTypedHint(PROMPT_EXAMPLES, prompt.length === 0);

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

          {/* Giant animated-gradient wordmark, cropped by the section edge —
              kept small and low so the centered prompt box (this domain's
              highest-attention element) carries the hero, not the wordmark. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none"
            style={{ transform: "translateY(42%)" }}
          >
            <span
              className="animate-wordmark-shift font-display font-black leading-none"
              style={{
                fontSize: "16vw",
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
          <div className="relative z-20 container-page h-full flex flex-col pt-[100px] md:pt-[120px] pb-8">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Reveal className="w-full max-w-[620px] flex flex-col items-center">
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

                <div
                  className="mt-8 w-full flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-3 pl-6 cursor-text transition-colors focus-within:border-white/35"
                  onClick={() => inputRef.current?.focus()}
                >
                  <UploadSimple size={19} weight="regular" className="text-white/40 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={typedHint || "Describe the site you want to build…"}
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] text-white placeholder:text-white/35"
                  />
                  <ButtonLink href={generateHref} size="md" variant="brand" className="shrink-0">
                    Generate
                  </ButtonLink>
                </div>
                <p className="text-[12.5px] text-white/35 mt-4">Free to start. No credit card required.</p>
              </Reveal>
            </div>

            {/* Studio-style meta strip */}
            <div className="flex items-end justify-between">
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
