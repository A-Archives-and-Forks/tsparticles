import type { Engine } from "@tsparticles/engine";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadPaintUpdater } from "@tsparticles/updater-paint";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSizeUpdater } from "@tsparticles/updater-size";
import { loadSquareShape } from "@tsparticles/shape-square";
import { options } from "./options.js";

const presetName = "squares";

/**
 * @param engine - the engine instance to load the preset into
 */
export async function loadSquaresPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadHexColorPlugin(e),
      loadEmittersPluginSimple(e),
      loadSquareShape(e),
      loadRotateUpdater(e),
      loadSizeUpdater(e),
      loadPaintUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
