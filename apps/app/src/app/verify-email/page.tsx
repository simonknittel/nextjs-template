import { getMessage, MESSAGES } from "@/authentication/messages";
import { validateEmailVerificationToken } from "@/authentication/validateEmailVerificationToken";
import { Note } from "@/common/components/Note";
import { Tile } from "@/common/components/Tile";
import {
  type NextjsSearchParams,
  searchParamsNextjsToURLSearchParams,
} from "@/common/utils/searchParamsNextjsToUrlSearchParams";
import { prisma } from "@nextjs-template/database";
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

type Props = Readonly<{
  searchParams: NextjsSearchParams;
}>;

export default async function Page({ searchParams }: Props) {
  const urlSearchParams = searchParamsNextjsToURLSearchParams(
    await searchParams,
  );

  const token = urlSearchParams.get("token") || "";

  let tokenVerificationResult;
  if (token) {
    /**
     * Rate limit the request
     */
    try {
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
    tokenVerificationResult = await validateEmailVerificationToken(token);

    if (tokenVerificationResult) {
      await prisma.user.update({
        // @ts-expect-error I don't know why the if statement converts the false from the union to true
        where: { id: tokenVerificationResult.userId }, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        data: { emailVerifiedAt: new Date() },
      });
      redirect(`/login?success=${MESSAGES.login.verified.query}`);
    }

    Logger.warn("Email verification failed: invalid token");
  } else {
    tokenVerificationResult = null;
  }

  return (
    <main className="p-4 pb-20 lg:p-8 min-h-dvh bg-stone-100">
      <h1 className="sr-only">Confirm your email address</h1>

      <Tile
        heading="Confirm your email address"
        className="max-w-96 mx-auto mt-4 lg:mt-8"
      >
        {urlSearchParams.has("success") && (
          <Note type="success">
            {getMessage("verifyEmail", urlSearchParams.get("success"))}
          </Note>
        )}

        {tokenVerificationResult === false && (
          <Note type="error">{getMessage("verifyEmail", "invalidToken")}</Note>
        )}

        {urlSearchParams.has("error") && (
          <Note type="error">
            {getMessage("verifyEmail", urlSearchParams.get("error"))}
          </Note>
        )}
      </Tile>
    </main>
  );
}