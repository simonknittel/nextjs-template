import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string(),
});

export const env =
  process.env.SKIP_VALIDATION === "1"
    ? ({ ...process.env } as unknown as z.infer<typeof schema>)
    : schema.parse(process.env);
