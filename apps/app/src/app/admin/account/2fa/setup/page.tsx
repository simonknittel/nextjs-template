import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { StartTile } from "@/authentication/components/totp/StartTile";
import { createTotpKey } from "@/authentication/createTotpKey";
import { PageHeading } from "@/common/components/PageHeading";
import { prisma } from "@/db";
import { Logger } from "@nextjs-template/logging";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account | Next.js Template",
};

export default async function Page() {
  const authentication = await authenticatePage("/admin/account/2fa/setup");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: authentication.user.id,
    },
  });

  if (user.totpKeyVerifiedAt) {
    Logger.warn("TOTP setup failed: TOTP already set up");
    redirect("/admin/account");
  }

  const { base32EncodedKey, qrCode } = createTotpKey(user.email);

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <PageHeading>Two-factor authentication</PageHeading>

      <StartTile
        base32EncodedKey={base32EncodedKey}
        qrCode={qrCode}
        className="mt-8"
      />
    </main>
  );
}
