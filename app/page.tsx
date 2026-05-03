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

export default function HomePage() {
  const page = getPage("index");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <article
        className="content-page home-page"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </>
  );
}
