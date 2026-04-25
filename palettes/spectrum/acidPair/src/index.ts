import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "acid-pair";

/**
 * @param engine -
 */
export async function loadAcidPairPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
