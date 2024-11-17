import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { MetadataTile } from "@/common/components/MetadataTile/MetadataTile";
import { MetadataTileEntry } from "@/common/components/MetadataTile/MetadataTileEntry";
import { Note } from "@/common/components/Note";
import { canDelete, canUpdate } from "@/teams/can";
import { DeleteTeamButton } from "@/teams/components/DeleteTeamButton";
import { EditableTeamName } from "@/teams/components/EditableTeamName";
import { getTeamById } from "@/teams/queries";
import { Logger } from "@nextjs-template/logging";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { serializeError } from "serialize-error";

type Params = Promise<
  Readonly<{
    teamId: string;
  }>
>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const { teamId } = await params;

    const team = await getTeamById(teamId);
    if (!team) return {};

    return {
      title: `${team.name} - Team | Next.js Template`,
    };
  } catch (error) {
    Logger.error(
      "Error while generating metadata for /admin/teams/[teamId]/page.tsx",
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
  const { teamId } = await params;

  const team = await getTeamById(teamId);
  if (!team) notFound();

  const authentication = await authenticatePage("/admin/teams/[teamId]");
  authentication.authorizePage("administration", "manage");

  return (
    <main className="p-4 pb-20 lg:p-8">
      <div>
        <Link
          href="/admin/teams"
          className="inline-flex gap-1 items-center hover:underline py-2"
        >
          <IoChevronBack />
          All teams
        </Link>
      </div>

      <div className="flex gap-8 items-start flex-col xl:flex-row mt-4">
        <div className="w-full xl:w-[400px]">
          {team.deletedAt && (
            <Note type="error" className="mb-4">
              Disabled
            </Note>
          )}

          <MetadataTile>
            <MetadataTileEntry title="Name">
              {canUpdate(team) ? <EditableTeamName team={team} /> : team.name}
            </MetadataTileEntry>
          </MetadataTile>

          {canDelete(team) && (
            <div className="flex justify-center">
              <DeleteTeamButton team={team}>Disabled</DeleteTeamButton>
            </div>
          )}
        </div>

        <div className="flex-1 w-full flex flex-col gap-4"></div>
      </div>
    </main>
  );
}
