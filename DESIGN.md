# Design System — Megam.io

## Product Context
- **What this is:** Closure record of Megam Systems LLP and Rio/OS, an open-source cloud management platform built from Chennai, India between 2012 and 2018.
- **Who it's for:** Former Megam / Rio/OS teammates, researchers tracing the early Indian cloud-OS scene, founders studying post-mortems of indie infra startups.
- **Space/industry:** Memorial / archive / closure record. Not a product site, not a portfolio.
- **Project type:** Editorial / archive — prose-heavy MDX content, asymmetric editorial grid, no interactive surfaces beyond navigation.

## Memorable Thing
The site should feel like *the closure record of a specific company from a specific place and time* — quiet, weighty, technical. Not a SaaS template. Not synthwave. The reader should leave thinking "someone built something that mattered, here's what it was."

## Aesthetic Direction
- **Direction:** Editorial-archive on a dark canvas, with a single restrained accent and a serif display voice that gives memorial weight.
- **Decoration level:** Intentional. A faint scanline grid, one quiet radial wash, otherwise type and rules do the work.
- **Mood:** Solemn but specific. NYT obituary section, not VT220 boot screen.
- **Reference posture:** Not converging on the AI-slop default (Inter + Space Grotesk + purple gradient + 3-column SaaS grid). The serif display + mono eyebrow contrast is the system's signature.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display (h1-h4, hero) | **Fraunces** (variable, opsz 9-144, wght 400-700) | Optical sizing on by default. Heavier weights (600) for hero/h1, medium (500) for h2-h4. Fraunces' soft serifs on a dark canvas read as "memorial" not "tech." |
| Body | **General Sans** (Fontshare, weights 400/500/600) | Neutral grotesque, deliberately not Inter. Works as the quiet voice supporting Fraunces. |
| Eyebrow / nav / metadata | **JetBrains Mono** (weights 400/500) | Uppercase + `tracking-meta: 0.12em`. The system's actual signature — used for nav, side-nav rails, table headers, footer, claim refs. |
| Code | **JetBrains Mono** | Inline only; no code-block component yet. |

**Loading:** All three loaded via `@import` at the top of `app/globals.css`. Fraunces + JetBrains Mono from Google Fonts; General Sans from Fontshare. Migrate to `next/font` for self-hosting if FOUT becomes an issue.

**Type scale** (clamp-based, fluid):

| Token | Value |
|---|---|
| `--size-hero` | `clamp(40px, 6vw, 88px)` |
| `--size-h1` | `clamp(32px, 4vw, 56px)` |
| `--size-h2` | `clamp(24px, 2.5vw, 36px)` |
| `--size-h3` | `clamp(20px, 2vw, 28px)` |
| `--size-h4` | `clamp(17px, 1.5vw, 22px)` |
| `--size-body` | `clamp(15px, 1.1vw, 18px)` |
| `--size-small` | `clamp(13px, 0.9vw, 14px)` |
| `--size-meta` | `12px` |

**Tracking:** `--tracking-hero: -0.02em`, `--tracking-h1: -0.015em`, `--tracking-body: 0`, `--tracking-meta: 0.12em` (uppercase mono only).

**Leading:** `--leading-tight: 1.05` (display), `--leading-snug: 1.25` (compact prose), `--leading-body: 1.65` (running prose), `--leading-mono: 1.5`.

## Color

- **Approach:** Restrained. One accent (cyan), neutrals on dark canvas, no semantic palette yet.
- **Canvas:** `--canvas: #0a0a0f`, `--canvas-elevated: #11131a` (header/footer at `rgba(10, 10, 15, 0.82)` + `backdrop-filter: blur(16px)`).
- **Text:** primary `rgba(255,255,255,0.92)`, secondary `0.6`, muted `0.45`. Always white-with-alpha so contrast tracks the canvas.
- **Accent:** `--accent-cyan: #00e5ff` aliased as `--accent-primary`. Used for: wordmark, hovered links, mono table headers, code, the team-page H3 left border, the "why-it-didn't-work" first-column emphasis.
- **Rules:** `--rule-faint: rgba(0,229,255,0.2)` for borders/separators; `--rule-strong: rgba(0,229,255,0.6)` for default link underlines.
- **Glow:** `--glow-primary: 0 0 32px rgba(0,229,255,0.35)`. **Scoped to `.glow-link` only** (currently the wordmark). Universal `a:hover` does NOT glow — citation-dense pages would otherwise flicker on every hover.
- **Dark mode:** The site IS dark. No light variant.
- **Dropped tokens (intentional):** `--accent-magenta`, `--accent-green`, `--accent-secondary`, `--glow-strong`. Three accents read as synthwave; one accent reads as archive.

## Spacing

- **Base unit:** `8px` (visible in margin/padding values: 8, 12, 16, 18, 22, 24, 32, 40, 42, 48, 56, 80).
- **Density:** Comfortable, leaning spacious. h2 has `80px` top margin; shell padding is `56px 32px 96px`.
- **Side-nav rail:** `260px` max, sticky from `top: 104px`.

## Layout

