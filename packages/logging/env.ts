import { z } from "zod";

const schema = z.object({
  COMMIT_SHA: z.string().optional(),
  HOST: z.preprocess((str) => {
    if (str) return str;

    if (process.env.BASE_URL)
      return process.env.BASE_URL.replace(/https?:\/\//, "");

    return "localhost:3000";
  }, z.string()),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const env =
  process.env.SKIP_VALIDATION === "1"
    ? ({ ...process.env } as unknown as z.infer<typeof schema>)
    : schema.parse(process.env);
