"use server";

import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { redirect, unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { createSession } from "../createSession";
import { verifyPassword } from "../hashPassword";
import { MESSAGES } from "../messages";
import { requestResetPassword } from "../requestResetPassword";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const loginAction = async (formData: FormData) => {
  try {
    /**
     * Rate limit the request
     */
    // TODO

    /**
     * Validate the request
     */
    const { email, password } = schema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    /**
     * Validate email and password
     */
    const user = await prisma.user.findUnique({
      where: {
        email,
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
      Logger.warn("Login failed: user not found", { email });
      redirect(`/login?error=${MESSAGES.login.userOrPasswordInvalid.query}`);
    }
    if (!user.passwordHash) {
      Logger.warn("Login failed: user has no password hash", { email });
      await requestResetPassword(user);
      redirect(`/login?error=${MESSAGES.login.passwordMissing.query}`);
    }

    try {
      await verifyPassword(user.passwordHash, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Login failed: invalid password", { email });
      redirect(`/login?error=${MESSAGES.login.userOrPasswordInvalid.query}`);
    }

    if (!user.emailVerifiedAt) {
      Logger.warn("Login failed: email not verified", { email });
      redirect(`/verify-email?error=${MESSAGES.verifyEmail.unverified.query}`);
    }

    Logger.info("Login successful", { email });

    await createSession(user.id);

    /**
     * Respond with the result
     */
    redirect(`/admin`);
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Login failed: unknown error", serializeError(error));
    redirect(`/login?error=${MESSAGES.login.unknown.query}`);
  }
};
