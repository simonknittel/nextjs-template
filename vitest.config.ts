import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: [
        "text", // For the terminal
      ],
    },

    passWithNoTests: true,

    include: ["src/**/*.test.ts"],
  },
});
