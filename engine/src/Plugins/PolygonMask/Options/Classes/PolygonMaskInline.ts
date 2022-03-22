import { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskInline implements IPolygonMaskInline, IOptionLoader<IPolygonMaskInline> {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    load(data?: RecursivePartial<IPolygonMaskInline>): void {
        if (!data) {
            return;
        }

        if (data.arrangement !== undefined) {
            this.arrangement = data.arrangement;
        }
    }
}
