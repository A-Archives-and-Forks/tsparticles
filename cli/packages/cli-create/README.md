# @tsparticles/cli-create

Minimal CLI for scaffolding tsParticles packages. This is a thin wrapper around `@tsparticles/cli-command-create`.

## Installation

```bash
npm install --save-dev @tsparticles/cli-create
# or
pnpm add -D @tsparticles/cli-create
# or
yarn add -D @tsparticles/cli-create
```

## Usage

```bash
tsparticles-create [options]
```

The wrapper automatically prepends `create` when omitted, so these are equivalent:

```bash
tsparticles-create plugin my-plugin
tsparticles-create create plugin my-plugin
```

Supported subcommands:

- `bundle`
- `effect`
- `interaction`
- `palette`
- `path`
- `plugin`
- `preset`
- `shape`
- `updater`

For full examples, see `cli/commands/create/README.md`.
