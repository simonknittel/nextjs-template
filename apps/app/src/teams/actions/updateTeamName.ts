"use server";

import { authenticateAction } from "@/authentication/authenticateAndAuthorize";
import { prisma } from "@/db";
import { Logger } from "@nextjs-template/logging";
import { unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { z } from "zod";

const schema = z.object({
  id: z.string().cuid2(),
  name: z.string().trim().min(1),
});

export const updateTeamName = async (formData: FormData) => {
  try {
    /**
     * Authenticate the request
     */
    const authentication = await authenticateAction("updateTeamName");

    /**
     * Validate the request
     */
    const result = schema.safeParse({
      id: formData.get("id"),
      name: formData.get("name"),
    });
    if (!result.success)
      return {
        error: "Bad Request",
        errorDetails: result.error,
        requestPayload: formData,
      };

    /**
     * Authorize the request
     */
    await authentication.authorizeAction("team", "update", [
      { key: "id", value: result.data.id },
    ]);

    /**
     * Make sure the item exists
     */
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: result.data.id,
      },
    });
    if (!existingTeam)
      return {
        error: "Not Found",
        requestPayload: formData,
      };

    /**
     * Update
     */
    await prisma.team.update({
      where: {
        id: result.data.id,
      },
      data: {
        name: result.data.name,
      },
    });

    /**
     * Respond with the result
     */
    return {
      success: "Successfully saved",
    };
  } catch (error) {
    unstable_rethrow(error);
    void Logger.error("Internal Server Error", {
      error: serializeError(error),
    });
    return {
      error: "An error occurred while saving. Please try again later.",
      requestPayload: formData,
    };
  }
};
