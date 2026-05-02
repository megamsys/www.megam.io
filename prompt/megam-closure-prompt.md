# Handoff Prompt — Build the Megam.io Closure Website

> **Use this prompt as-is.** It is written for an autonomous coding/content agent (Claude Code, Codex, Cursor, etc.) that can clone repos, read source, browse the web, and ship a static site to Vercel. The agent is expected to deliver a publication-ready site, not a draft.

---

## 0. Mission

Rebuild `megam.io` and `www.megam.io` as a **closure journey website** — a public, permanent record of what Megam Systems and Rio/OS were, what they shipped, who built them, and why they stopped. The audience is engineers, founders, and ex-customers who type `megam.io` into a browser expecting an explanation, not a 404.

The site is hosted on **Vercel**. The current static source lives in `github.com/megamsys/www.megam.io` (HTML) and `github.com/rioos2/www.megam.io` (SCSS). Treat both as legacy reference, not as the foundation. **Build a new static site from scratch** (Next.js App Router or Astro — your choice; pick the one that ships fastest to Vercel with zero config).

Tone target: a **systems engineer's postmortem**, not a startup obituary. No nostalgia. No "the journey continues." No emoji. No marketing voice. Cold, precise, and self-respecting.

---

## 0.1 How to use this prompt — staged gates, not one-shot delivery

Your first deliverable is **not** the website. Your first deliverable is **historical certainty**.

This work runs through six gates, each blocking the next. Do not advance until the prior gate is approved by Kishore in writing (a PR comment is sufficient). Each gate produces a specific artifact; none of them is the site.

```
Gate 1 — RESEARCH.md             What the sources actually say
Gate 2 — CLAIMS.md + TEAM_REVIEW.md + SOURCE_MAP.md + RED_FLAGS.md
                                  Every public claim, classified
Gate 3 — Content drafts only      MDX files, no styling, no design
Gate 4 — Visual implementation    Design applied, still on preview
Gate 5 — Vercel preview review    Full site, agent-readability layer working
Gate 6 — Production cutover       megam.io apex
```

The first three gates are about **factual integrity**. The last three are about **production polish**. Spending zero effort on visuals before Gate 3 is approved is correct, not lazy. A beautiful site with weak factual integrity is the failure mode this prompt exists to prevent.

If at any gate the evidence does not support what's written in this prompt — including in §2 below — the evidence wins. Note the override in `RED_FLAGS.md` and proceed.

---

## 1. Sources you must read before writing anything

Read these in order. Do not skim. Take notes as you go — most of the architecture section depends on actual code, not on what blog posts claim.

### 1.1 GitHub
- `https://github.com/megamsys` — primary org (108 repos)
  - `verticegateway` (Scala) — REST API server, ScyllaDB/Cassandra-backed
  - `vertice` (Go) — "Omni scheduler/core engine for Megam Vertice"
  - `gulp` (Go) — agent controlling app lifecycle in cloud
  - `nilavu` (JavaScript, archived) — "Open Source Cloud Management Platform"
  - `opennebula-go` (Go) — OpenNebula API client used by Vertice
  - `megam_common` (Scala) — scalazified shared libs
  - `megam_api` (Ruby) — Ruby client
  - `megam-architechture-v1` — official architecture decisions doc (read this first)
  - `chef-repo` — Chef cookbooks (Megam ran on Chef-based provisioning)
  - `devcenter.megam.io` — dev docs site source
  - `vertice.megam.io` — old marketing site source
- `https://github.com/rioos2` — Rio/OS org (17 repos)
  - `rioos-architecture-v2` — official architecture doc for the v2 system
  - `aran` (Rust), `nalperion_rust`, `openio-sdk-rust`, `metgroup` (Rust) — Rust rewrite era
  - `magudi`, `kr`, `poochi`, `beedi`, `commandcenter`, `ottavada` — components
  - Note: README points to `gitlab.com/rioadvancement` for "latest updates" — **check this GitLab org too**
- Look at commit history, not just READMEs. The story is in the timestamps.

### 1.2 Docs (live, externally hosted — link, do not rehost)
The new closure site **does not own** the docs. Two existing doc sites stay where they are; the closure site links to them prominently from the home page header and from `/products` and `/artifacts`:

1. **Megam docs** — `https://docs.megam.io` (Megam v1 / Vertice / Cloud-in-a-Box / nilavu)
2. **Rio/OS docs** — `https://docs.rioos.megam.io` (Rio/OS v2)

Also worth linking from `/artifacts` (secondary):
- `https://devcenter.megam.io` — staticgen developer docs (source: `megamsys/devcenter.megam.io`)

Crawl these sites once during research to extract the architecture, terminology, and component names actually used in the docs — the prose on `/architecture` and `/products` must match the docs' vocabulary, not invent new names.

### 1.3 Video
- `https://www.youtube.com/watch?v=2EVEJ4Sd0Ic` — Kishorekumar Neelamegam, **OpenNebulaConf 2014, "Cloud Automation for OpenNebula"**. This is a primary source for the early architecture, Megam-OpenNebula integration, and the Cloud-in-a-Box concept.
- Companion slide deck: `https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf` — "Code to Cloud with Megam and Opennebula" by Kishorekumar Neelamegam, Varadarajan Narayanan; credits Thomas Alrin and Raj Thilak.

### 1.4 Archive bundle (Google Drive)

Kishore has provided a Google Drive folder containing exports for both **Megam** and **Rio/OS**:

- **Megam archive:** https://drive.google.com/drive/folders/0B5ha35sst8q1QmNKSnZkdWd6M00?resourcekey=0-Y3mfUKohDBl4ZbpFtxvDfw
- **Rio/OS archive:** Kishore will provide the link to the agent directly. Treat with the same handling rules as the Megam folder.

This bundle is the highest-priority source — it overrides any inference made from public material. **The folder is shared via link; that does not make its contents public.** Each file inside still requires per-document classification before any of it informs public prose.

Expected contents (verify on receipt):
- Megam-side: internal architecture decisions, sales/customer notes, product roadmap docs, hack-day and conference materials, partner agreements (LINBIT, ProfitBricks).
- Rio/OS-side: enterprise deployment notes, v2 architecture decisions, GitLab transition notes, customer-facing docs, Rio Advancement / Paul Sanar correspondence relevant to §2.7.

Process the bundle as follows:
1. Download the Drive folders via `rclone` or `gdown` to `/research/archive/megam/` and `/research/archive/rioos/` in the agent's working tree. The local folder is gitignored by default — nothing in it is committed unless explicitly cleared.
2. Build an index file `/research/archive/INDEX.md` with one-line summaries per document, grouped by Megam / Rio/OS.
3. **Classify every document** with one of:
   - `public` — already in public circulation (a slide deck on SlideShare, a blog post). May be cited and linked from the public site.
   - `private-citable` — internal but Kishore has approved citing the substance. May appear as `(archive: <filename>)` in source links; the file itself stays private.
   - `private-not-citable` — internal context only, used to inform the agent's understanding but never quoted, paraphrased, or cited on the public site.
   - `discard` — not relevant to this work.
4. **No archive-derived public claim ships unless its source is `public` or `private-citable`.** This is a hard rule. Indirect leakage through summary or paraphrase of `private-not-citable` material is the same violation as direct quotation. A document being accessible via the shared Drive link does **not** make it `public`; classification is a separate step Kishore signs off on at Gate 2.
5. Classification status for every archive doc lives in `INDEX.md` and is mirrored into `CLAIMS.md` for any claim that draws on the doc.
6. If the bundle contradicts §2 of this prompt, the bundle wins. Note the override in `RED_FLAGS.md`.

