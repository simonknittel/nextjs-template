import { prisma, type User } from "@/db";
import { env } from "@/env";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { generateIdFromEntropySize } from "lucia";

export const createEmailVerificationToken = async (userId: User["id"]) => {
  const tokenId = generateIdFromEntropySize(40); // 64 characters

  const tokenHash = encodeHexLowerCase(
    sha256(new TextEncoder().encode(tokenId)),
  );

  const expiresAt = new Date();
  expiresAt.setTime(
    expiresAt.getTime() + env.EMAIL_VERIFICATION_TOKEN_EXPIRATION * 1000,
  );

  await prisma.emailVerificationToken.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      hash: tokenHash,
      expiresAt,
    },
  });

  return tokenId;
};
