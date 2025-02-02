import { UserSystemRole } from "@/db";
import type { User } from "lucia";

export const hasSystemRoleBypass = (authentication: { user: User }) => {
  if (authentication.user.systemRole !== UserSystemRole.ADMIN) return false;
  return true;
};
