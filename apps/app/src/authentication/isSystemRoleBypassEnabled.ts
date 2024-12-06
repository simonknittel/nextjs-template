import { cookies } from "next/headers";

export const isSystemRoleBypassEnabled = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("enable_system_role_bypass")?.value === "1";
};
