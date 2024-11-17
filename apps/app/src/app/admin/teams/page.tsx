import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { PageHeading } from "@/common/components/PageHeading";
import { CreateTeamButton } from "@/teams/components/CreateTeamButton";
import { Skeleton } from "@/teams/components/Skeleton";
import { TeamsTableTile } from "@/teams/components/TeamsTableTile";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Teams | Next.js Template",
};

export default async function Page() {
  const authentication = await authenticatePage("/admin/teams");
  authentication.authorizePage("administration", "manage");

  return (
    <main className="p-4 pb-20 lg:p-8">
      <div className="flex gap-4 items-center">
        <PageHeading>Teams</PageHeading>

        <CreateTeamButton />
      </div>

      <Suspense fallback={<Skeleton className="mt-4 lg:mt-8" />}>
        <TeamsTableTile className="mt-4 lg:mt-8" />
      </Suspense>
    </main>
  );
}
