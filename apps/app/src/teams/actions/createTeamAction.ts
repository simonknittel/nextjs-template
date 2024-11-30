"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import {
  serverActionErrorHandler,
  type ServerAction,
} from "@/common/utils/actions";
import { prisma } from "@nextjs-template/database";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1),
});

export const createTeamAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    const authentication = await authenticateAction("createTeam");
    authentication.authorizeAction("administration", "manage");

    /**
     * Validate the request
     */
    const data = schema.parse({
      name: formData.get("name"),
    });

    /**
     * Create
     */
    const createdTeam = await prisma.team.create({
      data: {
        name: data.name,
        createdBy: {
          connect: {
            id: authentication.user.id,
          },
        },
      },
    });

    /**
     * Respond with the result
     */
    redirect(`/admin/teams/team/${createdTeam.id}`);
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
