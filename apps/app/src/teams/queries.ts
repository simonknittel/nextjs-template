import { requireAuthentication } from "@/authentication/authenticateAndAuthorize";
import { prisma, type Team } from "@nextjs-template/database";
import { cache } from "react";

export const getTeams = async (includeDisabled = false) => {
  const permittedIds =
    await getPermittedTeamIdsForCurrentUserDeduped(includeDisabled);

  return prisma.team.findMany({
    where: {
      disabledAt: includeDisabled ? undefined : null,
      id: {
        in: permittedIds,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getTeamByIdDeduped = cache((id: Team["id"]) => {
  return prisma.team.findUnique({
    where: { id },
    include: {
      disabledBy: true,
    },
  });
});

export const getPermittedTeamIdsForCurrentUserDeduped = cache(
  async (includeDisabled = false) => {
    const authentication = await requireAuthentication();

    if (await authentication.authorize("administration", "manage")) {
      const teams = await prisma.team.findMany({
        where: {
          disabledAt: includeDisabled ? undefined : null,
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
  },
);
