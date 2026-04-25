import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "duality-red-cyan";

/**
 * @param engine -
 */
export async function loadDualityRedCyanPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
