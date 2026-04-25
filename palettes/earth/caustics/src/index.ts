import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "caustics";

/**
 * @param engine -
 */
export async function loadCausticsPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
