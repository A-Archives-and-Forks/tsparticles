import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "lightning";

/**
 * @param engine -
 */
export async function loadLightningPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
