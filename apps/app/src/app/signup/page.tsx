import { signupAction } from "@/authentication/actions/signupAction";
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
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup | Next.js Template",
};
type Props = Readonly<{
  searchParams: NextjsSearchParams;
}>;

export default async function Page({ searchParams }: Props) {
  if (env.SIGNUP_ENABLED !== true) notFound();

  const authentication = await authenticate();
  if (authentication) redirect("/admin");

  const urlSearchParams = searchParamsNextjsToURLSearchParams(
    await searchParams,
  );

  return (
    <main className="p-4 pb-20 lg:p-8 min-h-dvh bg-stone-100 dark:bg-neutral-900 dark:text-neutral-200">
      <h1 className="sr-only">Signup</h1>

      <Tile heading="Signup" className="max-w-96 mx-auto mt-4 lg:mt-8">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={signupAction} className="flex flex-col gap-4">
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

          <div>
            <label htmlFor="password_repeat" className="font-bold">
              Repeat password
            </label>
            <PasswordInput
              id="password_repeat"
              name="passwordRepeat"
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
            Sign up
          </Button>
        </form>

        {urlSearchParams.has("error") && (
          <Note type="error" className="mt-4">
            {getMessage("signup", urlSearchParams.get("error"))}
          </Note>
        )}
      </Tile>
    </main>
  );
}
