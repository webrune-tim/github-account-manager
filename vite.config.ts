import { defineConfig } from "vite-plus";

export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
});
