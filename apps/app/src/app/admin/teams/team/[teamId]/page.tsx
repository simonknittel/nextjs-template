import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/Alert";
import { MetadataTile } from "@/common/components/MetadataTile/MetadataTile";
import { MetadataTileEntry } from "@/common/components/MetadataTile/MetadataTileEntry";
import { canUpdate } from "@/teams/can";
import { EditableTeamName } from "@/teams/components/EditableTeamName";
import { TeamActions } from "@/teams/components/TeamActions";
import { getTeamById } from "@/teams/queries";
import { Logger } from "@nextjs-template/logging";
import { AlertCircle } from "lucide-react";
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
      "Error while generating metadata for /admin/teams/team/[teamId]/page.tsx",
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

  const authentication = await authenticatePage("/admin/teams/team/[teamId]");
  authentication.authorizePage("administration", "manage");

  return (
    <main className="p-4 pb-20 lg:p-8">
      <h1 className="sr-only">Team details</h1>

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
          {team.disabledAt && (
            <Alert variant="destructive" className="mb-4" disableDefaultTitle>
              <AlertCircle className="size-4" />
              <AlertTitle>Disabled</AlertTitle>
              <AlertDescription>This team has been disabled.</AlertDescription>
            </Alert>
          )}

          <MetadataTile>
            <MetadataTileEntry title="Name">
              {canUpdate(team) ? <EditableTeamName team={team} /> : team.name}
            </MetadataTileEntry>
          </MetadataTile>
        </div>

        <div className="flex-auto w-full flex flex-col gap-4">
          <TeamActions team={team} />
        </div>
      </div>
    </main>
  );
}
