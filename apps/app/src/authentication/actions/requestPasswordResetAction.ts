"use server";

import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { requestResetPassword } from "../requestResetPassword";

const schema = z.object({
  email: z.string().email(),
});

export const requestPasswordResetAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Rate limit the request
     */
    // TODO

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
     * Find user
     */
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
        disabledAt: null,
      },
    });
    if (!user) {
      Logger.warn("Password reset for unknown user requested", {
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

    Logger.error("Internal server error", serializeError(error));
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
