"use server";

import { serverActionErrorHandler } from "@/common/utils/actions";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requestResetPassword } from "../requestResetPassword";

const schema = z.object({
  email: z.string().email(),
});

export const requestPasswordResetAction = async (formData: FormData) => {
  try {
    /**
     * Rate limit the request
     */
    // TODO

    /**
     * Validate the request
     */
    const { email } = schema.parse({
      email: formData.get("email"),
    });

    /**
     * Find user
     */
    const user = await prisma.user.findUnique({
      where: {
        email,
        disabledAt: null,
      },
    });
    if (!user) {
      Logger.warn("Password reset for unknown user requested", {
        email,
      });
      return {
        message:
          "An email with a link to reset the password will be sent to the provided email address, if it is associated with a user account.",
      };
    }

    await requestResetPassword(user);

    /**
     * Respond with the result
     */
    redirect(`/admin/users/user/${user.id}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
