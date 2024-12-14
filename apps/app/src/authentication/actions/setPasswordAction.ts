"use server";

import { sendEmail } from "@/emails/utils/sendEmail";
import { env } from "@/env";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import SetPasswordConfirmation from "@nextjs-template/transactional/emails/SetPasswordConfirmation";
import { render } from "@react-email/components";
import { redirect, unstable_rethrow } from "next/navigation";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { haveIBeenPwned } from "../checkHaveIBeenPwned";
import { createSession } from "../createSession";
import { hashPassword } from "../hashPassword";
import { lucia } from "../lucia";
import { MESSAGES } from "../messages";
import { validatePasswordResetToken } from "../validatePasswordResetToken";

const tokenSchema = z.string().length(64);

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(env.MIN_PASSWORD_LENGTH)
    .max(env.MAX_PASSWORD_LENGTH),
  newPasswordRepeat: z
    .string()
    .min(env.MIN_PASSWORD_LENGTH)
    .max(env.MAX_PASSWORD_LENGTH),
});

const rateLimiter = new RateLimiterMemory({
  // 5 requests per minute
  points: 5,
  duration: 60,
});

export const setPasswordAction = async (formData: FormData) => {
  try {
    /**
     * Validate the request
     */
    const tokenResult = tokenSchema.safeParse(formData.get("token"));
    if (!tokenResult.success) {
      Logger.warn("Set password failed: invalid token");
      redirect(
        `/set-password?error=${MESSAGES.setPassword.invalidToken.query}`,
      );
    }
    const tokenId = tokenResult.data;

    /**
     * Rate limit the request
     */
    try {
      // TODO: Implement separate rate limit for IP address
      await rateLimiter.consume(tokenId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Set password failed: rate limit exceeded", {
        tokenId,
      });
      redirect(`/set-password?error=${MESSAGES.setPassword.rateLimit.query}`);
    }

    /**
     * Validate the request
     */
    const passwordResult = passwordSchema.safeParse({
      newPassword: formData.get("newPassword"),
      newPasswordRepeat: formData.get("newPasswordRepeat"),
    });
    if (!passwordResult.success) {
      Logger.warn("Set password failed: invalid request", { tokenId });
      redirect(
        `/set-password?token=${tokenId}&error=${MESSAGES.setPassword.passwordRequirements.query}`,
      );
    }

    const { newPassword, newPasswordRepeat } = passwordResult.data;
    if (newPassword !== newPasswordRepeat) {
      Logger.warn("Set password failed: passwords don't match", { tokenId });
      redirect(
        `/set-password?token=${tokenId}&error=${MESSAGES.setPassword.passwordsDontMatch.query}`,
      );
    }

    if (await haveIBeenPwned(newPassword)) {
      Logger.warn("Set password failed: password breached", { tokenId });
      redirect(
        `/set-password?token=${tokenId}&error=${MESSAGES.setPassword.passwordBreached.query}`,
      );
    }

    const token = await validatePasswordResetToken(tokenId);
    if (!token) {
      Logger.warn("Set password failed: invalid token", { tokenId });
      redirect(
        `/set-password?error=${MESSAGES.setPassword.invalidToken.query}`,
      );
    }

    /**
     * Update user
     */
    await lucia.invalidateUserSessions(token.userId);

    const passwordHash = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        passwordHash,
      },
    });

    /**
     * Send confirmation email
     */
    await sendEmail({
      to: updatedUser.email,
      subject: "Password changed",
      html: await render(
        SetPasswordConfirmation({
          baseUrl: env.BASE_URL,
        }),
      ),
    });

    /**
     * Create session
     */
    await createSession(updatedUser.id);

    /**
     * Set Referrer Policy because of token
     */
    // (await headers()).set("Referrer-Policy", "no-referrer"); // TODO

    /**
     * Respond with the result
     */
    redirect(`/admin`);
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Set password failed", serializeError(error));

    /**
     * Set Referrer Policy because of token
     */
    // (await headers()).set("Referrer-Policy", "no-referrer"); // TODO

    redirect(`/set-password?error=${MESSAGES.setPassword.unknown.query}`);
  }
};
