import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { PageHeading } from "@/common/components/PageHeading";
import {
  type NextjsSearchParams,
  searchParamsNextjsToURLSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { Skeleton } from "@/teams/components/Skeleton";
import { CreateUserButton } from "@/users/components/CreateUserButton";
import { Filters } from "@/users/components/Filters";
import { Table } from "@/users/components/Table";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users | Next.js Template",
};

interface Props {
  readonly searchParams: NextjsSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const authentication = await authenticatePage("/admin/users");
  await authentication.authorize("administration", "manage");

  const urlSearchParams =
    await searchParamsNextjsToURLSearchParams(searchParams);

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <div className="flex items-center justify-between">
        <PageHeading>Users</PageHeading>

        <CreateUserButton />
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