### 1.5 Public web
Search for: `Megam Systems`, `megam.io`, `Rio/OS`, `Rio Advancement`, `RISE Hong Kong 2015 Megam`, `Docker Global Hack Day 2 Megam`. Crunchbase, Tracxn, ZoomInfo, and SlideShare have artifacts. Treat aggregator data as low-confidence; cross-reference with primary sources.

### 1.6 Period-accurate UI material
Kishore has provided at least one **period-accurate screenshot of the Vertice by Megam dashboard** (the `nilavu` web UI showing the dashboard with virtual machines, applications panels, marketplace navigation). This is exactly the kind of material §6.5 calls "encouraged" for `/products` and `/artifacts`. Use it. Do not retouch. Do not modernize. Mono caption: `Vertice by Megam dashboard · ~2015–2017`.

If additional screenshots arrive in the archive bundle (`verticegateway` admin UIs, Cloud-in-a-Box installer, OpenNebula talk slides, RISE Hong Kong booth photos), classify them per §1.4 and use any that come back `public` or `private-citable`.

---

## 2. Working facts and claims ledger

The items below are **working hypotheses**, not gospel. They are pre-populated from public research at the time this prompt was written; some are well-sourced, some are user-attested, some are inferred. The agent's job at Gate 1–2 is to convert this section into a properly-tagged `CLAIMS.md` ledger.

Every claim derived from this section that ends up on the public site must carry, in `CLAIMS.md`:

```
status:        verified | user-attested | inferred | unverified
source:        URL, repo path, archive filename, or "Kishore (signoff date)"
public-safe:   yes | no | needs approval
page:          /timeline | /architecture | /products | /team | etc.
```

Rules for advancing a claim from "in this prompt" to "on the public site":
- `verified` (primary public source) → ships freely
- `user-attested` (Kishore confirmed in PR review) → ships with no qualifier
- `inferred` → ships only if labeled `(inferred)` inline AND noted in `CLAIMS.md`
- `unverified` → does not ship; stays in `RED_FLAGS.md` until resolved

The pre-populated content below is a **head start, not a foundation**. If primary sources contradict it, the sources win.

