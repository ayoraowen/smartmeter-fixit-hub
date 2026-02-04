// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";
// import fs from "fs";
// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     https: {
//       key: fs.readFileSync("./certs/localhost.key"),
//       cert: fs.readFileSync("./certs/localhost.crt"),
//     },
//     port: 8080,
//   },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: isDev
      ? {
          host: "::",
          port: 8080,
          https: {
            key: fs.readFileSync("./certs/localhost.key"),
            cert: fs.readFileSync("./certs/localhost.crt"),
          },
        }
      : undefined, // ⬅️ IMPORTANT: no dev server config in prod

    plugins: [
      react(),
      isDev && componentTagger(),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});