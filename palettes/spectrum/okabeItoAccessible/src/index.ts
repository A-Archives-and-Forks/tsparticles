import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "okabe-ito-accessible";

/**
 * @param engine -
 */
export async function loadOkabeItoAccessiblePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
