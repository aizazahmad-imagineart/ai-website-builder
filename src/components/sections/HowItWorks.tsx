import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/primitives/SpotlightCard";

/**
 * A simple 3-4 step journey doesn't need a heavy pinned visual to carry it —
 * that treatment now belongs to Use Cases instead, where a variety of real
 * visual examples actually benefits from the extra room (see
 * UseCasesSection.tsx). This section communicates its steps via a plain
 * numbered card grid instead, the same "editorial numbered" idiom used
 * elsewhere on sibling ImagineComputer pages for content that's list-shaped
 * rather than image-shaped.
 */
const STEPS: { title: string; body: string }[] = [
  {
    title: "Describe Your Site in Natural Language",
    body: "Just say what you're building. \"A modern portfolio for a photographer\" or \"an online store for handmade candles.\" Imagine Computer's AI site generator gets to work.",
  },
  {
    title: "Customize Without Touching Code",
    body: "Ask for changes the same way you asked for the first draft. Move a section, swap a color, rewrite a headline. Imagine Sites responds to instructions, not menus.",
  },
  {
    title: "Preview Instantly",
    body: "See exactly what visitors will see, in a live preview window, before anything goes live. Get a feel of your websites and make adjustments.",
  },
  {
    title: "Deploy in One Click",
    body: "Deploy your finished site on Vercel with one click. Every website is shareable and production-ready in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            How It Works
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            How Our No-code AI Website Generator Works
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            At its core, Imagine Sites is a prompt based website builder. Describe
            what you want in plain English, and the AI handles the layout, the
            copy, and the styling in the background.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <SpotlightCard key={step.title} className="h-full rounded-2xl">
                <div className="h-full flex flex-col gap-4 rounded-2xl bg-white border border-border-primary p-6 md:p-7 transition-colors duration-300">
                  <span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-content-tertiary">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-content-primary text-[17px] mb-1.5">{step.title}</h3>
                    <p className="font-sans text-[14px] leading-[1.55] text-content-secondary m-0">{step.body}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
