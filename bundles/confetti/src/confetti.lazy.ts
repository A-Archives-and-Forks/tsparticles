import type { ConfettiFirstParam, ConfettiFunc } from "./types.js";
import { type Container, type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine/lazy";
import type { IConfettiOptions } from "./IConfettiOptions.js";
import { setConfetti } from "./utils.js";

declare const __VERSION__: string;

declare global {
  /**
   *
   */
  var confetti: ConfettiFunc & {
    /**
     *
     * @param canvas -
     * @param options -
     * @returns the confetti function
     */
    create: (canvas?: HTMLCanvasElement | null, options?: RecursivePartial<IConfettiOptions>) => Promise<ConfettiFunc>;

    init: () => Promise<void>;

    /**
     * the confetti version number
     */
    version: string;
  };
}

let initPromise: Promise<void> | null = null;

/**
 * @param engine -
 * @returns the init plugins promise
 * @internal
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPluginSimple },
      { loadMotionPlugin },

      { loadCardSuitsShape },
      { loadEmojiShape },
      { loadHeartShape },
      { loadImageShape },
      { loadPolygonShape },
      { loadSquareShape },
      { loadStarShape },

      { loadRotateUpdater },
      { loadLifeUpdater },
      { loadRollUpdater },
      { loadTiltUpdater },
      { loadWobbleUpdater },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("@tsparticles/plugin-motion/lazy"),

      import("@tsparticles/shape-cards/suits/lazy"),
      import("@tsparticles/shape-emoji/lazy"),
      import("@tsparticles/shape-heart/lazy"),
      import("@tsparticles/shape-image/lazy"),
      import("@tsparticles/shape-polygon/lazy"),
      import("@tsparticles/shape-square/lazy"),
      import("@tsparticles/shape-star/lazy"),

      import("@tsparticles/updater-rotate/lazy"),
      import("@tsparticles/updater-life/lazy"),
      import("@tsparticles/updater-roll/lazy"),
      import("@tsparticles/updater-tilt/lazy"),
      import("@tsparticles/updater-wobble/lazy"),
    ]);

    await Promise.all([
      loadBasic(e),

      loadMotionPlugin(e),
      loadEmittersPluginSimple(e),

      loadCardSuitsShape(e),
      loadHeartShape(e),
      loadImageShape(e),
      loadPolygonShape(e),
      loadSquareShape(e),
      loadStarShape(e),
      loadEmojiShape(e),

      loadRotateUpdater(e),
      loadLifeUpdater(e),
      loadRollUpdater(e),
      loadTiltUpdater(e),
      loadWobbleUpdater(e),
    ]);
  });
}

/**
 * This function prepares all the plugins needed by the confetti bundle
 * @param engine -
 * @returns the init plugins promise
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
 * @param idOrOptions - the id used for the canvas, or if not using two parameters, the animation configuration object
 * @param confettiOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
export async function confetti(
  idOrOptions: ConfettiFirstParam,
  confettiOptions?: RecursivePartial<IConfettiOptions>,
): Promise<Container | undefined> {
  await initPlugins(tsParticles);

  let options: RecursivePartial<IConfettiOptions>, id: string;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = confettiOptions ?? {};
  } else {
    id = "confetti";
    options = idOrOptions;
  }

  return setConfetti(tsParticles, {
    id,
    options,
  });
}

/**
 *
 * @param canvas -
 * @param options -
 * @returns the confetti function to use for the given canvas animations
 */
confetti.create = async (
  canvas?: HTMLCanvasElement | null,
  options: RecursivePartial<IConfettiOptions> = {},
): Promise<ConfettiFunc> => {
  await initPlugins(tsParticles);

  const id = canvas?.getAttribute("id") ?? "confetti";

  canvas?.setAttribute("id", id);

  await setConfetti(tsParticles, {
    id,
    canvas: canvas ?? undefined,
    options,
  });

  return async (
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>,
  ): Promise<Container | undefined> => {
    let subOptions: RecursivePartial<IConfettiOptions>, subId: string;

    if (isString(idOrOptions)) {
      subId = idOrOptions;
      subOptions = confettiOptions ?? options;
    } else {
      subId = id;
      subOptions = idOrOptions;
    }

    return setConfetti(tsParticles, {
      id: subId,
      canvas: canvas ?? undefined,
      options: subOptions,
    });
  };
};

confetti.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

/**
 *
 */
confetti.version = __VERSION__;

globalThis.confetti = confetti;
