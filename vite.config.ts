import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import * as RouterPlugin from "@tanstack/router-plugin/vite";

// 使用する際
const { TanStackRouterVite } = RouterPlugin;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
