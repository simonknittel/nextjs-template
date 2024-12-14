"use server";

import { authenticate } from "@/authentication/authenticateAndAuthorize";
import { prisma } from "@nextjs-template/database";
import { Logger } from "@nextjs-template/logging";
import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";

const schema = z.object({
  userId: z.string().trim().cuid2(),
  teams: z.array(z.string().trim().cuid2()),
});

export const updateTeamMembershipsAction = async (
  previousState: unknown,
  formData: FormData,
) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticate();
    if (!authentication)
      return { error: "You are not authorized to perform this action." };
    if (!(await authentication.authorize("administration", "manage")))
      return { error: "You are not authorized to perform this action." };

    /**
     * Validate the request
     */
    const result = schema.safeParse({
      userId: formData.get("userId"),
      teams: formData.getAll("teams"),
    });
    if (!result.success) return { error: "Bad Request" };

    /**
     * Update
     */
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: result.data.userId,
        },
        data: {
          teamMemberships: {
            deleteMany: {},
          },
        },
      }),

      prisma.user.update({
        where: {
          id: result.data.userId,
        },
        data: {
          teamMemberships: {
            createMany: {
              data: result.data.teams.map((teamId) => ({
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
    revalidatePath(`/admin/users/user/${result.data.userId}`);
    return { success: "Successfully updated team memberships." };
  } catch (error) {
    unstable_rethrow(error);

    Logger.error("Internal server error", { error: serializeError(error) });
    return {
      error: "An unknown error occurred. Please try again later.",
    };
  }
};
