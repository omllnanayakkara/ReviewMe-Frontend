import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": import.meta.env.BASE_URL,
      secure: false,
    },
  },
  plugins: [react()],
});
