import { loginAction } from "@/authentication/actions/loginAction";
import { authenticate } from "@/authentication/authenticateAndAuthorize";
import { getMessage } from "@/authentication/messages";
import { Button } from "@/common/components/Button";
import { EmailInput } from "@/common/components/form/EmailInput";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import { Note } from "@/common/components/Note";
import { Tile } from "@/common/components/Tile";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { env } from "@/env";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Next.js Template",
};
type Props = Readonly<{
  searchParams: NextjsSearchParams;
}>;

export default async function Page({ searchParams }: Props) {
  const authentication = await authenticate();
  if (authentication) redirect("/admin");

  const urlSearchParams = searchParamsNextjsToURLSearchParams(
    await searchParams,
  );

  return (
    <main className="p-4 pb-20 lg:p-8 min-h-dvh bg-stone-100 dark:bg-neutral-900 dark:text-neutral-200">
      <h1 className="sr-only">Login</h1>

      <Tile heading="Login" className="max-w-96 mx-auto mt-4 lg:mt-8">
        <div className="flex flex-col gap-4">
          {urlSearchParams.has("success") && (
            <Note type="success">
              {getMessage("login", urlSearchParams.get("success"))}
            </Note>
          )}

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form action={loginAction} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="font-bold">
                Email address
              </label>
              <EmailInput
                id="email"
                name="email"
                autoComplete="email"
                className="w-full mt-1"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="password"
                className="w-full mt-1"
                required
                minLength={env.MIN_PASSWORD_LENGTH}
                maxLength={env.MAX_PASSWORD_LENGTH}
              />
            </div>

            <Button type="submit" className="self-end">
              Log in
            </Button>
          </form>

          {urlSearchParams.has("error") && (
            <Note type="error">
              {getMessage("login", urlSearchParams.get("error"))}
            </Note>
          )}
        </div>
      </Tile>
    </main>
  );
}
