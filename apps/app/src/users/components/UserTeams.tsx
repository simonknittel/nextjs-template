import { Button } from "@/common/components/Button";
import { Checkbox } from "@/common/components/form/Checkbox";
import { Tile } from "@/common/components/Tile";
import { getTeams } from "@/teams/queries";
import type { TeamMembership, User } from "@nextjs-template/database";
import clsx from "clsx";
import { FiSave } from "react-icons/fi";
import { updateTeamMembershipsAction } from "../actions/updateTeamMembershipsAction";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id"> & { teamMemberships: TeamMembership[] };
}>;

export const UserTeams = async ({ className, user }: Props) => {
  const teams = await getTeams();

  return (
    <Tile
      className={clsx(className)}
      heading="Teams"
      description="This user can access the contents of the following teams."
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        action={updateTeamMembershipsAction}
        className="flex flex-col gap-2"
      >
        <input type="hidden" name="userId" value={user.id} />

        {teams.length === 0 ? (
          <p className="italic text-neutral-500">No teams found</p>
        ) : (
          teams.map((team) => (
            <div key={team.id}>
              <Checkbox
                id={team.id}
                name="teams"
                value={team.id}
                defaultChecked={Boolean(
                  user.teamMemberships.find(
                    (membership) => membership.teamId === team.id,
                  ),
                )}
              >
                {team.name}
              </Checkbox>
            </div>
          ))
        )}

        <Button type="submit" className="self-start mt-4">
          <FiSave />
          Save
        </Button>
      </form>
    </Tile>
  );
};
