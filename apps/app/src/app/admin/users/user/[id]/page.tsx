import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { MetadataTile } from "@/common/components/MetadataTile/MetadataTile";
import { MetadataTileEntry } from "@/common/components/MetadataTile/MetadataTileEntry";
import { Note } from "@/common/components/Note";
import { DisableUserButton } from "@/users/components/DisableUserButton";
import { UserActions } from "@/users/components/UserActions";
import { UserTeams } from "@/users/components/UserTeams";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
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

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
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
  authentication.authorizePage("administration", "manage");

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      teamMemberships: true,
    },
  });
  if (!user) notFound();

  return (
    <main className="p-4 pb-20 lg:p-8">
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
            <Note type="error" className="mb-4">
              Disabled
            </Note>
          )}

          <MetadataTile>
            <MetadataTileEntry title="Email address">
              {user.email}
            </MetadataTileEntry>
          </MetadataTile>

          {!user.disabledAt && (
            <div className="flex justify-center">
              <DisableUserButton user={user}>Disable</DisableUserButton>
            </div>
          )}
        </div>

        <div className="flex-auto w-full flex flex-col gap-4">
          <UserActions user={user} />

          <UserTeams user={user} />
        </div>
      </div>
    </main>
  );
}
