"use server";

import { Logger } from "@nextjs-template/logging";
import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { authenticate } from "../authenticateAndAuthorize";
import { lucia } from "../lucia";

export const logoutAction = async () => {
  try {
    /**
     * Invalidate session
     */
    const authentication = await authenticate();
    if (!authentication) throw new Error("Unauthorized");

    await lucia.invalidateSession(authentication.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    /**
     * Respond with the result
     */
    redirect(`/login`);
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Login failed", serializeError(error));
    redirect(`/admin?error=unknown`);
  }
};
