# Megam.io Closure Site Gate 1 Research

Research date: May 02, 2026

This file records the source coverage and factual gaps for the Megam.io closure
site. It is a Gate 1 artifact only: it does not decide final public prose. Gate
2 must convert these notes into `CLAIMS.md`, `TEAM_REVIEW.md`, `SOURCE_MAP.md`,
and `RED_FLAGS.md`.

## Scope Decisions Confirmed by Kishore

- The final site will replace `megamsys/www.megam.io`; the legacy files in this
  repository can be removed when implementation begins.
- The gated process in `prompt/megam-closure-prompt.md` should be followed.
- Framework decision: Next.js on Vercel.
- Megam archive and Rio/OS archive material are public-approved for site
  research and eventual citation where useful.
- Existing period screenshots in this repository are approved for public use.
- Sensitive narrative claims in the prompt are approved for research:
  Rio Advancement, Paul Sanar, AK Patel, Lendsmart/Getattune, customer list, and
  DET.io gratitude. Later correction: DET.io was associated with Megam only, not
  Rio/OS.
- Add the Megam YouTube channel to `/artifacts`:
  <https://www.youtube.com/channel/UC2ktYQ2-a9lG0X6VyS7AfBQ>.
- Gate 6 should include playbooks similar to `~/Projects/usezombie/playbooks`.

## Local Repository and Branding

Source inspected:

- `prompt/megam-closure-prompt.md`
- `prompt/DESIGN.md`
- `public/branding/*`
- existing static assets under `public/images/`

Branding assets found:

- `public/branding/logo-hor-png.png` — horizontal cyan cloud plus gray Megam wordmark, 1491 x 402.
- `public/branding/logo-ver-png.png` — vertical cyan cloud plus gray Megam wordmark, 1166 x 1063.
- `Branding/Fonts/logo.png`, `logo2.png`, `logo_white.png`, `logo_old1.png` — smaller raster variants.
- `Branding/Fonts/vaground.ttf` — VAG Round font.
- `public/branding/favicon.ico`.
- `Branding/Fonts/logo-hor-psd.psd`.

Design implication:

- Use the old cloud mark as an archival asset and color reference, not as the
  primary site identity. This preserves the closure-site rule in `DESIGN.md`
  that the only persistent ornament is the monospace wordmark
  `megam.io -> closed`.
- Recommended accent remains cyan, tuned toward the old logo's cyan rather than
  inventing a new brand hue. The gray wordmark can inform muted text values only
  indirectly; the closure site should remain dark, terminal-like, and not
  logo-led.
- Keep the old logo available on `/artifacts` or `/colophon` as historical
  material if needed. Do not use it as the page header logo unless the design
  direction is explicitly changed in Gate 4.

## Public GitHub Evidence

### Megam Systems organization

Source: <https://github.com/megamsys>

Observed:

- Organization name: Megam Systems.
- Organization description: Megam cloud platform.
- Location: Chennai, India.
- Website: <https://docs.megam.io>.
- The GitHub organization page shows public repositories including
  `verticegateway`, `vertice`, `gulp`, `devcenter.megam.io`,
  `vertice.megam.io`, `megam-architechture-v1`, `nilavu`,
  `opennebula-go`, `megam_common`, and `megam_api`.
- GitHub page reports 108 repositories in the organization view; `gh api`
  pagination returned 110 entries at research time. Treat exact count as a
  claims-ledger item to verify before public copy.

Key repository metadata collected through GitHub API:

| Repository | Description | Language | License | Created | Updated |
|---|---|---:|---:|---:|---:|
| `megamsys/nilavu` | Open Source Cloud Management Platform - VMs, Docker, Containers, Applications | JavaScript | MIT | 2012-05-17 | 2025-12-28 |
| `megamsys/chef-repo` | Chef cookbooks used by megam | Ruby | no assertion | 2013-02-13 | 2019-08-13 |
| `megamsys/verticegateway` | REST API server with built in auth, interface to ScyllaDB/Cassandra | Scala | MIT | 2013-03-28 | 2025-10-04 |
| `megamsys/megam_api` | Ruby API for Megam Vertice | Ruby | MIT | 2013-05-15 | 2021-11-22 |
| `megamsys/megam_common` | Common scalazified libraries used at Megam | Scala | MIT | 2013-05-15 | 2019-08-13 |
| `megamsys/gulp` | Agent which controls the lifecycle of app in cloud | Go | no assertion | 2013-07-05 | 2022-11-28 |
| `megamsys/vertice` | Omni scheduler/core engine for Megam Vertice | Go | Apache-2.0 | 2014-09-25 | 2024-10-30 |
| `megamsys/opennebula-go` | Open Nebula golang API used by megam vertice | Go | Apache-2.0 | 2015-08-17 | 2024-11-30 |
| `megamsys/vertice.megam.io` | PaaS for the hosting industry website | CSS | Apache-2.0 | 2016-05-06 | 2016-05-11 |
| `megamsys/devcenter.megam.io` | staticgen md files for devcenter.megam.io | HTML | no assertion | 2016-09-10 | 2017-07-20 |
| `megamsys/megam-architechture-v1` | System design, architecture decisions, and technical documentation | none | MIT | 2026-02-08 | 2026-02-08 |

