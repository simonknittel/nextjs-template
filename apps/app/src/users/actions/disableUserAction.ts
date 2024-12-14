"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import {
  type ServerAction,
  serverActionErrorHandler,
} from "@/common/utils/actions";
import { prisma } from "@nextjs-template/database";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().cuid2(),
});

export const disableUserAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("disableUserAction");
    await authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const { id } = schema.parse({
      id: formData.get("id"),
    });

    /**
     * Disable
     */
    const [disabledUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id,
        },
        data: {
          disabledAt: new Date(),
          disabledBy: {
            connect: {
              id: authentication.user.id,
            },
          },
        },
      }),

      prisma.session.deleteMany({
        where: {
          userId: id,
        },
      }),
    ]);

    /**
     * Respond with the result
     */
    redirect(`/admin/users/user/${disabledUser.id}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
