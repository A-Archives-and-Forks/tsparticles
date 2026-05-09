import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "water-splash";

/**
 * @param engine -
 */
export async function loadWaterSplashPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