Notes:

- Several old repositories have recent `updated_at` values. Gate 2 should avoid
  treating GitHub `updated_at` alone as evidence of active product development;
  commit history is needed for closure chronology.
- `megam-architechture-v1` appears in GitHub metadata, but Kishore later
  clarified it is not a valid canonical source for this closure-site work.

### Megam v1 repository README evidence

Sources:

- <https://github.com/megamsys/verticegateway>
- <https://github.com/megamsys/vertice>
- <https://github.com/megamsys/gulp>
- <https://github.com/megamsys/nilavu>

Observed:

- `verticegateway` describes itself as the API server for MegamVertice 1.5.x and
  lists Scala build requirements, NSQ, OpenJDK 8, and Cassandra. It states the
  REST resources used HMAC authorization, PBKDF2 password handling, and a master
  key. It also says the 2.0 API server was planned in Rust with CockroachDB and
  moved to private GitLab for enterprise features.
- `vertice` describes itself as the core engine for Megam Vertice 1.5.x, with
  Go, NSQ, and Cassandra requirements. It also points to 2.0 private GitLab
  development.
- `gulp` describes itself as an agent for Megam Vertice and points to the same
  2.0 private GitLab roadmap.
- `nilavu` describes a Rails browser UI for Megam PaaS. The README lists hybrid
  cloud targets including OpenNebula and public clouds, app/service management,
  real-time logs, metering/monitoring charts, marketplace add-ons, and Docker
  container launch support.

Implication:

- The architecture page can substantiate the v1 shape as UI plus API gateway
  plus scheduler plus node/app lifecycle agent, with Cassandra/Scylla and NSQ in
  the control plane.
- The 2017 shift toward 2.0/Rust/private GitLab is supported by public README
  language, but exact Rio/OS transition dates still require commit history and
  archive review.

## Public Documentation Evidence

### Megam docs

Sources:

- <https://docs.megam.io>
- <https://docs.megam.io/configuration/vertice/>
- <https://docs.megam.io/domains/custom-domains/>

Observed:

- Docs describe MegamVertice as a platform-as-a-service for virtual machines,
  apps, and containers in a fault-tolerant cloud.
- Docs list OpenNebula, OpenVZ, Docker, and Ceph as backing technologies.
- Open-source and enterprise editions are described. Listed features include
  virtual machines, Bitnami apps, Docker registry search, custom apps with
  GitHub integration, snapshots, block storage, monitoring/logging, WHMCS
  billing, S3-like cloud storage, and secure containers as enterprise or coming
  soon.
- The Vertice configuration page identifies these components:
  `Console (UI - Nilavu)`, `API - gateway`, and `Omni scheduler - vertice`.
- Configuration examples show Cassandra keyspace `vertice`, NSQ topics for VMs
  and containers, and Vertice scheduler configuration pointing to the API and
  NSQD.
- Custom domain docs show Route53 DNS integration and configuration in both
  `verticegateway` and `vertice`.

Implication:

- Docs vocabulary should drive product and architecture copy:
  Nilavu, API gateway, Omni scheduler, Vertice, MegamVertice, OpenNebula,
  OpenVZ, Docker, Ceph, WHMCS, Route53.
- Current docs copy uses marketing language. Final closure prose should not
  copy that voice, but can cite the feature set.

### Rio/OS docs

Source attempted:

- <https://docs.rioos.megam.io>

Observed:

- Search did not return useful crawlable Rio/OS docs pages during this pass.

Gate 1 gap:

