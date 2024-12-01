import { signupAction } from "@/authentication/actions/signupAction";
import { authenticate } from "@/authentication/authenticateAndAuthorize";
import { getMessage } from "@/authentication/messages";
import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/Card";
import { EmailInput } from "@/common/components/form/EmailInput";
import { Label } from "@/common/components/form/Label";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import { PasswordRequirements } from "@/common/components/PasswordRequirements";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { env } from "@/env";
import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="p-4 pb-20 lg:p-8 min-h-dvh flex items-center justify-center">
      <h1 className="sr-only">Signup</h1>

      <Card className="w-full mx-auto max-w-sm">
        {urlSearchParams.has("error") && (
          <div className="px-6 pt-6">
            <Alert variant="destructive">
              {getMessage("signup", urlSearchParams.get("error"))}
            </Alert>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
        </CardHeader>

        <CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form action={signupAction} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <EmailInput
                id="email"
                name="email"
                autoComplete="email"
                placeholder="me@example.com"
                required
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="password"
                required
                minLength={env.MIN_PASSWORD_LENGTH}
                maxLength={env.MAX_PASSWORD_LENGTH}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_repeat">Repeat password</Label>
              <PasswordInput
                id="password_repeat"
                name="passwordRepeat"
                autoComplete="new-password"
                minLength={env.MIN_PASSWORD_LENGTH}
                maxLength={env.MAX_PASSWORD_LENGTH}
                required
              />
            </div>

            <PasswordRequirements />

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
