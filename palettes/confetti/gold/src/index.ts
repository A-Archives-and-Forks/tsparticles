import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "confetti-gold";

/**
 * @param engine -
 */
export async function loadConfettiGoldPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
