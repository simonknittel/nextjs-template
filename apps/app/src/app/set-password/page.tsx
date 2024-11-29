import { setPasswordAction } from "@/authentication/actions/setPasswordAction";
import { getMessage } from "@/authentication/messages";
import { Button } from "@/common/components/Button";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import { Note } from "@/common/components/Note";
import { Tile } from "@/common/components/Tile";
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
    <main className="p-4 pb-20 lg:p-8 min-h-dvh bg-stone-100 dark:bg-neutral-900 dark:text-neutral-200">
      <h1 className="sr-only">Set password</h1>

      <Tile heading="Set password" className="max-w-96 mx-auto mt-4 lg:mt-8">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={setPasswordAction} className="flex flex-col gap-4">
          <input type="hidden" name="token" value={token} />

          <div>
            <label htmlFor="new_password" className="font-bold">
              New password
            </label>
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
            <label htmlFor="new_password_repeat" className="font-bold">
              Repeat new password
            </label>
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

          <p>
            The password must be between {env.MIN_PASSWORD_LENGTH} and{" "}
            {env.MAX_PASSWORD_LENGTH} characters long.
          </p>

          <Button type="submit" className="self-end">
            Save and log in
          </Button>
        </form>

        {urlSearchParams.has("error") && (
          <Note type="error" className="mt-4">
            {getMessage("setPassword", urlSearchParams.get("error"))}
          </Note>
        )}
      </Tile>
    </main>
  );
}
