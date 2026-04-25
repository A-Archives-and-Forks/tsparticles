import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "monochrome-gold";

/**
 * @param engine -
 */
export async function loadMonochromeGoldPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
