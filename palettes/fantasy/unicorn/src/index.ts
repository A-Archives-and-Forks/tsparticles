import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "unicorn";

/**
 *
 * @param engine
 */
export async function loadUnicornPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
