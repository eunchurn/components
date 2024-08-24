import { defineConfig } from "tsup";
export default defineConfig((options) => (Object.assign({ entry: ["src/index.ts", "src/**/*.ts", "src/**/*.tsx", "!**/__tests__"], format: ["cjs", "esm"], outDir: "lib", dts: true, clean: true, sourcemap: true, target: "es2022", external: ["react", "react/jsx-runtime"], minify: !options.watch, banner: { js: '"use client";' } }, options)));
