"use client";

import { requestPasswordResetAction } from "@/authentication/actions/requestPasswordResetAction";
import { Button } from "@/common/components/Button";
import { Note } from "@/common/components/Note";
import { Tile } from "@/common/components/Tile";
import type { User } from "@prisma/client";
import clsx from "clsx";
import { useActionState } from "react";
import { FaSpinner } from "react-icons/fa";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "email">;
}>;

export const UserActions = ({ className, user }: Props) => {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    null,
  );

  return (
    <Tile className={clsx(className)} heading="Actions" headingSrOnly>
      <form>
        <input type="hidden" name="email" value={user.email} />
        <Button formAction={formAction} disabled={isPending}>
          {isPending ? <FaSpinner className="animate-spin" /> : null}
          Reset password
        </Button>

        {state && (
          <Note type={state.success ? "success" : "error"} className="mt-4">
            {state.success || state.error}
          </Note>
        )}
      </form>
    </Tile>
  );
};
