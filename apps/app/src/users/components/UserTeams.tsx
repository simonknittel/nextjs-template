import { Tile } from "@/common/components/Tile";
import { getTeams } from "@/teams/queries";
import type { TeamMembership, User } from "@nextjs-template/database";
import clsx from "clsx";
import { UpdateUserTeamsForm } from "./UpdateUserTeamsForm";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id" | "disabledAt"> & { teamMemberships: TeamMembership[] };
}>;

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
