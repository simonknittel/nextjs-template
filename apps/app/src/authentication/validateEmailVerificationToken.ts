import { prisma } from "@nextjs-template/database";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

export const verifyEmail = async (tokenId: string) => {
  const tokenHash = encodeHexLowerCase(
    sha256(new TextEncoder().encode(tokenId)),
  );

  const token = await prisma.emailVerificationToken.findUnique({
    where: {
      hash: tokenHash,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
  if (!token) return false;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: token.userId }, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      data: { emailVerifiedAt: new Date() },
    }),

    prisma.emailVerificationToken.deleteMany({
      where: {
        userId: token.userId,
      },
    }),
  ]);

  return true;
};
