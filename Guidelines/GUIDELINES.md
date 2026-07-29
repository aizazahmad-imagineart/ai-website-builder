# ImagineMCP — Design Guidelines

This kit defines the **navbar, footer, typography, and color system** for the
ImagineMCP marketing site. Follow it exactly so any new page matches the
existing ones. The golden rule: **reuse the tokens and components in this kit —
never invent new colors, weights, or fonts.**

> TL;DR of the hard rules
> - ❌ **No bold fonts.** Max weight is `font-semibold` (600). Never `700+`.
> - ❌ **No colored accent.** No orange, purple, blue, green, teal, etc. The
>   palette is **monochrome** — near-black (`#171717`) on white/light, white on
>   dark. The "accent" is the near-black itself. Color comes only from imagery.
> - ✅ Use the semantic CSS variables from `tokens/globals.css`, not raw hexes.
> - ✅ Headings are **Title Case** (`capitalize`), body is sentence case.
> - ✅ One font family everywhere: **Google Sans Flex**.

---

## 1. Colors

All colors are defined as CSS variables in `tokens/globals.css` under `@theme`.
Use the **semantic tokens** (`content-primary`, `content-secondary`,
`surface-primary`, `border-primary`, etc.) via Tailwind classes
(`text-content-primary`, `bg-surface-primary`, `border-border-primary`). Do not
hardcode hexes in components except for the few documented dark one-offs already
in the kit (e.g. footer `#070707`, feature band `#0d0d0d`).

### The palette

The system is **monochrome** — near-black ink on white/light, with a few dark
surfaces. There is **no colored brand accent**: the "accent" is the near-black
itself (solid-black buttons and icon chips on white; white on dark). Saturated
color only ever comes from full-bleed hero / feature **imagery**, never chrome.

| Role | Token | Value |
|------|-------|-------|
| Accent / primary action | `--color-content-primary` (= `--color-neutral-100`) | `#171717` near-black |
| Page background | `--color-background` | white `#fff` |
| Primary text | `--color-content-primary` | `#171717` |
| Secondary text | `--color-content-secondary` | `rgb(87 87 87)` |
| Tertiary text | `--color-content-tertiary` | `rgb(0 0 0 / 0.5)` |
| Light surface (cards) | `--color-surface-primary` | `rgb(250 250 250)` |
| Light-grey section | (one-off) | `#f5f5f7` |
| Borders | `--color-border-primary` | `rgb(0 0 0 / 0.08)` |
| Dark feature band | (one-off) | `#0d0d0d` |
| Footer background | (one-off) | `#070707` |

> **Legacy note:** `globals.css` still ships an orange ramp
> (`primary-10 … primary-100`) from an earlier brand. **It is not used on this
> site** — don't reach for it in new work. Use the **neutral ramp**
> (`neutral-10 … neutral-110`) for any tint/shade; don't eyeball a new value.

### ✅ Do
- Keep everything **monochrome** — near-black (`#171717`) on white/light, white
  on the dark surfaces. The accent *is* the near-black (solid-black buttons,
  black icon chips, black active states).
- Keep the page **white / light** with near-black text. Sections separate with
  `border-t border-border-primary`, not heavy color blocks.
- Use the **dark footer** (`#070707`), the **dark feature band** (`#0d0d0d`) and
  the **dark scrolled-navbar** glass as the only dark surfaces.
- Express soft tints with **opacity on black/white** (`text-white/55`,
  `bg-black/[0.04]`) rather than new grey hexes.
- Let **imagery** carry the color — the hero render and feature media are the
  only saturated color on the page.

### ❌ Don't
- **No accent hue.** No orange, purple, blue, green, pink, yellow. If you're
  reaching for a color that isn't neutral/black/white, stop — this site has no
  colored accent (ignore the legacy orange tokens in `globals.css`).
- Don't hardcode arbitrary hexes (`#7c3aed`, `#3b82f6`, …). If a value isn't a
  neutral already in `globals.css`, it doesn't belong on the page.
- Don't signal good/bad or state with red/green — use copy, icons and the single
  near-black accent.
- Don't put colored text on colored backgrounds. It's near-black on white, or
  white on the dark surfaces.

---

## 2. Typography

**One typeface: Google Sans Flex** (variable font, see `fonts/`). It powers both
`--font-sans` (body) and `--font-display` (headings). A mono stack
(`--font-mono`) is used only for tiny eyebrow labels.

### Weights — the most important rule
We use **four weights only**:

| Weight | Tailwind | Used for |
|--------|----------|----------|
| 300 Light | `font-light` | large mobile-menu links |
| 400 Regular | `font-normal` | body copy, paragraphs |
| 500 Medium | `font-medium` | nav links, buttons, labels, hero H1 |
| 600 Semibold | `font-semibold` | section headings (H2/H3), eyebrows |

- ❌ **Never use `font-bold` (700) or heavier.** Headings top out at semibold.
- ❌ Never use `<strong>` for visual weight beyond `font-medium`/`font-semibold`
  (the few `<strong>` in the kit are set to `font-medium`/`font-semibold`
  explicitly — match that).

