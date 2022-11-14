import { defineConfig } from "vite";
import openAPIToTs from "./rollup-plugins/rollup-plugin-openapi-to-ts";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(
  (async () => {
    return {
      plugins: [
        openAPIToTs([
          { schema: "http://localhost:8000/openapi.json", name: "my_api" },
        ]),
      ],
    };
  })()
);
