import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { ToasterWrapper } from "@/common/components/ToasterWrapper";
import { Navigation } from "@/common/components/navigation";
import { type ReactNode } from "react";

type Props = Readonly<{
  children?: ReactNode;
}>;

export default async function Layout({ children }: Props) {
  await authenticatePage("/admin");

  return (
    <>
      <div className="min-h-dvh">
        <Navigation />

        <div className="lg:ml-80 min-h-dvh bg-stone-100">{children}</div>
      </div>

      <ToasterWrapper />
    </>
  );
}