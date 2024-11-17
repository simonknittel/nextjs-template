import { sendEmail } from "@/emails/utils/sendEmail";
import { env } from "@/env";
import type { User } from "@nextjs-template/database";
import VerifyEmail from "@nextjs-template/transactional/emails/VerifyEmail";
import { render } from "@react-email/components";
import { createEmailVerificationToken } from "./createEmailVerificationToken";

export const requestEmailVerification = async (
  user: Pick<User, "id" | "email">,
) => {
  /**
   * Create token
   */
  const tokenId = await createEmailVerificationToken(user.id);

  /**
   * Send email
   */
  await sendEmail({
    to: user.email,
    subject: "Confirm your email address",
    html: await render(
      VerifyEmail({
        tokenId,
        baseUrl: env.BASE_URL,
      }),
    ),
  });
};
