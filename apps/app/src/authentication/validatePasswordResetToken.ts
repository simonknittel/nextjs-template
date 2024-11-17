import { prisma } from "@nextjs-template/database";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

export const validatePasswordResetToken = async (tokenId: string) => {
  const tokenHash = encodeHexLowerCase(
    sha256(new TextEncoder().encode(tokenId)),
  );

  const token = await prisma.passwordResetToken.findUnique({
    where: {
      hash: tokenHash,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!token) return false;

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: token.userId,
    },
  });

  return token;
};
