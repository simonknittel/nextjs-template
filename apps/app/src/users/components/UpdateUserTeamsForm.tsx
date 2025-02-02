"use client";

import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import { Checkbox } from "@/common/components/form/Checkbox";
import type { Team, TeamMembership, User } from "@/db";
import clsx from "clsx";
import { Loader2, Save } from "lucide-react";
import { useActionState } from "react";
import { updateTeamMembershipsAction } from "../actions/updateTeamMembershipsAction";
import { canUpdateUserTeams } from "../can";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id" | "disabledAt"> & { teamMemberships: TeamMembership[] };
  teams: Team[];
}>;

export const UpdateUserTeamsForm = ({ className, user, teams }: Props) => {
  const [state, formAction, isPending] = useActionState(
    updateTeamMembershipsAction,
    null,
  );

  return (
    <form
      action={formAction}
      className={clsx(className, "flex flex-col gap-2")}
    >
      <input type="hidden" name="userId" value={user.id} />

      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        teams.map((team) => (
          <div key={team.id} className="flex items-center space-x-2">
            <Checkbox
              id={team.id}
              name="teams"
              value={team.id}
              defaultChecked={Boolean(
                user.teamMemberships.find(
                  (membership) => membership.teamId === team.id,
                ),
              )}
              disabled={!canUpdateUserTeams(user)}
            />
            <label htmlFor={team.id}>{team.name}</label>
          </div>
        ))
      )}

      <Button
        type="submit"
        className="self-start mt-4"
        disabled={isPending || !canUpdateUserTeams(user)}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Save />}
        Save
      </Button>

      {state && (
        <Alert
          variant={state.success ? "success" : "destructive"}
          className="mt-4"
        >
          {state.success || state.error}
        </Alert>
      )}
    </form>
  );
};
