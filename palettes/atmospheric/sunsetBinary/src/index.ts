import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "sunset-binary";

/**
 * @param engine -
 */
export async function loadSunsetBinaryPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
