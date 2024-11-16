import { prisma } from "@nextjs-template/database";

export const getSentEmails = async () => {
  return prisma.sentEmail.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
