import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export async function loadParticlesCollisionsInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const [
      { ensureInteractivityPluginLoaded },
      { OverlapPlugin },
    ] = await Promise.all([
      import("@tsparticles/plugin-interactivity/lazy"),
      import("./OverlapPlugin.js"),
    ]);

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new OverlapPlugin());

    e.pluginManager.addInteractor?.("particlesCollisions", async container => {
      const { Collider } = await import("./Collider.js");

      return new Collider(container);
    });
  });
}
