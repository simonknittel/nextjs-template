import type { User } from "@nextjs-template/database";

/**
 * can functions should be used to define centrally whether an action can be performed on a resource. These checks should not be used for authorization or other complex criteria.
 */

export const canRequestResetPassword = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

export const canUpdateUserTeams = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

export const canDisable = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};
