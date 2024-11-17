import { authenticate } from "@/authentication/authenticateAndAuthorize";
import clsx from "clsx";
import { LogoutButton } from "../LogoutButton";

type Props = Readonly<{
  className?: string;
}>;

export const Account = async ({ className }: Props) => {
  const authentication = await authenticate();
  if (!authentication) return null;

  return (
    <div className={clsx(className, "flex items-center justify-between p-4")}>
      <p>
        <span className="block text-sm text-neutral-500">Account</span>
        <span className="block font-bold">{authentication.user.email}</span>
      </p>

      <LogoutButton />
    </div>
  );
};
