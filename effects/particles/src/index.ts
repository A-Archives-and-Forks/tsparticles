import { type Engine } from "@tsparticles/engine";
import { ParticlesDrawer } from "./ParticlesDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadParticlesEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("particles", container => {
      return Promise.resolve(new ParticlesDrawer(container));
    });
  });
}
