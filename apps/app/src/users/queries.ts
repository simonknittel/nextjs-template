import { prisma } from "@nextjs-template/database";

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
