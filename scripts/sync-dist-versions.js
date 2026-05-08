import { readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();

function resolveWorkspaceVersion(value, version) {
  if (!value.startsWith("workspace:")) {
    return value;
  }

  const spec = value.slice("workspace:".length);

  if (!spec || spec === "*") {
    return version;
  }

  if (spec === "^" || spec === "~") {
    return `${spec}${version}`;
  }

  return spec;
}

function resolveDeps(deps, version) {
  return Object.fromEntries(
    Object.entries(deps).map(([name, value]) => [name, resolveWorkspaceVersion(value, version)]),
  );
}

function collectFiles(dir) {
  const result = [];
  const entries = [];

  try {
    entries.push(...readdirSync(dir, { withFileTypes: true }));
  } catch {
    return result;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    const fullPath = join(dir, entry.name);

    const pkgDistPath = join(fullPath, "package.dist.json");

    if (existsSync(pkgDistPath)) {
      result.push(pkgDistPath);
    }

    result.push(...collectFiles(fullPath));
  }

  return result;
}

function syncDistVersions() {
  const distFiles = collectFiles(ROOT);

  console.log(`Found ${distFiles.length} package.dist.json files`);

  let updated = 0;

  for (const distFile of distFiles) {
    const basePath = dirname(distFile);
    const pkgJsonPath = join(basePath, "package.json");

    if (!existsSync(pkgJsonPath)) {
      continue;
    }

    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"));

    const text = readFileSync(distFile, "utf8");
    const pkgDist = JSON.parse(text);
    const oldVersion = pkgDist.version;
    const newVersion = pkgJson.version;

    if (oldVersion !== newVersion) {
      console.log(`  ${basePath}: ${oldVersion} -> ${newVersion}`);
    }

    pkgDist.version = newVersion;

    if (pkgJson.dependencies) {
      pkgDist.dependencies = resolveDeps(pkgJson.dependencies, newVersion);
    }

    if (pkgJson.peerDependencies) {
      pkgDist.peerDependencies = resolveDeps(pkgJson.peerDependencies, newVersion);
    }

    const newContent = `${JSON.stringify(pkgDist, undefined, 2)}\n`;

    if (newContent === text) {
      continue;
    }

    writeFileSync(distFile, newContent);

    const distDir = join(basePath, "dist");

    if (existsSync(distDir)) {
      copyFileSync(distFile, join(distDir, "package.json"));
    }

    updated++;
  }

  console.log(`\nUpdated ${updated} package.dist.json files`);

  if (updated === 0) {
    console.log("Nothing to update - all versions already in sync");
  }
}

syncDistVersions();
