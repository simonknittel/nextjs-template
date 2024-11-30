import { env } from "@/env";

export const PasswordRequirements = () => {
  return (
    <>
      <p>
        The password must be between <strong>{env.MIN_PASSWORD_LENGTH}</strong>{" "}
        and <strong>{env.MAX_PASSWORD_LENGTH}</strong> characters long.
      </p>
    </>
  );
};
