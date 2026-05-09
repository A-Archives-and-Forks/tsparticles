import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "ice-triad";

/**
 * @param engine -
 */
export async function loadIceTriadPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
