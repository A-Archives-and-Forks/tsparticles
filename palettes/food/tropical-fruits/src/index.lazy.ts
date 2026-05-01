import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "tropical-fruits";

/**
 *
 * @param engine
 */
export async function loadTropicalFruitsPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
