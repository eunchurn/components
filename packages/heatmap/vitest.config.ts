import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    passWithNoTests: true,
    watch: false,
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["lib/**/*", "tsup.config.ts", "vitest.config.ts"],
    },
  },
});
