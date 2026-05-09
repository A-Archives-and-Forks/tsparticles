import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "squares";

/**
 * @param engine - the engine instance to load the preset into
 */
export async function loadSquaresPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadHexColorPlugin },
      { loadEmittersPluginSimple },
      { loadSquareShape },
      { loadRotateUpdater },
      { loadSizeUpdater },
      { loadPaintUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/plugin-hex-color/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("@tsparticles/shape-square/lazy"),
      import("@tsparticles/updater-rotate/lazy"),
      import("@tsparticles/updater-size/lazy"),
      import("@tsparticles/updater-paint/lazy"),
      import("./options.js"),
    ]);

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
