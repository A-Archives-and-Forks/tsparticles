#!/usr/bin/env node
/**
 * Fix type declarations for palette packages that were published
 * with types/index.js instead of types/index.d.ts.
 * This script generates proper .d.ts declaration files for the affected packages.
 */

import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * Derive the loader function name from the js source file.
 * @param {string} jsPath
 * @returns {string | undefined}
 */
function extractLoaderName(jsPath) {
  try {
    const src = readFileSync(jsPath, "utf-8");
    const match = src.match(/export\s+async\s+function\s+(\w+)/);
    return match ? match[1] : undefined;
  } catch {
    return undefined;
  }
}

const affectedPackages = [
  "@tsparticles/palette-apple",
  "@tsparticles/palette-apple-green",
  "@tsparticles/palette-apple-red",
  "@tsparticles/palette-avocado",
  "@tsparticles/palette-bell-peppers",
  "@tsparticles/palette-berries",
  "@tsparticles/palette-cherry",
  "@tsparticles/palette-citrus-twist",
  "@tsparticles/palette-gingerbread-house",
  "@tsparticles/palette-grapes",
  "@tsparticles/palette-iris",
  "@tsparticles/palette-macaron",
  "@tsparticles/palette-melon",
  "@tsparticles/palette-mermaid",
  "@tsparticles/palette-pineapple",
  "@tsparticles/palette-pizza",
  "@tsparticles/palette-sakura",
  "@tsparticles/palette-salad",
  "@tsparticles/palette-spice-rack",
  "@tsparticles/palette-steak",
  "@tsparticles/palette-sushi",
  "@tsparticles/palette-tropical-fruits",
  "@tsparticles/palette-unicorn",
  "@tsparticles/palette-watermelon",
];

for (const pkg of affectedPackages) {
  try {
    const pkgJsonPath = require.resolve(`${pkg}/package.json`);
    const pkgDir = dirname(pkgJsonPath);
    const typesDir = join(pkgDir, "types");

    for (const [srcFile, destFile] of [
      ["index.js", "index.d.ts"],
      ["index.lazy.js", "index.lazy.d.ts"],
    ]) {
      const srcJs = join(typesDir, srcFile);
      const destDts = join(typesDir, destFile);

      if (existsSync(srcJs)) {
        const loaderName = extractLoaderName(srcJs);
        const dtsContent = loaderName
          ? `import type { Engine } from "@tsparticles/engine";\nexport declare function ${loaderName}(engine: Engine): Promise<void>;\n`
          : `export declare function load(engine: unknown): Promise<void>;\n`;
        writeFileSync(destDts, dtsContent, "utf-8");
        console.log(`[fix-palette-types] Created ${destDts}`);
      }
    }
  } catch {
    // Package not installed, skip
  }
}
