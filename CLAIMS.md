# Megam.io Closure Site Claims Ledger

Gate: 2
Last updated: May 02, 2026

Status meanings:

- `verified` - public source observed directly during research.
- `founder-confirmed` - confirmed by Kishore on May 02, 2026.
- `inferred` - reasonable from sources, but must be labeled or rewritten before public prose.
- `needs-review` - do not ship until resolved.

| ID | Claim | Status | Source | Public-safe | Page |
|---|---|---|---|---|---|
| C001 | The final closure site will replace `megamsys/www.megam.io`. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/colophon` |
| C002 | The implementation target is Next.js on Vercel. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/colophon` |
| C003 | Megam Systems was based in Chennai, India. | verified | `github.com/megamsys` organization profile | yes | `/timeline`, `/team` |
| C004 | The Megam GitHub organization publicly hosts Megam source repositories. | verified | `github.com/megamsys`; GitHub API research in `RESEARCH.md` | yes | `/artifacts` |
| C005 | GitHub reports roughly 108-110 public Megam organization repositories at research time. | verified | GitHub HTML and `gh api orgs/megamsys/repos --paginate` | yes | `/artifacts` |
| C006 | Exact Megam repository count is not central and should be worded approximately. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/artifacts` |
| C007 | `nilavu` was the browser UI for Megam PaaS / cloud management. | verified | `megamsys/nilavu` README; `docs.megam.io/configuration/vertice/` | yes | `/products`, `/architecture` |
| C008 | `verticegateway` was the MegamVertice API server. | verified | `megamsys/verticegateway` README | yes | `/architecture` |
| C009 | `verticegateway` used Scala, NSQ, OpenJDK 8, and Cassandra-era dependencies. | verified | `megamsys/verticegateway` README | yes | `/architecture` |
| C010 | `verticegateway` protected REST resources with HMAC authorization, PBKDF2 passwords, and a master key. | verified | `megamsys/verticegateway` README | yes | `/architecture` |
| C011 | `vertice` was the Megam Vertice core engine / omni scheduler. | verified | `megamsys/vertice` README; `docs.megam.io/configuration/vertice/` | yes | `/architecture`, `/artifacts` |
| C012 | `gulp` was an agent controlling application lifecycle in the cloud. | verified | `megamsys/gulp` README | yes | `/architecture`, `/artifacts` |
| C013 | MegamVertice docs identified the main v1 components as Nilavu UI, API gateway, and Vertice scheduler. | verified | `docs.megam.io/configuration/vertice/` | yes | `/architecture` |
| C014 | MegamVertice docs list OpenNebula, OpenVZ, Docker, and Ceph as backing technologies. | verified | `docs.megam.io` | yes | `/architecture`, `/products` |
| C015 | Megam docs describe virtual machines, Bitnami apps, Docker registry search, custom apps, snapshots, block storage, monitoring/logging, WHMCS billing, and S3-like storage. | verified | `docs.megam.io` | yes | `/products` |
| C016 | Megam custom domain docs show Route53 DNS integration. | verified | `docs.megam.io/domains/custom-domains/` | yes | `/products`, `/architecture` |
| C017 | The 2014 OpenNebula deck credits Varadarajan Narayanan, Kishore Kumar Neelamegam, Thomas Alrin, and Raj Thilak. | verified | OpenNebula 2014 slide deck | yes | `/team`, `/timeline`, `/artifacts` |
| C018 | The OpenNebula 2014 deck presents Megam as code-to-cloud across private, public, and hybrid clouds. | verified | OpenNebula 2014 slide deck | yes | `/timeline`, `/architecture` |
| C019 | The OpenNebula 2014 deck lists Java, Play, Ruby on Rails, Node.js, and Akka as supported frameworks. | verified | OpenNebula 2014 slide deck | yes | `/products` |
| C020 | The OpenNebula 2014 deck lists GitHub, Bitbucket, and CloudForge as source-cloud integrations. | verified | OpenNebula 2014 slide deck | yes | `/products` |
| C021 | The OpenNebula 2014 deck includes TOSCA, OpenNebula Chef plugin, private cloud install, and Cloud-in-a-Box material. | verified | OpenNebula 2014 slide deck | yes | `/timeline`, `/products` |
| C022 | OpenNebulaConf 2014 ran Dec 2-4, 2014 in Berlin. | verified | OpenNebulaConf 2014 archive | yes | `/timeline` |
| C023 | Kishorekumar Neelamegam presented Megam Cloud Automation Platform at OpenNebulaConf 2014. | verified | OpenNebulaConf 2014 speaker archive; YouTube video | yes | `/timeline`, `/artifacts` |
| C024 | OpenNebula's 2014 TechDays post mentions "Megam - Cloud orchestrator for OpenNebula." | verified | OpenNebula blog post | yes | `/timeline`, `/artifacts` |
| C025 | Docker Global Hack Day #2 archived results list "Visual Docker" second by vote count among "Other projects receiving top votes" with 457 votes. | founder-confirmed | Wayback URL provided by Kishore, May 02, 2026 | yes | `/timeline`, `/artifacts` |
| C026 | Public prose should avoid the stronger phrase "2nd place global" unless the archived page context is re-verified. | founder-confirmed | Kishore discussion, May 02, 2026 | yes | `/timeline` |
| C027 | `rioos2` is the public GitHub source for Rio/OS because the Rio Advancement GitLab source is private/unavailable. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/artifacts`, `/architecture` |
| C028 | `github.com/rioos2` is a clone/sync of the private Rio Advancement GitLab work. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/artifacts` |
| C029 | `rioos2/metgroup`, `rioos2/nalperion_rust`, and `rioos2/openio-sdk-rust` show Rust-era Rio/OS public work in 2017-2018. | verified | GitHub API metadata in `RESEARCH.md` | yes | `/timeline`, `/architecture` |
| C030 | Several Rio/OS GitHub repository timestamps reflect later synchronization/restore dates, not original development dates. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/artifacts` |
| C031 | `megamsys/megam-architechture-v1` and `rioos2/rioos-architecture-v2` are not valid canonical sources for this project. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | internal audit |
| C032 | Megam and Rio/OS were fully open source and never really closed. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/`, `/artifacts`, `/colophon` |
| C033 | Per-repository license metadata may show MIT, Apache-2.0, or no assertion, but should not override the founder-confirmed overall open-source status. | founder-confirmed | Kishore confirmation, May 02, 2026; GitHub API metadata | yes | `/artifacts`, `/colophon` |
| C034 | The old Megam logo should be used as archival material and color reference, not as the persistent site identity. | inferred | `DESIGN.md`; `public/branding/*`; implementation judgment | yes | `/artifacts`, `/colophon` |
| C035 | The closure site should use the monospace `megam.io -> closed` wordmark as primary chrome. | verified | `prompt/DESIGN.md` | yes | all pages |
| C036 | Existing local screenshots and period assets are approved for public use. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/products`, `/artifacts` |
| C037 | Existing local headshots in `public/images/*.jpg` are approved for `/team`, with QA corrections later. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/team` |
| C038 | Megam had 12 named Phase 1 customer accounts. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/products`, `/why-it-didnt-work` |
| C039 | Phase 1 customer names approved for public use are Alternative-Energies.fr, Astimp.ro, AtomDeploy.com, FlexVPC, INTERGRID, Jonathan Rack Servers, MilesWeb.com, QuadCloud, Quadcloud update, RioCorp, Simha Online, and TIC Servicios. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/products` |
| C040 | QuadCloud and Quadcloud update should be rendered together rather than as two unrelated customer names. | founder-confirmed | `prompt/megam-closure-prompt.md`; Kishore confirmation, May 02, 2026 | yes | `/products` |
| C041 | Rio/OS Phase 2 had CogMob as an enterprise pilot. | founder-confirmed | Kishore correction, May 02, 2026 | yes | `/products`, `/timeline` |
| C042 | Intergrid belonged to the Megam-era SMB pilot/customer story, not the Rio/OS engagement count. | founder-confirmed | Kishore correction, May 02, 2026 | yes | `/products`, `/timeline` |
| C043 | DET.io was associated with Megam only: a Megam partner, not a customer and not a Rio/OS partner. | founder-confirmed | Kishore correction, May 02, 2026 | yes | `/products`, `/team` |
| C044 | Jonathan Philipos / DET.io / VirtEngine represent downstream commercial integrator activity built on Megam lineage. | founder-confirmed | `prompt/megam-closure-prompt.md`; Kishore confirmation, May 02, 2026 | yes | `/products`, `/team`, `/artifacts` |
| C045 | The public site may thank DET.io as a Megam partner, but must not say DET.io stayed with Rio/OS. | founder-confirmed | Kishore correction, May 02, 2026 | yes | `/products` |
| C046 | Megam Systems was acquired by Rio Advancement Inc., led by Paul Sanar. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/timeline`, `/products`, `/why-it-didnt-work` |
| C047 | The acquisition came with a promise of seed funding to extend Rio/OS development, and the funding did not fully materialize. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/timeline`, `/products`, `/why-it-didnt-work` |
| C048 | Kishore met AK Patel, founder of Lendsmart, through Paul Sanar at a product demo. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/timeline`, `/products` |
| C049 | In Oct 2018, the team relocated to Lendsmart / Getattune and active Megam/Rio/OS product development ended. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/timeline`, `/why-it-didnt-work` |
| C050 | Kishore eventually became co-founder of Getattune. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/timeline`, `/products` |
| C051 | `docs.megam.io` remains an external Megam docs artifact and should be linked, not rehosted. | verified | `docs.megam.io`; `prompt/megam-closure-prompt.md` | yes | `/`, `/products`, `/artifacts` |
| C052 | `docs.rioos.megam.io` remains an external Rio/OS docs artifact and should be linked, not rehosted. | founder-confirmed | `prompt/megam-closure-prompt.md`; search crawl inconclusive | yes | `/`, `/products`, `/artifacts` |
| C053 | `devcenter.megam.io` is a secondary docs artifact. | verified | `megamsys/devcenter.megam.io` metadata; prompt | yes | `/artifacts` |
| C054 | The Megam YouTube channel should be listed as an artifact. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes | `/artifacts` |
| C055 | The Google Drive archives are approved as research and eventual artifact/design/architecture/install/demo source material. | founder-confirmed | Kishore confirmation, May 02, 2026 | yes with curation | `/artifacts`, internal audit |
| C056 | Archive download/indexing is deferred because unauthenticated `gdown --folder` returns HTTP 401 for both Drive folders. | verified | Local `gdown` attempts recorded in `RESEARCH.md` | yes | `RED_FLAGS.md` |
| C057 | The 2014 architecture and later Vertice docs name different backing services; public prose must be period-specific. | verified | OpenNebula deck; `verticegateway` README; `docs.megam.io` | yes | `/architecture` |
| C058 | "Megam was early, not wrong." is the required final home-page line. | verified | `prompt/megam-closure-prompt.md` | yes | `/` |
| C059 | Founder-provided team rows that remain pending in `TEAM_REVIEW.md` can be drafted for QA but should not ship publicly until approved. | founder-confirmed | Kishore confirmation, May 02, 2026; `TEAM_REVIEW.md` | yes for internal draft | `/team` |
| C060 | Market/Kubernetes adoption claims need additional public evidence if the final failure row remains specific. | needs-review | `RED_FLAGS.md` R010 | no until resolved | `/why-it-didnt-work` |
| C061 | Rio/OS Phase 2 had ServerNet as a pilot enterprise customer. | founder-confirmed | Kishore correction, May 02, 2026 | yes | `/products`, `/timeline` |
