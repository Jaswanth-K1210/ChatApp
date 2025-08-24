// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // 👈 critical fix
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // needed by simple-peer
        }),
      ],
    },
  },
});
