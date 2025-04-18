import { getMessage, MESSAGES } from "@/authentication/messages";
import { verifyEmail } from "@/authentication/validateEmailVerificationToken";
import { Card, CardHeader, CardTitle } from "@/common/components/Card";
import { Logo } from "@/common/components/Logo";
import { Note } from "@/common/components/Note";
import {
  type NextjsSearchParams,
  searchParamsNextjsToURLSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { Logger } from "@nextjs-template/logging";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  // 5 requests per minute
  points: 5,
  duration: 60,
});

export const metadata: Metadata = {
  title: "Confirm your email address | Next.js Template",
};

interface Props {
  readonly searchParams: NextjsSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const urlSearchParams =
    await searchParamsNextjsToURLSearchParams(searchParams);

  const token = urlSearchParams.get("token") || "";

  let tokenVerificationResult;
  if (token) {
    /**
     * Rate limit the request
     */
    try {
      // TODO: Implement separate rate limit for IP address
      await rateLimiter.consume(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Logger.warn("Email verification failed: rate limit exceeded", {
        token,
      });
      redirect(`/verify-email?error=${MESSAGES.verifyEmail.rateLimit.query}`);
    }

    /**
     * Validate the token
     */
    tokenVerificationResult = await verifyEmail(token);

    if (tokenVerificationResult) {
      redirect(`/login?success=${MESSAGES.login.verified.query}`);
    }

    Logger.warn("Email verification failed: invalid token");
  } else {
    tokenVerificationResult = null;
  }

  return (
    <main className="p-4 pb-20 lg:p-8 min-h-dvh flex flex-col gap-4 items-center justify-center">
      <h1 className="sr-only">Confirm your email address</h1>

      <Logo />

      <Card className="w-full mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Email address confirmation</CardTitle>
        </CardHeader>

        <div className="px-6 pb-6">
          {urlSearchParams.has("success") && (
            <Note type="success">
              {getMessage("verifyEmail", urlSearchParams.get("success"))}
            </Note>
          )}

          {tokenVerificationResult === false && (
            <Note type="error">
              {getMessage("verifyEmail", "invalidToken")}
            </Note>
          )}

          {urlSearchParams.has("error") && (
            <Note type="error">
              {getMessage("verifyEmail", urlSearchParams.get("error"))}
            </Note>
          )}
        </div>
      </Card>
    </main>
  );
}
