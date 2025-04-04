"use client";

import { EditableText } from "@/common/components/EditableText";
import type { Team } from "@/db";
import { updateTeamAction } from "@/teams/actions/updateTeamAction";

type Props = Readonly<{
  className?: string;
  team: Pick<Team, "id" | "name">;
}>;

export const EditableTeamName = ({ className, team }: Props) => {
  const action = (formData: FormData) => {
    const _formData = new FormData();
    _formData.set("id", team.id);
    _formData.set("name", formData.get("value")?.toString() ?? "");

    return updateTeamAction(_formData);
  };

  return (
    <EditableText
      className={className}
      action={action}
      initialValue={team.name}
      required={true}
    />
  );
};
