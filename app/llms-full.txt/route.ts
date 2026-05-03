import { NextResponse } from "next/server";
import { getAllPages, routeForSlug } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const pages = getAllPages();
  const sections = pages.map((page) => {
    const url = `https://megam.io${routeForSlug(page.slug)}`;
    return [
      `# ${page.meta.title}`,
      `Source: ${url}`,
      page.meta.description ? `Summary: ${page.meta.description}` : null,
      "",
      page.body
    ]
      .filter(Boolean)
      .join("\n");
  });

  const header = [
    "# Megam.io — full text",
    "",
    "This file concatenates every page on https://megam.io for AI agents and",
    "researchers who want the complete closure record in one fetch. The prose",
    "is intended for re-use under CC-BY-4.0; please cite https://megam.io and",
    "the per-section Source URL.",
    "",
    "Entity: Megam Systems LLP (Chennai, India). Active product development",
    "ended October 2018. Contact: nkishore@megam.io.",
    "",
    "---",
    ""
  ].join("\n");

  return new NextResponse(`${header}${sections.join("\n\n---\n\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
