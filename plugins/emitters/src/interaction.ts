import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import { EmittersInteractor } from "./EmittersInteractor.js";
import { addEmittersShapesManager } from "./addEmittersShapesManager.js";
import { ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { getEmittersInstancesManager } from "./getEmittersInstancesManager.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersInteraction(engine: EmittersEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const instancesManager = await getEmittersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    await addEmittersShapesManager(e);

    e.pluginManager.addInteractor?.("externalEmitters", container => {
      return Promise.resolve(new EmittersInteractor(instancesManager, container as EmitterContainer));
    });
  });
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
