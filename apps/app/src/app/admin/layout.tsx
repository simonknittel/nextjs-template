import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { SystemRoleBypassEnablerServer } from "@/authentication/components/SystemRoleBypassEnablerServer";
import { SkipToMain } from "@/common/components/SkipToMain";
import { ToasterWrapper } from "@/common/components/ToasterWrapper";
import { Navigation } from "@/common/components/navigation";
import { type ReactNode } from "react";

interface Props {
  readonly children?: ReactNode;
}

export default async function Layout({ children }: Props) {
  await authenticatePage("/admin");

  return (
    <>
      <SkipToMain />

      <div className="min-h-dvh">
        <Navigation />

        <div className="lg:ml-80 min-h-dvh">{children}</div>
      </div>

      <SystemRoleBypassEnablerServer />
      <ToasterWrapper />
    </>
  );
}
