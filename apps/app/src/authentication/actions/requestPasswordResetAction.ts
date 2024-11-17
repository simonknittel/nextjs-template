"use server";

import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { unstable_rethrow } from "next/navigation";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { requestResetPassword } from "../requestResetPassword";

const schema = z.object({
  email: z.string().email(),
});

const rateLimiter = new RateLimiterMemory({
  // 5 requests per minute
  points: 5,
  duration: 60,
});

export const requestPasswordResetAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Validate the request
     */
    const result = schema.safeParse({
      email: formData.get("email"),
    });
    if (!result.success) {
      return {
        error: "Invalid request.",
      };
    }

    /**
     * Rate limit the request
     */
    try {
      await rateLimiter.consume(result.data.email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Request password reset failed: rate limit exceeded", {
        email: result.data.email,
      });
      return {
        error: "Too many attempts. Please try again later.",
      };
    }

    /**
     * Find user
     */
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
        disabledAt: null,
      },
    });
    if (!user) {
      Logger.warn("Request password set failed: unknown user", {
        email: result.data.email,
      });
      return {
        success:
          "An email with a link to reset the password will be sent to the provided email address, if it is associated with a user account.",
      };
    }

    await requestResetPassword(user);

    /**
     * Respond with the result
     */
    return {
      success:
        "An email with a link to reset the password will be sent to the provided email address, if it is associated with a user account.",
    };
  } catch (error) {
    unstable_rethrow(error);

    Logger.error(
      "Request password set failed: unknown error",
      serializeError(error),
    );
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
