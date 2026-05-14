import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "super-mario-bros";

/**
 *
 * @param engine
 */
export async function loadSuperMarioBrosPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
