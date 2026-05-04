/* eslint-disable jsdoc/require-returns, sort-imports, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  packageRoot = path.resolve(__dirname, ".."),
  workspaceRoot = path.resolve(packageRoot, "..", "..", ".."),
  localDist = path.join(packageRoot, "dist", "eslint.config.js"),
  pnpmStorePath = path.join(workspaceRoot, "node_modules", ".pnpm");

/**
 *
 */
function findPublishedDist() {
  if (!fs.existsSync(pnpmStorePath)) {
    return undefined;
  }

  const candidates = fs
    .readdirSync(pnpmStorePath)
    .filter((entry) => entry.startsWith("@tsparticles+eslint-config@"))
    .map((entry) =>
      path.join(pnpmStorePath, entry, "node_modules", "@tsparticles", "eslint-config", "dist", "eslint.config.js"),
    );

  return candidates.find((candidate) => fs.existsSync(candidate));
}

const resolvedEntry = fs.existsSync(localDist) ? localDist : findPublishedDist();

if (!resolvedEntry) {
  throw new Error("Cannot resolve a built eslint-config entrypoint from the workspace package or pnpm store.");
}

const moduleExports = await import(pathToFileURL(resolvedEntry).href);

export default moduleExports.default;
