"use client";

import { Tile } from "@/common/components/Tile";
import type { Team } from "@/db";
import clsx from "clsx";
import { canDisable } from "../can";
import { DisableTeamButton } from "./DisableTeamButton";

type Props = Readonly<{
  className?: string;
  team: Pick<Team, "id" | "name" | "disabledAt">;
}>;

export const TeamActions = ({ className, team }: Props) => {
  return (
    <Tile className={clsx(className)} heading="Actions">
      <div className="flex gap-2">
        {canDisable(team) && <DisableTeamButton team={team} />}
      </div>
    </Tile>
  );
};
