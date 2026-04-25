import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "cyan";

/**
 * @param engine -
 */
export async function loadCyanPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
