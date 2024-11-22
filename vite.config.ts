import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

const SEPARATE_MODULES = [
  "react-router",
  "date-fns",
  "lucide-react",
  "@radix-ui",
  "zod",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      lib: path.resolve(__dirname, "./src/lib"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "./dist/stats.html",
        }),
      ],
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") &&
              !SEPARATE_MODULES.some((module) => id.includes(module))
            ) {
              return "react-vendor";
            }
            for (const module of SEPARATE_MODULES) {
              if (id.includes(module)) {
                return module;
              }
            }
            return "vendor";
          }
        },
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
