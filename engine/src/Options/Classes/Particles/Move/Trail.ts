import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITrail } from "../../../Interfaces/Particles/Move/ITrail";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
    enable;
    length;
    fillColor;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor();

        this.fillColor.value = "#000000";
    }

    load(data?: RecursivePartial<ITrail>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);

        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
