import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "colored-smoke-orange";

/**
 * @param engine -
 */
export async function loadColoredSmokeOrangePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
