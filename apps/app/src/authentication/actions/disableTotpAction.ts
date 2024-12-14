"use server";

import { decrypt } from "@/common/utils/encryption";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { verifyTOTP } from "@oslojs/otp";
import { redirect, unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { authenticateAction } from "../authenticateAndAuthorize";
import { verifyPassword } from "../hashPassword";

const schema = z.object({
  password: z.string().min(8).max(128),
  code: z.string().length(6),
});

export const disableTotpAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Authenticate the request
     */
    const authentication = await authenticateAction("disableTotp");

    /**
     * Validate the request
     */
    const result = schema.safeParse({
      password: formData.get("password"),
      code: formData.get("code"),
    });
    if (!result.success) {
      Logger.warn("Disabling TOTP failed: Bad Request");
      return {
        error: "Bad Request",
      };
    }

    /**
     * Validate password
     */
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: authentication.user.id,
      },
      select: {
        id: true,
        passwordHash: true,
        totpKey: true,
      },
    });

    if (!user.passwordHash || !user.totpKey) {
      Logger.warn("Disabling TOTP failed: Missing passwordHash or totpKey", {
        userId: user.id,
      });
      redirect("/admin/account");
    }

    try {
      await verifyPassword(user.passwordHash, result.data.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Disabling TOTP failed: invalid password", {
        userId: user.id,
      });
      return {
        error: "Invalid password or code",
      };
    }

    /**
     * Verify TOTP code
     */
    const key = decrypt(user.totpKey);
    const verified = verifyTOTP(key, 30, 6, result.data.code);
    if (!verified) {
      Logger.warn("Disabling TOTP failed: invalid code", {
        userId: user.id,
      });
      return {
        error: "Invalid password or code",
      };
    }

    /**
     * Update user
     */
    await prisma.user.update({
      where: {
        id: authentication.user.id,
      },
      data: {
        totpKey: null,
        totpKeyVerifiedAt: null,
      },
    });

    redirect("/admin/account?totp-disable=success");
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Disabling TOTP failed: Internal Server Error", {
      error: serializeError(error),
    });
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
