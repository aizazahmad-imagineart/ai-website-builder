"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

export function FinalCta() {
  return (
    <section id="get-started" className="relative bg-[#0d0d0d] overflow-hidden">
      {/* Subtle violet-to-teal glow — the last of the accent color on the
          page, redistributing it down here instead of leaving it all up top. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px] opacity-[0.16] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-secondary) 55%, transparent 75%)",
        }}
      />
      {/* Fine grain, so the dark band reads as textured rather than flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page py-24 md:py-32 relative">
        <Reveal className="flex flex-col items-center text-center max-w-[640px] mx-auto">
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] text-white m-0"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            Ready to build the{" "}
            <span className="font-serif-accent italic font-normal">next revolutionary</span> product?
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] max-w-[420px] mt-5" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Start with the website. Describe it. Preview it. Deploy it.
          </p>
          <div className="mt-9">
            <ButtonLink href="https://www.imagine.art/sites" size="lg" variant="white">
              Start Building Free
            </ButtonLink>
          </div>
          <p className="text-[13px] text-white/35 mt-5">Free to start. No credit card required.</p>
        </Reveal>
      </div>
    </section>
  );
}
