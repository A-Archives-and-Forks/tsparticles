import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "apple-green";

/**
 * Register the apple-green palette
 */
export async function loadAppleGreenPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}


