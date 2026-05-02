# DESIGN.md — Implementation detail for megam.io closure site

This file is the companion to the main handoff prompt. It carries the implementation-level visual specification: exact values, easing curves, motion timings, OG card layout, icon stroke widths.

The agent reads this at **Gate 4** (visual implementation), not earlier. During Gates 1–3 (research, claims, content drafts) the design is irrelevant; what matters is factual integrity. Reading this file too early pulls attention away from the editorial work.

The high-level direction in §6 of the main prompt is the **constitution**. This file is the **building code** that implements it. If the two ever conflict, the main prompt wins.

---

## 1. Color tokens

Implement these as named CSS custom properties in `/styles/tokens.css`, mirrored into Tailwind config under `theme.extend.colors`. Hard-coded hex values anywhere outside this file are a bug.

```css
:root {
  /* Canvas */
  --canvas:           #0A0A0F;   /* near-black, slightly cool. Never #000. */
  --canvas-elevated:  #11131A;   /* for any raised surface (rare) */

  /* Text */
  --text-primary:     rgba(255, 255, 255, 0.92);
  --text-secondary:   rgba(255, 255, 255, 0.60);
  --text-muted:       rgba(255, 255, 255, 0.45);

  /* Accents — pick ONE primary at build time */
  --accent-cyan:      #00E5FF;   /* recommended */
  --accent-green:     #A6FF00;
  --accent-magenta:   #FF2D95;

  --accent-primary:   var(--accent-cyan);    /* set at build */
  --accent-secondary: var(--accent-magenta); /* set at build */

  /* Glow */
  --glow-primary:     0 0 32px rgba(0, 229, 255, 0.35);
  --glow-strong:      0 0 48px rgba(0, 229, 255, 0.50);

  /* Hairlines */
  --rule-faint:       rgba(0, 229, 255, 0.20);
  --rule-strong:      rgba(0, 229, 255, 0.60);
}
```

**Glow rule:** accents emit a soft glow via `box-shadow` or `text-shadow` at 30–40% opacity, blur 24–48px. Never stack multiple glow layers. Never animate the glow's color — only its intensity.

**Accent pairing:** if primary is cyan, secondary is magenta. If primary is acid green, secondary is cyan. If primary is magenta, secondary is cyan. Never green + magenta together (clashes).

---

## 2. Typography tokens

```css
:root {
  --font-display:  'Space Grotesk', system-ui, sans-serif;
  --font-body:     'Inter', system-ui, sans-serif;
  --font-mono:     'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;

  /* Sizes — fluid clamp() everywhere */
  --size-hero:     clamp(40px, 6vw, 88px);
  --size-h1:       clamp(32px, 4vw, 56px);
  --size-h2:       clamp(24px, 2.5vw, 36px);
  --size-h3:       clamp(20px, 2vw, 28px);
  --size-body:     clamp(15px, 1.1vw, 18px);
  --size-small:    clamp(13px, 0.9vw, 14px);
  --size-meta:     12px;          /* monospace metadata, never scales */

  /* Display tightening */
  --tracking-hero: -0.04em;
  --tracking-h1:   -0.02em;
  --tracking-body:  0em;
  --tracking-meta:  0.12em;       /* monospace small-caps section labels */

  /* Line-heights */
  --leading-tight: 1.05;          /* hero, h1 */
  --leading-snug:  1.25;           /* h2, h3 */
  --leading-body:  1.65;           /* body prose */
  --leading-mono:  1.5;            /* monospace blocks */
}
```

Self-host all three families. Subset to Latin only. Preload regular and medium weights for body and the display weight for headings — total font weight ≤ 200 KB on first paint.

**Section labels** (e.g. `§ 04 / why it didn't work`) use `--font-mono`, `--size-meta`, `--tracking-meta`, uppercase, color `--text-secondary`. They sit above each section, on their own line, with a hairline rule below.

---

## 3. Layout grid

Desktop: 12 columns, 24px gutters, max-width 1280px, padded 32px from viewport edges.

Asymmetric content placement:
- Body prose: columns **2 through 8** (~68 character measure)
- Marginalia (source links, dates, footnotes): columns **9 through 12**
- Diagrams that need full bleed: columns **1 through 12** with 0 padding
- Hero on `/`: columns **2 through 11**, no marginalia column on home

Mobile: single column, 20px viewport padding. Marginalia collapses to a footnote block at the bottom of each section, hairline-ruled off.

Vertical rhythm: 8px base unit. Section padding 96–128px on desktop, 64px on mobile. Generous, not cramped.

Border-radius cap: **4px**. Never higher. No `rounded-2xl`. The vibe is control panel, not consumer SaaS.

---

## 4. Motion

### 4.1 Easing curves

Two named curves, used everywhere:

```css
--ease-out:  cubic-bezier(0.22, 1, 0.36, 1);     /* default — fluid out */
--ease-flow: cubic-bezier(0.65, 0, 0.35, 1);     /* through-and-out */
```

