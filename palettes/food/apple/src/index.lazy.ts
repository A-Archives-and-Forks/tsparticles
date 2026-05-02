import { type Engine } from "@tsparticles/engine";

const greenPaletteName = "apple-green",
  redPaletteName = "apple-red",
  paletteName = "apple";

/**
 * @param engine -
 */
export async function loadApplePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { appleGreen, appleRed, options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
    e.pluginManager.addPalette(greenPaletteName, appleGreen);
    e.pluginManager.addPalette(redPaletteName, appleRed);
  });
}
