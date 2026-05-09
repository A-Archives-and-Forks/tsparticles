[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles CLI

## Installation

### NPM

```bash
npm install -g @tsparticles/cli-build
```

### Yarn

```bash
yarn global add @tsparticles/cli-build
```

### PNPM

```bash
pnpm global add @tsparticles/cli-build
```

## Usage

### Help

```bash
npx @tsparticles/cli-build --help
```

or

```bash
tsparticles-build --help
```

### Build

```bash
npx @tsparticles/cli-build
```

or

```bash
tsparticles-build
```

### Build options

```bash
tsparticles-build
tsparticles-build --clean --lint --tsc
tsparticles-build --bundle-webpack
tsparticles-build --bundle-rollup
```

Inside this repository, the local plugin `@tsparticles/cli-nx-plugin` augments package projects under `cli/commands/*`, `cli/packages/*`, and `cli/utils/*` with canonical aliases like `clean`, `prettify`, `prettify:ci`, `tsc`, `bundle`, and `distfiles`.

## Workspace commands (development)

From the `cli` root:

```bash
pnpm run show:projects
pnpm run build
pnpm run build:affected
pnpm run build:ci
pnpm run lint
pnpm run lint:ci
pnpm run test
pnpm run test:ci
```

### Focused Nx commands

```bash
pnpm nx show project @tsparticles/cli-command-build --json
pnpm nx run @tsparticles/cli-command-build:build
pnpm nx run @tsparticles/cli-nx-plugin:build
```

### Create

#### Bundle

```bash
npx @tsparticles/cli-create bundle <folder>
```

or

```bash
tsparticles-create bundle <folder>
```

#### Effect

```bash
npx @tsparticles/cli-create effect <folder>
```

or

```bash
tsparticles-create effect <folder>
```

#### Interaction

```bash
npx @tsparticles/cli-create interaction <folder>
```

or

```bash
tsparticles-create interaction <folder>
```

#### Palette

```bash
npx @tsparticles/cli-create palette <folder>
```

or

```bash
tsparticles-create palette <folder>
```

#### Path

```bash
npx @tsparticles/cli-create path <folder>
```

or

```bash
tsparticles-create path <folder>
```

#### Plugin

```bash
npx @tsparticles/cli-create plugin <folder>
```

or

```bash
tsparticles-create plugin <folder>
```

#### Preset

```bash
npx @tsparticles/cli-create preset <folder>
```

or

```bash
tsparticles-create preset <folder>
```

#### Shape

```bash
npx @tsparticles/cli-create shape <folder>
```

or

```bash
tsparticles-create shape <folder>
```

#### Updater

```bash
npx @tsparticles/cli-create updater <folder>
```

or

```bash
tsparticles-create updater <folder>
```
