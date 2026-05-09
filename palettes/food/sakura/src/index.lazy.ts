import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "sakura";

/**
 *
 * @param engine
 */
export async function loadSakuraPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
