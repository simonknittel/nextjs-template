"use server";

import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { redirect, unstable_rethrow } from "next/navigation";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { createSession } from "../createSession";
import { verifyPassword } from "../hashPassword";
import { MESSAGES } from "../messages";
import { requestResetPassword } from "../requestResetPassword";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  redirect_to: z.string().startsWith("/admin").nullish(),
});

const rateLimiter = new RateLimiterMemory({
  // 5 requests per minute
  points: 5,
  duration: 60,
});

export const loginAction = async (formData: FormData) => {
  try {
    /**
     * Validate the request
     */
    const result = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      redirect_to: formData.get("redirect_to"),
    });
    if (!result.success) {
      Logger.warn("Login failed: invalid request");
      redirect(`/login?error=${MESSAGES.login.userOrPasswordInvalid.query}`);
    }

    /**
     * Rate limit the request
     */
    try {
      // TODO: Implement separate rate limit for IP address
      await rateLimiter.consume(result.data.email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Login failed: rate limit exceeded", {
        email: result.data.email,
      });
      redirect(
        `/login?error=${MESSAGES.login.rateLimit.query}${result.data.redirect_to ? `&redirect_to=${result.data.redirect_to}` : ""}`,
      );
    }

    /**
     * Validate email and password
     */
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
        disabledAt: null,
      },
      select: {
        id: true,
        email: true,
        emailVerifiedAt: true,
        passwordHash: true,
      },
    });
    if (!user) {
      Logger.warn("Login failed: user not found", { email: result.data.email });
      redirect(
        `/login?error=${MESSAGES.login.userOrPasswordInvalid.query}${result.data.redirect_to ? `&redirect_to=${result.data.redirect_to}` : ""}`,
      );
    }
    if (!user.passwordHash) {
      Logger.warn("Login failed: user has no password hash", {
        email: result.data.email,
      });
      await requestResetPassword(user);
      redirect(
        `/login?error=${MESSAGES.login.passwordMissing.query}${result.data.redirect_to ? `&redirect_to=${result.data.redirect_to}` : ""}`,
      );
    }

    try {
      await verifyPassword(user.passwordHash, result.data.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Login failed: invalid password", {
        email: result.data.email,
      });
      redirect(
        `/login?error=${MESSAGES.login.userOrPasswordInvalid.query}${result.data.redirect_to ? `&redirect_to=${result.data.redirect_to}` : ""}`,
      );
    }

    if (!user.emailVerifiedAt) {
      Logger.warn("Login failed: email not verified", {
        email: result.data.email,
      });
      redirect(
        `/verify-email?error=${MESSAGES.verifyEmail.unverified.query}${result.data.redirect_to ? `&redirect_to=${result.data.redirect_to}` : ""}`,
      );
    }

    Logger.info("Login successful", { email: result.data.email });

    await createSession(user.id);

    /**
     * Respond with the result
     */
    if (result.data.redirect_to) {
      redirect(result.data.redirect_to);
    } else {
      redirect(`/admin`);
    }
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Login failed: unknown error", serializeError(error));
    redirect(`/login?error=${MESSAGES.login.unknown.query}`);
  }
};
