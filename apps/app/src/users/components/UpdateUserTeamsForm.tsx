"use client";

import { Button } from "@/common/components/Button";
import { Checkbox } from "@/common/components/form/Checkbox";
import { Note } from "@/common/components/Note";
import type { Team, TeamMembership, User } from "@nextjs-template/database";
import clsx from "clsx";
import { useActionState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { updateTeamMembershipsAction } from "../actions/updateTeamMembershipsAction";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id"> & { teamMemberships: TeamMembership[] };
  teams: Team[];
}>;

export const UpdateUserTeamsForm = ({ className, user, teams }: Props) => {
  const [state, formAction, isPending] = useActionState(
    updateTeamMembershipsAction,
    null,
  );

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      action={formAction}
      className={clsx(className, "flex flex-col gap-2")}
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

      <Button type="submit" className="self-start mt-4" disabled={isPending}>
        {isPending ? <FaSpinner className="animate-spin" /> : <FiSave />}
        Save
      </Button>

      {state && (
        <Note type={state.success ? "success" : "error"} className="mt-4">
          {state.success || state.error}
        </Note>
      )}
    </form>
  );
};
