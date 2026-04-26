import { type Engine } from "@tsparticles/engine";
import type { InfectableContainer } from "./Types.js";
import { InfectionPlugin } from "./InfectionPlugin.js";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadInfectionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    // the interactivity plugin is optional; import only when needed
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new InfectionPlugin());

    e.pluginManager.addInteractor?.("particlesInfection", async (container: InfectableContainer) => {
      const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

      return new ParticlesInfecter(container);
    });
  });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
