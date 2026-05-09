import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "rain";

/**
 * @param engine -
 */
export async function loadRainPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
