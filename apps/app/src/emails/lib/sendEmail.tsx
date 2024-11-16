import { env } from "@/env";
import { Logger } from "@nextjs-template/logging";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const smtpOptions = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  ...(env.SMTP_USER && env.SMTP_PASSWORD
    ? {
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      }
    : {}),
};

type Data = Omit<Mail.Options, "from">;

/**
 * **Example usage**
 * ```ts
 * await sendEmail({
 *   to: "recipient@localhost",
 *   subject: "My subject",
 *   html: await render(
 *     MyEmailTemplate({
 *       body: "Hello, World!",
 *       baseUrl: env.BASE_URL,
 *     }),
 *   ),
 * });
 * ```
 */
export const sendEmail = (data: Data) => {
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_FROM) {
    Logger.error("Failed to send email. Missing SMTP configuration");
    return Promise.resolve();
  }

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return transporter.sendMail({
    from: env.SMTP_FROM,
    ...data,
  });
};
