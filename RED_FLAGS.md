# Megam.io Red Flags

Gate: 2
Last updated: May 02, 2026

This file tracks contradictions, weak evidence, and launch risks. Items can be
closed by stronger evidence, founder signoff, or removal from public prose.

## Active

| ID | Issue | Risk | Current decision | Owner |
|---|---|---|---|---|
| R001 | Google Drive archive folders cannot be enumerated by unauthenticated `gdown`; both Megam and Rio/OS folders return HTTP 401. | Archive design/architecture/install/demo material cannot be indexed yet. | Not blocking Gate 2. Use public sources plus founder confirmation. Use archive later if ZIP/local access is provided. | Kishore / implementation agent |
| R002 | `docs.rioos.megam.io` did not surface crawlable content during initial search. | Rio/OS architecture prose could over-rely on memory. | Use `github.com/rioos2`, founder confirmation, and archive material when available. | implementation agent |
| R003 | `gitlab.com/rioadvancement` is private/unavailable. | Cannot cite original GitLab directly. | Use `github.com/rioos2` as public clone/sync source per Kishore. | closed for Gate 2 |
| R004 | Several Rio/OS GitHub repositories have 2023/2026 timestamps. | Public readers may misread archival sync dates as original product-development dates. | Explain in artifacts/source notes where needed; do not build chronology from `updated_at`. | implementation agent |
| R005 | `megamsys/megam-architechture-v1` and `rioos2/rioos-architecture-v2` are not valid sources. | Accidentally citing removed/recreated architecture repos would weaken credibility. | Exclude both from Gate 2 and later public citations. | implementation agent |
| R006 | Megam architecture changed between 2014 deck and later Vertice docs. | A single architecture diagram could collapse different eras. | Write period-specific architecture: 2014 deck stack versus later Vertice 1.5 docs/READMEs. | implementation agent |
| R007 | Docker Global Hack Day language can be overstated. | "2nd place global" may be stronger than the archived wording supports. | Say Visual Docker was listed second by vote count among "Other projects receiving top votes"; cite Wayback. | implementation agent |
| R008 | Several team identities and LinkedIn URLs remain unverified. | Wrong person links are expensive to undo. | Keep uncertain rows `pending Kishore`; omit uncertain links from public route until approved. | Kishore |
| R009 | Customer and engagement list is founder-confirmed but not independently sourced in local files yet. | Skeptical readers may want stronger evidence. | Use `Kishore confirmation, May 02, 2026` in `CLAIMS.md`; strengthen with archive material later if available. | Kishore / implementation agent |
| R010 | Market/Kubernetes adoption claims in `/why-it-didnt-work` need external evidence if kept specific. | The failure analysis could read like unsupported hindsight. | Gate 3 must either cite public adoption/M&A evidence or simplify/remove the row. | implementation agent |
| R011 | Existing headshots are approved but not fully mapped for all team members. | `/team` may look inconsistent. | Use approved available images during QA; initials/no image for missing entries. | implementation agent |
| R012 | Legacy logo direction is intentionally restrained. | User may expect visible logo use because `Branding/` was provided. | Use logo as archival artifact and color source; primary identity remains wordmark unless Gate 4 changes it. | Kishore / design QA |
| R013 | DET.io classification was corrected by Kishore after the original prompt draft. | Future edits could accidentally restore stale Rio/OS-partner language. | Canonical wording: DET.io was associated with Megam only, as a Megam partner, not a customer and not a Rio/OS partner. Prompt and content have been updated. | closed for Gate 4 |

## Closed or Resolved for Gate 2

| ID | Issue | Resolution |
|---|---|---|
| X001 | Which repo should be modified? | Use `megamsys/www.megam.io`; legacy files can be removed when implementation begins. |
| X002 | Framework choice ambiguity: Next.js or Astro. | Next.js on Vercel. |
| X003 | Whether archive citations are mandatory before Gate 2. | No. Founder-led confirmation is acceptable; archive material is mainly for design, architecture, install manuals, and demo videos. |
| X004 | Whether customer/engagement names are public-safe. | Yes, per Kishore confirmation on May 02, 2026. |
| X005 | Whether sensitive pivot/funding narrative is approved. | Yes, per Kishore confirmation on May 02, 2026. |
| X006 | Whether old local period screenshots are public-safe. | Yes, per Kishore confirmation on May 02, 2026. |
| X007 | Whether old local headshots can be used. | Yes, use in QA and correct later if needed. |
| X008 | Whether Megam/Rio/OS can be described as fully open source. | Yes, per Kishore confirmation on May 02, 2026. |

## Archive Access Notes

Provided Drive folders:

- Megam:
  <https://drive.google.com/drive/folders/0B5ha35sst8q1QmNKSnZkdWd6M00?resourcekey=0-Y3mfUKohDBl4ZbpFtxvDfw&usp=drive_link>
- Rio/OS:
  <https://drive.google.com/drive/folders/0B5ha35sst8q1aVdGRUNLMmZKT2c?resourcekey=0-awu4qcJOhYYC7hQgsg1AkA&usp=sharing>

Local result:

- `gdown 6.0.0` is installed.
- `gdown --folder` returns HTTP 401 for both folders.
- Direct `curl -I` confirms Google Drive itself is reachable.

Next useful archive path:

- Browser-export ZIPs into the repo or `/private/tmp`.
- Authenticated `rclone`, if later worth the setup time.
- Continue without archive download when claims can be founder-confirmed.
