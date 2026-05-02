import fs from "node:fs";
import path from "node:path";

export type PageSlug =
  | "index"
  | "timeline"
  | "architecture"
  | "products"
  | "team"
  | "why-it-didnt-work"
  | "artifacts"
  | "lessons"
  | "colophon"
  | "404";

export type PageMeta = {
  title: string;
  description: string;
};

export type ContentPage = {
  slug: PageSlug;
  meta: PageMeta;
  body: string;
  html: string;
};

const contentDir = path.join(process.cwd(), "content");

export const pageSlugs: PageSlug[] = [
  "index",
  "timeline",
  "architecture",
  "products",
  "team",
  "why-it-didnt-work",
  "artifacts",
  "lessons",
  "colophon"
];

export const navPages: Array<{ slug: PageSlug; label: string; range: string }> = [
  { slug: "timeline", label: "timeline", range: "2012-2026" },
  { slug: "architecture", label: "architecture", range: "v1-v2" },
  { slug: "products", label: "products", range: "2012-2018" },
  { slug: "team", label: "team", range: "people" },
  { slug: "why-it-didnt-work", label: "why it did not work", range: "postmortem" },
  { slug: "artifacts", label: "artifacts", range: "repos/docs/video" },
  { slug: "lessons", label: "lessons", range: "closure" }
];

export function routeForSlug(slug: PageSlug): string {
  if (slug === "index") return "/";
  return `/${slug}`;
}

export function getPage(slug: PageSlug): ContentPage {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);

  return {
    slug,
    meta,
    body,
    html: markdownToHtml(body)
  };
}

export function getAllPages(): ContentPage[] {
  return pageSlugs.map((slug) => getPage(slug));
}

function parseFrontmatter(raw: string): { meta: PageMeta; body: string } {
  if (!raw.startsWith("---")) {
    return {
      meta: { title: "Megam.io", description: "" },
      body: raw.trim()
    };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return {
      meta: { title: "Megam.io", description: "" },
      body: raw.trim()
    };
  }

  const frontmatter = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const meta: PageMeta = { title: "Megam.io", description: "" };

  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key === "title") meta.title = value;
    if (key === "description") meta.description = value;
  }

  return { meta, body };
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let table: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    html.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  const flushTable = () => {
    if (table.length === 0) return;
    const rows = table.filter((row) => !/^\|?\s*:?-{3,}:?\s*\|/.test(row));
    const rendered = rows.map((row, index) => {
      const cells = row
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());
      const tag = index === 0 ? "th" : "td";
      return `<tr>${cells.map((cell) => `<${tag}>${inline(cell)}</${tag}>`).join("")}</tr>`;
    });
    html.push(`<table><tbody>${rendered.join("")}</tbody></table>`);
    table = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushTable();
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushAll();
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      table.push(trimmed);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushTable();
      list.push(trimmed.slice(2));
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    flushList();
    flushTable();
    paragraph.push(trimmed);
  }

  flushAll();
  return html.join("\n");
}

function inline(value: string): string {
  let output = escapeHtml(value);

  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    return `<a href="${escapeAttribute(href)}">${label}</a>`;
  });
  output = output.replace(/\[(C[0-9]{3})\]/g, '<a class="claim-ref" href="/artifacts">[$1]</a>');

  return output;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
