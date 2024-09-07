"use server";
import { render } from "@react-email/components";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import MyEmailTemplate from "../../emails/MyEmailTemplate";
import { prisma } from "../db";
import { env } from "../env";
import { sendEmail } from "../lib/sendEmail";
import { type ServerAction, serverActionErrorHandler } from "./lib/common";

const schema = z.object({
  email: z.string().email(),
  body: z.string().max(512),
});

export const newEmailAction: ServerAction = async (formData) => {
  try {
    /**
     * Authenticate and authorize the request
     */
    // TODO

    /**
     * Validate the request
     */
    const { email, body } = schema.parse({
      email: formData.get("email"),
      body: formData.get("body"),
    });

    /**
     * Create
     */
    await prisma.sentEmail.create({
      data: {
        email,
        body,
      },
    });

    await sendEmail({
      to: email,
      subject: "My subject",
      html: await render(
        MyEmailTemplate({
          body,
          baseUrl: env.BASE_URL,
        }),
      ),
    });

    /**
     * Respond with the result
     */
    revalidatePath(`/`);
    return { status: 200 };
  } catch (error) {
    return serverActionErrorHandler(error);
  }
};
