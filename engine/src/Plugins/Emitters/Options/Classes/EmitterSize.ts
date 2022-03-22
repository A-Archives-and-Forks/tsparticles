import type { IEmitterSize } from "../Interfaces/IEmitterSize";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { SizeMode } from "../../../../Enums";

/**
 * @category Emitters Plugin
 */
export class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    mode: SizeMode | keyof typeof SizeMode;
    height;
    width;

    constructor() {
        this.mode = SizeMode.percent;
        this.height = 0;
        this.width = 0;
    }

    load(data?: RecursivePartial<IEmitterSize>): void {
        if (data === undefined) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.height !== undefined) {
            this.height = data.height;
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
