import { type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine/lazy";
import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { ParticlesFunc } from "./types.js";
import type { ParticlesInstance } from "./ParticlesInstance.js";
import { getParticlesInstance } from "./utils.js";

declare const __VERSION__: string;

let initPromise: Promise<void> | null = null;

declare global {
  var particles: ParticlesFunc & {
    create: (
      canvas?: HTMLCanvasElement | null,
      options?: RecursivePartial<IParticlesOptions>,
    ) => Promise<ParticlesInstance | undefined>;
    init: () => Promise<void>;
    version: string;
  };
}

/**
 * @param engine -
 * @returns -
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadInteractivityPlugin },
        { loadParticlesCollisionsInteraction },
        { loadParticlesLinksInteraction },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/plugin-interactivity/lazy"),
        import("@tsparticles/interaction-particles-collisions/lazy"),
        import("@tsparticles/interaction-particles-links/lazy"),
      ]),
      loadParticlesInteractivity = async (e: Engine): Promise<void> => {
        await loadInteractivityPlugin(e);

        await Promise.all([
          loadParticlesCollisionsInteraction(e),
          loadParticlesLinksInteraction(e),
        ]);
      };

    await Promise.all([
      loadBasic(e),
      loadParticlesInteractivity(e),
    ]);
  });
}

/**
 * @param engine -
 * @returns -
 */
async function initPlugins(engine: Engine): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = doInitPlugins(engine);

  return initPromise;
}

/**
 * @param idOrOptions -
 * @param sourceOptions -
 * @returns -
 */
export async function particles(
  idOrOptions?: string | RecursivePartial<IParticlesOptions>,
  sourceOptions?: RecursivePartial<IParticlesOptions>,
): Promise<ParticlesInstance | undefined> {
  await initPlugins(tsParticles);

  let id: string, options: RecursivePartial<IParticlesOptions>;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = sourceOptions ?? {};
  } else {
    id = "particles";
    options = idOrOptions ?? {};
  }

  return getParticlesInstance(tsParticles, id, options);
}

particles.create = async (
  canvas?: HTMLCanvasElement | null,
  options?: RecursivePartial<IParticlesOptions>,
): Promise<ParticlesInstance | undefined> => {
  await initPlugins(tsParticles);

  const id = canvas?.id ?? "particles";

  return getParticlesInstance(tsParticles, id, options ?? {}, canvas ?? undefined);
};

particles.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

particles.version = __VERSION__;

globalThis.particles = particles;
