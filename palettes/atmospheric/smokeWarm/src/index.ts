import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "smoke-warm";

/**
 * @param engine -
 */
export async function loadSmokeWarmPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