### Case & style
- **Headings (H1, H2, H3): Title Case**, applied with the Tailwind `capitalize`
  class — e.g. "Generate Images, Video And Music With". Not sentence case, not
  ALL CAPS.
- **Body copy: sentence case.**
- **Eyebrows / kickers:** small mono, **UPPERCASE**, wide tracking — this is the
  *only* place uppercase is allowed. Pattern:
  `font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary`.
- Headings use **tight negative letter-spacing** (`tracking-[-0.5px]`) and tight
  line-height (`leading-[1.05]`).
- Body uses relaxed line-height (`leading-[1.7]`) and a hair of negative
  tracking (`tracking-[-0.005em]`).

### Type scale (from `globals.css`)
Headings are set with `clamp()` for fluid sizing. Common patterns in use:
- Section H2: `clamp(32px, 4vw, 52px)`, `font-semibold`, `capitalize`.
- Card H3: `clamp(20px, 2.2vw, 30px)` or fixed `text-[20px]`, `font-semibold`.
- Body: `text-[15px]`–`text-[18px]`, `leading-[1.7]`.
- A full token scale (`--text-display-md`, `--text-heading-2xl`, `--text-body-*`)
  exists in `globals.css` — prefer it for new components.

### ✅ Do
- Use `font-display` for headings, `font-sans` for everything else.
- Let two-tone headings carry emphasis with color, not weight — e.g. a muted
  second clause: `<span className="text-black/35">…</span>`.

### ❌ Don't
- Don't introduce a second font family (no Inter/Roboto/etc. — Google Sans Flex
  already falls back to Inter/system).
- Don't bold things to make them stand out. Use color, size, or spacing.
- Don't uppercase headings or body. Uppercase is for mono eyebrows only.

---

## 3. Navbar (`components/SiteNav.tsx`)

A `fixed` top header that **morphs on scroll**:
- **At top:** transparent, dark text (`rgba(0,0,0,0.65)`), full-width.
- **Scrolled (>20px):** collapses into a centered **dark glass pill**
  (`rgba(10,10,11,0.72)` + `backdrop-blur`), white text, logo inverts to white.
- Smooth transition via `cubic-bezier(0.22,1,0.36,1)`.
- Desktop: logo · centered links · single CTA ("Get The Server").
- Mobile (`<lg`): hamburger → full-screen white overlay menu (large `font-light`
  links).

### ✅ Do
- Keep it `z-[60]`, fixed, with the scroll-driven light→dark behavior intact.
- Keep nav links at `text-[14px] font-medium` with the subtle hover bg.
- Keep exactly one primary CTA in the bar.

### ❌ Don't
- Don't add a second bright button or a colored nav background.
- Don't make links bold or uppercase.

---

## 4. Footer (`components/SiteFooter.tsx`)

