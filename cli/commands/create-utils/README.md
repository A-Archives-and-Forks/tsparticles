# @tsparticles/cli-create-utils

Shared utilities used by `@tsparticles/cli-command-create` and all modular `create-*` command packages.

## What It Provides

- project scaffold generation (`createProjectTemplate`)
- interactive prompt helpers (`promptProjectData`)
- filesystem helpers (`getDestinationDir`, `getRepositoryUrl`, token replacement)
- template/package update helpers (`updatePackageFile`, `copyEmptyTemplateFiles`, `runInstall`, `runBuild`)
- string naming helpers (`capitalize`, `camelize`, `dash`)

## Installation

```bash
pnpm add @tsparticles/cli-create-utils
```

## Exports

This package re-exports everything from:

- `src/create-project.ts`
- `src/file-utils.ts`
- `src/prompt-utils.ts`
- `src/string-utils.ts`
- `src/template-utils.ts`

## Typical Usage

```ts
import { Command } from "commander";
import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";

const cmd = new Command("shape");

cmd.argument("<destination>");
cmd.action(async destination => {
  const data = await promptProjectData({
    destination,
    nameLabel: "shape",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "shape",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});
```
