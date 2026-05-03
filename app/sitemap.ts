import type { MetadataRoute } from "next";
import { pageSlugs, routeForSlug } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://megam.io";
  const lastModified = new Date();
  return pageSlugs.map((slug) => ({
    url: `${base}${routeForSlug(slug)}`,
    lastModified,
    changeFrequency: "yearly",
    priority: slug === "index" ? 1 : 0.7
  }));
}
