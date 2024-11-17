import { hash, verify, type Options } from "@node-rs/argon2";

const HASH_PASSWORD_SETTINGS: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;

export const hashPassword = async (password: string) => {
  return await hash(password, HASH_PASSWORD_SETTINGS);
};

export const verifyPassword = async (
  actualPassword: string,
  givenPassword: string,
) => {
  const validPassword = await verify(
    actualPassword,
    givenPassword,
    HASH_PASSWORD_SETTINGS,
  );

  if (!validPassword) throw new Error("Invalid password");
};
