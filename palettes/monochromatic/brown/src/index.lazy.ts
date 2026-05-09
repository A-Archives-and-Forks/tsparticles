import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "brown";

/**
 * @param engine -
 */
export async function loadBrownPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
