import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageSlugs, type PageSlug } from "@/lib/content";

type RoutedSlug = Exclude<PageSlug, "index" | "404">;

const routedSlugs = pageSlugs.filter(
  (slug): slug is RoutedSlug => slug !== "index" && slug !== "404"
);

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

  return {
    title: page.meta.title,
    description: page.meta.description
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

  return (
    <article
      className={`content-page page-${slug}`}
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  );
}

function normalizeSlug(slug: string): RoutedSlug | null {
  if (routedSlugs.includes(slug as RoutedSlug)) return slug as RoutedSlug;
  return null;
}
