#!/usr/bin/env node

const { Command } = require("commander");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

(async () => {
  const { buildCommand } = await import("@tsparticles/cli-command-build"),
    rootPkgPath = path.join(__dirname, "..", "package.json"),
    pkg = JSON.parse(await readFile(rootPkgPath, "utf-8")),
    [, , firstArg] = process.argv,
    directArgs = new Set(["build", "help", "-h", "--help", "-v", "--version"]),
    commandArgv =
      !firstArg ||
      firstArg.startsWith("-") ||
      !directArgs.has(firstArg)
        ? [process.argv[0], process.argv[1], "build", ...process.argv.slice(2)]
        : process.argv;

  const program = new Command();

  program.name("tsparticles-build");
  program.description("tsParticles Build CLI");
  program.version(pkg.version, "-v, --version", "output the current version");
  program.addCommand(buildCommand);
  program.parse(commandArgv);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

