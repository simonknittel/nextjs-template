import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { DisableTile } from "@/authentication/components/totp/DisableTile";
import { PageHeading } from "@/common/components/PageHeading";
import { env } from "@/env";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account | Next.js Template",
};

export default async function Page() {
  const authentication = await authenticatePage("/admin/account/2fa/disable");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: authentication.user.id,
    },
  });

  if (!user.totpKeyVerifiedAt) {
    Logger.warn("Disabling TOTP failed: TOTP not set up");
    redirect("/admin/account");
  }

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <PageHeading>Two-factor authentication</PageHeading>

      <DisableTile
        MIN_PASSWORD_LENGTH={env.MIN_PASSWORD_LENGTH}
        MAX_PASSWORD_LENGTH={env.MAX_PASSWORD_LENGTH}
        className="mt-8"
      />
    </main>
  );
}
