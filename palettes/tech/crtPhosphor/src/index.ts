import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "crt-phosphor";

/**
 * @param engine -
 */
export async function loadCrtPhosphorPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
