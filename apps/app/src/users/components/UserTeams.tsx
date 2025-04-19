import { Tile } from "@/common/components/Tile";
import type { TeamMembership, User } from "@/db";
import { getTeams } from "@/teams/queries";
import clsx from "clsx";
import { UpdateUserTeamsForm } from "./UpdateUserTeamsForm";

interface Props {
  readonly className?: string;
  readonly user: Pick<User, "id" | "disabledAt"> & {
    teamMemberships: TeamMembership[];
  };
}

export const UserTeams = async ({ className, user }: Props) => {
  const teams = await getTeams();

  return (
    <Tile
      className={clsx(className)}
      heading="Teams"
      description="This user can access the contents of the following teams."
    >
      <UpdateUserTeamsForm user={user} teams={teams} />
    </Tile>
  );
};
