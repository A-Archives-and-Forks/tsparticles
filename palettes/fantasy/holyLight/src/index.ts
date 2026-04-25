import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "holy-light";

/**
 * @param engine -
 */
export async function loadHolyLightPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
