import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "bokeh-pastel";

/**
 * @param engine -
 */
export async function loadBokehPastelPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
