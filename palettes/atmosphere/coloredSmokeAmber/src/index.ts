import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "colored-smoke-amber";

/**
 * @param engine -
 */
export async function loadColoredSmokeAmberPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
