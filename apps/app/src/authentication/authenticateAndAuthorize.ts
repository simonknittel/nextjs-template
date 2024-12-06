import { Logger } from "@nextjs-template/logging";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { comparePermissionSets } from "./comparePermissionSets";
import { getGivenPermissionSets } from "./getGivenPermissionSets";
import { hasSystemRoleBypass } from "./hasSystemRoleBypass";
import { isSystemRoleBypassEnabled } from "./isSystemRoleBypassEnabled";
import { lucia } from "./lucia";
import type { ExistingPermissionSet, PermissionSet } from "./PermissionSet";

export const authenticate = cache(async () => {
  const awaitedCookies = await cookies();

  const sessionId = awaitedCookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return false;

  const authentication = await lucia.validateSession(sessionId);
  if (!authentication.session || !authentication.user) return false;

  const givenPermissionSets = await getGivenPermissionSets(
    authentication.user.id,
  );

  return {
    ...authentication,
    authorize: (
      resource: ExistingPermissionSet["resource"],
      operation: ExistingPermissionSet["operation"],
      attributes?: PermissionSet["attributes"],
    ) =>
      authorize(
        authentication,
        // @ts-expect-error TODO: Improve the authorization types
        givenPermissionSets,
        resource,
        operation,
        attributes,
      ),
  };
});

export async function authenticatePage(requestPath?: string) {
  const authentication = await authenticate();

  if (!authentication) {
    Logger.info("Unauthenticated request to page", {
      requestPath,
      reason: "No session",
    });

    redirect("/login");
  }

  return {
    ...authentication,
    authorizePage: async (
      resource: ExistingPermissionSet["resource"],
      operation: ExistingPermissionSet["operation"],
      attributes?: PermissionSet["attributes"],
    ) => {
      const result = await authentication.authorize(
        resource,
        operation,
        attributes,
      );

      if (!result) {
        Logger.info("Unauthorized request to page", {
          requestPath,
          userId: authentication.user.id,
          reason: "Insufficient permissions",
        });

        redirect("/admin/unauthorized");
      }

      return result;
    },
  };
}

export async function authenticateApi(
  requestPath?: string,
  requestMethod?: string,
) {
  const authentication = await authenticate();

  if (!authentication) {
    Logger.info("Unauthenticated request to API", {
      requestPath,
      requestMethod,
      reason: "No session",
    });

    throw new Error("Unauthenticated");
  }

  return {
    ...authentication,
    authorizeApi: async (
      resource: ExistingPermissionSet["resource"],
      operation: ExistingPermissionSet["operation"],
      attributes?: PermissionSet["attributes"],
    ) => {
      const result = await authentication.authorize(
        resource,
        operation,
        attributes,
      );

      if (!result) {
        Logger.info("Unauthorized request to API", {
          requestPath,
          requestMethod,
          userId: authentication.user.id,
          reason: "Insufficient permissions",
        });

        throw new Error("Unauthorized");
      }

      return result;
    },
  };
}

export async function authenticateAction(actionName?: string) {
  const authentication = await authenticate();

  if (!authentication) {
    Logger.info("Unauthenticated request to action", {
      actionName,
      reason: "No session",
    });

    throw new Error("Unauthenticated");
  }

  return {
    ...authentication,
    authorizeAction: async (
      resource: ExistingPermissionSet["resource"],
      operation: ExistingPermissionSet["operation"],
      attributes?: PermissionSet["attributes"],
    ) => {
      const result = await authentication.authorize(
        resource,
        operation,
        attributes,
      );

      if (!result) {
        Logger.info("Unauthorized request to action", {
          actionName,
          userId: authentication.user.id,
          reason: "Insufficient permissions",
        });

        throw new Error("Unauthorized");
      }

      return result;
    },
  };
}

export const requireAuthentication = cache(async () => {
  const authentication = await authenticate();

  if (!authentication) {
    throw new Error("Unauthenticated");
  }

  return authentication;
});

export async function authorize(
  authentication: { session: Session; user: User },
  givenPermissionSets: ExistingPermissionSet[],
  resource: ExistingPermissionSet["resource"],
  operation: ExistingPermissionSet["operation"],
  attributes?: PermissionSet["attributes"],
) {
  if (
    hasSystemRoleBypass(authentication) &&
    (await isSystemRoleBypassEnabled())
  )
    return true;

  const result = comparePermissionSets(
    {
      resource,
      operation,
      attributes,
    },
    givenPermissionSets,
  );
  if (result) return true;

  return false;
}