Never `ease-in-out` defaults. Never spring physics. Never overshoot.

### 4.2 Durations

```css
--dur-instant:  120ms;   /* hover state changes */
--dur-fast:     200ms;   /* small UI transitions */
--dur-base:     280ms;   /* most things */
--dur-slow:     400ms;   /* page-entry stagger */
--dur-ceiling:  600ms;   /* absolute ceiling — anything longer is wrong */
```

### 4.3 Permitted motion (with implementation)

| Element | Behavior | Duration | Curve |
|---|---|---|---|
| Page entry | content fades up 8–12px on initial paint, staggered 40ms per section header | `--dur-slow` per element | `--ease-out` |
| Scroll-tied reveals | `opacity: 0→1` + `translate-y: 8px→0` on entry into viewport, `IntersectionObserver` at ~15% visibility | `--dur-base` | `--ease-out` |
| Hover on links | underline draws left-to-right; faint accent glow appears on text | `--dur-fast` (180ms) | `--ease-out` |
| Hover on timeline year markers | horizontal "scan line" sweeps across the row | `--dur-base` (240ms) | `--ease-flow` |
| Cursor on `/` (desktop only) | accent dot follows cursor with ~80ms lag, scaled to 6px, `mix-blend-mode: screen` | n/a — continuous | linear (lag handled by lerp) |
| Architecture diagram on `/` | one or two SVG paths get `stroke-dasharray` "wire-up" animation, runs once on first paint | 1200ms total | `--ease-out` |
| Background film grain | static SVG noise, ~3% opacity, fixed | none — never animate | n/a |

### 4.4 Forbidden motion

- Parallax scrolling
- Floating blobs, orbiting shapes, particle fields
- Auto-playing video, Lottie loops, looping anything
- Section-pinning, horizontal-scroll-jacking
- Smooth-scroll hijacking — native scroll only
- Hero glow pulsing (it may pulse *once* on entry; it does not breathe)

### 4.5 `prefers-reduced-motion`

Disable: page-entry stagger, scroll-tied reveals, cursor dot, hover scan line, diagram wire-up. Static state must equal the post-animation state — never leave the page half-faded.

---

## 5. Iconography and ornament

- **Icon set:** Lucide. Only Lucide. No second set.
- **Icon size:** 16–20px. Stroke 1.5.
- **Icon color:** `--text-secondary` by default; `--accent-primary` only on hover or active state.
- **Ornament budget:** a single small wordmark — `megam.io ↳ closed` — top-left of every page in monospace at `--size-meta`. That is the entire mascot. There is no logo.

Forbidden:
- Emoji (anywhere, including page metadata)
- Flag icons
- 3D renders or isometric illustrations
- Custom-illustrated mascots

---

## 6. Imagery and diagrams

### 6.1 Diagrams

- Source: Mermaid or d2 files committed to `/diagrams/*.mmd` or `/diagrams/*.d2`.
- Build: rendered to SVG at build time, output to `/public/diagrams/*.svg`.
- Style:
  - Stroke: 1.5–2px, `--text-primary` color
  - Node outlines: 1.5px, `--accent-primary` at 60% opacity
  - Fills: none, except for emphasis on **at most two** nodes per diagram (use `--accent-primary` at 15% opacity)
  - Labels: `--font-mono`, `--size-small`, `--text-primary`
  - Arrows: simple triangle heads, 8px, same stroke color as the line
- No drop shadows. No 3D effects. No gradient fills.
- Every diagram has a meaningful `<title>` element for screen readers.

### 6.2 Screenshots

Period-accurate screenshots from `nilavu`, `verticegateway` admin UIs, and OpenNebula talk slides are encouraged on `/products` and `/artifacts`.

- 1px border in `--rule-strong` (no shadow)
- Caption directly below in `--font-mono` at `--size-meta`, format: `<source> · <year>`
- Do not retouch. Do not upscale. Do not modernize. Period accuracy beats prettiness.
- Width: full content column (cols 2–8), height auto.

### 6.3 Forbidden imagery

- Stock photography
- AI-generated illustrations or photographs
- Headshots not provided directly by Kishore or the person depicted

---

## 7. OG card specification

Generated at build time per page via Next.js `ImageResponse`.

- **Dimensions:** 1200 × 630 px
- **Background:** `--canvas` (`#0A0A0F`)
- **Layout:**
  - Top-left: `megam.io ↳ closed` in `--font-mono`, 24px, `--text-secondary`
  - Center: page title in `--font-display`, 72px, `--text-primary`, with `--glow-primary` text-shadow behind it
  - Below title: section label in `--font-mono`, 16px, `--accent-primary`, e.g. `§ 04 · why it didn't work`
  - Bottom-left: `https://megam.io/<route>` in `--font-mono`, 16px, `--text-muted`
