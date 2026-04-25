import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "lava-lamp";

/**
 * @param engine -
 */
export async function loadLavaLampPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
