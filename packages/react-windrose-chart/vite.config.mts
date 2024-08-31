import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

console.log(path.resolve(__dirname, "src", "index.ts"));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [path.resolve(__dirname, "src/index.ts")],
      name: "react-windrose-chart",
      formats: ["cjs", "es", "umd"],
      fileName: "index"
      // fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      external: ["react", "react-dom"],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
});
