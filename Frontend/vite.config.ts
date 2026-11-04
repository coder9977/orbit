import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";// import {IS_DEV} from "./src/config/config";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 8080,
    // host: "0.0.0.0",
    https: {
      cert: readFileSync(new URL("../localhost+3.pem", import.meta.url)),
      key: readFileSync(new URL("../localhost+3-key.pem", import.meta.url)),
    },
  },
});
