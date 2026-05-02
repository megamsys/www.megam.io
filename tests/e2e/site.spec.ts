import { expect, test } from "@playwright/test";

const routes = [
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

test.describe("closure site", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 10, 15)");
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("home links to both docs sites and core pages", async ({ page }) => {
    await page.goto("/");
    const header = page.getByLabel("Site header");

    await expect(header.getByRole("link", { name: "Megam docs" })).toHaveAttribute(
      "href",
      "https://docs.megam.io"
    );
    await expect(header.getByRole("link", { name: "Rio/OS docs" })).toHaveAttribute(
      "href",
      "https://docs.rioos.megam.io"
    );
    await expect(page.getByRole("link", { name: /timeline/i }).first()).toHaveAttribute(
      "href",
      "/timeline"
    );
  });

  test("artifacts includes the Megam YouTube channel", async ({ page }) => {
    await page.goto("/artifacts");

    await expect(
      page.getByRole("link", { name: "Megam YouTube channel" })
    ).toHaveAttribute("href", "https://www.youtube.com/channel/UC2ktYQ2-a9lG0X6VyS7AfBQ");
  });

  test("team separates downstream projects", async ({ page }) => {
    await page.goto("/team");

    await expect(page.getByRole("heading", { name: "Megam / Rio/OS Team" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Downstream / Successor Projects" })).toBeVisible();
    await expect(page.getByText("not the Megam employee roster")).toBeVisible();
  });
});
