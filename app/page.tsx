import type { Metadata } from "next";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Megam.io",
  description: "A closure record of Megam Systems and Rio/OS."
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Megam.io",
  url: "https://megam.io",
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "Megam Systems LLP",
    url: "https://megam.io"
  },
  about:
    "Closure record of Megam Systems LLP and Rio/OS — an open-source cloud management platform built from Chennai, India between 2012 and 2018."
};

const SENTINEL = "<p>STILL_BUILDING_BAND</p>";

const activeProjects = [
  {
    href: "https://cachekit.org",
    name: "cachekit.org",
    blurb: "Caching library for Rust."
  },
  {
    href: "https://usezombie.com",
    name: "usezombie.com",
    blurb: "Agents that wake up on a trigger."
  }
];

export default function HomePage() {
  const page = getPage("index");
  const [before, after] = page.html.includes(SENTINEL)
    ? page.html.split(SENTINEL)
    : [page.html, ""];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <article className="content-page home-page">
        <div className="markdown-passthrough" dangerouslySetInnerHTML={{ __html: before }} />
        <aside className="still-building" aria-label="Active projects">
          <p className="still-building-eyebrow">Still building</p>
          <ul className="still-building-list">
            {activeProjects.map((project) => (
              <li key={project.href}>
                <a href={project.href}>{project.name}</a>
                <span> &mdash; {project.blurb}</span>
              </li>
            ))}
          </ul>
        </aside>
        {after && (
          <div className="markdown-passthrough" dangerouslySetInnerHTML={{ __html: after }} />
        )}
      </article>
    </>
  );
}
