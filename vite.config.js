import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import progressStore from "./vite-progress-plugin.js";

export default defineConfig({ plugins: [react(), progressStore()] });
