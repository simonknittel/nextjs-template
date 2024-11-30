import type { Team } from "@nextjs-template/database";

/**
 * can functions should be used to define centrally whether an action can be performed on a resource. These checks should not be used for authorization or other complex criteria.
 */

export const canUpdate = (team: Pick<Team, "disabledAt">) => {
  return !team.disabledAt;
};

export const canDisable = (team: Pick<Team, "disabledAt">) => {
  return !team.disabledAt;
};
