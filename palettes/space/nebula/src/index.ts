import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "nebula";

/**
 * @param engine -
 */
export async function loadNebulaPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
