import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "thunderstorm";

/**
 * @param engine -
 */
export async function loadThunderstormPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
