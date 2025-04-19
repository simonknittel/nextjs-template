"use client";

import { disableOthersTotpAction } from "@/authentication/actions/disableOthersTotpAction";
import { Alert } from "@/common/components/Alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/AlertDialog";
import { Button } from "@/common/components/Button";
import type { User } from "@/db";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useActionState, useId } from "react";

interface Props {
  readonly className?: string;
  readonly user: Pick<User, "id">;
}

export const DisableTotpButton = ({ className, user }: Props) => {
  const [state, formAction, isPending] = useActionState(
    disableOthersTotpAction,
    null,
  );
  const id = useId();

  return (
    <form
      action={formAction}
      id={id}
      className={clsx("inline-block", className)}
    >
      <input type="hidden" name="user_id" value={user.id} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isPending} title="Disable 2FA">
            {isPending && <Loader2 className="animate-spin" />}
            Disable 2FA
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable 2FA?</AlertDialogTitle>
            <AlertDialogDescription>
              The login for this user will be less secure. Make sure you&apos;ve
              verified the user&apos;s identity.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction type="submit" form={id}>
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {state && (
        <Alert
          variant={state.success ? "success" : "destructive"}
          className="mt-4"
        >
          {state.success || state.error}
        </Alert>
      )}
    </form>
  );
};
