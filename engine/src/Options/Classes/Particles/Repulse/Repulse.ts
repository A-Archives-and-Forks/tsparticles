import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulse } from "../../../Interfaces/Particles/Repulse/IRepulse";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils";

/**
 * @category Options
 */
export class Repulse extends ValueWithRandom implements IRepulse, IOptionLoader<IRepulse> {
    enabled;
    distance: RangeValue;
    duration: RangeValue;
    factor: RangeValue;
    speed: RangeValue;

    constructor() {
        super();
        this.enabled = false;
        this.distance = 1;
        this.duration = 1;
        this.factor = 1;
        this.speed = 1;
    }

    load(data?: RecursivePartial<IRepulse>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }

        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }

        if (data.duration !== undefined) {
            this.duration = setRangeValue(data.duration);
        }

        if (data.factor !== undefined) {
            this.factor = setRangeValue(data.factor);
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
    }
}
