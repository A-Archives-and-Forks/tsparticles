import { type Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { options } from "./options.js";

const presetNames = ["bigCircles", "big-circles"];

/**
 * @param engine -
 */
export async function loadBigCirclesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await loadBasic(e);

    presetNames.forEach(name => {
      e.pluginManager.addPreset(name, options);
    });
  });
}