- **Approach:** Grid-disciplined editorial. 12-column inner grid on `.content-page`, with content occupying `2 / span 7` (asymmetric, leaves a left rail for breathing room). Hero rows widen to `2 / span 10`. Tables span the full 12.
- **Outer shell:** `grid-template-columns: minmax(190px, 260px) minmax(0, 1fr)` — side-nav + main, max-width `1280px`.
- **Header:** sticky, blurred translucent panel at `rgba(10,10,15,0.82)` with `backdrop-filter: blur(16px)` and a faint cyan bottom rule.
- **Mobile (`max-width: 840px`):** single-column collapse. Header switches from sticky to static. Side-nav becomes a 2-col chip grid. Tables become horizontally scrollable.
- **Border radius:** None. Square corners across the system. (Bubble-radius reads as SaaS slop; squared rules read as archival.)

## Motion

- **Approach:** Minimal-functional. Page enter animation (`translateY(10px) → 0`, 400ms `ease-out`); link color/underline transitions at 200ms; nothing else moves.
- **Easing:** `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` for entries; `--ease-flow: cubic-bezier(0.65, 0, 0.35, 1)` for travel.
- **Durations:** instant `120ms`, fast `200ms`, base `280ms`, slow `400ms`, ceiling `600ms`.
- **Reduced-motion:** All animation/transition durations forced to `1ms` under `prefers-reduced-motion: reduce`.

## Decorative Treatments

- **Scanline grid:** `body::before` overlay, 3px × 3px crosshatch at `opacity: 0.03`. Subtle texture; on non-retina displays watch for moiré (consider 4px grid if reported).
- **Radial glow:** Single `radial-gradient(circle at 42% 16%, rgba(0,229,255,0.04), transparent 34rem)` on body. Quiet enough to read as ambient lighting, not as a tech demo.

## Component Patterns

- **`.wordmark`** — Mono uppercase cyan, the only `.glow-link` on the site. The link itself reads "megam.io -> closed", which IS the design statement.
- **`.docs-nav`, `.side-nav`, `.claim-ref`, `.site-footer-inner`** — All share the mono-eyebrow voice (mono + `size-meta` + `tracking-meta` + uppercase). This consistency is the system's spine; preserve it.
- **`.content-page table`** — Headers in mono uppercase cyan; cells in body sans; rules in `--rule-faint`. Spans the full 12 columns even though prose is 7.
- **`.page-team h3`** — `border-left: 2px solid --accent-primary` + 20px padding. This is the only place a vertical accent rule appears; it's a deliberate signal that team members are the page's anchors.
- **`.page-why-it-didnt-work td:first-child`** — Mono uppercase cyan in the first table column. Same pattern as table headers — first column functions as a row eyebrow.

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-08 | Initial DESIGN.md created via `/design-consultation` | Reverse-engineered the shipped system in `app/globals.css` and applied targeted refinements. |
| 2026-05-08 | **Display: Space Grotesk → Fraunces** | Space Grotesk is the AI-slop convergence font. Fraunces (variable serif with optical sizing) gives memorial gravity that matches the "closure record" content. |
| 2026-05-08 | **Body: Inter → General Sans** | Inter is the same convergence trap. General Sans is neutral but distinct. |
| 2026-05-08 | **Fonts actually loaded** | Previous `font-family` declarations referenced fonts that were never loaded — site was rendering in `system-ui`. Added `@import` for all three families. |
| 2026-05-08 | **Palette compression: cyan-only** | Removed unused `--accent-magenta`, `--accent-green`, `--accent-secondary`, `--glow-strong`. Three accents on a memorial site read as synthwave; one accent reads as archive. |
| 2026-05-08 | **Hover glow scoped to `.glow-link`** | Universal `a:hover` text-shadow caused citation-dense pages to flicker. Glow is now opt-in, used only for the wordmark. |
| 2026-05-08 | **Radial gradient opacity 0.12 → 0.04** | The brighter wash anchored the page to "tech demo lighting." A near-imperceptible wash reads as ambient. |
| 2026-05-08 | **Added `--size-h4`** | MDX content regularly hits 4 heading levels; the scale was missing one. |
| 2026-05-08 | **Tracking-hero −0.04em → −0.02em** | Fraunces' serifs need more breathing room than Space Grotesk's tighter forms required. |

## Rules for Future Edits

1. **Don't add a second display font.** The Fraunces / General Sans / JetBrains Mono trio is the whole voice. Adding a fourth dilutes it.
2. **Don't reintroduce magenta or lime green.** If you need a second accent for a specific role, propose it in the Decisions Log first with a concrete usage count.
3. **Don't put `text-shadow: var(--glow-primary)` on universal selectors.** It must be scoped to `.glow-link` or a similarly intentional class.
4. **Don't add bubble border-radius.** Squared corners are part of the archive register.
5. **Mono-uppercase is reserved for eyebrow/metadata.** Don't use it for body content or h1-h4 — that's Fraunces' job.
6. **All borders use `--rule-faint` or `--rule-strong`.** Don't introduce ad-hoc border colors.
7. **Test at 1440px AND 2560px.** The clamp scale is fluid; verify hero size doesn't run letters together at the largest viewports.

## Open Questions

- **`next/font` migration?** Currently `@import` from Google Fonts + Fontshare. Self-hosting via `next/font/google` (Fraunces, JetBrains Mono) and `next/font/local` (General Sans) would eliminate FOUT and the third-party hit. Defer until/unless FOUT is reported.
- **Light mode?** Site is dark-only. A light variant has not been designed; the dark canvas is part of the archive register, so adding light is a substantive design decision, not a token swap.
