import {
    type Container,
    type ISourceOptions,
    type RecursivePartial,
    isSsr,
    isString,
    tsParticles,
} from "tsparticles-engine";
import { ConfettiOptions } from "./ConfettiOptions";
import type { EmitterContainer } from "tsparticles-plugin-emitters";
import type { IConfettiOptions } from "./IConfettiOptions";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCardsShape } from "tsparticles-shape-cards";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadHeartShape } from "tsparticles-shape-heart";
import { loadImageShape } from "tsparticles-shape-image";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadMotionPlugin } from "tsparticles-plugin-motion";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadPolygonShape } from "tsparticles-shape-polygon";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadRotateUpdater } from "tsparticles-updater-rotate";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadStarShape } from "tsparticles-shape-star";
import { loadTextShape } from "tsparticles-shape-text";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";

/**
 *
 */
export type ConfettiFirstParam = string | RecursivePartial<IConfettiOptions>;

declare global {
    /**
     *
     */
    interface Window {
        /**
         *
         */
        confetti: ConfettiFunc & {
            /**
             *
             * @param canvas -
             * @param options -
             * @returns the confetti function
             */
            create: (canvas: HTMLCanvasElement, options: RecursivePartial<IConfettiOptions>) => Promise<ConfettiFunc>;

            /**
             * the confetti version number
             */
            version: string;
        };
    }
}

let initialized = false;
let initializing = false;

const ids = new Map<string, Container | undefined>();

/**
 * The {@link confetti} parameter object definition
 */
type ConfettiParams = {
    /**
     *
     */
    canvas?: HTMLCanvasElement;

    /**
     *
     */
    id: string;

    /**
     *
     */
    options: RecursivePartial<IConfettiOptions>;
};

/**
 * This function prepares all the plugins needed by the confetti bundle
 */
