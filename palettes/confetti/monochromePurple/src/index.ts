import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "confetti-monochrome-purple";

/**
 * @param engine -
 */
export async function loadConfettiMonochromePurplePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
