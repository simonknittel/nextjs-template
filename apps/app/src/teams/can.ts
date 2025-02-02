import type { Team } from "@/db";

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canUpdate = (team: Pick<Team, "disabledAt">) => {
  return !team.disabledAt;
};

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canDisable = (team: Pick<Team, "disabledAt">) => {
  return !team.disabledAt;
};