- Need direct crawl or archive review for Rio/OS component vocabulary and
  architecture. Do not write the Rio/OS architecture page from prompt memory
  alone.

## OpenNebula and Talk Evidence

Sources:

- <https://archives.opennebulaconf.com/previous/opennebula-conf-2014/speakers-2014/index.html>
- <https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf>
- <https://opennebula.io/blog/events/aftermath-of-the-techdays-in-florida-and-bay-area/>

Observed:

- OpenNebulaConf 2014 ran Dec 2-4, 2014 in Berlin.
- The OpenNebulaConf speaker archive lists Kishorekumar Neelamegam as CTO,
  Megam Systems, working on Megam Cloud Automation Platform.
- The companion slide deck is titled "Code-to-Cloud with OpenNebula & Megam"
  and credits Varadarajan Narayanan, Kishore Kumar Neelamegam, Thomas Alrin,
  and Raj Thilak.
- The deck presents Megam as a way to deploy apps across private, public, and
  hybrid clouds; supported frameworks included Java, Play, Ruby on Rails,
  Node.js, and Akka; supported source clouds included GitHub, Bitbucket, and
  CloudForge.
- The deck lists open-source software in the 2014 architecture: Ubuntu, Ruby,
  PostgreSQL, Go, Scala, Play Framework, Akka, Riak, Chef, RabbitMQ, GMetad,
  Elastic Server, Logstash, and Kibana.
- The deck includes TOSCA positioning, Megam SaaS, OpenNebula Chef plugin,
  private cloud install, and Cloud-in-a-Box material.
- OpenNebula's July 2014 TechDays aftermath post mentions a talk on "Megam -
  Cloud orchestrator for OpenNebula."

Implication:

- The timeline can safely anchor Megam's public OpenNebula presence in 2014.
- Architecture prose must handle the fact that the 2014 deck mentions
  PostgreSQL/Riak/RabbitMQ, while later docs and READMEs mention
  Cassandra/Scylla and NSQ. This is probably evolution over time, not a
  contradiction, but Gate 2 must classify the period-specific claim carefully.

## Docker Global Hack Day Evidence

Source attempted:

- Docker winner URL from the prompt:
  `https://blog.docker.com/2014/11/announcing-docker-global-hack-day-2-winners/`
- Wayback URL provided by Kishore:
  <https://web.archive.org/web/20141114033411/https:/blog.docker.com/2014/11/announcing-docker-global-hack-day-2-winners/>

Observed:

- The browser search did not surface a clean accessible result during this pass.
- Kishore provided the archived excerpt: Docker Global Hack Day #2 voting
  results named Wei-Ting Kuo and Hsiao-Jung Peng of Docker Taipei first with
  546 votes for "Enable Fig to deploy to multiple Docker servers"; under
  "Other projects receiving top votes", the archive listed
  `2. "Visual Docker" by Thomas Alrin & Yeshwanth Kumar & Rajthilak - 457 votes`.

Gate 1 conclusion:

- Public prose should attach the Wayback link and use precise wording:
  Visual Docker was listed second by vote count among "Other projects receiving
  top votes" in Docker Global Hack Day #2.

## Rio/OS Public GitHub Evidence

Source: <https://github.com/rioos2>

Observed:

- GitHub API returned 17 repositories under `rioos2`.

Key repository metadata collected through GitHub API:

| Repository | Description | Language | License | Created | Updated |
|---|---|---:|---:|---:|---:|
| `rioos2/metgroup` | A groupby aggregation of metrics in Rust | Rust | Apache-2.0 | 2017-10-24 | 2017-10-24 |
| `rioos2/nalperion_rust` | Integration to Nalperion for licensing, reference code only | Rust | MIT | 2018-03-13 | 2018-06-27 |
| `rioos2/openio-sdk-rust` | S3 compatible Rust SDK for OpenIO | Rust | Apache-2.0 | 2018-06-07 | 2018-09-07 |
| `rioos2/openio` | no description | Shell | no assertion | 2018-06-08 | 2018-06-08 |
| `rioos2/vulcand` | Programmatic load balancer backed by Etcd | Go | Apache-2.0 | 2018-06-27 | 2018-06-27 |
| `rioos2/rioos` | Issues for Rio/OS and resolutions | none | MIT | 2018-12-31 | 2019-06-06 |
| `rioos2/autorio` | no description | Ruby | MIT | 2023-12-18 | 2023-12-18 |
| `rioos2/aran` | no description | Rust | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/ottavada` | no description | Ruby | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/commandcenter` | no description | JavaScript | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/beedi` | no description | none | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/geoip_from_cities` | no description | none | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/www.megam.io` | no description | SCSS | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/poochi` | no description | Shell | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/kr` | no description | Go | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/magudi` | no description | Go | no assertion | 2023-12-27 | 2023-12-27 |
| `rioos2/rioos-architecture-v2` | Architecture decisions and technical documentation for Rio/OS | none | MIT | 2026-02-08 | 2026-02-08 |

