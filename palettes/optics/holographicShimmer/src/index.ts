import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "holographic-shimmer";

/**
 * @param engine -
 */
export async function loadHolographicShimmerPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
