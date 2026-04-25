import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Collider } from "./Collider.js";
import { type Engine } from "@tsparticles/engine";
import { OverlapPlugin } from "./OverlapPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export async function loadParticlesCollisionsInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new OverlapPlugin());

    e.pluginManager.addInteractor?.("particlesCollisions", container => {
      return Promise.resolve(new Collider(container));
    });
  });
}
