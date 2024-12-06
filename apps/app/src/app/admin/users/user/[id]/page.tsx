import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/Alert";
import { MetadataTile } from "@/common/components/MetadataTile/MetadataTile";
import { MetadataTileEntry } from "@/common/components/MetadataTile/MetadataTileEntry";
import { UserActions } from "@/users/components/UserActions";
import { UserRoleTile } from "@/users/components/UserRoleTile";
import { UserTeams } from "@/users/components/UserTeams";
import { getUserByIdDeduped } from "@/users/queries";
import { Logger } from "@nextjs-template/logging";
import { AlertCircle } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { serializeError } from "serialize-error";

type Params = Promise<
  Readonly<{
    id: string;
  }>
>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const { id } = await params;

    const user = await getUserByIdDeduped(id);
    if (!user) return {};

    return {
      title: `Details - Users | Next.js Template`,
    };
  } catch (error) {
    Logger.error(
      "Error while generating metadata for /admin/users/user/[id]/page.tsx",
      {
        error: serializeError(error),
      },
    );

    return {
      title: `Error | Next.js Template`,
    };
  }
}

type Props = Readonly<{
  params: Params;
}>;

export default async function Page({ params }: Props) {
  const authentication = await authenticatePage("/admin/users/user/[id]");
  await authentication.authorizePage("administration", "manage");

  const { id } = await params;

  const user = await getUserByIdDeduped(id);
  if (!user) notFound();

  return (
    <main id="main" className="p-4 pb-20 lg:p-8">
      <h1 className="sr-only">User details</h1>

      <div>
        <Link
          href="/admin/users"
          className="inline-flex gap-1 items-center hover:underline py-2"
        >
          <IoChevronBack />
          All Users
        </Link>
      </div>

      <div className="flex gap-8 items-start flex-col xl:flex-row mt-4">
        <div className="w-full xl:flex-none xl:w-[400px]">
          {user.disabledAt && (
            <Alert variant="destructive" className="mb-4" disableDefaultTitle>
              <AlertCircle className="size-4" />
              <AlertTitle>Disabled</AlertTitle>
              <AlertDescription>This user has been disabled.</AlertDescription>
            </Alert>
          )}

          <MetadataTile>
            <MetadataTileEntry title="Email address">
              {user.email}
            </MetadataTileEntry>
          </MetadataTile>
        </div>

        <div className="flex-auto w-full flex flex-col gap-4">
          <UserActions user={user} />
          <UserTeams user={user} />
          <UserRoleTile user={user} />
        </div>
      </div>
    </main>
  );
}
