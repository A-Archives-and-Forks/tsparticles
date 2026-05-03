# Playground

Split by use case:

- [`Configs Playground`](/playground/configs): richer demos with full editable options.
- [`Presets Playground`](/playground/presets): official preset-name demos (`{ preset: "..." }`).
- [`Palettes Playground`](/playground/palettes): palette-focused demos from the presets project.

Execution is always **user-triggered only** (no autoplay).

## Shared flow

1. Pick a demo from the menu.
2. Press `Start` to run it (no autoplay).
3. Edit the JSON in the editor.
4. Press `Start` again to reload with your new options.
5. Use `Stop`/`Resume` to control performance and CPU usage.

> Note: `Destroy` fully releases the container instance.

## Suggested workflow

- Prototype here until the effect is stable.
- Copy the final JSON into your project.
- Type it with `ISourceOptions` in application code.
