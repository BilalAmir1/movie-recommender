import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This assumes your API is running on localhost:5000
      "/api": {
        target: "http://localhost:5000", // Adjust this to your backend API address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optionally remove /api prefix
      },
    },
  },
});
