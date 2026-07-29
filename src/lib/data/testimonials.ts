export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I make candles out of my garage, not code. Typed in what my shop needed and had a real store with a working cart before my coffee was even done. Still weirds me out a little.",
    name: "Amara T.",
    role: "Small Business Owner",
  },
  {
    quote:
      "I'm particular about type and spacing, and this is the first AI website builder that didn't leave me redoing everything by hand afterward.",
    name: "Devon R.",
    role: "Freelance Designer",
  },
  {
    quote:
      "What used to be a two-day back-and-forth with dev is now a same-day turnaround, and the pages come out already structured for SEO.",
    name: "Priya N.",
    role: "Marketing Lead",
  },
  {
    quote:
      "I was skeptical until I opened the code viewer. Clean output, synced straight to my GitHub repo, and the Supabase tab meant I wasn't stitching together three dashboards just to check my own data.",
    name: "Marcus O.",
    role: "Backend Engineer",
  },
  {
    quote:
      "Built a little browser game for a class project in one afternoon. Never touched a game engine, just kept telling it what to change until it felt right.",
    name: "Jonas K.",
    role: "CS Student",
  },
  {
    quote:
      "I'm not technical and dreaded hiring someone just to get a site up before launch. Typed out what I wanted, previewed it, deployed it myself — the most stunning AI website builder result I've gotten from one sentence.",
    name: "Elena V.",
    role: "Startup Founder",
  },
];
