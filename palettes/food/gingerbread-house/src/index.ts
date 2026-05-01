import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "gingerbread-house";

/**
 *
 * @param engine
 */
export async function loadGingerbreadHousePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
