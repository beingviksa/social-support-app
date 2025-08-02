import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@hoc": path.resolve(__dirname, "src/hoc"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@form": path.resolve(__dirname, "src/components/form"),
      "@common": path.resolve(__dirname, "src/components/common"),
    },
  },
});