- **No imagery, no icons, no decoration** beyond the glow behind the title.

The site uses Vercel's edge `ImageResponse` API. Fonts must be loaded as `ArrayBuffer` from `/public/fonts/` — Vercel's edge runtime cannot import Google Fonts at runtime.

---

## 8. Page-specific implementation notes

### 8.1 `/` (Home)

- Hero sentence: `--size-hero`, `--font-display`, `--tracking-hero`, `--leading-tight`.
- Radial glow behind hero: 600px diameter, `radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)`, positioned behind the H1.
- Six-link nav block: vertical, monospace, each line `<route> · <year-range>` aligned with a 1ch tab between segments.
- Top-right doc-site links: fixed position, monospace, 14px, with the target docs site's name and a small external-link icon.
- Architecture diagram: full-width below the fold, with the wire-up animation triggering on intersection.

### 8.2 `/timeline`

- Year markers: `--font-mono`, 64–80px, `--accent-primary` at 60% opacity, fixed-width.
- Vertical neon rule: 1px wide, `--rule-faint`, runs the full height of the timeline section.
- On hover of an entry: corresponding year marker animates to 100% opacity over `--dur-fast`.
- Each entry: date (mono, secondary), one-line headline (display, h3 size), 2–4 sentences body, source link in marginalia column.

### 8.3 `/architecture`

- Prose in cols 2–8.
- Diagrams break out to cols 1–12.
- 3-column comparison table: equal column widths, hairline ruled between cells, no outer border. On mobile, collapses to stacked accordions with monospace section labels.

### 8.4 `/why-it-didnt-work`

- Implemented as semantic `<table>`, never `<div>` styled to look like a table.
- Rows separated by hairlines (`--rule-faint`), no outer border, no row backgrounds.
- `<Layer>` cell: `--font-mono`, uppercase, `--tracking-meta`, `--accent-primary`.
- `<Failure>` cell: body prose, body line-height, secondary text where a sentence cites evidence inline.
- Generous `padding-block`: 32px per row on desktop, 24px on mobile.

### 8.5 `/team`

- Stacked roster, never a card grid.
- Each entry: 2px-wide vertical rule on the left in `--accent-primary` at 80%, with 24px left padding for the entry content.
- Group A and Group B each have a section header in monospace small-caps. **Group B's section header uses `--accent-secondary`** (the magenta if cyan is primary) so the visual distinction is obvious without reading carefully.
- Per entry: name in `--font-display` at h3 size; role in `--font-mono` at `--size-small` in `--accent-primary`; bio in body prose; LinkedIn + GitHub links at the bottom in `--font-mono` at `--size-small` with the icon prefix.

### 8.6 `/artifacts`

- Manifest format: each line `<repo or doc> · <one-line role> · <link>` in `--font-mono`, `--size-small`, `--leading-mono`.
- Sections separated by hairlines and monospace section headers.

### 8.7 `/lessons`

- Lesson number: `--font-display`, 120px, `--accent-primary` at 30% opacity, positioned absolutely behind the lesson text (z-index -1).
- Lesson text: body prose at `--size-h3`, with normal `--leading-snug`.
- Min vertical breath: 240px between lessons.

### 8.8 `/colophon`

- Plain prose, columns 2–8, no ornament beyond the page wordmark.
- States: build info, source repo URL, license (CC-BY-4.0 for prose), the no-light-theme decision, "corrections welcome" mailto.

### 8.9 `/404`

- Centered single line in monospace: `404 · this page was never deployed`.
- Below: `→ /` in monospace, linked.
- No imagery, no animation.

---

## 9. Tailwind config skeleton

```ts
// tailwind.config.ts
export default {
  content: ['./app/**/*.{tsx,mdx}', './components/**/*.tsx', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        canvas:    'var(--canvas)',
        elevated:  'var(--canvas-elevated)',
        accent:    'var(--accent-primary)',
        accent2:   'var(--accent-secondary)',
        primary:   'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted:     'var(--text-muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body:    'var(--font-body)',
        mono:    'var(--font-mono)',
      },
      transitionTimingFunction: {
        out:  'var(--ease-out)',
        flow: 'var(--ease-flow)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      boxShadow: {
        glow:        'var(--glow-primary)',
        'glow-strong': 'var(--glow-strong)',
      },
    },
  },
} satisfies Config;
```

Hard-coded hex codes, hard-coded ms values, or hard-coded font names anywhere in the codebase outside this file and `tokens.css` are a bug. The PR check should grep for `#[0-9a-fA-F]{6}` in any file outside `tokens.css` and fail if it finds any.

---

## 10. What changes if priorities change

If at any point this design spec conflicts with the editorial spec in the main prompt — or with `/why-it-didnt-work` reading like a postmortem — the editorial wins. See §6.8 of the main prompt: the voice/chrome separation rule.

This file is a building code. The constitution is the prompt.