Implication:

- Public GitHub evidence supports Rust-era Rio/OS work in 2017-2018 for
  `metgroup`, `nalperion_rust`, and `openio-sdk-rust`.
- Several Rio/OS repos were created or restored in 2023 and architecture docs
  in 2026. Gate 2 must separate original development chronology from later
  archival restoration chronology.
- Kishore clarified that late Rio/OS GitHub timestamps reflect synchronization
  from private `gitlab.com/rioadvancement`; use `github.com/rioos2` as the
  public source because the GitLab source is private/unavailable.
- `rioos-architecture-v2` is listed here only because GitHub API returned it;
  Kishore clarified it is not a valid canonical source for this work.

## GitLab Rio Advancement Evidence

Source attempted:

- Search for `gitlab.com/rioadvancement` and related Rio/OS terms.

Observed:

- Public search did not surface a reliable `rioadvancement` GitLab organization
  page or project listing during this pass.

Gate 1 gap:

- Need direct URL, authenticated access, or archive files to substantiate
  post-GitHub Rio/OS continuation. Until then, treat "some Rio/OS work
  continued at GitLab" as user-confirmed, not independently verified.

User clarification:

- Treat `gitlab.com/rioadvancement` as private/unavailable.
- Use <https://github.com/rioos2> as the public source; Kishore states it is a
  clone/sync of the Rio Advancement GitLab work.

## Archive Evidence

Sources provided:

- Megam archive:
  <https://drive.google.com/drive/folders/0B5ha35sst8q1QmNKSnZkdWd6M00?resourcekey=0-Y3mfUKohDBl4ZbpFtxvDfw&usp=drive_link>
- Rio/OS archive:
  <https://drive.google.com/drive/folders/0B5ha35sst8q1aVdGRUNLMmZKT2c?resourcekey=0-awu4qcJOhYYC7hQgsg1AkA&usp=sharing>

Observed:

- `rclone` is not installed locally.
- `gdown` is installed locally (`gdown 6.0.0`).
- A direct `curl -I` network check against Google Drive returned HTTP 200 for
  the Megam folder, so the link is reachable, but the folder contents were not
  indexed during this pass.
- `gdown --folder` against the Megam folder failed with HTTP 401 while trying
  to retrieve folder contents. The folder URL is reachable, but unauthenticated
  `gdown` cannot enumerate the folder as provided.
- `gdown --folder` against the Rio/OS folder also failed with HTTP 401 while
  trying to retrieve folder contents.

Gate 1 gap:

- Need either `rclone`, `gdown`, Google Drive browser export, or a local
  archive drop before the required `/research/archive/INDEX.md` can be built.
- Since `gdown` cannot enumerate the shared folder unauthenticated, the next
  practical options are authenticated `rclone`, browser-exported ZIPs, or a
  local archive drop.
- Until the archive is indexed, archive-specific facts such as customer notes,
  funding-promise documents, Rio Advancement correspondence, and internal
  architecture decisions remain user-confirmed but not source-indexed.

## Team Evidence

Public evidence from local prompts and repo READMEs:

- `nilavu` README author table includes Rajthilak, Thomas Alrin,
  Kishorekumar Neelamegam, and Yeshwanth Kumar.
- `vertice` README author table includes Rajthilak, Kishorekumar Neelamegam,
  Ranjitha, and M. Vijaykanth.
- `gulp` README author table includes Rajthilak, Kishorekumar Neelamegam, and
  Vijaykanth M.
- OpenNebula deck credits Varadarajan Narayanan, Kishore Kumar Neelamegam,
  Thomas Alrin, and Raj Thilak.

Implication:

- Gate 2 `TEAM_REVIEW.md` can include the prompt's full team table, but final
  public links and full names still need QA verification by Kishore.
