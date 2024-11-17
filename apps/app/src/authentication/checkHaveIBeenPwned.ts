import crypto from "node:crypto";

export const haveIBeenPwned = async (password: string) => {
  const hash = crypto.hash("sha1", password);
  const hashPrefix = hash.slice(0, 5);
  const hashSuffix = hash.slice(5);

  const result = await fetch(
    `https://api.pwnedpasswords.com/range/${hashPrefix}`,
  );
  if (!result.ok) throw new Error("Have I Been Pwned API request failed");

  const responseBody = await result.text();
  const suffixes = responseBody.split("\n").map((line) => line.split(":")[0]);

  if (suffixes.includes(hashSuffix.toLocaleUpperCase())) return true;

  return false;
};
