import { prisma, type User } from "@nextjs-template/database";
import { cache } from "react";

export const getUsers = async (includeDisabled = false) => {
  return prisma.user.findMany({
    where: {
      disabledAt: includeDisabled ? undefined : null,
    },
    orderBy: {
      email: "asc",
    },
  });
};

export const getUserByIdDeduped = cache(async (id: User["id"]) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      teamMemberships: true,
    },
  });
});
