import { cookies } from "next/headers";
import { lucia } from "./lucia";

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
