"use client";

import { requestPasswordResetAction } from "@/authentication/actions/requestPasswordResetAction";
import { Tile } from "@/common/components/Tile";
import { Alert } from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";
import type { User } from "@prisma/client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

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
    <Tile className={clsx(className)} heading="Actions">
      <form>
        <input type="hidden" name="email" value={user.email} />
        <Button formAction={formAction} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : null}
          Reset password
        </Button>

        {state && (
          <Alert
            variant={state.success ? "success" : "destructive"}
            className="mt-4"
          >
            {state.success || state.error}
          </Alert>
        )}
      </form>
    </Tile>
  );
};
