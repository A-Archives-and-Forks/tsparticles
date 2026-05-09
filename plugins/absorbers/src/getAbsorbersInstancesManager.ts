import type { Engine, PluginManager } from "@tsparticles/engine";
import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";

const instancesManagers = new WeakMap<PluginManager, Promise<AbsorbersInstancesManager>>();

/**
 * @param e - The engine instance whose plugin manager will be used to resolve the absorbers manager.
 * @returns A promise that resolves to the absorbers instances manager for the given engine.
 */
export function getAbsorbersInstancesManager(e: Engine): Promise<AbsorbersInstancesManager> {
  const pluginManager = e.pluginManager;

  let manager = instancesManagers.get(pluginManager);

  if (!manager) {
    manager = import("./AbsorbersInstancesManager.js")
      .then(({ AbsorbersInstancesManager }) => new AbsorbersInstancesManager(pluginManager))
      .catch((error: unknown) => {
        instancesManagers.delete(pluginManager);

        throw error;
      });

    instancesManagers.set(pluginManager, manager);
  }

  return manager;
}
