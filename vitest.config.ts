import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    include: [
      "**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/*.effect-{test,spec}.?(c|m)[jt]s?(x)",
    ],
    setupFiles: [
      "__tests__/libs/importEnv.ts",
      "__tests__/libs/initMockServer.ts",
    ],
  },
  plugins: [tsconfigPaths()],
});
