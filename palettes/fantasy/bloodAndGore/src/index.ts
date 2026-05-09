import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "blood-and-gore";

/**
 * @param engine -
 */
export async function loadBloodAndGorePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
