import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "cd ../../ && npm run start --workspace=apps/app",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}{ext}",
});
