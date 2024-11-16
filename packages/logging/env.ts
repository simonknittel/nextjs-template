import { z } from "zod";

const schema = z.object({
  COMMIT_SHA: z.string().optional(),
  HOST: z.preprocess((str) => {
    if (str) {
      return str;
    } else if (process.env.BASE_URL) {
      return process.env.BASE_URL.replace(/https?:\/\//, "");
    }

    return "localhost:3000";
  }, z.string()),
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
});

export const env = schema.parse(process.env);
