import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "apple-red";

/**
 * Register the apple-red palette
 */
export async function loadAppleRedPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}

