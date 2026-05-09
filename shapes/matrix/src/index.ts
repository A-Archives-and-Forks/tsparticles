import { type Engine } from "@tsparticles/engine";
import { MatrixDrawer } from "./MatrixDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadMatrixShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["matrix"], () => Promise.resolve(new MatrixDrawer()));
  });
}
