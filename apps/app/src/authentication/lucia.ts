import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import {
  prisma,
  type UserRole,
  type UserSystemRole,
} from "@nextjs-template/database";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      systemRole: attributes.systemRole,
      role: attributes.role,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  systemRole: UserSystemRole;
  role: UserRole;
}
