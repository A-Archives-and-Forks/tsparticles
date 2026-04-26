import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import type { MatrixParticle } from "./MatrixParticle.js";
import { drawMatrix } from "./Utils.js";

export class MatrixDrawer implements IShapeDrawer<MatrixParticle> {
  draw(data: IShapeDrawData<MatrixParticle>): void {
    drawMatrix(data);
  }
}
