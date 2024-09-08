import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
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
    COMMIT_SHA: z.string().optional(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM: z.string().email(),
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
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    HOST: process.env.HOST,
    COMMIT_SHA: process.env.COMMIT_SHA,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
  },

  emptyStringAsUndefined: true,

  skipValidation: process.env.SKIP_VALIDATION === "1",
});
