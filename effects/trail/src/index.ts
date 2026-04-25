import { type Engine } from "@tsparticles/engine";
import { TrailDrawer } from "./TrailDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadTrailEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("trail", container => {
      return Promise.resolve(new TrailDrawer(container));
    });
  });
}
