import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  DATABASE_URL: z.string(),
});

export const env = schema.parse(process.env);