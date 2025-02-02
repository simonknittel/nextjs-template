"use server";

import { encrypt } from "@/common/utils/encryption";
import { prisma } from "@/db";
import { Logger } from "@nextjs-template/logging";
import { decodeBase32 } from "@oslojs/encoding";
import { verifyTOTP } from "@oslojs/otp";
import { redirect, unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { authenticateAction } from "../authenticateAndAuthorize";

const schema = z.object({
  base32EncodedKey: z.string().length(32),
  code: z.string().length(6),
});

export const verifyTotpKeyAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Authenticate the request
     */
    const authentication = await authenticateAction("verifyTotpKey");

    /**
     * Validate the request
     */
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: authentication.user.id,
      },
    });

    if (user.totpKeyVerifiedAt) {
      Logger.error("TOTP key verification failed: already set up");
      return {
        error: "Bad Request. Two-factor authentication is already set up.",
      };
    }

    const result = schema.safeParse({
      base32EncodedKey: formData.get("base32EncodedKey"),
      code: formData.get("code"),
    });
    if (!result.success) {
      Logger.warn("TOTP key verification failed: Bad Request", {
        error: serializeError(result.error),
      });
      return {
        error: "Bad Request. Please try again.",
      };
    }

    /**
     * Verify TOTP key
     */
    const key = decodeBase32(result.data.base32EncodedKey);
    const verified = verifyTOTP(key, 30, 6, result.data.code);

    if (!verified) {
      Logger.error("TOTP key verification failed: invalid code");
      return {
        error: "Invalid code. Please try again.",
      };
    }

    /**
     * Update user
     */
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        totpKey: encrypt(key),
        totpKeyVerifiedAt: new Date(),
      },
    });

    redirect("/admin/account?totp-setup=success");
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("TOTP key verification failed: Internal Server Error", {
      error: serializeError(error),
    });
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
