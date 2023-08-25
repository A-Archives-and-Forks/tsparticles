import {
    ExternalInteractorBase,
    HoverMode,
    type IDelta,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    getDistance,
    isInArray,
} from "@tsparticles/engine";
import type { ISlowMode, SlowContainer, SlowMode } from "./Types.js";
import { Slow } from "./Options/Classes/Slow.js";

/**
 * Particle slow manager
 */
export class Slower extends ExternalInteractorBase<SlowContainer> {
    constructor(container: SlowContainer) {
        super(container);
    }

    clear(particle: Particle, delta: IDelta, force?: boolean): void {
        if (particle.slow.inRange && !force) {
            return;
        }

        particle.slow.factor = 1;
    }

    init(): void {
        const container = this.container,
            slow = container.actualOptions.interactivity.modes.slow;

        if (!slow) {
            return;
        }

        container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
    }

    async interact(): Promise<void> {
        // nothing to do
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        return events.onHover.enable && !!mouse.position && isInArray(HoverMode.slow, events.onHover.mode);
    }

    loadModeOptions(options: Modes & SlowMode, ...sources: RecursivePartial<(IModes & ISlowMode) | undefined>[]): void {
        if (!options.slow) {
            options.slow = new Slow();
        }

        for (const source of sources) {
            options.slow.load(source?.slow);
        }
    }

    reset(particle: Particle): void {
        particle.slow.inRange = false;

        const container = this.container,
            options = container.actualOptions,
            mousePos = container.interactivity.mouse.position,
            radius = container.retina.slowModeRadius,
            slowOptions = options.interactivity.modes.slow;

        if (!slowOptions || !radius || radius < 0 || !mousePos) {
            return;
        }

        const particlePos = particle.getPosition(),
            dist = getDistance(mousePos, particlePos),
            proximityFactor = dist / radius,
            slowFactor = slowOptions.factor,
            { slow } = particle;
        if (dist > radius) {
            return;
        }

        slow.inRange = true;
        slow.factor = proximityFactor / slowFactor;
    }
}
