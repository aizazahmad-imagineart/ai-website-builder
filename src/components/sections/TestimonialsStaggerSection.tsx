"use client";

import { useEffect, useMemo, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { TESTIMONIALS, type Testimonial } from "@/lib/data/testimonials";

/**
 * Overlapping, slightly-rotated card deck — ported as-is from the sibling
 * AI Presentation Maker project's final testimonials pattern. Cards are
 * keyed by a stable slot index into a fixed, tripled testimonials array —
 * never regenerated — so moving the active index just recomputes each
 * card's `position` and CSS transitions the existing DOM node to its new
 * spot, instead of instantly swapping content in place.
 */

const SQRT_5000 = Math.sqrt(5000);
const LOOPS = 3;
const TRANSITION_MS = 500;

function Card({
  testimonial,
  position,
  size,
  onSelect,
}: {
  testimonial: Testimonial;
  position: number;
  size: number;
  onSelect: () => void;
}) {
  const active = position === 0;

  return (
    <div
      onClick={active ? undefined : onSelect}
      className={`absolute left-1/2 top-1/2 border p-8 transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active
          ? "z-10 bg-content-primary border-content-primary"
          : "z-0 bg-white border-border-primary cursor-pointer hover:border-border-secondary hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      }`}
      style={{
        width: size,
        minHeight: size,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(size / 1.5) * position}px)
          translateY(${active ? -65 : position % 2 ? 15 : -15}px)
          rotate(${active ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: active ? "0px 8px 0px 4px rgba(0,0,0,0.1)" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className={`absolute block origin-top-right rotate-45 ${active ? "bg-white/25" : "bg-border-secondary"}`}
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full font-mono text-[13px] font-semibold ${
          active ? "bg-white/15 text-white" : "bg-black/[0.05] text-content-primary"
        }`}
      >
        {testimonial.name.charAt(0)}
      </div>

      <p className={`font-sans text-[15px] sm:text-[16px] leading-[1.55] font-medium m-0 ${active ? "text-white" : "text-content-primary"}`}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <p className={`mt-4 text-[13px] m-0 ${active ? "text-white/70" : "text-content-tertiary"}`}>
        {testimonial.name} — {testimonial.role}
      </p>
    </div>
  );
}

export function TestimonialsStaggerSection() {
  const loopLen = TESTIMONIALS.length;
  const list = useMemo(
    () => Array.from({ length: LOOPS * loopLen }, (_, i) => TESTIMONIALS[i % loopLen]),
    [loopLen],
  );

  const [cardSize, setCardSize] = useState(340);
  const [stageHeight, setStageHeight] = useState(480);
  const [index, setIndex] = useState(loopLen);
  const [smooth, setSmooth] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const isDesktop = window.matchMedia("(min-width: 640px)").matches;
      setCardSize(isDesktop ? 340 : 280);
      setStageHeight(isDesktop ? 480 : 420);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const goTo = (target: number) => {
    if (isAnimating || target === index) return;
    setSmooth(true);
    setIsAnimating(true);
    setIndex(target);
  };

  const move = (dir: number) => goTo(index + dir);

  // A fixed timeout (matched to the transition duration) instead of a
  // transitionend listener: with every card animating its own transform
  // independently (rather than one shared track), listening on a common
  // ancestor means the event bubbles once per card and fires this handler
  // many times over per move — a timeout only ever fires once.
  useEffect(() => {
    if (!smooth) return;
    const t = setTimeout(() => {
      setIndex((current) => {
        if (current >= loopLen * 2) {
          setSmooth(false);
          return current - loopLen;
        }
        if (current < loopLen) {
          setSmooth(false);
          return current + loopLen;
        }
        return current;
      });
      setIsAnimating(false);
    }, TRANSITION_MS + 20);
    return () => clearTimeout(t);
  }, [index, smooth, loopLen]);

  useEffect(() => {
    if (!smooth) {
      const id = requestAnimationFrame(() => setSmooth(true));
      return () => cancelAnimationFrame(id);
    }
  }, [smooth]);

  return (
    <section id="testimonials" className="border-b border-border-primary pb-16 md:pb-20">
      <div className="container-page pt-20 md:pt-28 pb-10">
        <div className="max-w-[640px]">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Testimonials
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            What people are building
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Real feedback from the kinds of builders this is made for — small
            business owners, designers, marketers, engineers, students, and
            founders alike.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-x-hidden" style={{ height: stageHeight }}>
        {list.map((t, i) => (
          <Card
            key={i}
            testimonial={t}
            position={i - index}
            size={cardSize}
            onSelect={() => goTo(i)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => move(-1)}
          disabled={isAnimating}
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border-primary bg-white text-content-primary transition-colors hover:bg-content-primary hover:text-white disabled:opacity-40"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          onClick={() => move(1)}
          disabled={isAnimating}
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border-primary bg-white text-content-primary transition-colors hover:bg-content-primary hover:text-white disabled:opacity-40"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>
    </section>
  );
}
