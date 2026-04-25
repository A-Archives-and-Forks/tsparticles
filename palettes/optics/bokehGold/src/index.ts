import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "bokeh-gold";

/**
 * @param engine -
 */
export async function loadBokehGoldPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
