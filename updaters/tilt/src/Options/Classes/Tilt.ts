import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import type { ITilt } from "../Interfaces/ITilt";
import { TiltAnimation } from "./TiltAnimation";
import { TiltDirection } from "../../TiltDirection";
import type { TiltDirectionAlt } from "../../TiltDirection";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export class Tilt extends ValueWithRandom implements ITilt, IOptionLoader<ITilt> {
    animation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable;

    constructor() {
        super();
        this.animation = new TiltAnimation();
        this.direction = TiltDirection.clockwise;
        this.enable = false;
        this.value = 0;
    }

    load(data?: RecursivePartial<ITilt>): void {
        super.load(data);

        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
