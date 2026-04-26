import { type Engine } from "@tsparticles/engine/lazy";
import { loadAbsorbersInteraction } from "./interaction.lazy.js";
import { loadAbsorbersPluginSimple } from "./plugin.lazy.js";

/**
 * @param engine -
 */
export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
  await loadAbsorbersPluginSimple(engine);
  await loadAbsorbersInteraction(engine);
}

export type * from "./AbsorberContainer.js";
