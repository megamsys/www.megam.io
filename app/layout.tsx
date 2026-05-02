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
  description: "A closure record of Megam Systems and Rio/OS."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
            <a href="https://docs.rioos.megam.io">Rio/OS docs</a>
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
      </body>
    </html>
  );
}
