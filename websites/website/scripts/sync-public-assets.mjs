import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const docsPublicDir = resolve(rootDir, "docs", "public");
const rootCname = resolve(rootDir, "CNAME");
const docsCname = resolve(docsPublicDir, "CNAME");

const assetsToSync = ["audio", "images", "videos"];

mkdirSync(docsPublicDir, { recursive: true });

for (const assetDir of assetsToSync) {
  const source = resolve(rootDir, assetDir);
  const target = resolve(docsPublicDir, assetDir);

  if (!existsSync(source)) {
    continue;
  }

  rmSync(target, { force: true, recursive: true });
  cpSync(source, target, { recursive: true });
}

if (existsSync(rootCname)) {
  cpSync(rootCname, docsCname);
}

console.log(`[assets] synced ${assetsToSync.join(", ")} to docs/public`);