### 2.1 Company
- **Founded:** July 2012 (per founder's own LinkedIn position record). Megam Systems was registered as a partnership ~March 2013, so March 2013 is the correct date for "company existed under this name." Treat **July 2012 as the project start, March 2013 as the company registration**, and surface both on `/timeline`.
- **"Megam"** is Tamil (மேகம்) for "cloud."
- **Founders:** Kishorekumar Neelamegam (Founder), Varadarajan Narayanan (Co-founder, Chief Architect; brief interim CEO; anchored OpenNebula and LINBIT partnerships; founded the Cloud-in-a-Box product).
- **Acquired / merged into Rio Advancement Inc.** (`rio.digital`) — reflected in LinkedIn and X/Twitter bios.
- **Funding:** none raised. Bootstrapped throughout.

### 2.2 Phase periodization (use these as the timeline spine)

The story has **three distinct phases**, not a slow fade. Render them as the structure of `/timeline`:

- **Phase 1 — Megam (Jul 2012 – Jul 2017, ~5 years 1 month).** Founding, public emergence (OpenNebulaConf 2014, Docker Global Hack Day 2014, RISE Hong Kong 2015), 12 paying customer accounts, partner relationships (LINBIT, ProfitBricks). Architecture: Scala/Akka control plane, Chef-based execution, OpenNebula underneath.
- **Phase 2 — Rio/OS (Jul 2017 – Oct 2018, ~1 year 4 months).** Rust rewrite as a private-cloud OS. Rio/OS engagements were **CogMob** (enterprise pilot) and **ServerNet** (pilot enterprise customer). **Intergrid** belongs to the Megam-era SMB pilot/customer story. **DET.io** belongs to Megam as a partner, not as a customer and not as a Rio/OS partner. Acquisition by Rio Advancement Inc. happens in or around this window.
- **Phase 3 — Pivot (Oct 2018).** The team moves to **Lendsmart / Getattune**. Rio/OS development winds down. Repos go quiescent. This is the closure event — a definite pivot, not a slow stall.

The Megam and Rio/OS codebases remain open source on GitHub (`megamsys/*` and `rioos2/*`). Some Rio/OS work continues at `gitlab.com/rioadvancement` after the pivot, but the active product-building era ends in October 2018.

### 2.3 Public milestones (events to anchor `/timeline`)
- **2012-07** — Megam project starts.
- **2013-03** — Megam Systems registered, Chennai.
- **2014-Q4** — Docker Global Hack Day #2 (Oct/Nov 2014). The "2nd place global" claim is repeated internally — verify against `https://blog.docker.com/2014/11/announcing-docker-global-hack-day-2-winners/` and present truthfully (e.g., "regional/category" if global cannot be confirmed).
- **2014-12** — OpenNebulaConf 2014 (Berlin): Kishore presents "Cloud Automation for OpenNebula" (YouTube video above).
- **2015** — RISE Hong Kong: exhibited.
- **~2015–2017** — Megam customer base grows to 12 named accounts (see §2.5).
- **2017-07** — Rio/OS phase begins. New `rioos2` GitHub org. Rust rewrite of the control plane.
- **~2017–2018** — Rio/OS enterprise pilots: CogMob and ServerNet. Intergrid remains in the Megam-era SMB pilot/customer story; DET.io remains a Megam partner.
- **~2018** — Acquisition / merger into Rio Advancement Inc. (verify exact date from archive bundle). The acquisition included a promise of seed funding to extend Rio/OS development; the funding did not fully materialize. See §2.7.
- **2018-10** — Team pivots to Lendsmart / Getattune. Active product development on Megam and Rio/OS ends. Closure event.
- **Post-2018** — Some Rio/OS work continues at `gitlab.com/rioadvancement`; main GitHub repos quiescent.
- **2026** — Closure site published. Megam and Rio/OS confirmed fully open source.

### 2.4 Tech stack (verified from repo languages)
- **Megam (v1):** Scala (Akka, scalaz) for control plane, Go for scheduler and agents, Ruby for SDK/API, Chef for provisioning, ScyllaDB/Cassandra for state, NSQ for messaging.
- **Rio/OS (v2):** Rust rewrite of the control plane, with Go components retained. Rebuilt ground-up. Architecture doc lives at `rioos2/rioos-architecture-v2`.
- **Frameworks supported by Megam PaaS:** Java, Ruby on Rails, Node.js, Play (Scala), Akka (Scala). Source-cloud connectors: GitHub, Bitbucket, Cloudforge, Assembla, Gogs.
- **CAMP/TOSCA compliance** claimed in the 2014 deck. **Cloud-in-a-Box** was the on-prem packaged form.
- **Partners** (per public profiles): LINBIT (DR), ProfitBricks (IaaS).

### 2.5 Customers and engagements

This section is the source of truth for the customer claim previously stated as "10+ hosting customers." The actual list is 12 named Megam accounts plus 3 Rio/OS engagements. **All names are cleared for public listing on `/products`.**

**Megam customers (Phase 1, all pre-October 2018):**

Kishore has approved all 12 names for public credit. Render them on `/products` as a flat list (alphabetical or grouped by category — agent's call, but consistent across the page). Categories below are working notes for the agent; the public render does not need the category column.

| Customer | Category | Public-safe |
|---|---|---|
| Alternative-Energies.fr | sector-specific (energy / FR) | yes |
| Astimp.ro | hosting (RO) | yes |
| AtomDeploy.com | deployment-tooling-adjacent | yes |
| FlexVPC | hosting / VPS | yes |
| INTERGRID | hosting (also a Rio/OS pilot — see below) | yes |
| Jonathan Rack Servers | hosting — Jonathan Philipos's earlier hosting business, predating DET.io / VirtEngine. See §2.6. | yes |
| MilesWeb.com | hosting (IN-based, still operating) | yes |
| QuadCloud | hosting / cloud provider | yes |
| Quadcloud update | second engagement with QuadCloud (separate phase / contract); render this together with the QuadCloud entry on the public page rather than as two separate items | yes |
| RioCorp | enterprise / cloud | yes |
| Simha Online | hosting | yes |
| TIC Servicios | hosting | yes |

**Rio/OS engagements (Phase 2, Jul 2017 – Oct 2018):**

| Engagement | Type | Notes |
|---|---|---|
| CogMob | Enterprise customer | Rio/OS production deployment. |
| Intergrid | SMB pilot | Same Intergrid that appears in the Megam customer list — relationship continued from Phase 1. |
| DET.io | **Megam partner**, not customer | Jonathan Philipos's company. Built the VirtEngine product on the Megam codebase. DET.io was associated with Megam only: not a customer and not a Rio/OS partner. See Group B in §2.8 (Team) and §2.6 below. |

This corrects the previous "3+ enterprise deployments" phrasing — the actual count is **2 enterprise customers + 1 partner**, which is materially different and should be stated truthfully on `/products` and `/why-it-didnt-work`.

### 2.6 The Jonathan Philipos relationship arc

Worth surfacing on `/products` or `/artifacts`: Jonathan Philipos appears in this story three times, in three different roles, across both phases.

1. **Megam customer (Phase 1)** — as "Jonathan Rack Servers" in the customer list. He ran a hosting business that used Megam.
2. **Megam partner** — DET.io was associated with Megam, not Rio/OS. Kishore's stated wish: thank him on the public site for that Megam partnership.
3. **Downstream commercial integrator (post-2018)** — DET.io / VirtEngine forked the Megam codebase and built a commercial cloud-management product on top of it (`virtengine/virtengine`, `virtengine/bosun`).

This progression — customer → partner → downstream successor — is unusual and worth one sentence on the public site. It also reinforces a `/lessons` point: the technical bet was implementable as a viable product; just not by Megam, with that team, at that time.

### 2.7 The pivot to Lendsmart / Getattune (October 2018)

The closure event was a **decision**, not a decay. The decision had a specific cause and a specific destination. State both, in flat language, on `/products` (closing paragraph), `/timeline` (the Oct 2018 entry), and `/why-it-didnt-work` (a dedicated row in the failure table).

**What happened:**

- Megam Systems was acquired by Rio Advancement Inc., led by **Paul Sanar**. The acquisition came with a promise of seed funding to extend Rio/OS development.
- The promised funding **did not fully materialize**. Rio/OS work continued for as long as the existing runway allowed.
- During this period, the team met **AK Patel** (founder of Lendsmart) — introduced through Paul Sanar. The introduction came at a product demo.
- In October 2018, the team pivoted: relocated to Lendsmart and Getattune. Kishore eventually became co-founder of Getattune.
- Megam and Rio/OS codebases remained open source under their original licenses.

**How to write this on the public site:**

- **Past tense throughout.** "The acquisition came with a promise of seed funding that did not fully materialize." Not "we were promised but never received."
- **No bitterness.** This is a postmortem, not a grievance. State the fact and move on.
- **No protective vagueness either.** "Funding fell through" is too euphemistic. The funding was promised, the funding did not arrive, that fact triggered the pivot. Say so.
- **Name names truthfully.** Paul Sanar and AK Patel both appear in the story by full name. Kishore has approved both for the public site.
- **Acknowledge Jonathan Philipos.** A single sentence on `/products` thanking him for the Megam partnership. Form: "DET.io was a Megam partner, not a customer. Megam is grateful." No more, no less.

**The story is permitted controlled emotional weight here, where it is factually earned.** Gratitude to a partner who stayed, and an honest statement that a funding promise didn't materialize, are not violations of the "no emotion" rule — they are acknowledgments of fact. The voice/chrome separation rule (§6.8) bars *sentimental* prose, not *truthful* prose about people and events. If the agent finds itself softening either to "match the cold tone," it has misread this section: the cold tone is for *euphemism avoidance*, not for *fact suppression*.

### 2.8 Team

These are the people. Use exactly these names and links. **Do not invent or pad the team.** The list below combines the four members visible on the `megamsys` GitHub org People page with the additional contributors Kishore identified directly. Treat anyone not on this list with skepticism — random forkers should not appear on `/team`.

The team page should be split into two clear groups so the reader understands the relationship to Megam:

**Group A — Megam / Rio/OS team (employees and core contributors):**

| Name | Role at Megam / Rio/OS | LinkedIn | GitHub |
|---|---|---|---|
| Kishorekumar Neelamegam | Founder | https://www.linkedin.com/in/kishorekumarneelamegam/ | https://github.com/indykish |
| Varadarajan Narayanan | Co-founder and Chief Architect; brief interim CEO. Anchored the partnerships with **OpenNebula** and **LINBIT**, and founded the **Cloud-in-a-Box** product. | _verify with Kishore — multiple "Varadarajan Narayanan" profiles on LinkedIn; do not pick the wrong one_ | _verify_ |
| Thomas Alrin | Infrastructure Lead | _verify_ — SlideShare profile available: https://www.slideshare.net/thomasalrin | https://github.com/thomasalrin |
| Rajthilak R | Platform / Full-stack Engineer | https://www.linkedin.com/in/rajthilak-r8072/ | https://github.com/rajthilakmca |
| Vijayakanth Mathaiyan | Platform / UI Engineer | _verify with Kishore — multiple Vijayakanths on LinkedIn_ | https://github.com/vijaykanthm28 |
| Rajesh Rajagopal | Engineer (bio: Megam Systems, Chennai) | _verify — common name; do not guess_ | https://github.com/rajesh-rajagopal |
| Yeshwanth Kumar | Core engineering — TOSCA/CAMP orchestration, SCM integrations (GitHub/Gogs/GitLab), Docker orchestration, Meglytics analytics, Cloud-in-a-Box strategy | https://www.linkedin.com/in/yeshwanthk | https://github.com/morpheyesh |
| Rathish | Engineer — opennebula-go, vertice, vertice_gateway, OpenIO/Rio/OS Rust SDK; bio lists `@megamsys` and `@rioadvancement` | _verify_ | https://github.com/rathishvbr |
| vino (full name TBC with Kishore) | Engineer — chef-repo, vertice, radosgw-s3 (Ceph S3) | _verify_ | https://github.com/vinomca-megam |
| ranjithamca | Engineer (bio: megamsystems, chennai) — chef-repo, buildpacks, application_php cookbooks; full name TBC | _verify_ | https://github.com/ranjithamca |
| Suganya Kaliyamoorthy | Engineer — gitpackager, gulp agent, libmegdc, megdc, devcenter; Megam/VirtEngine packaging | _verify_ | https://github.com/suganyakaliyamoorthy |
| Logesh Eswar | Engineer — nilavu UI, megamd engine fork, packager | _verify_ | https://github.com/LogeshEswar |
| Balaji (full name TBC with Kishore — handle `balajisek`) | Engineer — nilavu, megam_1_15 / megam_1_1 work, meghack | _verify_ | https://github.com/balajisek |
| Kanimozhi Kishorekumar | HR | https://www.linkedin.com/in/kanimozhi-kishorekumar-0465691a1/ | — |

**Group B — Downstream / Successor projects (commercial integrator built on Megam, not a Megam employee — clearly label as such):**

| Name | Relationship to Megam | LinkedIn | GitHub |
|---|---|---|---|
| Jonathan Philipos | Founder of **DET.io / VirtEngine** (Sydney). VirtEngine forked and built on top of Megam (`virtengine/virtengine`, `virtengine/bosun`); his personal repos fork heavily from `megamsys/`. Likely the most prominent external commercial user of the Megam codebase. | https://www.linkedin.com/in/jonathanphilipos | https://github.com/jaeko44 |

**Hard rules on the team page:**
1. **Do not list current employers.** The team page captures who built Megam and Rio/OS, not where they work today. The agent attaches the LinkedIn link — that is sufficient for anyone who wants to see what someone is doing now. Do not crawl LinkedIn or scrapers to populate "current company" fields.
2. If a LinkedIn URL is marked `_verify_`, **ship the page without a link** rather than with the wrong one. Wrong attributions on a closure site are expensive to undo. The agent must produce a single review checklist asking Kishore to fill in or confirm each `_verify_` slot before launch.
3. Do **not** label Jonathan Philipos as a Megam employee. He is a **downstream commercial integrator**. The Group A / Group B split must be visible to the reader without making them read carefully.
4. For team members whose full name is uncertain (e.g. `vino`, `ranjithamca`, `balajisek`), use the GitHub handle as the display name in italics until Kishore confirms the full name. No guessing.
5. No headshots unless Kishore provides them. Initials avatars are acceptable. No AI-generated portraits under any circumstance.
6. One short paragraph per person: role at Megam / Rio/OS, what they shipped (cite a repo, commit, or partnership). No careers timeline. No "where they are now." No "passionate about cloud."
7. Order Group A roughly by tenure / seniority, with founders first. Group B comes after Group A under its own clearly-labeled heading.

---

## 3. Site structure

Build these routes. Each is its own page, prerendered at build time. No client-side data fetching for content.

```
/                       → index — one-screen explanation of what this site is
/timeline               → dated, sourced timeline
/architecture           → Megam v1 + Rio/OS v2 architecture, compared to modern K8s
/products               → Megam (PaaS/CMP) + Rio/OS (private cloud OS) split
/team                   → people, roles, current whereabouts
/why-it-didnt-work      → systems-failure analysis (the most important page)
/artifacts              → repos, docs, videos, decks, releases
/lessons                → hard-earned, tied to specific failures
```

Add `/colophon` with: build info, source repo, license (CC-BY-4.0 for prose, original code repos keep their original licenses), and a "corrections welcome" mailto.

---

## 4. Voice and editorial rules

These are non-negotiable. The agent must enforce them on its own output.

1. **No marketing voice.** No "innovative," "passionate," "journey," "ecosystem," "empower," "unlock." If a word would appear on a SaaS pricing page, cut it.
2. **No emotion.** This is not a memoir. Closure ≠ catharsis.
3. **No emoji. No exclamation marks.** Anywhere.
4. **No hedging when facts are known.** If the fact is verified, state it. If it's inferred, mark it `(inferred)`.
5. **Cite sources inline** in a footnote-style sidebar — every non-trivial claim links to a repo, commit, doc, slide, video timestamp, or Drive file.
6. **Past tense.** Megam *was*. Rio/OS *was*. Not "is open source" — "remains open source under MIT/Apache-2.0 at github.com/megamsys."
7. **Say what didn't work.** The `/why-it-didnt-work` page is the spine of the site. Soft language there is a failure.
8. **No filler illustrations.** If a diagram doesn't carry information, delete it.

---

## 5. Page-by-page specification

### 5.1 `/` (Home)
Single screen. Above the fold:
- One sentence: what Megam was. One sentence: what Rio/OS was. One sentence: why this site exists.
- Six links to the inner pages, plain text.
- A persistent header (or a clearly-labeled block on the home page) linking to the two live doc sites: **Megam docs** (`https://docs.megam.io`) and **Rio/OS docs** (`https://docs.rioos.megam.io`). These are external, hosted elsewhere — link out, do not iframe, do not rehost.
- A single primary artifact: the architecture diagram from `megamsys/megam-architechture-v1` (re-rendered, not screenshotted).
- No hero image. No CTA. No footer beyond colophon link.

### 5.2 `/timeline`
A vertical, year-anchored timeline organized into the **three phases** named in §2.2: Megam (2012–2017), Rio/OS (2017–2018), Pivot (2018). Each phase gets a clear visual break — a section header and additional vertical breath — so the reader can see the structure at a glance.

Each entry: date, one-line headline, 2–4 sentences of substance, source link. Use §2.3 as the entry list:

**Phase 1 — Megam (Jul 2012 – Jul 2017):**
- **2012-07** — Megam project starts (per founder's LinkedIn position record).
- **2013-03** — Megam Systems registered as a partnership in Chennai.
- **2014** — First public architecture: Scala control plane, Chef-based provisioning, OpenNebula integration. Megam 0.5 adds Docker support, CAMP/TOSCA compliance, Cloud-in-a-Box.
- **2014-Q4** — Docker Global Hack Day #2 participation (verify ranking per §2.3).
- **2014-12** — OpenNebulaConf Berlin: Kishore presents "Cloud Automation for OpenNebula."
- **2015** — RISE Hong Kong exhibition. Hosting customer base grows.
- **~2015–2017** — Vertice/Verticegateway era. Active development on `vertice`, `gulp`, `nilavu`, `verticegateway`. 12 named customer accounts (per §2.5).

**Phase 2 — Rio/OS (Jul 2017 – Oct 2018):**
- **2017-07** — Rio/OS phase begins. New `rioos2` GitHub org created. Rust rewrite of the control plane.
- **~2017–2018** — Rio/OS engagements: CogMob (enterprise pilot) and ServerNet (pilot enterprise customer). Intergrid belongs to the Megam-era SMB pilot/customer story. DET.io was a Megam partner, not a customer and not a Rio/OS partner.
- **~2018** — Acquisition / merger into Rio Advancement Inc., led by Paul Sanar. The acquisition came with a promise of seed funding to extend Rio/OS development; that funding did not fully materialize. See §2.7.

**Phase 3 — Pivot (Oct 2018 onward):**
- **2018-10** — Team relocates to **Lendsmart / Getattune**. Kishore eventually becomes co-founder of Getattune. Active product development on Megam and Rio/OS ends. The pivot is a decision, not a decay — caused by the unfulfilled funding promise above and made possible by an introduction (through Paul Sanar) to AK Patel, founder of Lendsmart.
- **Post-2018** — Some Rio/OS work continues at `gitlab.com/rioadvancement`. Main GitHub repos go quiescent.
- **2026** — This closure site published. Megam and Rio/OS remain fully open source under their original licenses at `github.com/megamsys` and `github.com/rioos2`.

Where dates are uncertain, write `~YYYY-MM` and link the commit. Where dates conflict between sources, prefer the founder's LinkedIn position record over Crunchbase / Tracxn.

### 5.3 `/architecture`

Two halves: **Megam v1** and **Rio/OS v2**. Then a third section: **vs modern Kubernetes**.

For **each** system, document:
- **Control plane** — what scheduled work, what stored state, what spoke to whom.
  - Megam v1: `verticegateway` (Scala, REST + auth) → ScyllaDB; `vertice` (Go, scheduler) consumed work via NSQ.
  - Rio/OS: rewritten in Rust; document the actual components from `rioos-architecture-v2`.
- **Execution layer** — how user workloads ran.
  - Megam v1: `gulp` agents on VMs, Chef cookbooks for app lifecycle, Docker support added in 0.5, OpenNebula-managed VMs underneath.
  - Rio/OS: document from source.
- **Networking assumptions** — flat? overlay? VLAN? What did it assume about the substrate?
- **State** — single ScyllaDB/Cassandra cluster? per-tenant? backup/recovery story?
- **Multi-tenancy** — boundaries, isolation, blast radius.
- **Provisioning** — Chef vs. immutable images vs. operators.

Render diagrams as SVG, generated from a Mermaid/d2 source committed to the site repo. Do **not** embed images of whiteboards.

The K8s comparison must be specific, not aspirational:
- Megam's `verticegateway` ↔ kube-apiserver (REST, auth, central state) — but ScyllaDB instead of etcd.
- Megam's `vertice` ↔ kube-scheduler + controller-manager fused.
- Megam's `gulp` ↔ kubelet (per-node agent, lifecycle).
- Chef cookbooks ↔ container images + operators.
- No equivalent of CRDs, no equivalent of admission controllers, no declarative reconciliation loop in the K8s sense — Megam was imperative.
- Rio/OS moved closer to the K8s shape but still kept its own object model.

This page sets the credibility for the rest of the site. Get the details right or cut them.

### 5.4 `/products`

Two clearly separated subsections, each tied to its phase per §2.2.

**Megam (Phase 1 — Jul 2012 to Jul 2017)**
- Products: Vertice (the cloud management platform), Cloud-in-a-Box (on-prem package), nilavu (web UI).
- Target user: hosting providers and SMBs running OpenNebula or hybrid clouds. Not developers at scale-ups; operators of small clouds.
- Core features: PaaS for Java/Rails/Node/Play/Akka; multi-cloud connectors; Cloud-in-a-Box on-prem package; visual Docker; backup and DR via DRBD/LINBIT; cloud bursting plugins.
- **Customers:** 12 named accounts across hosting providers in IN, FR, RO, and elsewhere. See §2.5 for the full list. Display the customer logos or names on this page **only after Kishore confirms each name is `public-safe` at Gate 2** — see §2.5.
- Strengths: real cloud-agnostic abstraction in 2014–2015, before this was table stakes; Chef-based extensibility; functional Scala core; honest open source under MIT.
- Limitations: imperative orchestration; Chef coupling made fast iteration hard; ScyllaDB as primary state was rare and operationally heavy for users; the PaaS framework list aged out (Play and Akka stopped being mainstream targets); no community traction outside the founding team.

**Rio/OS (Phase 2 — Jul 2017 to Oct 2018)**
- Why it was created: to be a private-cloud **operating system**, not a PaaS — owning the kernel-to-control-plane path for enterprise data centers.
- What changed technically: Rust rewrite of the control plane; deeper system integration; new object model; some work continued at `gitlab.com/rioadvancement` after the team pivot.
- **Engagements:** CogMob as an enterprise pilot and ServerNet as a pilot enterprise customer. Intergrid belongs to the Megam-era SMB pilot/customer story. DET.io / Jonathan Philipos belongs in the Megam partner story, not Rio/OS. See §2.5.
- Why it increased complexity: simultaneous maintenance of v1 (Megam) and v2 (Rio/OS); two product narratives, two codebases, one team. Selling a "private cloud OS" against VMware, OpenStack, and the rising tide of Kubernetes meant a far harder GTM than selling a PaaS to hosting providers.

**The pivot to Lendsmart / Getattune (Phase 3 — Oct 2018):**

Close the `/products` page with a short, factual block (3–5 sentences, not its own subsection) telling the actual story per §2.7:

- Megam Systems was acquired by Rio Advancement Inc., led by Paul Sanar. The acquisition came with a promise of seed funding to extend Rio/OS development.
- That funding did not fully materialize. Rio/OS work continued for as long as the existing runway allowed.
- During this period, Kishore met AK Patel, founder of Lendsmart, through Paul Sanar. The introduction came at a product demo.
- In October 2018, the team relocated to Lendsmart and Getattune. Kishore eventually became co-founder of Getattune.
- Both Megam and Rio/OS codebases remain open source under their original licenses.

Then, on its own line as a separate small block, end the page with: **"DET.io was a Megam partner, not a customer. Megam is grateful."** No more, no less. This is the only sentence on the entire site that thanks anyone. It is factual and earned.

Do not euphemize. Do not soften. "The funding did not fully materialize" is the right phrasing — not "circumstances changed," not "priorities shifted." The pivot was caused by a specific funding outcome and led to a specific destination.

### 5.5 `/team`
Use the team table in §2.8. Render as **two clearly separated sections**: Group A (Megam / Rio/OS team) first, then Group B (Downstream / Successor projects) under a distinct heading. One paragraph per person: role at Megam / Rio/OS, what they shipped (link a repo, commit, or partnership). **Do not include current employer** — see §2.8 rule 1. The LinkedIn link is sufficient for anyone curious about what someone is doing today. No headshots unless Kishore provides them. Anyone whose full name or LinkedIn is `_verify_` ships without that link until Kishore signs off.

### 5.6 `/why-it-didnt-work`

This page is the spine of the site. It must hold up to a skeptical reader.

The table below is a **hypothesis**, not a conclusion. The agent's job is to substantiate, revise, or delete each row, with evidence. **No row may survive without evidence.** Evidence means: a public artifact (commit, repo metric, conference talk, customer count, news article), or a Kishore-attested archive document (with archive citation in `CLAIMS.md`), or both. Pure inference does not qualify; if a row's claim cannot be evidenced, the row is cut from the public page and moved to `RED_FLAGS.md` for follow-up — not softened, cut.

Render the surviving rows in the format described in §6.6 (hairline-separated rows, monospace small-caps `<Layer>` in accent color, body prose for `<Failure>`).

**Hypothesis table (treat as draft):**

| Layer | Hypothesis (substantiate, revise, or cut) |
|---|---|
| Market | Cloud Management Platforms commoditized fast (2015–2018). Kubernetes subsumed orchestration. Buyers for a PaaS-on-OpenNebula moved to AWS/Azure/GCP, and K8s became the default for private cloud. → Evidence needed: K8s adoption curve vs. CMP M&A activity in that window; Megam customer churn data from archive (§2.5). |
| Product | Two simultaneous products (Megam v1, 2012–2017; Rio/OS v2, 2017–2018) with one small team. Imperative + Chef-based design aged out as declarative, image-based, GitOps systems took over. Scala/Akka/scalaz core limited contributor on-ramp. → Evidence needed: commit timestamps showing parallel work on both codebases; star/fork/contributor counts on `megamsys/*`. |
| Distribution | Bootstrapped from Chennai, no enterprise sales motion, no developer-relations function. 12 named hosting customers in Phase 1 (§2.5) — concentrated in small hosting providers, none large enough to anchor an expansion motion. → Evidence needed: customer list (already in §2.5); absence of DevRel hires/team page entries. |
| Capital | No external funding pre-acquisition. Runway via consulting and small-customer revenue. The Rust rewrite (Phase 2) happened on the same team operating v1. **Acquisition by Rio Advancement included a promise of seed funding to extend Rio/OS development; that funding did not fully materialize, and that outcome was the proximate trigger for the October 2018 pivot.** → Evidence needed: Crunchbase/Tracxn funding rows (already verified: zero pre-acquisition); team-size signals from GitHub; archive notes confirming the funding promise and its non-arrival (§2.7). |
| Org | Phase 2 was short — only ~16 months — with CogMob as an enterprise pilot and ServerNet as a pilot enterprise customer. Intergrid and DET.io should not be counted as Rio/OS engagements. The acquisition reshaped priorities toward enterprise deployments rather than community growth. → Evidence needed: timing of repo activity dropoff vs. October 2018 pivot; archive notes from Kishore on the pivot decision. |
| Timing | Founded 2012; Docker GA 2014; Kubernetes 1.0 2015. Cloud-in-a-Box was directionally right but implementation-locked to OpenNebula and Chef just as the industry pivoted. By the time Rio/OS shipped in 2017, K8s was already the default mental model for private cloud. → Evidence needed: dated artifacts from the OpenNebula talk (2014), Megam 0.5 release (Docker support added), the rioos2 first commit (2017), and the last meaningful product commit pre-pivot (~Oct 2018). |
| Pivot | The closure event was a **decision, not a decay**. In October 2018 — after the promised post-acquisition funding did not fully materialize — the team relocated to Lendsmart and Getattune, where they continued working together (Kishore eventually became co-founder of Getattune). Product development on Megam and Rio/OS effectively ended that month. This row exists because closure is itself a fact worth stating clearly, not a tail to other facts. → Evidence needed: the Oct 2018 date confirmed from team LinkedIn position records; commit activity dropoff on `megamsys/*` and `rioos2/*` after that date; archive material on the Rio Advancement funding outcome.

For each row that survives:
- One sentence stating the failure or pivot, in the past tense.
- One sentence of evidence with an inline source link (or `(archive: <filename>)` for archive citations).
- Nothing else. No commentary. No "in retrospect."

This page must read like a postmortem an outsider could verify, not a thesis the team is defending.

### 5.7 `/artifacts`
A flat, scannable list. No marketing copy.

- **Repos (primary):** `megamsys/verticegateway`, `megamsys/vertice`, `megamsys/gulp`, `megamsys/nilavu`, `megamsys/opennebula-go`, `megamsys/megam-architechture-v1`, `rioos2/rioos-architecture-v2`, `rioos2/aran`.
- **Docs (linked, not rehosted):**
  - Megam: `https://docs.megam.io`
  - Rio/OS: `https://docs.rioos.megam.io`
  - Developer center: `https://devcenter.megam.io`
- **Talks:** OpenNebulaConf 2014 video (`https://www.youtube.com/watch?v=2EVEJ4Sd0Ic`), OpenNebula 2014 slide deck (`https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf`).
- **Acquirer:** rio.digital (Rio Advancement Inc.).
- **Successor activity:** `gitlab.com/rioadvancement` — where Rio/OS development continued after GitHub.
- **Downstream / fork lineage:** `github.com/virtengine` and `det.io` (Jonathan Philipos, Sydney) — a commercial cloud-management product built on top of the Megam codebase. Worth surfacing because it shows the technical bet was implementable as a product, just not by Megam at the time.
- **Notable releases / commits:** identify and link the Megam 0.5 release (Docker + Cloud-in-a-Box), the first `rioos2` commit, and the last meaningful commit on `verticegateway`. These three timestamps frame the whole arc.
- **Archive bundle (private):** if Kishore approves, a download link to a curated, reviewed subset of the Google Docs archive bundle described in §1.4. Default to **not publishing** — link only what has been explicitly cleared. Most archive material should remain a research source for `RESEARCH.md`, not a public asset.

### 5.8 `/lessons`
Each lesson must be tied to a specific failure already named on `/why-it-didnt-work`. No generic startup wisdom. Examples (rewrite in your own words; do not copy verbatim):

- Building a PaaS on top of someone else's IaaS abstraction (OpenNebula) means your fate is tied to that abstraction's adoption curve.
- Two products, one team, no funding is three constraints. Pick which two you'll respect.
- An imperative Chef-based control plane is portable when you build it; it is a liability the moment Kubernetes becomes the default mental model for orchestration.
- "Open source" without a community-growth function is just a public license; it does not generate distribution.
- A category-defining technical bet (Cloud-in-a-Box predicting private-cloud-as-a-product) does not pay if the implementation locks you to a stack the market is leaving.
- A pivot is cheaper than a parallel rewrite. Running v1 and v2 simultaneously costs more than the rewrite itself.

---

## 6. Design and UX direction (high level)

Implementation-level detail — exact easing curves, motion timings, glow blur values, OG card pixel layout, icon stroke widths, mobile breakpoints — lives in **`DESIGN.md`**, a companion file the agent reads at Gate 4 (visual implementation). Not at Gate 1, 2, or 3. The detail is real and binding, but it is not the right thing to be reading while writing the postmortem.

This section in the main prompt covers only the constraints that affect *editorial decisions*. If a design choice would change what the prose says, it belongs here. Otherwise, it belongs in `DESIGN.md`.

### 6.1 Visual direction

The site's voice is cold, but its surface is not. Treat this as the deliberate tension: **the prose reads like a postmortem; the chrome around the prose feels like a late-night terminal in 2026**. Neon, fluid, slightly funky — but never at the expense of legibility or the editorial tone. If you can't decide whether a flourish belongs, cut it.

Imagine a developer-focused dashboard from a well-funded infra company in 2026: dark canvas, one or two electric accent colors that glow rather than shout, generous whitespace, a monospace presence in the typography. Sections breathe. Lines are crisp. Funky comes from typographic contrast, asymmetric layout, and unusual section transitions — not from rounded blob shapes or pastel gradients.

### 6.2 Color palette (high level)

- **Canvas:** near-black, never pure black.
- **Primary accent:** one neon hue. **Recommended: electric cyan**, with acid green and hot magenta as alternatives.
- **Secondary accent:** at most one complementary hue, used sparingly.
- **Two accents site-wide. No more.** This discipline is the design.
- **No gradients on primary surfaces.** A single radial glow behind hero text on `/` is the only exception.
- Exact hex values, opacity ratios, and glow specifications: see `DESIGN.md`.

### 6.3 Typography stack (high level)

- **Headings:** sharp, slightly geometric display sans (e.g. Space Grotesk).
- **Body:** Inter or similar.
- **Monospace presence:** JetBrains Mono or IBM Plex Mono for dates, source links, repo paths, section numbers.
- **No more than three typefaces.** No serif. No script.
- Exact sizes, line-heights, letter-spacing: see `DESIGN.md`.

### 6.4 Motion principle (high level)

All motion is fluid (not bouncy) and short (200–400ms typical, 600ms ceiling). Motion is a tool to acknowledge the document is alive, not to entertain. Anything that loops indefinitely is forbidden. Everything respects `prefers-reduced-motion: reduce`. Specific easing curves and per-element behavior: see `DESIGN.md`.

### 6.5 Imagery rules (editorial-relevant)

- No stock photography.
- No AI-generated illustrations.
- Diagrams are SVG, generated from Mermaid/d2 source committed to the repo.
- Period-accurate screenshots from `nilavu`, `verticegateway` admin UIs, and the OpenNebula talk slides are encouraged on `/products` and `/artifacts`. Do not retouch. Period accuracy beats prettiness.

### 6.6 Page-specific design notes

These notes affect how content is structured per page, so they stay in the main prompt.

- **`/`** — Hero is one sentence, large. Single radial glow behind it. Below: a small monospace block with the six section links, vertical, each with a year range. The two doc-site links sit in a fixed top-right header. The architecture diagram lives below the fold — the home page is a statement first, a teaser second.
- **`/timeline`** — Vertical timeline, year on the left in large monospace numerals. Entry text on the right. A single 1px vertical neon rule down the spine connects entries. No carousels.
- **`/architecture`** — Diagrams dominate. Side-by-side comparison (Megam v1 vs Rio/OS v2 vs Kubernetes) uses a 3-column table on desktop, stacked accordions on mobile.
- **`/why-it-didnt-work`** — The surviving rows from §5.6 render as **hairline-separated rows**, not a boxed table. `<Layer>` in monospace small-caps in the accent color; `<Failure>` in body prose. This page gets the most generous vertical space on the site.
- **`/team`** — Two clearly labeled groups (per §2.8). Each entry: name (display sans), role (monospace, accent), one-paragraph bio, then a row of small monospace links (LinkedIn, GitHub). Vertical neon rule on the left of each entry. **Group B's section header gets a different label color** so the reader doesn't conflate Jonathan Philipos with the Chennai team. **No card grid.** Cards are the lazy answer; we don't take it.
- **`/artifacts`** — A flat manifest, monospace dominant. Each item one line where possible: `<repo or doc> · <one-line role> · <link>`. Reads like a manifest, because that's what it is.
- **`/lessons`** — Numbered, large. Each lesson gets its own visual breath. Lesson number is enormous, sitting behind the lesson text.
- **`/colophon`** — Smallest page. Plain prose, no ornament.
- **`/404`** — One line: `404 · this page was never deployed`. Linked back to `/`.

### 6.7 Accessibility (non-negotiable)

- **Contrast:** WCAG AA minimum (4.5:1 body, 3:1 large text). Verify every accent-on-canvas combination.
- **`prefers-reduced-motion: reduce`:** disables all motion. Static state must equal post-animation state — never leave the page half-faded.
- **`prefers-color-scheme: light`:** the site is dark-only. Honor `color-scheme: dark`. Do not build a light theme. State this in `/colophon`.
- **Focus states:** visible on every interactive element. Never `outline: none` without a replacement.
- **Keyboard navigation:** every link reachable, in source order.
- **Alt text:** every diagram has meaningful `aria-label` or `<title>`. Screenshots get descriptive alt text.

### 6.8 The voice/chrome separation rule

This is the single most important design constraint. **The prose stays cold. The chrome carries the funk.** If the agent finds itself adding warmth or whimsy to the writing to match the visual energy, it has the relationship inverted. The visuals exist to make a serious document feel alive. They do not exist to make the document itself less serious.

If a design choice in `DESIGN.md` would require softening a sentence on `/why-it-didnt-work` to "match the vibe," cut the design choice.

---

## 7. Build, deployment, and operational rules

- **Framework:** **Next.js 15 App Router on Vercel.** Decided, not optional. Rationale: single-vendor zero-config deploy (`git push` → live), built-in `ImageResponse` for OG cards, edge caching, image optimization, Vercel Analytics, preview deployments per PR. TypeScript strict throughout. Default routes to static server components; `'use client'` is permitted only on isolated leaf components (the cursor dot, scroll-tied reveal hooks, the diagram wire-up).
- **Hosting:** Vercel. Primary domain `megam.io`, alias `www.megam.io`. HTTPS enforced. Set up the apex domain on Vercel; if DNS is currently elsewhere, document the cutover steps in the README.
- **Repo:** create `megamsys/megam.io` (new repo) under the existing org. Replace `megamsys/www.megam.io` only after the new site is verified.
- **Content format:** all prose in MDX, in `/content/<route>.mdx`. No CMS.
- **Styling:** Tailwind, configured to the design tokens in §6 and `DESIGN.md` (canvas, accents, typography stack, motion easings as theme extensions). Do not introduce a second styling system.
- **Diagrams:** Mermaid or d2 source committed; rendered to SVG at build time; embedded inline. Style per `DESIGN.md`.
- **Analytics:** Vercel Analytics only. No third-party trackers, no pixels, no Google Analytics.
- **Open Graph:** one OG card per page, generated at build time via Next.js `ImageResponse`. Black canvas, accent glow behind the page title in display sans, monospace footer with the site URL. No stock imagery.
- **Sitemap + RSS** for `/timeline` only.
- **404:** see `DESIGN.md`.

### 7.1 Agent readability — make the site machine-friendly by default

This site will be scraped. By engineers using AI research tools, by postmortem aggregators, by archive crawlers, by language models doing background reading on dead infra. Plan for that audience as a first-class consumer, not an afterthought. Three concrete requirements:

**1. Ship a `.md` twin of every page.**
For every route in §3, generate a plain-Markdown version at the same path with `.md` appended:

```
/                       → also at /index.md
/timeline               → also at /timeline.md
/architecture           → also at /architecture.md
/products               → also at /products.md
/team                   → also at /team.md
/why-it-didnt-work      → also at /why-it-didnt-work.md
/artifacts              → also at /artifacts.md
/lessons                → also at /lessons.md
/colophon               → also at /colophon.md
```

The `.md` version contains the same content as the HTML page, but stripped of presentational chrome: no neon styling, no animations, no marginalia layout — just headings, paragraphs, lists, tables, and links. Diagrams are referenced as Markdown image links pointing to the SVG (`![Megam v1 control plane](/diagrams/megam-v1-control-plane.svg)`); the alt text matches §6.7. Source citations remain inline. The MDX source in `/content/<route>.mdx` is the canonical copy; the `.md` twin is generated at build time by stripping JSX/MDX components and emitting CommonMark. Keep both in lockstep — if a build can produce HTML but not the `.md` twin, the build fails.

**2. Content negotiation by `Accept` header only.**
When an HTTP request to a page route arrives with `Accept: text/markdown`, return the Markdown twin instead of the HTML. Implement via Next.js middleware. Set `Vary: Accept` on every response so caches behave correctly. **Do not** sniff user-agents. User-agent matching is fragile, breaks debuggability, and confuses caches; the `Accept` header is the right abstraction. Agents that don't send `Accept: text/markdown` can still fetch `/timeline.md` directly — the `.md` URLs are the universal path.

**3. `llms.txt` at the root.**
Publish `/llms.txt` following the convention at <https://llmstxt.org>. Structure it like this:

```
# Megam.io

> A closure record of Megam Systems (2013–~2018) and Rio/OS (~2017–~2020s) — an open-source cloud management platform and the private-cloud operating system it became. Both are now archived. Both remain open source.

## Pages

- [Home](https://megam.io/index.md): one-paragraph summary of what this site is
- [Timeline](https://megam.io/timeline.md): dated record of milestones from founding to closure
- [Architecture](https://megam.io/architecture.md): Megam v1 and Rio/OS v2 architecture, compared to modern Kubernetes
- [Products](https://megam.io/products.md): Megam (PaaS / Cloud-in-a-Box) and Rio/OS (private cloud OS)
- [Team](https://megam.io/team.md): people who built Megam and Rio/OS
- [Why it didn't work](https://megam.io/why-it-didnt-work.md): systems-failure analysis
- [Artifacts](https://megam.io/artifacts.md): repositories, docs, talks, downstream forks
- [Lessons](https://megam.io/lessons.md): hard-earned lessons tied to specific failures

## Source code

- [megamsys on GitHub](https://github.com/megamsys): Megam v1 codebase (108 repos)
- [rioos2 on GitHub](https://github.com/rioos2): Rio/OS v2 codebase
- [docs.megam.io](https://docs.megam.io): Megam v1 documentation
- [docs.rioos.megam.io](https://docs.rioos.megam.io): Rio/OS v2 documentation
```

Also publish `/llms-full.txt` containing the concatenated Markdown of all pages, in the order above, with horizontal rules between them. This gives agents the entire site as a single retrievable document.

**4. Permissive `robots.txt` and `sitemap.xml`.**

`robots.txt` allows everything except `/research/archive/` (which is private to the build process):

```
User-agent: *
Allow: /
Disallow: /research/archive/
Sitemap: https://megam.io/sitemap.xml
```

`sitemap.xml` lists both the HTML routes and their `.md` twins, with `<lastmod>` populated from the MDX file's git-tracked modification time.

**5. Structured metadata on HTML pages.**
Every page emits JSON-LD `<script type="application/ld+json">` with `@type: "Article"` (or `"WebPage"` for `/`), populated from the MDX frontmatter: `headline`, `datePublished`, `dateModified`, `author` (`Megam Systems`), `about` (an array including `Megam`, `Rio/OS`, `cloud management platform`, etc.). On `/team`, each person gets a `Person` object with `name`, `sameAs` (their LinkedIn and GitHub URLs), and `affiliation`.

**6. Stable URLs.**
URLs are content addresses. Once `/why-it-didnt-work` is published, it does not move. If a section is reorganized later, the old URL keeps a 301 to the new one. Agents and search engines build trust in stable URLs over time; treat that trust as an asset.

**7. Plain text everywhere it can be plain text.**
Source citations in the page footer are real `<a>` tags with real `href`s — never rendered through JavaScript only. Every claim's source is reachable by a curl. Tables on `/team` and `/why-it-didnt-work` are real `<table>` elements, not divs styled to look like tables. The neon styling in §6 sits on top of semantic HTML, never replaces it.

The general rule: **the HTML is for humans, the Markdown is for agents, and both say the same thing**.

---

## 8. Gates and required outputs

Per §0.1, this work runs through six gates. Each is a PR that must be approved before the next begins. Do not collapse multiple gates into one PR.

### Gate 1 — Research

**Required outputs:**
- `RESEARCH.md` — what was found in each source from §1, with explicit gaps and inferences flagged. The audit trail.

**Approval criterion:** Kishore confirms the source coverage is complete enough to proceed. No content writing yet.

### Gate 2 — Claims ledger and team review

**Required outputs:**
- `CLAIMS.md` — every claim that will appear on the public site, one per row, tagged with `status / source / public-safe / page` per §2. No prose yet — just the ledger.
- `TEAM_REVIEW.md` — every person from §2.8, with role at Megam/Rio/OS, GitHub URL, LinkedIn URL, and an `approval status` column (`approved` | `pending Kishore` | `cannot verify`). No `team.mdx` page in the site yet.
- `SOURCE_MAP.md` — for each public page section, the repos, docs, videos, slides, and archive files it draws from. This is how the agent proves traceability before writing.
- `RED_FLAGS.md` — contradictions between sources, weak claims, missing dates, possible attribution errors, anything the agent is unsure about. Active throughout the project; updated whenever new uncertainty surfaces.

**Approval criterion:** Kishore reviews `TEAM_REVIEW.md` row by row and marks each `approved`. Only `approved` rows appear on the eventual `/team` page. Same gate: every `unverified` claim in `CLAIMS.md` is either resolved, downgraded to `inferred` with explicit labeling, or removed.

### Gate 3 — Content drafts only

**Required outputs:**
- MDX content files in `/content/<route>.mdx` for all 8 routes. **No styling, no design, no animation.** Plain HTML rendering of MDX is acceptable for review purposes.
- `/team` is rendered as `team.draft.mdx` and is **not** in the routing table. Only entries with `approval status: approved` from `TEAM_REVIEW.md` may appear in the draft.
- Every non-trivial claim in the prose is footnoted to a row in `CLAIMS.md`.
- `/why-it-didnt-work` follows §5.6: each surviving row is substantiated with linked evidence; rows that couldn't be substantiated are gone, not softened.

**Approval criterion:** Kishore signs off on `/team.draft.mdx` and `/timeline.mdx`. These are the two pages factual errors are most expensive on. After signoff, `team.draft.mdx` is renamed to `team.mdx` and added to the routes.

### Gate 4 — Visual implementation

**Required outputs:**
- Design tokens file (`/styles/tokens.css` or Tailwind config) implementing the high-level direction in §6 and the detail in `DESIGN.md` — colors, typography, easing curves — as named tokens, not hard-coded values. This is how we know the design spec was internalized rather than approximated.
- All 8 routes rendering with the design applied, on a Vercel preview.
- Diagrams (Mermaid/d2 source committed; SVG output embedded inline).

**Approval criterion:** Kishore signs off on the visual feel. Editorial content does not change at this gate; if a design choice would require softening prose, the design choice loses (§6.8).

### Gate 5 — Vercel preview review (full site)

**Required outputs:**
- Agent-readability layer per §7.1: every `.md` twin reachable, `Accept: text/markdown` content negotiation working (verified with `curl -H "Accept: text/markdown" https://<preview>/timeline`), `/llms.txt` and `/llms-full.txt` published, JSON-LD on every page, semantic HTML for tables.
- `AGENT_README.md` in the repo demonstrating each of the above with a working `curl` example.
- `LAUNCH_BLOCKERS.md` — anything that must be resolved before production. Empty file is acceptable; missing file is not.
- Accessibility verified: `prefers-reduced-motion: reduce` disables all motion cleanly; every accent-on-canvas color combination passes WCAG AA; keyboard navigation works on every interactive element.

**Approval criterion:** `LAUNCH_BLOCKERS.md` is empty (or every blocker is explicitly waived by Kishore in the PR comment).

### Gate 6 — Production cutover

**Required outputs:**
- DNS cut over: `megam.io` apex and `www.megam.io` alias resolving to the new Vercel deployment.
- `megamsys/www.megam.io` legacy repo archived (not deleted) with a README pointer to the new repo.
- Final `RED_FLAGS.md` and `CLAIMS.md` committed to the repo as the public audit trail.

**Approval criterion:** Kishore explicitly authorizes production cutover.

---

### Hard rules on the gates themselves

1. **No collapsing.** Don't ship Gate 4 work in the Gate 3 PR because "they're related." Each gate exists because the prior gate's approval is the safety the next gate depends on.
2. **No skipping.** Even if Gate 1 research feels like overkill, it produces the artifact (`RESEARCH.md`) that everything downstream cites.
3. **The four ledger files (`CLAIMS.md`, `TEAM_REVIEW.md`, `SOURCE_MAP.md`, `RED_FLAGS.md`) live in the repo permanently** and are updated whenever the public site changes after launch. They are the public audit trail. `RESEARCH.md` and `LAUNCH_BLOCKERS.md` may be archived after Gate 6.

---

## 9. Hard rules — failure modes to avoid

- **Do not fabricate quotes.** No invented founder testimonials. No imagined customer names.
- **Do not link the wrong person.** When in doubt, omit the link. See §2.8.
- **Do not write "Megam was a journey."** Or anything similar.
- **Do not pad the timeline.** If 2019–2022 had no public artifacts, say so: *"No public commits between X and Y. Development was internal at Rio Advancement."*
- **Do not use AI-generated illustrations.** If a section needs no diagram, give it none.
- **Do not soften `/why-it-didnt-work`.** The agent will be tempted to. Resist.
- **Do not break the existing repo URLs.** Anyone linking to `github.com/megamsys/<repo>` from a 2015 blog post must still land on a working page.
- **Do not let the design eat the editorial.** See §6.8. If you can't have both, the editorial wins.
- **Do not animate anything that loops.** A site that breathes at the user is exhausting.
- **Do not introduce a second accent color** beyond the two specified in §6.2. The discipline is the design.

---

## 10. Final line

End the home page with this single sentence, on its own, no styling:

> Megam was early, not wrong.
