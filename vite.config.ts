import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Plesk / Node.js deployment target.
// - Build a Node HTTP server via Nitro's node-server preset
// - Split heavy vendor chunks (lucide-react, radix, recharts) to avoid OOM
export default defineConfig({
  nitro: { preset: "node-server" },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("lucide-react")) return "lucide";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("recharts") || id.includes("d3-")) return "charts";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("react-dom")) return "react-dom";
          },
        },
      },
    },
    optimizeDeps: {
      include: ["lucide-react"],
    },
  },
});
