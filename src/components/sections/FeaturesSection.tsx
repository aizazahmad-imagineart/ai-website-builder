"use client";

import type { ComponentType } from "react";
import {
  ShieldCheck,
  ChatCircleText,
  DeviceMobile,
  MagnifyingGlass,
  Code,
  Database,
  GithubLogo,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { useActiveRow } from "@/lib/hooks/useActiveRow";

/** A trust badge — a soft accent-tinted disc behind a solid shield-check —
 * replacing an earlier dial/gauge graphic that read as an ambiguous clock or
 * timer. This section's whole heading is about trust, so the flourish now
 * says exactly that instead of needing a caption to explain it. */
function TrustBadge() {
  return (
    <div className="hidden lg:flex absolute right-0 top-0 w-20 h-20 rounded-full items-center justify-center bg-accent/10">
      <ShieldCheck size={40} weight="fill" className="text-accent" />
    </div>
  );
}

type CoreFeature = {
  icon: "security" | "prompt" | "responsive" | "seo";
  title: string;
  body: string;
};

const ICON_COMPONENTS: Record<CoreFeature["icon"], ComponentType<{ size?: number; weight?: "regular" | "fill" }>> = {
  security: ShieldCheck,
  prompt: ChatCircleText,
  responsive: DeviceMobile,
  seo: MagnifyingGlass,
};

const CORE_FEATURES: CoreFeature[] = [
  {
    icon: "security",
    title: "Security You Can Count On",
    body: "Your project and backend data stay locked to your account. Never exposed or shared by default.",
  },
  {
    icon: "prompt",
    title: "Edit Just By Prompting",
    body: "As a true no-code website builder, every edit happens through natural language instructions, not menus or code.",
  },
  {
    icon: "responsive",
    title: "Responsive By Default",
    body: "Every site, page, or dashboard renders correctly on desktop, tablet, and mobile without extra work.",
  },
  {
    icon: "seo",
    title: "SEO-Ready Out of the Box",
    body: "Clean, semantic markup, and metadata from the first generation, so pages are search-ready on day one.",
  },
];

const PLATFORM_FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <Code size={20} weight="regular" />,
    title: "See the Code",
    body: "Open the code viewer to see exactly what's been built, section by section.",
  },
  {
    icon: <Database size={20} weight="regular" />,
    title: "Connect Your Backend",
    body: "Use the Cloud tab to view live backend data, starting with Supabase, with more connectors on the way.",
  },
  {
    icon: <GithubLogo size={20} weight="regular" />,
    title: "Sync With GitHub",
    body: "Connect your GitHub account to keep your project in sync as you build.",
  },
];

export function FeaturesSection() {
  const { active, refs } = useActiveRow(CORE_FEATURES.length);
  const ActiveIcon = ICON_COMPONENTS[CORE_FEATURES[active].icon];

  return (
    <section id="features" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="relative max-w-[640px] mb-14 md:mb-16">
          <TrustBadge />
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Features
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            Why builders <span className="font-serif-accent italic font-normal">trust</span> this AI site builder
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] mt-3.5 mb-0 max-w-[52ch]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Imagine Site does not only build websites. We build trust as
            well. We save your time and efforts with speedy and secure
            generations.
          </p>
        </Reveal>

        {/* 30/70 split — steps on the left drive a pinned sticky visual on
            the right (same sticky-step pattern as UseCasesSection). */}
        <div className="grid md:grid-cols-[3fr_7fr] gap-x-10 lg:gap-x-16 mb-16 md:mb-20">
          <div className="flex flex-col">
            {CORE_FEATURES.map((f, i) => {
              const Icon = ICON_COMPONENTS[f.icon];
              return (
                <div
                  key={f.title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="py-10 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center"
                >
                  <span
                    className="font-mono text-[13px] tracking-[0.5px] transition-colors duration-300"
                    style={{ color: active === i ? "var(--color-content-primary)" : "var(--color-content-tertiary)" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex items-center gap-3 mt-3 mb-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.04] text-content-primary shrink-0">
                      <Icon size={18} weight="regular" />
                    </span>
                    <h3 className="font-sans font-semibold text-content-primary text-[17px]">{f.title}</h3>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.6] text-content-secondary m-0 max-w-[42ch]">{f.body}</p>

                  {/* Placeholder follows inline on mobile, since sticky needs the md+ two-column layout */}
                  <div className="md:hidden mt-8 rounded-xl border border-dashed border-black/15 bg-black/[0.02] aspect-video flex flex-col items-center justify-center gap-3">
                    <Icon size={40} weight="regular" />
                    <p className="font-mono text-[11px] text-content-tertiary text-center px-4">
                      Pending real asset — {f.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky visual — desktop only, vertically centered while pinned,
              swapping icon + label as the active row changes */}
          <div className="hidden md:block relative">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full max-w-[900px] mx-auto aspect-video rounded-xl border border-dashed border-black/15 bg-black/[0.02] overflow-hidden flex flex-col items-center justify-center gap-4 text-content-tertiary transition-colors duration-500">
                <ActiveIcon size={56} weight="regular" />
                <p className="font-mono text-[12px] text-center px-6 transition-opacity duration-300">
                  Pending real asset — {CORE_FEATURES[active].title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dark band — the platform underneath: code, backend, GitHub */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-[#0d0d0d] p-8 md:p-12">
            {/* Same violet-to-teal accent as the hero/showcase glows, much
                subtler here — redistributes the accent color toward the
                bottom of the page instead of leaving it only up top. */}
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full blur-[100px] opacity-[0.18] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-secondary) 55%, transparent 75%)",
              }}
            />
            <div className="relative max-w-[560px] mb-10">
              <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
                More Than a Website Maker AI
              </p>
              <h2
                className="font-display font-semibold leading-[1.15] tracking-[-0.5px] mt-3 mb-3 text-white"
                style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
              >
                Connected to the systems your site needs to run
              </h2>
              <p className="font-sans text-white/55 leading-[1.7] text-[15px] m-0">
                Imagine Sites lives inside Imagine Computer, so it is more
                than just an AI for website design. It connects to the
                systems your site actually needs to run.
              </p>
            </div>

            <div className="relative grid sm:grid-cols-3 gap-6">
              {PLATFORM_FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] text-white shrink-0">
                    {f.icon}
                  </span>
                  <h3 className="font-sans font-medium text-white text-[15px] m-0">{f.title}</h3>
                  <p className="font-sans text-[13.5px] leading-[1.55] text-white/50 m-0">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
