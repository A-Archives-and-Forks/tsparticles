import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "confetti-pastel";

/**
 * @param engine -
 */
export async function loadConfettiPastelPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
