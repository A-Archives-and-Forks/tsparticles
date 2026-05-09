import { type Engine } from "@tsparticles/engine";
import { RotateUpdater } from "./RotateUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRotateUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("rotate", container => {
      return Promise.resolve(new RotateUpdater(container));
    });
  });
}
