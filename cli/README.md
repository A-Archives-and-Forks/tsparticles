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

#### Preset

```bash
npx @tsparticles/cli-create preset <folder>
```

or

```bash
tsparticles-create preset <folder>
```
