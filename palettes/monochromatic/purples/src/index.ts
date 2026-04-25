import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";
const paletteName = "monochrome-purples";
/**
 * @param engine -
 */
export async function loadMonochromePurplesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
