import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "avocado";

/**
 *
 * @param engine
 */
export async function loadAvocadoPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
