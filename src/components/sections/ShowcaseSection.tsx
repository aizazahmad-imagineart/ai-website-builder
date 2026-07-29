"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * Real, professionally designed site mockups — user-provided stand-ins
 * (from "webpages placeholder images/") for actual Imagine Sites output,
 * the same way deck.gallery covers stood in for the Presentation Maker's
 * showcase before real generated decks existed. Swap the /public/showcase
 * files for real Imagine Sites screenshots once they exist; until then,
 * these are real designs, never a fabricated CSS mockup.
 *
 * Layout is a loose overlapping fan (rotation + vertical offset per card)
 * rather than a flat grid — deliberately different from the sibling AI
 * Presentation Maker page's clean grid, echoing the tilted card-stack
 * patterns from the reference inspiration folder. Clicking a card opens it
 * larger in a lightbox; clicking the backdrop (or Escape) closes it.
 */
const CARDS = [
  { src: "/showcase/site-01-fuelx.png", rotate: -6, y: 14 },
  { src: "/showcase/site-02-ozon.png", rotate: 3, y: -10 },
  { src: "/showcase/site-03-billieduvalle.png", rotate: -2, y: 20 },
  { src: "/showcase/site-04-poch.png", rotate: 5, y: -6 },
  { src: "/showcase/site-05-janissne.png", rotate: -4, y: 16 },
  { src: "/showcase/site-06-parallel.jpg", rotate: 4, y: -14 },
  { src: "/showcase/site-07-dtxpro.png", rotate: -5, y: 10 },
  { src: "/showcase/site-08-midlifeengineering.png", rotate: 2, y: -18 },
];

export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <section id="showcase" className="border-b border-border-primary bg-[#0a0a0a] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-secondary) 55%, transparent 75%)",
        }}
      />

      <div className="container-page py-20 md:py-28 relative">
        <Reveal className="max-w-[640px] mb-14 md:mb-20">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            Text to Website Builder
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            See what this AI website creator builds
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Browse real sites, dashboards, and games built by people using
            Imagine Sites — a faster way to see what&apos;s possible than
            reading another feature list.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-x-2 gap-y-10 md:gap-x-0 py-6">
          {CARDS.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open larger preview of example site ${i + 1}`}
              className="relative w-[42%] sm:w-[220px] md:-ml-6 first:ml-0 aspect-video rounded-lg overflow-hidden border border-white/15 shadow-[0_20px_48px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
              style={{
                transform: `rotate(${c.rotate}deg) translateY(${c.y}px)`,
                zIndex: i,
              }}
            >
              <Image
                src={c.src}
                alt=""
                fill
                sizes="(min-width: 768px) 220px, 42vw"
                className="object-cover"
              />
            </button>
          ))}
        </Reveal>

        <Reveal delay={80} className="mt-10 flex justify-center">
          <a
            href="https://www.imagine.art/sites"
            className="font-sans text-[14px] font-medium text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
          >
            More samples →
          </a>
        </Reveal>
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Example site ${activeIndex + 1} preview`}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 md:p-16"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close preview"
            className="absolute top-5 right-5 md:top-8 md:right-8 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[960px] aspect-video rounded-xl overflow-hidden border border-white/15 bg-[#111]"
          >
            <Image
              src={CARDS[activeIndex].src}
              alt=""
              fill
              sizes="960px"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
