import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    host: true,
    port: 3000
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
  // @ts-ignore - Vitest types
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.test.{ts,tsx}"],
  },
});
