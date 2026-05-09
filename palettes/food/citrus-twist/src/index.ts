import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "citrus-twist";

/**
 *
 * @param engine
 */
export async function loadCitrusTwistPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
