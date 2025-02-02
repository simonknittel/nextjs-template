"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import { createPasswordResetToken } from "@/authentication/createPasswordResetToken";
import {
  type ServerAction,
  serverActionErrorHandler,
} from "@/common/utils/actions";
import { prisma, UserRole } from "@/db";
import { sendEmail } from "@/emails/utils/sendEmail";
import { env } from "@/env";
import UserInvite from "@nextjs-template/transactional/emails/UserInvite";
import { render } from "@react-email/components";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export const createUserAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("disableUserAction");
    await authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const { email } = schema.parse({
      email: formData.get("email"),
    });

    /**
     * Create user
     */
    const createdUser = await prisma.user.create({
      data: {
        email,
        emailVerifiedAt: new Date(),
        role: UserRole.USER,
        invitedAt: new Date(),
        invitedBy: {
          connect: {
            id: authentication.user.id,
          },
        },
      },
    });

    /**
     * Create token for setting the password
     */
    const tokenId = await createPasswordResetToken(createdUser.id);

    /**
     * Send invite email
     */
    await sendEmail({
      to: email,
      subject: "Invite",
      html: await render(
        UserInvite({
          tokenId,
          baseUrl: env.BASE_URL,
        }),
      ),
    });

    /**
     * Respond with the result
     */
    redirect(`/admin/users/user/${createdUser.id}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
