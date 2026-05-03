import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { navPages, routeForSlug } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://megam.io"),
  title: {
    default: "Megam.io",
    template: "%s | Megam.io"
  },
  description:
    "Closure record of Megam Systems LLP and Rio/OS — an open-source cloud management platform built from Chennai, India between 2012 and 2018.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Megam.io",
    url: "https://megam.io",
    title: "Megam.io",
    description:
      "Closure record of Megam Systems LLP and Rio/OS — an open-source cloud management platform built from Chennai, India between 2012 and 2018."
  },
  twitter: {
    card: "summary",
    title: "Megam.io",
    description: "Closure record of Megam Systems LLP and Rio/OS."
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Megam Systems LLP",
  alternateName: ["Megam", "Megam Systems"],
  url: "https://megam.io",
  email: "nkishore@megam.io",
  foundingDate: "2013-03",
  dissolutionDate: "2018-10",
  founder: { "@type": "Person", name: "Kishorekumar Neelamegam" },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Plot #53, Door #1/1624, 1st Floor, Second Cross Street, Radha Nagar, Perumbakkam",
    addressLocality: "Chennai",
    postalCode: "600100",
    addressCountry: "IN"
  },
  sameAs: [
    "https://github.com/megamsys",
    "https://github.com/rioos2",
    "https://docs.megam.io",
    "https://rioos.megam.io"
  ],
  description:
    "Open-source cloud management platform (CMP) and platform-as-a-service (PaaS) built from Chennai, India. Active product development ended October 2018."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="site-header" aria-label="Site header">
          <Link className="wordmark" href="/">
            megam.io -&gt; closed
          </Link>
          <nav className="docs-nav" aria-label="Documentation links">
            <a href="https://docs.megam.io">Megam docs</a>
            <a href="https://rioos.megam.io">Rio/OS docs</a>
          </nav>
        </header>
        <div className="shell">
          <aside className="side-nav" aria-label="Primary navigation">
            {navPages.map((page) => (
              <Link key={page.slug} href={routeForSlug(page.slug)}>
                <span>{page.label}</span>
                <small>{page.range}</small>
              </Link>
            ))}
          </aside>
          <main id="content" className="page-main">
            {children}
          </main>
        </div>
        <footer className="site-footer" aria-label="Site footer">
          <div className="site-footer-inner">
            <p className="entity">Megam Systems LLP</p>
            <address className="postal">
              Plot #53, Door #1/1624, 1st Floor,
              <br />
              Second Cross Street, Radha Nagar,
              <br />
              Perumbakkam, Chennai 600100, India
            </address>
            <p className="meta">
              Registered March 2013 &middot; Active product development ended October 2018 &middot; Site is a closure record.
            </p>
            <p className="meta">
              <a href="mailto:nkishore@megam.io">nkishore@megam.io</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
