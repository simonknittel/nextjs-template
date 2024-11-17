import { requestPasswordResetAction } from "@/authentication/actions/requestPasswordResetAction";
import { Button } from "@/common/components/Button";
import { Tile } from "@/common/components/Tile";
import type { User } from "@prisma/client";
import clsx from "clsx";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "email">;
}>;

export const UserActions = ({ className, user }: Props) => {
  return (
    <Tile className={clsx(className)} heading="Actions" headingSrOnly>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={requestPasswordResetAction}>
        <input type="hidden" name="email" value={user.email} />
        <Button>Reset password</Button>
      </form>
    </Tile>
  );
};
