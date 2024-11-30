import { prisma, type User } from "@nextjs-template/database";
import { cache } from "react";

export const getGivenPermissionSets = cache(async (userId: User["id"]) => {
  const teamIds = await prisma.teamMembership.findMany({
    where: {
      userId,
    },
  });

  return [
    ...teamIds.flatMap((id) => [
      {
        resource: "team",
        operation: "update",
        attributes: [
          {
            key: "id",
            value: id,
          },
        ],
      },
    ]),
  ];
});
