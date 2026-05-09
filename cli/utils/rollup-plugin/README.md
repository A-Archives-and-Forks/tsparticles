# @tsparticles/rollup-plugin

Utility package that generates Rollup configurations for tsParticles engine, bundles, plugins, presets, shapes, paths, interactions, effects, templates, palettes, updaters, and utils.

## Installation

```bash
pnpm add -D @tsparticles/rollup-plugin rollup
```

## Exports

```ts
import {
  createParticlesBuild,
  loadParticlesBundle,
  loadParticlesEffect,
  loadParticlesEngine,
  loadParticlesInteraction,
  loadParticlesInteractionExternal,
  loadParticlesInteractionParticles,
  loadParticlesPalette,
  loadParticlesPath,
  loadParticlesPlugin,
  loadParticlesPluginEasing,
  loadParticlesPluginEmittersShape,
  loadParticlesPluginExport,
  loadParticlesPreset,
  loadParticlesShape,
  loadParticlesTemplate,
  loadParticlesUpdater,
  loadParticlesUtil,
} from "@tsparticles/rollup-plugin";
```

## Basic Example

```ts
import { loadParticlesPlugin } from "@tsparticles/rollup-plugin";

export default loadParticlesPlugin({
  bundle: true,
  dir: process.cwd(),
  moduleName: "your-plugin",
  pluginName: "Your Plugin",
  progress: false,
  version: "1.0.0",
});
```

The helpers return Rollup config objects (or arrays of configs) ready to be exported from your `rollup.config` file.

## Notes

- Output files are generated in each consumer package `dist` directory.
- Helpers support optional external mappings through `additionalExternals` where applicable.
- Bundle/non-bundle variants are generated depending on the helper and input options.

## Build (package maintainers)

```bash
pnpm run build
```

## License

MIT
