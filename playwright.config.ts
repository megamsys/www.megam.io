import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  // Tests run against the production build (`next start`), not `next dev`.
  // The site is fully static/SSG, so dev-mode on-demand compilation only adds
  // slow, variable first-hit latency. Run `npm run build` before `test:e2e`
  // (the canonical local/CI order); the server here just serves that build.
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] }
    }
  ]
});
