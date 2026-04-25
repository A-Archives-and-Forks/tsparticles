import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "vaporwave";

/**
 * @param engine -
 */
export async function loadVaporwavePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
