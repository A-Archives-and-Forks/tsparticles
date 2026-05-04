#!/usr/bin/env node

const { Command } = require("commander");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

(async () => {
  const { createCommand } = await import("@tsparticles/cli-command-create"),
    rootPkgPath = path.join(__dirname, "..", "package.json"),
    pkg = JSON.parse(await readFile(rootPkgPath, "utf-8")),
    [, , firstArg] = process.argv,
    directArgs = new Set(["create", "help", "-h", "--help", "-v", "--version"]),
    commandArgv =
      !firstArg ||
      firstArg.startsWith("-") ||
      !directArgs.has(firstArg)
        ? [process.argv[0], process.argv[1], "create", ...process.argv.slice(2)]
        : process.argv;

  const program = new Command();

  program.name("tsparticles-create");
  program.description("tsParticles Create CLI");
  program.version(pkg.version, "-v, --version", "output the current version");
  program.addCommand(createCommand);
  program.parse(commandArgv);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});


