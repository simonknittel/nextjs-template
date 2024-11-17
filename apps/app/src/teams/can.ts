import type { Team } from "@nextjs-template/database";

export const canUpdate = (team: Pick<Team, "deletedAt">) => {
  return !team.deletedAt;
};

export const canDelete = (team: Pick<Team, "deletedAt">) => {
  return !team.deletedAt;
};
