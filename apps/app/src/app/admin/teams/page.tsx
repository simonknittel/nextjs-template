import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { PageHeading } from "@/common/components/PageHeading";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { CreateTeamButton } from "@/teams/components/CreateTeamButton";
import { Filters } from "@/teams/components/Filters";
import { Skeleton } from "@/teams/components/Skeleton";
import { Table } from "@/teams/components/Table";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Teams | Next.js Template",
};

type Props = Readonly<{
  searchParams: NextjsSearchParams;
}>;

export default async function Page({ searchParams }: Props) {
  const authentication = await authenticatePage("/admin/teams");
  await authentication.authorizePage("administration", "manage");

  const urlSearchParams =
    await searchParamsNextjsToURLSearchParams(searchParams);

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <div className="flex items-center justify-between">
        <PageHeading>Teams</PageHeading>

        <CreateTeamButton />
      </div>

      <Filters className="mt-4 lg:mt-8" />

      <Suspense fallback={<Skeleton className="mt-2 lg:mt-4" />}>
        <Table
          showDisabled={urlSearchParams.get("show-disabled") === "true"}
          className="mt-2 lg:mt-4"
        />
      </Suspense>
    </main>
  );
}
