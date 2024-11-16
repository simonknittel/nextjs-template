import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Next.js Template");

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });
});
