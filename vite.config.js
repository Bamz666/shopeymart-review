import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    // Ganti dengan URL API Anda
    "/api": "https://bamz666.github.io/host_api",
  },
});
