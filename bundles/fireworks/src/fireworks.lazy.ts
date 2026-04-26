import { type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine/lazy";
import type { FireworksFunc } from "./types.js";
import type { FireworksInstance } from "./FireworksInstance.js";
import type { IFireworkOptions } from "./IFireworkOptions.js";
import { getFireworksInstance } from "./utils.js";

declare const __VERSION__: string;

let initPromise: Promise<void> | null = null;

declare global {
  var fireworks: FireworksFunc & {
    create: (
      canvas: HTMLCanvasElement,
      options: RecursivePartial<IFireworkOptions>,
    ) => Promise<FireworksInstance | undefined>;
    init: () => Promise<void>;
    version: string;
  };
}

/**
 * @param engine - the engine to use for loading all plugins
 * @returns the promise of initialization
 * @internal
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadLineShape },
        { loadBlendPlugin },
        { loadEmittersPluginSimple },
        { loadEmittersShapeSquare },
        { loadSoundsPlugin },
        { loadRotateUpdater },
        { loadDestroyUpdater },
        { loadLifeUpdater },
        { loadPaintUpdater },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/shape-line"),
        import("@tsparticles/plugin-blend"),
        import("@tsparticles/plugin-emitters/plugin"),
        import("@tsparticles/plugin-emitters-shape-square"),
        import("@tsparticles/plugin-sounds"),
        import("@tsparticles/updater-rotate/lazy"),
        import("@tsparticles/updater-destroy/lazy"),
        import("@tsparticles/updater-life/lazy"),
        import("@tsparticles/updater-paint/lazy"),
      ]),
      loadEmittersForFireworks = async (e: Engine): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      };

    await Promise.all([
      loadBasic(e),
      loadLineShape(e),
      loadBlendPlugin(e),
      loadEmittersForFireworks(e),
      loadSoundsPlugin(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
      loadPaintUpdater(e),
    ]);
  });
}

/**
 * @param engine - the engine to use for loading all plugins
 * @returns the promise of initialization
 * @internal
 */
async function initPlugins(engine: Engine): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = doInitPlugins(engine);

  return initPromise;
}

/**
 * @param idOrOptions - the id used for displaying the animation, or the animation configuration if an id is not necessary
 * @param sourceOptions - the animation configuration if an id is provided
 * @returns the loaded instance
 */
export async function fireworks(
  idOrOptions?: string | RecursivePartial<IFireworkOptions>,
  sourceOptions?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> {
  await initPlugins(tsParticles);

  let id: string, options: RecursivePartial<IFireworkOptions>;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = sourceOptions ?? {};
  } else {
    id = "fireworks";
    options = idOrOptions ?? {};
  }

  return getFireworksInstance(tsParticles, id, options);
}

fireworks.create = async (
  canvas: HTMLCanvasElement,
  options?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> => {
  await initPlugins(tsParticles);

  const id = canvas.id || "fireworks";

  return getFireworksInstance(tsParticles, id, options ?? {}, canvas);
};

fireworks.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

fireworks.version = __VERSION__;

globalThis.fireworks = fireworks;
