import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "dark-matter";

/**
 * @param engine -
 */
export async function loadDarkMatterPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
