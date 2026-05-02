# Megam.io Source Map

Gate: 2
Last updated: May 02, 2026

This file maps each public page section to the evidence it may draw from. It is
not final prose. Gate 3 content must cite `CLAIMS.md` rows, not this file
directly.

## Shared Sources

| Source | Use | Status |
|---|---|---|
| `RESEARCH.md` | Gate 1 audit trail | current |
| `CLAIMS.md` | Claim-by-claim source ledger | current |
| `TEAM_REVIEW.md` | Team identity approval and link ledger | current |
| `prompt/megam-closure-prompt.md` | Editorial brief and page requirements | current |
| `prompt/DESIGN.md` | Gate 4 design requirements | current |
| `public/branding/*` | Legacy brand artifact and color reference | available |
| `public/images/*` | Period screenshots, headshots, artifact imagery | approved for QA |

## `/`

Sections:

- One-screen closure summary.
- Links to inner pages.
- External docs links.
- Final line: "Megam was early, not wrong."

Sources:

- Claims C001, C032, C051, C052, C058.
- Megam docs: <https://docs.megam.io>
- Rio/OS docs: <https://docs.rioos.megam.io>
- `prompt/megam-closure-prompt.md`

Notes:

- Do not over-explain on home. The factual burden moves to `/timeline`,
  `/architecture`, `/products`, and `/why-it-didnt-work`.

## `/timeline`

Sections:

- Phase 1 - Megam.
- Phase 2 - Rio/OS.
- Phase 3 - Pivot.

Sources:

- Claims C003, C017-C026, C029-C030, C038-C050.
- `github.com/megamsys` organization and selected repositories.
- `github.com/rioos2` organization and selected repositories.
- OpenNebulaConf 2014 speaker archive:
  <https://archives.opennebulaconf.com/previous/opennebula-conf-2014/speakers-2014/index.html>
- OpenNebula 2014 slide deck:
  <https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf>
- Docker Global Hack Day #2 Wayback URL:
  <https://web.archive.org/web/20141114033411/https:/blog.docker.com/2014/11/announcing-docker-global-hack-day-2-winners/>
- Kishore confirmation, May 02, 2026.

Notes:

- The Docker entry should use exact archived wording: Visual Docker was listed
  second by vote count among "Other projects receiving top votes."
- Avoid using GitHub `updated_at` as product-development chronology.

## `/architecture`

Sections:

- Megam v1 architecture.
- Rio/OS v2 architecture.
- Comparison to Kubernetes.

Sources:

- Claims C007-C016, C021, C027-C031, C057.
- `megamsys/verticegateway` README.
- `megamsys/vertice` README.
- `megamsys/gulp` README.
- `megamsys/nilavu` README.
- `docs.megam.io/configuration/vertice/`
- `docs.megam.io/domains/custom-domains/`
- OpenNebula 2014 slide deck.
- `github.com/rioos2` metadata.
- Founder confirmation for Rio/OS narrative until archive/design/install
  material is locally available.

Excluded sources:

- `megamsys/megam-architechture-v1`
- `rioos2/rioos-architecture-v2`

Notes:

- Public prose must be period-specific because 2014 slide architecture names
  PostgreSQL/Riak/RabbitMQ while later Vertice docs and READMEs name
  Cassandra/Scylla and NSQ.
- Archive folder, when available, should be used mainly to enrich diagrams,
  install flow, and period artifact accuracy.

## `/products`

Sections:

- Megam / Vertice / Cloud-in-a-Box / Nilavu.
- Rio/OS.
- Customer and engagement lists.
- Pivot paragraph.
- DET.io Megam-partner clarification.

Sources:

- Claims C007-C016, C018-C021, C038-C049, C051-C052.
- `docs.megam.io`
- `megamsys/nilavu` README.
- `megamsys/vertice` README.
- OpenNebula 2014 slide deck.
- Kishore confirmation, May 02, 2026.
- Existing local screenshots in `public/images/`.

Notes:

- Customer names are founder-confirmed unless stronger source appears.
- DET.io must be called a Megam partner, not a customer and not a Rio/OS partner.
- Keep the pivot paragraph factual and direct.

## `/team`

Sections:

- Group A - Megam / Rio/OS team.
- Group B - downstream / successor projects.

Sources:

- `TEAM_REVIEW.md`.
- Claims C017, C025, C037, C043-C045.
- OpenNebula 2014 slide deck.
- `nilavu`, `vertice`, and `gulp` README author tables.
- Kishore confirmation, May 02, 2026.
- Local headshots in `public/images/`.

Notes:

- Do not include current employers.
- Do not guess LinkedIn URLs.
- Group B must be visibly distinct from Megam employees.

## `/why-it-didnt-work`

Sections:

- Market.
- Product.
- Distribution.
- Capital.
- Org.
- Timing.
- Pivot.

Sources:

- Claims C014-C016, C018-C021, C025-C030, C038-C050, C057.
- GitHub repository metadata and README evidence.
- OpenNebula deck and Docker Wayback artifact.
- Megam docs.
- Kishore confirmation, May 02, 2026.

Notes:

- Each row needs one failure sentence and one evidence sentence.
- Rows without evidence should be cut or moved to `RED_FLAGS.md`, not softened.
- Market/Kubernetes adoption claims need additional public evidence in Gate 3
  if the row remains specific.

## `/artifacts`

Sections:

- Repositories.
- Docs.
- Talks and videos.
- Branding/assets.
- Downstream/fork lineage.
- Archives.

Sources:

- Claims C004-C006, C027-C033, C051-C056.
- Megam GitHub org: <https://github.com/megamsys>
- Rio/OS GitHub org: <https://github.com/rioos2>
- Megam docs: <https://docs.megam.io>
- Rio/OS docs: <https://docs.rioos.megam.io>
- Developer center: <https://devcenter.megam.io>
- OpenNebulaConf video: <https://www.youtube.com/watch?v=2EVEJ4Sd0Ic>
- Megam YouTube channel:
  <https://www.youtube.com/channel/UC2ktYQ2-a9lG0X6VyS7AfBQ>
- OpenNebula slide deck:
  <https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf>
- Docker Global Hack Day #2 Wayback URL.
- `public/branding/*`.

Notes:

- Archive folders are approved as source material, but direct links/downloads
  should only appear after curation.

## `/lessons`

Sections:

- Lessons tied to failures already evidenced on `/why-it-didnt-work`.

Sources:

- Claims that survive `/why-it-didnt-work`.
- `CLAIMS.md` rows cited by each corresponding failure.

Notes:

- Do not add generic startup advice.
- Each lesson must point back to a specific evidenced failure.

## `/colophon`

Sections:

- Build info.
- Source repo.
- License.
- Dark-only design note.
- Corrections email.

Sources:

- Claims C001-C002, C032-C035.
- `prompt/DESIGN.md`.
- `public/branding/*`.
- Repository metadata.

Notes:

- State that prose license is CC-BY-4.0 if retained from prompt.
- Original code repositories keep their original licenses.

## `/404`

Sources:

- `prompt/megam-closure-prompt.md`.
- `prompt/DESIGN.md`.

Required text:

- `404 - this page was never deployed`

Note:

- The prompt uses a middle dot and arrow glyph. ASCII equivalents are acceptable
  during implementation if the codebase standard remains ASCII.
