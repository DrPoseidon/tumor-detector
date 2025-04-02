import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                // viewBox is required to resize SVGs with CSS.
                // @see https://github.com/svg/svgo/issues/1128
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
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
  base: ".",
});
