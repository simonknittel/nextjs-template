import { prisma, type User } from "@nextjs-template/database";
import { cache } from "react";

export const getUsers = async () => {
  return prisma.user.findMany({
    where: {
      disabledAt: null,
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
