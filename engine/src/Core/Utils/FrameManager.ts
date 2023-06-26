import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import { errorPrefix } from "./Constants";
import { getLogger } from "../../Utils/Utils";

/**
 * @param value -
 * @param fpsLimit -
 * @param smooth -
 * @returns the initialized delta value
 */
function initDelta(value: number, fpsLimit = 60, smooth = false): IDelta {
    return {
        value,
        factor: smooth ? 60 / fpsLimit : (60 * value) / 1000,
    };
}

/**
 */
export class FrameManager {
    constructor(private readonly container: Container) {}

    /**
     * Handles the rAF method preparing the next animation frame to be drawn
     * limiting it if it's needed by the current configuration
     * @param timestamp - the new frame timestamp
     */
    async nextFrame(timestamp: DOMHighResTimeStamp): Promise<void> {
        try {
            const container = this.container;

            // FPS limit logic - if we are too fast, just draw without updating
            if (
                !container.smooth &&
                container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit
            ) {
                container.draw(false);

                return;
            }

            container.lastFrameTime ??= timestamp;

            const delta = initDelta(timestamp - container.lastFrameTime, container.fpsLimit, container.smooth);

            container.addLifeTime(delta.value);
            container.lastFrameTime = timestamp;

            if (delta.value > 1000) {
                container.draw(false);
                return;
            }

            await container.particles.draw(delta);

            if (!container.alive()) {
                container.destroy();
                return;
            }

            if (container.getAnimationStatus()) {
                container.draw(false);
            }
        } catch (e) {
            getLogger().error(`${errorPrefix} in animation loop`, e);
        }
    }
}
