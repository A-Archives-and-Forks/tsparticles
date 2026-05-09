import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "sakura";

/**
 *
 * @param engine
 */
export async function loadSakuraPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
