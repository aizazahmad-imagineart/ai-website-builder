export type BuildType = {
  title: string;
  body: string;
  icon: "marketing" | "portfolio" | "dashboard" | "games" | "store";
};

export const BUILD_TYPES: BuildType[] = [
  {
    title: "Marketing & Landing Pages",
    body: "Launch SEO-optimized, conversion-ready landing pages built to rank and capture leads, without hiring an agency.",
    icon: "marketing",
  },
  {
    title: "Portfolios & Personal Sites",
    body: "Showcase your work or your résumé with a personal site built in minutes, not weekends.",
    icon: "portfolio",
  },
  {
    title: "Dashboards & Internal Tools",
    body: "Spin up data-driven admin panels and dashboards wired straight to your connected backend.",
    icon: "dashboard",
  },
  {
    title: "Games & Interactive Experiences",
    body: "Prompt your way to browser games and interactive demos without touching a game engine.",
    icon: "games",
  },
  {
    title: "Online Stores",
    body: "Our ecommerce AI website builder handles product pages, carts, and checkout flows starting from a single description.",
    icon: "store",
  },
];
