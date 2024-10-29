import { prisma } from "@/prisma";

export const getSentEmails = async () => {
  return prisma.sentEmail.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
