import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "confetti-rainbow";

/**
 * @param engine -
 */
export async function loadConfettiRainbowPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
