import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadSnowfallPalette } from "@tsparticles/palette-snowfall";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";
import { options } from "./options.js";

const presetName = "snow";

/**
 * @param engine -
 */
export async function loadSnowPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([loadBasic(e), loadWobbleUpdater(e), loadSnowfallPalette(e)]);

    e.pluginManager.addPreset(presetName, options);
  });
}
