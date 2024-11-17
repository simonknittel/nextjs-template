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

export const deleteTeamAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("deleteTeam");
    authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const { id } = schema.parse({
      id: formData.get("id"),
    });

    /**
     * Soft delete
     */
    await prisma.team.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deletedBy: {
          connect: {
            id: authentication.user.id,
          },
        },
      },
    });

    /**
     * Respond with the result
     */
    redirect(`/admin/teams`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
