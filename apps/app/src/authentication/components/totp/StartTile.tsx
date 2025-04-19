"use client";

import { verifyTotpKeyAction } from "@/authentication/actions/verifyTotpKeyAction";
import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/form/Input";
import { Tile } from "@/common/components/Tile";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

interface Props {
  readonly className?: string;
  readonly base32EncodedKey: string;
  readonly qrCode: string;
}

export const StartTile = ({ className, base32EncodedKey, qrCode }: Props) => {
  const [state, formAction, isPending] = useActionState(
    verifyTotpKeyAction,
    null,
  );

  return (
    <Tile heading="Setup" className={clsx(className)}>
      <p>Scan the QR code with your authenticator app:</p>
      <div
        className="size-48 mt-1"
        dangerouslySetInnerHTML={{
          __html: qrCode,
        }}
      />

      {/* TODO: Provide button to copy the code to the clipboard */}
      <p className="mt-4">Or, enter the key manually:</p>
      <code>{base32EncodedKey}</code>

      <p className="mt-4">
        To complete and verify the setup, enter a code from your authenticator
        app:
      </p>
      <form action={formAction} className="mt-1">
        <input
          type="hidden"
          name="base32EncodedKey"
          value={base32EncodedKey}
          required
        />

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            name="code"
            placeholder="Code"
            autoComplete="one-time-code"
            required
          />

          <Button disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Verify
          </Button>
        </div>
      </form>

      {state?.error && (
        <Alert variant="destructive" className="mt-4">
          {state.error}
        </Alert>
      )}
    </Tile>
  );
};
