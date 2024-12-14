import type { User } from "@nextjs-template/database";

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canRequestResetPassword = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canUpdateUserTeams = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canUpdateUserRole = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canDisable = (user: Pick<User, "disabledAt">) => {
  return !user.disabledAt;
};

/**
 * *can* functions should be used to centrally define whether an action can be
 * performed on a resource. These checks should not be used for authorization
 * or other complex criteria.
 */
export const canDisableTotp = (
  user: Pick<User, "disabledAt" | "totpKeyVerifiedAt">,
) => {
  return !user.disabledAt && user.totpKeyVerifiedAt;
};
