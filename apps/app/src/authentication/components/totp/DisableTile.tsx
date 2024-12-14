"use client";

import { disableTotpAction } from "@/authentication/actions/disableTotpAction";
import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/form/Input";
import { Label } from "@/common/components/form/Label";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import { Tile } from "@/common/components/Tile";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

type Props = Readonly<{
  className?: string;
  MIN_PASSWORD_LENGTH: number;
  MAX_PASSWORD_LENGTH: number;
}>;

export const DisableTile = ({
  className,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
}: Props) => {
  const [state, formAction, isPending] = useActionState(
    disableTotpAction,
    null,
  );

  return (
    <Tile
      heading="Disable"
      description="Enter your password and a code from your authenticator app"
      className={clsx("max-w-lg", className)}
    >
      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="code">Code</Label>
          <Input
            type="number"
            id="code"
            name="code"
            autoComplete="one-time-code"
            required
            minLength={6}
            maxLength={6}
          />
        </div>

        <Button type="submit" disabled={isPending} className="self-end">
          {isPending && <Loader2 className="animate-spin" />}
          Disable
        </Button>
      </form>

      {state?.error && (
        <Alert variant="destructive" className="mt-4">
          {state.error}
        </Alert>
      )}
    </Tile>
  );
};
