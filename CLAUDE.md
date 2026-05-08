# Claude/agent instructions for www.megam.io

This is a closure / archive site for Megam Systems LLP and Rio/OS. Content is final; visual system is documented in `DESIGN.md`.

## Design System
Always read `DESIGN.md` before making any visual or UI decisions. All font choices, colors, spacing, motion, and aesthetic direction are defined there. Do not deviate without explicit user approval. In QA / design-review mode, flag any code that doesn't match `DESIGN.md`.

Quick highlights:
- Display font is **Fraunces** (serif). Body is **General Sans**. Mono is **JetBrains Mono**. Don't reintroduce Inter or Space Grotesk.
- One accent: cyan (`#00e5ff`). Don't reintroduce magenta or lime green.
- Hover glow is scoped to `.glow-link` only (currently the wordmark). Don't put `text-shadow: var(--glow-primary)` on universal selectors.
- Squared corners across the system; no bubble border-radius.

## Local checks
```bash
npm run lint
npm run build
npm run test:e2e
gitleaks dir --config .gitleaks.toml --redact .
```
