import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/form/Input";
import { PageHeading } from "@/common/components/PageHeading";
import { Tile } from "@/common/components/Tile";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { prisma } from "@/db";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account | Next.js Template",
};

interface Props {
  readonly searchParams: NextjsSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const authentication = await authenticatePage("/admin/account");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: authentication.user.id,
    },
  });

  const urlSearchParams =
    await searchParamsNextjsToURLSearchParams(searchParams);

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <PageHeading>Account</PageHeading>

      <div className="flex flex-col gap-4 mt-8">
        <Tile heading="Email address">
          <Input type="email" defaultValue={user.email} disabled />
        </Tile>

        <Tile
          heading="Two-factor authentication"
          description="Secure your account by requiring two-factor authentication on login."
        >
          {!user.totpKeyVerifiedAt && (
            <Button asChild>
              <Link href="/admin/account/2fa/setup">Setup</Link>
            </Button>
          )}

          {user.totpKeyVerifiedAt && (
            <Button asChild>
              <Link href="/admin/account/2fa/disable">Disable</Link>
            </Button>
          )}

          {urlSearchParams.get("totp-setup") === "success" && (
            <Alert variant="success" className="mt-4">
              Successfully set up two-factor authentication.
            </Alert>
          )}

          {urlSearchParams.get("totp-disable") === "success" && (
            <Alert variant="success" className="mt-4">
              Successfully disabled two-factor authentication.
            </Alert>
          )}
        </Tile>
      </div>
    </main>
  );
}
