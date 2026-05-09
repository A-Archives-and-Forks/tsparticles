import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "explosion-debris";

/**
 * @param engine -
 */
export async function loadExplosionDebrisPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
