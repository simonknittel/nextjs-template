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
  userId: z.string().trim().cuid2(),
  teams: z.array(z.string().trim().cuid2()),
});

export const updateTeamMembershipsAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("updateTeamMembership");
    authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const { userId, teams } = schema.parse({
      userId: formData.get("userId"),
      teams: formData.getAll("teams"),
    });

    /**
     * Update
     */
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          teamMemberships: {
            deleteMany: {},
          },
        },
      }),

      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          teamMemberships: {
            createMany: {
              data: teams.map((teamId) => ({
                teamId,
              })),
            },
          },
        },
      }),
    ]);

    /**
     * Respond with the result
     */
    redirect(`/admin/users/user/${userId}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
