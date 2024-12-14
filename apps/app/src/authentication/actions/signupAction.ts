"use server";

import { env } from "@/env";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { redirect, unstable_rethrow } from "next/navigation";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { haveIBeenPwned } from "../checkHaveIBeenPwned";
import { hashPassword } from "../hashPassword";
import { MESSAGES } from "../messages";
import { requestEmailVerification } from "../requestEmailVerification";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(env.MIN_PASSWORD_LENGTH)
    .max(env.MAX_PASSWORD_LENGTH),
  passwordRepeat: z
    .string()
    .min(env.MIN_PASSWORD_LENGTH)
    .max(env.MAX_PASSWORD_LENGTH),
});

const rateLimiter = new RateLimiterMemory({
  // 5 requests per minute
  points: 5,
  duration: 60,
});

export const signupAction = async (formData: FormData) => {
  try {
    /**
     * Validate the request
     */
    const result = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      passwordRepeat: formData.get("passwordRepeat"),
    });
    if (!result.success) {
      Logger.warn("Signup failed: invalid request");
      redirect(`/signup?error=${MESSAGES.signup.passwordRequirements.query}`);
    }

    /**
     * Rate limit the request
     */
    try {
      await rateLimiter.consume(result.data.email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Signup failed: rate limit exceeded", {
        email: result.data.email,
      });
      redirect(`/signup?error=${MESSAGES.signup.rateLimit.query}`);
    }

    const { password, passwordRepeat } = result.data;
    if (password !== passwordRepeat) {
      Logger.warn("Signup failed: passwords don't match", {
        email: result.data.email,
      });
      redirect(`/signup?error=${MESSAGES.signup.passwordsDontMatch.query}`);
    }

    if (await haveIBeenPwned(password)) {
      Logger.warn("Signup failed: password breached", {
        email: result.data.email,
      });
      redirect(`/signup?error=${MESSAGES.signup.passwordBreached.query}`);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (existingUser) {
      Logger.warn("Signup failed: user already exists", {
        email: result.data.email,
      });
      redirect(`/signup?error=${MESSAGES.signup.unknown.query}`);
    }

    /**
     * Sign up the user
     */
    const passwordHash = await hashPassword(password);

    const createdUser = await prisma.user.create({
      data: {
        email: result.data.email,
        passwordHash,
        signedUpAt: new Date(),
      },
    });

    await requestEmailVerification(createdUser);

    /**
     * Respond with the result
     */
    redirect(`/verify-email?success=${MESSAGES.verifyEmail.signup.query}`);
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Signup failed: unknown error", serializeError(error));
    redirect(`/signup?error=${MESSAGES.signup.unknown.query}`);
  }
};
