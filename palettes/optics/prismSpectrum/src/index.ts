import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "prism-spectrum";

/**
 * @param engine -
 */
export async function loadPrismSpectrumPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