A dark footer (`bg-[#070707]`) with:
- A brand column (logo + app-store buttons).
- A responsive **link grid** (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`).
- A large faint SVG **watermark**.
- A bottom bar: copyright + cookie button + social icons.

Text is white at **low opacity** (`text-white/55`, headings `text-white/[0.38]`,
copyright `text-white/25`), brightening on hover. Column headings are
`text-[11px] font-semibold tracking-[0.5px] uppercase`-style kickers.

### ✅ Do
- Keep all footer text as low-opacity white on `#070707`.
- Keep links muted → brighten on hover (`hover:text-white/90`).
- Max content width `1240px`, padding `px-5 md:px-10`.

### ❌ Don't
- Don't use any colored text or accent in the footer — it's low-opacity white
  on `#070707`, brightening on hover. No colored CTA.
- Don't bold footer links.

---

## 5. FAQ section (`components/FaqSection.tsx`)

A **two-column** section: a sticky-feeling heading block on the left, an
accordion list on the right. Pattern:

```
section#faq (border-t border-border-primary)
└ .container-page
  └ py-16 md:py-24, flex-col lg:flex-row, gap-10 lg:gap-20
    ├ Left  (lg:w-[360px], shrink-0): H2 + one-line subtext
    └ Right (flex-1): accordion rows, each border-b border-border-primary
```

### Layout
- **Desktop (`lg`+):** heading column fixed at `360px` on the left, accordion
  fills the rest. Big `gap-20` between them.
- **Mobile:** stacks — heading on top, accordion below.
- Heading: `clamp(36px, 4vw, 52px)`, `font-semibold`, two-tone (second word
  muted via `text-black/35`). Note: this H2 is **sentence case here** ("Got any
  questions left?") — it intentionally has **no `capitalize`** because it reads
  as a conversational question. (Section H2s elsewhere are Title Case; questions
  and the literal FAQ question text stay sentence case.)
- Subtext: `text-[17px] text-content-secondary max-w-[36ch]`.

### Accordion rows (`FaqRow`)
- Each row separated by a hairline `border-b border-border-primary` (and the
  list has a `border-t` on top, so dividers wrap the whole stack).
- **Row trigger** is a full-width `<button>` (`py-6`, `text-left`,
  `aria-expanded`) with the question on the left and a **circular ± icon** on the
  right (`w-8 h-8 rounded-full bg-black/[0.05]`). The vertical bar of the plus
  collapses (`scaleY(0)` + fade) to become a minus when open.
- Question text: `font-medium`, `clamp(16px, 1.4vw, 19px)`, `leading-snug`.
- **Expand/collapse** uses the **CSS grid-rows trick** for height animation —
  `grid-template-rows: 0fr → 1fr` with `transition: grid-template-rows 280ms`,
  inner wrapper `overflow-hidden`. (No JS height measuring, no max-height hacks.)
- Answer: `text-[16px] leading-[1.75] text-content-secondary max-w-[72ch] pb-6`.
- Rows reveal-stagger in (`delay={i * 60}`).

### SEO
- The section emits **FAQPage JSON-LD** (`@type: FAQPage`) built from the FAQ
  data array. Keep this when you reuse the section — it's a real SEO win. Source
  the questions from a typed data file (like `lib/data/faq.ts`), not inline JSX.

### ✅ Do
- Keep the two-column layout, hairline dividers, circular ± toggle, and the
  grid-rows height animation.
- Keep questions/answers in **sentence case**.
- Keep the JSON-LD in sync with the visible Q&A.

### ❌ Don't
- Don't box each row in a card or add background fills — it's a clean divided
  list, not chips.
- Don't bold the questions (they're `font-medium`) or the answers.
- Don't animate with `max-height` guesses; use the `grid-template-rows` pattern.
- Don't introduce a colored expand icon — it's neutral black on a faint grey
  circle.

---

## 6. Buttons (`components/Button.tsx`) — bonus

Shared primitive with four variants, all `rounded-[10px] font-medium`:
- `brand` — near-black bg, white text (primary CTA).
- `white` — white bg, subtle border + shadow.
- `ghost` — transparent, bordered.
- `muted` — light grey `#EDEDED` bg.

Sizes `md` / `lg`. Never restyle a button to a new color — pick a variant.

---

## 7. Shared conventions
- **Container width:** `1240px` max, gutters `32px` desktop / `20px` mobile
  (`.container-page` in `globals.css`).
- **Corners:** generous radii (`rounded-2xl`, `rounded-3xl` for cards;
  `rounded-[10px]`/`[22px]` for buttons/pills).
- **Shadows:** soft and low-opacity only (e.g. `shadow-[0_2px_16px_rgba(0,0,0,0.045)]`).
  No hard or colored drop shadows.
- **Borders:** hairline `border-border-primary` (`rgb(0 0 0 / 0.08)`).
- **Motion:** subtle reveal-on-scroll and ease-out transitions; respect
  `prefers-reduced-motion` (see `.reveal` + media query in `globals.css`).
- **Eyebrow + heading + body** is the standard section header rhythm.

---

## 8. Comparison / “Old vs New” section (`components/ComparisonSection.tsx`)

A two-column **Without vs With** comparison: eyebrow + Title-Case H2 + body,
then two equal-height glass cards.

### Layout
- Standard section — `border-t border-border-primary`, `.container-page`,
  `py-16 md:py-24`; header block capped at `max-w-[720px]`.
- Cards in `grid md:grid-cols-2 gap-4 md:gap-6 items-stretch`; each card is
  `h-full` so both match the taller column.
- Card: `rounded-3xl`, hairline `border-border-primary`, glass
  (`bg-white/60 backdrop-blur-xl backdrop-saturate-150`), soft shadow
  `shadow-[0_2px_16px_rgba(0,0,0,0.045)]`, gentle hover lift.
- Card header: `font-semibold` label (`clamp(17px,1.6vw,20px)`) + an italic
  `text-content-tertiary` note, divided by a hairline border.
- Rows: `flex items-start gap-3`, `text-[15px] leading-[1.5]
  text-content-secondary`, each led by a 22px round icon chip.

### The accent rule (important)
- Positive (“With”) rows use a solid **near-black** check chip
  (`bg-content-primary text-white`). Negative (“Without”) rows use a **neutral**
  ✕ chip (`bg-black/[0.05] text-content-tertiary`).
- Good/bad is carried by **the icon shape alone** — never green vs red, and no
  colored accent (this site is monochrome; see §1).

### ✅ Do
- Keep both columns equal height (`items-stretch` + `h-full`).
- Keep weights ≤ `font-semibold`; the check’s weight comes from the SVG stroke,
  not a bold font.
- Express the glass with opacity-on-white + blur, not a new grey hex.

### ❌ Don't
- Don't color the columns green/red, and don't add a second accent.
- Don't use a hard or colored drop shadow.
- Don't uppercase the heading — Title Case only (uppercase is for the eyebrow).

---

## How to use this kit on a new page
1. Drop `tokens/globals.css` in (or merge its `@theme` block) — it's the single
   source of truth for colors, fonts, and the type scale.
2. Wire the font exactly as in `fonts/layout-font-setup.tsx`.
3. Reuse `components/SiteNav.tsx` and `components/SiteFooter.tsx` as-is (fix the
   import paths and asset paths — assets are in `assets/`).
4. For any new UI: pull colors from the tokens, keep weights ≤ 600, headings in
   Title Case, and stay **monochrome** — near-black on white/light, white on
   dark, no colored accent.
