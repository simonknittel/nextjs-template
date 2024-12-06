"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import {
  type ServerAction,
  serverActionErrorHandler,
} from "@/common/utils/actions";
import { prisma } from "@nextjs-template/database";
import { z } from "zod";

const schema = z.object({
  id: z.string().cuid2(),
  name: z.string().trim().min(1).optional(),
});

export const updateTeamAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("updateTeam");

    /**
     * Validate the request
     */
    const { id, ...data } = schema.parse({
      id: formData.get("id"),
      name: formData.get("name"),
    });

    await authentication.authorizeAction("team", "update", [
      { key: "id", value: id },
    ]);

    /**
     * Make sure the item exists
     */
    const existingTeam = await prisma.team.findUnique({
      where: {
        id,
      },
    });
    if (!existingTeam) throw new Error("Not Found");

    /**
     * Update
     */
    await prisma.team.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    /**
     * Respond with the result
     */
    return {
      status: 200,
    };
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
