import { expect, test } from "@playwright/test";

const contentRoutes = [
  "/",
  "/timeline",
  "/architecture",
  "/products",
  "/team",
  "/why-it-didnt-work",
  "/artifacts",
  "/lessons",
  "/colophon"
];

type JsonLdRecord = Record<string, unknown>;

async function getJsonLd(page: import("@playwright/test").Page): Promise<JsonLdRecord[]> {
  return await page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map((node) => JSON.parse(node.textContent ?? "null") as Record<string, unknown>)
  );
}

test.describe("footer with registered entity", () => {
  test("renders Megam Systems LLP and full Chennai address", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByLabel("Site footer");
    await expect(footer.getByText("Megam Systems LLP")).toBeVisible();
    await expect(footer.getByText("Plot #53, Door #1/1624")).toBeVisible();
    await expect(footer.getByText(/Perumbakkam, Chennai 600100, India/)).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "nkishore@megam.io" })
    ).toHaveAttribute("href", "mailto:nkishore@megam.io");
  });

  test("uses semantic <address> element", async ({ page }) => {
    await page.goto("/timeline");
    await expect(page.locator("footer address.postal")).toBeVisible();
  });
});

test.describe("content corrections", () => {
  test("customer count is 11 across products/timeline/why-it-didnt-work", async ({ page }) => {
    for (const route of ["/products", "/timeline", "/why-it-didnt-work"]) {
      await page.goto(route);
      await expect(page.locator("main")).toContainText("11 named Phase 1 customer accounts");
      await expect(page.locator("main")).not.toContainText("12 named Phase 1 customer accounts");
    }
  });

  test("colophon no longer references the old Megam logo", async ({ page }) => {
    await page.goto("/colophon");
    await expect(page.locator("main")).not.toContainText(/old Megam logo/i);
  });

  test("architecture links repos on first mention", async ({ page }) => {
    await page.goto("/architecture");
    const main = page.locator("main");
    await expect(
      main.getByRole("link", { name: "verticegateway" }).first()
    ).toHaveAttribute("href", "https://github.com/megamsys/verticegateway");
    await expect(main.getByRole("link", { name: "vertice" }).first()).toHaveAttribute(
      "href",
      "https://github.com/megamsys/vertice"
    );
    await expect(main.getByRole("link", { name: "gulp" }).first()).toHaveAttribute(
      "href",
      "https://github.com/megamsys/gulp"
    );
    await expect(main.getByRole("link", { name: "Nilavu" })).toHaveAttribute(
      "href",
      "https://github.com/megamsys/nilavu"
    );
  });

  test("acronyms are expanded on first mention", async ({ page }) => {
    await page.goto("/architecture");
    await expect(page.locator("main")).toContainText(/Hash-based Message Authentication Code/);
    await expect(page.locator("main")).toContainText(/Password-Based Key Derivation Function 2/);
    await expect(page.locator("main")).toContainText(/Representational State Transfer/);
    await expect(page.locator("main")).toContainText(/Topology and Orchestration Specification for/);

    await page.goto("/products");
    await expect(page.locator("main")).toContainText(/cloud management platform \(CMP\)/);
    await expect(page.locator("main")).toContainText(/platform-as-a-service \(PaaS\)/);
    await expect(page.locator("main")).toContainText(/Web Host Manager Complete Solution/);
  });

  test("pivot story on /products defers to timeline", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("main")).toContainText("Lendsmart / Getattune");
    await expect(
      page.getByRole("link", { name: /timeline/i }).first()
    ).toBeVisible();
  });

  test("Varadarajan Narayanan has a LinkedIn link", async ({ page }) => {
    await page.goto("/team");
    const heading = page.getByRole("heading", { name: "Varadarajan Narayanan" });
    await expect(heading).toBeVisible();
    const linkedin = page
      .locator("h3", { hasText: "Varadarajan Narayanan" })
      .locator("xpath=following-sibling::p[contains(., 'LinkedIn')][1]")
      .getByRole("link", { name: "LinkedIn" });
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/wayzinfratek"
    );
  });
});

test.describe("agent-friendly endpoints", () => {
  test("/robots.txt allows all and points to sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-Agent:\s*\*/i);
    expect(body).toContain("https://megam.io/sitemap.xml");
  });

  test("/sitemap.xml lists every content route", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    for (const route of contentRoutes) {
      const url = `https://megam.io${route === "/" ? "" : route}`;
      expect(body).toContain(url);
    }
  });

  test("/llms.txt is served from /public", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Megam Systems LLP");
    expect(body).toContain("https://megam.io/llms-full.txt");
  });

  test("/llms-full.txt concatenates every page", async ({ request }) => {
    const res = await request.get("/llms-full.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/text\/plain/);
    const body = await res.text();
    expect(body).toContain("Megam.io — full text");
    expect(body).toContain("Source: https://megam.io/timeline");
    expect(body).toContain("Source: https://megam.io/team");
    expect(body).toContain("Source: https://megam.io/colophon");
  });

  test("/opengraph-image returns a PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/image\/png/);
    const buf = await res.body();
    expect(buf.length).toBeGreaterThan(2000);
  });
});

test.describe("JSON-LD structured data", () => {
  test("home emits Organization + WebSite", async ({ page }) => {
    await page.goto("/");
    const blocks = await getJsonLd(page);
    const types = blocks.map((b) => b["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    const org = blocks.find((b) => b["@type"] === "Organization") as
      | (JsonLdRecord & { name: string; address: Record<string, string> })
      | undefined;
    expect(org).toBeTruthy();
    expect(org!.name).toBe("Megam Systems LLP");
    expect(org!.address.postalCode).toBe("600100");
    expect(org!.address.addressLocality).toBe("Chennai");
    expect(org!.address.addressCountry).toBe("IN");
  });

  test("each content page emits an Article", async ({ page }) => {
    for (const route of contentRoutes.filter((r) => r !== "/")) {
      await page.goto(route);
      const blocks = await getJsonLd(page);
      const article = blocks.find((b) => b["@type"] === "Article") as
        | (JsonLdRecord & { url: string; license: string })
        | undefined;
      expect(article, `Article JSON-LD missing on ${route}`).toBeTruthy();
      expect(article!.url).toBe(`https://megam.io${route}`);
      expect(article!.license).toContain("creativecommons.org/licenses/by/4.0");
    }
  });

  test("/team emits Person @graph for everyone", async ({ page }) => {
    await page.goto("/team");
    const blocks = await getJsonLd(page);
    const graph = blocks.find((b) => Array.isArray(b["@graph"])) as
      | (JsonLdRecord & { "@graph": Array<{ name: string; sameAs: string[] }> })
      | undefined;
    expect(graph, "Person @graph missing").toBeTruthy();
    const names = graph!["@graph"].map((p) => p.name);
    expect(names).toContain("Kishorekumar Neelamegam");
    expect(names).toContain("Varadarajan Narayanan");
    expect(names).toContain("Jonathan Philipos");
    const varad = graph!["@graph"].find((p) => p.name === "Varadarajan Narayanan");
    expect(varad!.sameAs).toContain("https://www.linkedin.com/in/wayzinfratek");
  });
});

test.describe("OpenGraph metadata", () => {
  test("home page has og:image pointing at /opengraph-image", async ({ page }) => {
    await page.goto("/");
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    expect(ogImage).toMatch(/\/opengraph-image/);
  });
});
