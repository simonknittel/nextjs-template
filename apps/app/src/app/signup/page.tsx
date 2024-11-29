import { signupAction } from "@/authentication/actions/signupAction";
import { authenticate } from "@/authentication/authenticateAndAuthorize";
import { getMessage } from "@/authentication/messages";
import {
  searchParamsNextjsToURLSearchParams,
  type NextjsSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { env } from "@/env";
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
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

      <div className="w-full mx-auto max-w-sm flex flex-col gap-2">
        <Card>
          {urlSearchParams.has("error") && (
            <div className="px-6 pt-6">
              <Alert variant="destructive">
                <AlertDescription>
                  {getMessage("signup", urlSearchParams.get("error"))}
                </AlertDescription>
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
                <Input
                  type="email"
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
                <Input
                  type="password"
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
                <Input
                  type="password"
                  id="password_repeat"
                  name="passwordRepeat"
                  autoComplete="new-password"
                  minLength={env.MIN_PASSWORD_LENGTH}
                  maxLength={env.MAX_PASSWORD_LENGTH}
                  required
                />
              </div>

              <p>
                The password must be between {env.MIN_PASSWORD_LENGTH} and{" "}
                {env.MAX_PASSWORD_LENGTH} characters long.
              </p>

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
      </div>
    </main>
  );
}
