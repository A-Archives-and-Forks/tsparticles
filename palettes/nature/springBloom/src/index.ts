import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "spring-bloom";

/**
 * @param engine -
 */
export async function loadSpringBloomPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
