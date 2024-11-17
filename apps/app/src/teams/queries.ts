import { requireAuthentication } from "@/authentication/authenticateAndAuthorize";
import { prisma, type Team } from "@nextjs-template/database";
import { cache } from "react";

export const getTeams = async (includeDisabled = false) => {
  const permittedIds = await getPermittedTeamIdsForCurrentUserDeduped();

  return prisma.team.findMany({
    where: {
      deletedAt: includeDisabled ? undefined : null,
      id: {
        in: permittedIds,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getTeamById = (id: Team["id"]) => {
  return prisma.team.findUnique({
    where: { id },
  });
};

export const getPermittedTeamIdsForCurrentUserDeduped = cache(async () => {
  const authentication = await requireAuthentication();

  if (authentication.authorize("administration", "manage")) {
    const teams = await prisma.team.findMany({
      where: {
        deletedAt: null,
      },
    });

    return teams.map((team) => team.id);
  } else {
    const memberships = await prisma.teamMembership.findMany({
      where: {
        userId: authentication.user.id,
      },
    });

    return memberships.map((membership) => membership.teamId);
  }
});
