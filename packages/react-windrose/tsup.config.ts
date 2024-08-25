import { defineConfig } from "tsup";
import cssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/**/*.ts", "src/**/*.tsx", "!**/__tests__"],
  format: ["cjs", "esm"],
  outDir: "lib",
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
