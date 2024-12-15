import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BASE_URL: z.preprocess((str) => {
      if (str) {
        return str;
      }

      return "http://localhost:3000";
    }, z.string().url()),
    HOST: z.preprocess((str) => {
      if (str) {
        return str;
      } else if (process.env.BASE_URL) {
        return process.env.BASE_URL.replace(/https?:\/\//, "");
      }

      return "localhost:3000";
    }, z.string()),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM: z.string().optional(),
    MIN_PASSWORD_LENGTH: z.coerce.number().default(16),
    MAX_PASSWORD_LENGTH: z.coerce.number().default(128),
    EMAIL_VERIFICATION_TOKEN_EXPIRATION: z.coerce
      .number()
      .default(60 * 60 * 24),
    PASSWORD_RESET_TOKEN_EXPIRATION: z.coerce.number().default(60 * 60 * 24),
    SIGNUP_ENABLED: z.preprocess((str) => {
      return str === "true";
    }, z.boolean()),
    ENCRYPTION_KEY: z.string().length(44),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    //
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    HOST: process.env.HOST,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
    MIN_PASSWORD_LENGTH: process.env.MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH: process.env.MAX_PASSWORD_LENGTH,
    EMAIL_VERIFICATION_TOKEN_EXPIRATION:
      process.env.EMAIL_VERIFICATION_TOKEN_EXPIRATION,
    PASSWORD_RESET_TOKEN_EXPIRATION:
      process.env.PASSWORD_RESET_TOKEN_EXPIRATION,
    SIGNUP_ENABLED: process.env.SIGNUP_ENABLED,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },

  emptyStringAsUndefined: true,

  skipValidation: process.env.SKIP_VALIDATION === "1",
});
