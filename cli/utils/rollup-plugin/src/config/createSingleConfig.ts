import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import { getEntry } from "./entry";
import { getExternal, getGlobals } from "./externals";
import type { ConfigParams } from "../types";
import type { Plugin, RollupOptions } from "rollup";

const toJsBanner = (text: string): string => {
  return `/* ${text} */`;
};

const exposeEntryExports = (enabled: boolean): Plugin => {
  return {
    name: "expose-entry-exports",
    renderChunk(code, chunk) {
      if (!enabled || !chunk.isEntry) {
        return null;
      }

      const exports = chunk.exports.filter(t => t !== "default");

      if (exports.length === 0) {
        return null;
      }

      const assignments = exports.map(t => `${t}: ${t}`).join(", ");

      return {
        code: `${code}\nObject.assign(globalThis.window || globalThis, { ${assignments} });\n`,
        map: null,
      };
    },
  };
};

export const createSingleConfig = (params: ConfigParams, min: boolean, lazy: boolean): RollupOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name, input } = getEntry({ ...entry, min, lazy }),
    splitBundle = entry.bundle && lazy;

  return {
    input,
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      replace({
        preventAssignment: true,
        __VERSION__: JSON.stringify(version),
      }),
      exposeEntryExports(splitBundle),
      !min &&
        visualizer({
          filename: path.resolve(dir, "dist/report.html"),
        }),
      min && terser(),
    ].filter(Boolean),
    output: splitBundle
      ? {
          dir: path.resolve(dir, "dist"),
          entryFileNames: `${name}.js`,
          chunkFileNames: min ? "chunks/[name]-[hash].min.js" : "chunks/[name]-[hash].js",
          format: "es",
          banner: toJsBanner(min ? minBanner : banner),
        }
      : {
          file: path.resolve(dir, "dist", `${name}.js`),
          format: "umd",
          name: "window",
          extend: true,
          globals: getGlobals(additionalExternals, bundle),
          banner: toJsBanner(min ? minBanner : banner),
          inlineDynamicImports: true,
        },
  };
};
