import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { PageHeading } from "@/common/components/PageHeading";
import { CreateUserButton } from "@/users/components/CreateUserButton";
import { Table } from "@/users/components/Table";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | Next.js Template",
};

export default async function Page() {
  const authentication = await authenticatePage("/admin/users");
  authentication.authorize("administration", "manage");

  return (
    <main className="p-4 pb-20 lg:p-8">
      <div className="flex gap-4 items-center">
        <PageHeading>Users</PageHeading>

        <CreateUserButton />
      </div>

      <Table className="mt-4 lg:mt-8" />
    </main>
  );
}
