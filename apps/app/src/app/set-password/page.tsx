import { setPasswordAction } from "@/authentication/actions/setPasswordAction";
import { getMessage } from "@/authentication/messages";
import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/Card";
import { Label } from "@/common/components/form/Label";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import { PasswordRequirements } from "@/common/components/PasswordRequirements";
import {
  type NextjsSearchParams,
  searchParamsNextjsToURLSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { env } from "@/env";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set password | Next.js Template",
};

type Props = Readonly<{
  searchParams: NextjsSearchParams;
}>;

export default async function Page({ searchParams }: Props) {
  const urlSearchParams = searchParamsNextjsToURLSearchParams(
    await searchParams,
  );

  const token = urlSearchParams.get("token") || "";

  return (
    <main className="p-4 pb-20 lg:p-8 min-h-dvh flex items-center justify-center">
      <h1 className="sr-only">Set password</h1>

      <Card className="w-full mx-auto max-w-sm">
        {urlSearchParams.has("error") && (
          <div className="px-6 pt-6">
            <Alert variant="destructive">
              {getMessage("setPassword", urlSearchParams.get("error"))}
            </Alert>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl">Set password</CardTitle>
        </CardHeader>

        <CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form action={setPasswordAction} className="flex flex-col gap-4">
            <input type="hidden" name="token" value={token} />

            <div>
              <Label htmlFor="new_password">New password</Label>
              <PasswordInput
                id="new_password"
                name="newPassword"
                autoComplete="new-password"
                className="w-full mt-1"
                minLength={env.MIN_PASSWORD_LENGTH}
                maxLength={env.MAX_PASSWORD_LENGTH}
                required
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="new_password_repeat">Repeat new password</Label>
              <PasswordInput
                id="new_password_repeat"
                name="newPasswordRepeat"
                autoComplete="new-password"
                className="w-full mt-1"
                minLength={env.MIN_PASSWORD_LENGTH}
                maxLength={env.MAX_PASSWORD_LENGTH}
                required
              />
            </div>

            <PasswordRequirements />

            <Button type="submit" className="w-full">
              Save and log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
