"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import {
  type ServerAction,
  serverActionErrorHandler,
} from "@/common/utils/actions";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().cuid2(),
});

export const disableTeamAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("disableTeam");
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
    const disabledTeam = await prisma.team.update({
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
    });

    /**
     * Respond with the result
     */
    redirect(`/admin/teams/team/${disabledTeam.id}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
