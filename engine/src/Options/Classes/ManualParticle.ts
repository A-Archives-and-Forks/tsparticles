import type { ICoordinates } from "../../Core";
import type { IManualParticle } from "../Interfaces/IManualParticle";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IParticles } from "../Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../../Types";
import { deepExtend } from "../../Utils";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticles>;
    position?: ICoordinates;

    load(data?: RecursivePartial<IManualParticle>): void {
        if (!data) {
            return;
        }

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x ?? 50,
                y: data.position.y ?? 50,
            };
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticles>;
        }
    }
}
