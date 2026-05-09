import { AnimatableColor } from "../AnimatableColor.js";
import { Fill } from "./Fill.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Stroke } from "./Stroke.js";
import { isNull } from "../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles/Paint.md]]
 */
export class Paint implements IPaint, IOptionLoader<IPaint> {
  color?: AnimatableColor;
  fill?: Fill;
  stroke?: Stroke;

  load(data?: RecursivePartial<IPaint>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    if (data.fill !== undefined) {
      this.fill ??= new Fill();
      this.fill.load(data.fill);
    }

    if (data.stroke !== undefined) {
      this.stroke ??= new Stroke();
      this.stroke.load(data.stroke);
    }
  }
}
