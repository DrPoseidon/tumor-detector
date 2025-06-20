import path from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload();
        },
      },
    ]),
    renderer(),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@/app": path.resolve(process.cwd(), "src/1_app"),
      "@/pages": path.resolve(process.cwd(), "src/2_pages"),
      "@/widgets": path.resolve(process.cwd(), "src/3_widgets"),
      "@/features": path.resolve(process.cwd(), "src/4_features"),
      "@/entities": path.resolve(process.cwd(), "src/5_entities"),
      "@/shared": path.resolve(process.cwd(), "src/6_shared"),
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});
