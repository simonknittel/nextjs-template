import { env } from "@/env";
import { prisma, type User } from "@nextjs-template/database";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { generateIdFromEntropySize } from "lucia";

export const createPasswordResetToken = async (userId: User["id"]) => {
  const tokenId = generateIdFromEntropySize(40); // 64 characters

  const tokenHash = encodeHexLowerCase(
    sha256(new TextEncoder().encode(tokenId)),
  );

  const expiresAt = new Date();
  expiresAt.setTime(
    expiresAt.getTime() + env.PASSWORD_RESET_TOKEN_EXPIRATION * 1000,
  );

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({
      where: {
        userId: userId,
      },
    }),

    prisma.passwordResetToken.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        hash: tokenHash,
        expiresAt,
      },
    }),
  ]);

  return tokenId;
};