async function initPlugins(): Promise<void> {
    if (initialized) {
        return;
    }

    if (initializing) {
        return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (!initialized) {
                    return;
                }

                clearInterval(interval);
                resolve();
            }, 100);
        });
    }

    initializing = true;

    await loadBaseMover(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadMotionPlugin(tsParticles);
    await loadCardsShape(tsParticles);
    await loadCircleShape(tsParticles);
    await loadHeartShape(tsParticles);
    await loadImageShape(tsParticles);
    await loadPolygonShape(tsParticles);
    await loadSquareShape(tsParticles);
    await loadStarShape(tsParticles);
    await loadTextShape(tsParticles);
    await loadRotateUpdater(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadLifeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadRollUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadTiltUpdater(tsParticles);
    await loadWobbleUpdater(tsParticles);

    initializing = false;
    initialized = true;
}

/**
 * @param params - the parameters object used for the confetti animation
 * @returns the tsParticles Container for more customizations
 */
async function setConfetti(params: ConfettiParams): Promise<Container | undefined> {
    const actualOptions = new ConfettiOptions();

    actualOptions.load(params.options);

    let container;

    const fpsLimit = 120,
        opacitySpeed = (actualOptions.ticks * 1000) / (3600 * fpsLimit);

    if (ids.has(params.id)) {
        container = ids.get(params.id);

        if (container && !container.destroyed) {
            const alias = container as EmitterContainer;

            if (alias.addEmitter) {
                alias.addEmitter({
                    startCount: actualOptions.count,
                    position: actualOptions.position,
                    size: {
                        width: 0,
                        height: 0,
                    },
                    rate: {
                        delay: 0,
                        quantity: 0,
                    },
                    life: {
                        duration: 0.1,
                        count: 1,
                    },
                    particles: {
                        color: {
                            value: actualOptions.colors,
                        },
                        shape: {
                            type: actualOptions.shapes,
                            options: actualOptions.shapeOptions,
                        },
                        life: {
                            count: 1,
                        },
                        opacity: {
                            value: { min: 0, max: 1 },
                            animation: {
                                enable: true,
                                sync: true,
                                speed: opacitySpeed,
                                startValue: "max",
                                destroy: "min",
                            },
                        },
                        size: {
                            value: 5 * actualOptions.scalar,
                        },
                        move: {
                            angle: {
                                value: actualOptions.spread,
                                offset: 0,
                            },
                            drift: {
                                min: -actualOptions.drift,
                                max: actualOptions.drift,
                            },
                            gravity: {
                                acceleration: actualOptions.gravity * 9.81,
                            },
                            speed: actualOptions.startVelocity * 3,
                            decay: 1 - actualOptions.decay,
                            direction: -actualOptions.angle,
                        },
                    },
                });

                return;
            }
        }
    }

    const particlesOptions: ISourceOptions = {
        fullScreen: {
            enable: !params.canvas,
            zIndex: actualOptions.zIndex,
        },
        fpsLimit: 120,
        particles: {
            number: {
                value: 0,
            },
            color: {
                value: actualOptions.colors,
            },
            shape: {
                type: actualOptions.shapes,
                options: actualOptions.shapeOptions,
            },
            opacity: {
                value: { min: 0, max: 1 },
                animation: {
                    enable: true,
                    sync: true,
                    speed: opacitySpeed,
                    startValue: "max",
                    destroy: "min",
                },
            },
            size: {
                value: 5 * actualOptions.scalar,
            },
            links: {
                enable: false,
            },
            life: {
                count: 1,
            },
            move: {
                angle: {
                    value: actualOptions.spread,
                    offset: 0,
                },
                drift: {
                    min: -actualOptions.drift,
                    max: actualOptions.drift,
                },
                enable: true,
                gravity: {
                    enable: true,
                    acceleration: actualOptions.gravity * 9.81,
                },
                speed: actualOptions.startVelocity * 3,
                decay: 1 - actualOptions.decay,
                direction: -actualOptions.angle,
                random: true,
                straight: false,
                outModes: {
                    default: "none",
                    bottom: "destroy",
                },
            },
            rotate: {
                value: {
                    min: 0,
                    max: 360,
                },
                direction: "random",
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            tilt: {
                direction: "random",
                enable: true,
                value: {
                    min: 0,
                    max: 360,
                },
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            roll: {
                darken: {
                    enable: true,
                    value: 25,
                },
                enable: true,
                speed: {
                    min: 15,
                    max: 25,
                },
            },
            wobble: {
                distance: 30,
                enable: true,
                speed: {
                    min: -15,
                    max: 15,
                },
            },
        },
        detectRetina: true,
        motion: {
            disable: actualOptions.disableForReducedMotion,
        },
        emitters: {
            name: "confetti",
            startCount: actualOptions.count,
            position: actualOptions.position,
            size: {
                width: 0,
                height: 0,
            },
            rate: {
                delay: 0,
                quantity: 0,
            },
            life: {
                duration: 0.1,
                count: 1,
            },
        },
    };

    if (params.id) {
        container = await tsParticles.load(params.id, particlesOptions);
    } else if (params.canvas) {
        container = await tsParticles.set(params.id, params.canvas, particlesOptions);
    }

    ids.set(params.id, container);

    return container;
}

/**
 *
 * @param idOrOptions - the id used for the canvas, or if not using two parameters, the animation configuration object
 * @param confettiOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
type ConfettiFunc = (
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
) => Promise<Container | undefined>;

/**
 * @param idOrOptions - the id used for the canvas, or if not using two parameters, the animation configuration object
 * @param confettiOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
export async function confetti(
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
): Promise<Container | undefined> {
    await initPlugins();

    let options: RecursivePartial<IConfettiOptions>;
    let id: string;

    if (isString(idOrOptions)) {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = "confetti";
        options = idOrOptions;
    }

    return setConfetti({
        id,
        options,
    });
}

/**
 *
 * @param canvas -
 * @param options -
 * @returns the confetti function to use for the given canvas animations
 */
confetti.create = async (
    canvas: HTMLCanvasElement,
    options: RecursivePartial<IConfettiOptions>
): Promise<ConfettiFunc> => {
    if (!canvas) {
        return confetti;
    }

    await initPlugins();

    const id = canvas.getAttribute("id") || "confetti";

    canvas.setAttribute("id", id);

    return async (
        idOrOptions: ConfettiFirstParam,
        confettiOptions?: RecursivePartial<IConfettiOptions>
    ): Promise<Container | undefined> => {
        let subOptions: RecursivePartial<IConfettiOptions>;
        let subId: string;

        if (isString(idOrOptions)) {
            subId = idOrOptions;
            subOptions = confettiOptions ?? options;
        } else {
            subId = id;
            subOptions = idOrOptions;
        }

        return setConfetti({
            id: subId,
            canvas,
            options: subOptions,
        });
    };
};

/**
 *
 */
confetti.version = tsParticles.version;

if (!isSsr()) {
    window.confetti = confetti;
}
