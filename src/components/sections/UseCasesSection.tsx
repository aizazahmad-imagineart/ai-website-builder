"use client";

import type { ComponentType } from "react";
import {
  Megaphone,
  IdentificationCard,
  SquaresFour,
  GameController,
  Storefront,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { BUILD_TYPES, type BuildType } from "@/lib/data/buildTypes";

/**
 * Use Cases now carries the plain card treatment — a variety of personas
 * laid out as simple icon + text cards, unlike Features' heavier
 * sticky-step-through visual (see FeaturesSection.tsx, which now carries
 * that pattern instead). Flex-wrap (not CSS grid) so the odd-numbered last
 * row of cards centers instead of hanging left under the grid's first
 * column(s).
 */
const ICON_COMPONENTS: Record<BuildType["icon"], ComponentType<{ size?: number; weight?: "regular" | "fill" }>> = {
  marketing: Megaphone,
  portfolio: IdentificationCard,
  dashboard: SquaresFour,
  games: GameController,
  store: Storefront,
};

export function UseCasesSection() {
  return (
    <section id="use-cases" className="border-b border-border-primary bg-[#0a0a0a] relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-page relative py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            Use Cases
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            What you can <span className="font-serif-accent italic font-normal">build</span> with this website creator
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Flexible enough for founders, marketers, designers, and hobbyists
            alike.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6">
          {BUILD_TYPES.map((bt, i) => {
            const Icon = ICON_COMPONENTS[bt.icon];
            return (
              <Reveal
                key={bt.title}
                delay={i * 60}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] text-white shrink-0">
                      <Icon size={24} weight="regular" />
                    </span>
                    <h3 className="font-sans font-semibold text-white text-[18px]">{bt.title}</h3>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.6] text-white/55 m-0">{bt.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
