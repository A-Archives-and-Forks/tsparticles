import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const confettiPkg = JSON.parse(
  readFileSync(resolve(rootDir, "node_modules/@tsparticles/confetti/package.json"), "utf8"),
);

const templatePath = resolve(rootDir, "public/index.template.html");
const outputPath = resolve(rootDir, "public/index.html");

let html = readFileSync(templatePath, "utf8");
html = html.replace(/__CONFETTI_VERSION__/g, confettiPkg.version);
writeFileSync(outputPath, html);

execSync("handlebars confetti-modes.handlebars -f public/js/confetti-modes.js -k isCustom", {
  cwd: rootDir,
  stdio: "inherit",
});
