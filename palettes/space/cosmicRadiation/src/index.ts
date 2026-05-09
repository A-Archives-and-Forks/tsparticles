import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "cosmic-radiation";

/**
 * @param engine -
 */
export async function loadCosmicRadiationPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
