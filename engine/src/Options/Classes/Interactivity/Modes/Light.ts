import type { ILight } from "../../../Interfaces/Interactivity/Modes/ILight";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LightArea } from "./LightArea";
import { LightShadow } from "./LightShadow";
import type { RecursivePartial } from "../../../../Types";

export class Light implements ILight, IOptionLoader<ILight> {
    area;
    shadow;

    constructor() {
        this.area = new LightArea();
        this.shadow = new LightShadow();
    }

    load(data?: RecursivePartial<ILight>): void {
        if (data === undefined) {
            return;
        }

        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}
