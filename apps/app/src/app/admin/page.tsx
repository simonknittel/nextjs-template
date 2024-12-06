import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { PageHeading } from "@/common/components/PageHeading";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Next.js Template",
};

export default async function Page() {
  await authenticatePage("/admin");

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <PageHeading>Dashboard</PageHeading>
    </main>
  );
}
