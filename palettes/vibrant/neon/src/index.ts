import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";
const paletteName = "vibrant-neon";
/**
 * @param engine -
 */
export async function loadVibrantNeonPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
