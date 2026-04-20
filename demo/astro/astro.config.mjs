import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';

// https://astro.build/config
// Use aliases to ensure server-side imports get the server entry (source
// workspace file) while client-side module imports (exact package root)
// resolve to the browser ESM entry in node_modules.
export default defineConfig({
  vite: {
    resolve: {
      alias: {},
    },
  },
});
