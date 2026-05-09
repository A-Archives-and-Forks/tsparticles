import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "berries";

/**
 *
 * @param engine
 */
export async function loadBerriesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
