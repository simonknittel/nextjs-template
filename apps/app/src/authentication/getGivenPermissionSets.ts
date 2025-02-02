import { prisma, UserRole, type User } from "@/db";
import { cache } from "react";

export const getGivenPermissionSets = cache(async (userId: User["id"]) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      teamMemberships: {
        select: {
          teamId: true,
        },
      },
    },
  });

  return [
    ...(user.role === UserRole.ADMIN
      ? [
          { resource: "administration", operation: "manage" },
          { resource: "team", operation: "manage" },
        ]
      : []),

    ...user.teamMemberships.flatMap((membership) => [
      {
        resource: "team",
        operation: "update",
        attributes: [
          {
            key: "id",
            value: membership.teamId,
          },
        ],
      },
    ]),
  ];
});
