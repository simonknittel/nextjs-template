import { authenticate } from "../authenticateAndAuthorize";
import { hasSystemRoleBypass } from "../hasSystemRoleBypass";
import { isSystemRoleBypassEnabled } from "../isSystemRoleBypassEnabled";
import { SystemRoleBypassEnablerClient } from "./SystemRoleBypassEnablerClient";

interface Props {
  readonly className?: string;
}

export const SystemRoleBypassEnablerServer = async ({ className }: Props) => {
  const authentication = await authenticate();
  if (!authentication) return null;

  if (!hasSystemRoleBypass(authentication)) return null;

  const isEnabled = await isSystemRoleBypassEnabled();

  return (
    <SystemRoleBypassEnablerClient className={className} enabled={isEnabled} />
  );
};
