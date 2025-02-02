"use server";

import { prisma } from "@/db";
import { Logger } from "@nextjs-template/logging";
import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { authenticateAction } from "../authenticateAndAuthorize";

const schema = z.object({
  userId: z.string().cuid2(),
});

export const disableOthersTotpAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Authenticate the request
     */
    const authentication = await authenticateAction("disableOthersTotp");
    await authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const result = schema.safeParse({
      userId: formData.get("user_id"),
    });
    if (!result.success) {
      Logger.warn("Disabling other's TOTP failed: Bad Request");
      return {
        error: "Bad Request",
      };
    }

    /**
     * Update user
     */
    await prisma.user.update({
      where: {
        id: result.data.userId,
      },
      data: {
        totpKey: null,
        totpKeyVerifiedAt: null,
      },
    });

    revalidatePath(`/admin/users/user/${result.data.userId}`);
    return {
      success: "Successfully disabled 2FA for the user.",
    };
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Disabling other's TOTP failed: Internal Server Error", {
      error: serializeError(error),
    });
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
