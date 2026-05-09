import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";
const paletteName = "pastel-dream";
/**
 * @param engine -
 */
export async function loadPastelDreamPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
