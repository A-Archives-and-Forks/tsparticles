import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "apple";

/**
 *
 * @param engine
 */
export async function loadApplePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
