import { sendEmail } from "@/emails/utils/sendEmail";
import { env } from "@/env";
import type { User } from "@nextjs-template/database";
import SetPassword from "@nextjs-template/transactional/emails/SetPassword";
import { render } from "@react-email/components";
import { createPasswordResetToken } from "./createPasswordResetToken";

export const requestResetPassword = async (
  user: Pick<User, "id" | "email">,
) => {
  /**
   * Create token
   */
  const tokenId = await createPasswordResetToken(user.id);

  /**
   * Send email
   */
  await sendEmail({
    to: user.email,
    subject: "New password",
    html: await render(
      SetPassword({
        tokenId,
        baseUrl: env.BASE_URL,
      }),
    ),
  });
};
