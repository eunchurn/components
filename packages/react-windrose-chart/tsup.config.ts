import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/**/*.ts", "src/**/*.tsx", "!**/__tests__", "!src/stories/**/*"],
  format: ["cjs", "esm"],
  outDir: "dist",
  dts: true,
  clean: true,
  sourcemap: true,
  cjsInterop: true,
  target: "es2022",
  external: ["react", "react/jsx-runtime"],
  minify: !options.watch,
  banner: { js: '"use client";' },
  ...options,
}));
