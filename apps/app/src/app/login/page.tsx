import { loginAction } from "@/authentication/actions/loginAction";
import { authenticate } from "@/authentication/authenticateAndAuthorize";
import { getMessage } from "@/authentication/messages";
import { EmailInput } from "@/common/components/form/EmailInput";
import { PasswordInput } from "@/common/components/form/PasswordInput";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { env } from "@/env";
import { Alert } from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Label } from "@/shadcn/components/ui/label";
import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="p-4 pb-20 lg:p-8 min-h-dvh flex items-center justify-center">
      <h1 className="sr-only">Login</h1>

      <Card className="w-full mx-auto max-w-sm">
        {urlSearchParams.has("error") && (
          <div className="px-6 pt-6">
            <Alert variant="destructive">
              {getMessage("login", urlSearchParams.get("error"))}
            </Alert>
          </div>
        )}

        {urlSearchParams.has("success") && (
          <div className="px-6 pt-6">
            <Alert variant="success">
              {getMessage("login", urlSearchParams.get("success"))}
            </Alert>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form action={loginAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
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

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          {env.SIGNUP_ENABLED && (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
