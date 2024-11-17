import { expect, test } from "@playwright/test";
import { prisma } from "@nextjs-template/database";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Next.js Template");

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });
});

test("signup process", async ({ page }) => {
  /**
   * Signup
   */
  await page.goto("/signup");

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });

  await page.locator('input[id="email"]').fill("admin@example.com");
  await page.locator('input[id="password"]').fill("admin1234567890123456");
  await page
    .locator('input[id="password_repeat"]')
    .fill("admin1234567890123456");
  await page.getByRole("button", { name: "Sign up", exact: true }).click();

  await page.waitForURL(/.*\/verify\-email\?success=signup/);
  await expect(page).toHaveURL(/.*\/verify\-email\?success=signup/);

  const createdUser = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  });
  expect(createdUser).not.toBeNull();

  /**
   * Email verification
   */
  await expect(
    page.getByText(
      "You have successfully signed up. Please check your emails to confirm your account before logging in.",
      { exact: true }
    )
  ).toBeVisible();

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });

  const verificationToken = await prisma.emailVerificationToken.findFirst();
  expect(verificationToken).not.toBeNull();

  const maildevResponse = await fetch("http://localhost:1080/email");
  const emails = await maildevResponse.json();
  const verificationEmail = emails.find(
    (email: any) => email.subject === "Confirm your email address"
  );
  expect(verificationEmail).not.toBeNull();
  const verificationTokenId =
    verificationEmail.html.match(/token=([a-z0-9]+)/)[1];
  expect(verificationTokenId).not.toBeNull();

  await page.goto("/verify-email?token=" + verificationTokenId);

  /**
   * Login
   */
  await page.waitForURL(/.*\/login\?success=verified/);
  await expect(page).toHaveURL(/.*\/login\?success=verified/);

  await expect(
    page.getByText(
      "Your email address has been verified. You can now log in.",
      { exact: true }
    )
  ).toBeVisible();

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });

  await page.locator('input[id="email"]').fill("admin@example.com");
  await page.locator('input[id="password"]').fill("admin1234567890123456");
  await page.getByRole("button", { name: "Log in", exact: true }).click();

  await page.waitForURL(/.*\/admin/);
  await expect(page).toHaveURL(/.*\/admin/);

  await expect(page.getByText("Dashboard", { exact: true })).toBeVisible();

  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.05,
  });

  /**
   * Cleanup
   */
  await fetch(`http://localhost:1080/email/${verificationEmail.id}`, {
    method: "DELETE",
  });
  await prisma.user.delete({
    where: {
      email: "admin@example.com",
    },
  });
});
