import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageSlugs, routeForSlug, type PageSlug } from "@/lib/content";
import { teamPersonJsonLd } from "@/lib/team";

type RoutedSlug = Exclude<PageSlug, "index" | "404">;

const routedSlugs = pageSlugs.filter(
  (slug): slug is RoutedSlug => slug !== "index" && slug !== "404"
);

const SITE_URL = "https://megam.io";
const PUBLISHED = "2026-05-01";
const MODIFIED = "2026-05-03";

export function generateStaticParams() {
  return routedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  if (!slug) return {};
  const page = getPage(slug);

  const url = `${SITE_URL}${routeForSlug(slug)}`;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: page.meta.title,
      description: page.meta.description,
      siteName: "Megam.io"
    }
  };
}

export default async function ContentPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  if (!slug) notFound();
  const page = getPage(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.meta.title,
    description: page.meta.description,
    url: `${SITE_URL}${routeForSlug(slug)}`,
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    inLanguage: "en",
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    author: { "@type": "Person", name: "Kishorekumar Neelamegam" },
    publisher: {
      "@type": "Organization",
      name: "Megam Systems LLP",
      url: SITE_URL
    },
    isPartOf: { "@type": "WebSite", name: "Megam.io", url: SITE_URL }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {slug === "team" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamPersonJsonLd) }}
        />
      )}
      <article
        className={`content-page page-${slug}`}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </>
  );
}

function normalizeSlug(slug: string): RoutedSlug | null {
  if (routedSlugs.includes(slug as RoutedSlug)) return slug as RoutedSlug;
  return null;
}
