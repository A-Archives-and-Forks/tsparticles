import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";
const paletteName = "vibrant";
/**
 * @param engine -
 */
export async function loadVibrantPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
