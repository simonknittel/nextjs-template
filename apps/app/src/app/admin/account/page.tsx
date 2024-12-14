import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { Input } from "@/common/components/form/Input";
import { PageHeading } from "@/common/components/PageHeading";
import { Tile } from "@/common/components/Tile";
import { prisma } from "@nextjs-template/database";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Next.js Template",
};

export default async function Page() {
  const authentication = await authenticatePage("/admin/account");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: authentication.user.id,
    },
  });

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <PageHeading>Account</PageHeading>

      <div className="flex flex-col gap-4 mt-8">
        <Tile heading="Email address">
          <Input type="email" value={user.email} disabled />
        </Tile>

        <Tile heading="Two-factor authentication"></Tile>
      </div>
    </main>
  );
}