- The public site should omit uncertain LinkedIn links until approved.
- The existing local headshots in `public/images/*.jpg` are approved for `/team`; the
  QA round can correct or replace them later.

## Customer and Engagement Evidence

Source status:

- Customer list and Rio/OS engagements are confirmed by Kishore in this task.
- Public independent evidence has not yet been collected for each customer name.

Gate 1 gap:

- Gate 2 should put every customer/engagement into `CLAIMS.md` with source
  `Kishore confirmation, May 02, 2026` unless archive documents or public pages
  provide stronger evidence.

User clarification:

- Use `Kishore confirmation, May 02, 2026` as the source for the customer and
  engagement list when no stronger public/archive source is available.

## Architecture Source Correction

User clarification:

- `megamsys/megam-architechture-v1` and `rioos2/rioos-architecture-v2` are not
  valid canonical sources for this closure-site work. Kishore removed those
  repositories.
- Gate 2 and later content should not cite those repos as factual authority.
- Architecture claims must come from older public repos, docs, slide decks,
  screenshots, archive material, and Kishore-confirmed facts.

## Open Source Status

User clarification:

- Public prose may state that Megam/Rio/OS were fully open source and never
  really closed.
- Gate 2 should still record per-repository license metadata where available,
  especially for GitHub API `NOASSERTION` repositories, but this metadata should
  not override the user-confirmed overall open-source status.

## Artifacts to Include Later

Confirmed primary artifacts:

- Megam GitHub org: <https://github.com/megamsys>
- Rio/OS GitHub org: <https://github.com/rioos2>
- Megam docs: <https://docs.megam.io>
- Rio/OS docs: <https://docs.rioos.megam.io>
- Developer center: <https://devcenter.megam.io>
- OpenNebulaConf 2014 video:
  <https://www.youtube.com/watch?v=2EVEJ4Sd0Ic>
- Megam YouTube channel:
  <https://www.youtube.com/channel/UC2ktYQ2-a9lG0X6VyS7AfBQ>
- OpenNebula 2014 slide deck:
  <https://opennebula.io/wp-content/uploads/2014/03/Code-to-cloud-opennebula.pdf>
- OpenNebulaConf 2014 speaker archive:
  <https://archives.opennebulaconf.com/previous/opennebula-conf-2014/speakers-2014/index.html>

## Red Flags for Gate 2

These are not blockers for Gate 1, but they must be resolved or explicitly
classified before content drafts.

1. Exact repository count for `megamsys` differs between GitHub HTML and API
   pagination during this pass. Use the researched count with clear wording
   rather than making the exact number central to the public narrative.
2. Docker Global Hack Day wording needs precise Gate 2 treatment: use the
   Wayback link and say Visual Docker was listed second by vote count among
   "Other projects receiving top votes".
3. Rio/OS docs were not crawlable through search during this pass.
4. `gitlab.com/rioadvancement` did not surface reliably through public search.
5. Google Drive archive folders are reachable, but contents were not indexed:
   `gdown` is installed but returns HTTP 401 for unauthenticated folder
   enumeration on both Megam and Rio/OS folders.
6. Several Rio/OS repositories have late archival timestamps. Gate 2 must not
   confuse GitHub synchronization/restore dates with original product
   development dates.
7. Megam architecture changed over time: 2014 slides list PostgreSQL/Riak/RabbitMQ,
   while later Vertice docs and READMEs list Cassandra/Scylla and NSQ. Public
   prose must be period-specific.
8. `megam-architechture-v1` and `rioos-architecture-v2` are not valid
   canonical sources for this closure-site work per Kishore. Do not cite them
   in Gate 2 or later content.

## Gate 1 Conclusion

Public sources and Kishore confirmations are sufficient to proceed to Gate 2
for the Megam v1 public timeline, product vocabulary, high-level architecture,
approved customer/engagement claims, Docker Global Hack Day wording, and
Rio/OS public-source framing. Rio/OS public prose should be grounded in
`github.com/rioos2`, approved archive material once accessible, and
Kishore-confirmed facts; do not cite the removed architecture repos.

Recommended next gate:

- Create `CLAIMS.md`, `TEAM_REVIEW.md`, `SOURCE_MAP.md`, and `RED_FLAGS.md`.
- Keep `RED_FLAGS.md` active for the gaps listed above.
- Resolve archive access before Gate 3 content drafts if possible.
