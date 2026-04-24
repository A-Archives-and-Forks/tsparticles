import type { ConfettiOptions } from "./ConfettiOptions.js";
import type { ConfettiParams } from "./ConfettiParams.js";
import type { EmitterContainer } from "@tsparticles/plugin-emitters";
import type { ISourceOptions } from "@tsparticles/engine";

const defaultGravity = 9.81,
  sizeFactor = 5,
  speedFactor = 3,
  decayOffset = 1,
  disableRotate = 0,
  disableTilt = 0;

/**
 * @param container -
 * @param actualOptions -
 * @param opacitySpeed -
 */
export async function addEmitter(
  container: EmitterContainer,
  actualOptions: ConfettiOptions,
  opacitySpeed: number,
): Promise<void> {
  await container.addEmitter?.({
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
      fill: {
        color: {
          value: actualOptions.colors,
        },
        enable: true,
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
          count: 1,
        },
      },
      size: {
        value: sizeFactor * actualOptions.scalar,
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
          acceleration: actualOptions.gravity * defaultGravity,
        },
        speed: actualOptions.startVelocity * speedFactor,
        decay: decayOffset - actualOptions.decay,
        direction: -actualOptions.angle,
      },
      rotate: {
        value: actualOptions.flat
          ? disableRotate
          : {
              min: 0,
              max: 360,
            },
        direction: "random",
        animation: {
          enable: !actualOptions.flat,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: !actualOptions.flat,
        value: actualOptions.flat
          ? disableTilt
          : {
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
        enable: !actualOptions.flat,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: !actualOptions.flat,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
  });
}

/**
 * @param actualOptions -
 * @param params -
 * @param opacitySpeed -
 * @returns the converted options
 */
export function convertOptions(
  actualOptions: ConfettiOptions,
  params: ConfettiParams,
  opacitySpeed: number,
): ISourceOptions {
  return {
    fullScreen: {
      enable: !params.canvas,
      zIndex: actualOptions.zIndex,
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 0,
      },
      fill: {
        color: {
          value: actualOptions.colors,
        },
        enable: true,
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
          count: 1,
        },
      },
      size: {
        value: sizeFactor * actualOptions.scalar,
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
          acceleration: actualOptions.gravity * defaultGravity,
        },
        speed: actualOptions.startVelocity * speedFactor,
        decay: decayOffset - actualOptions.decay,
        direction: -actualOptions.angle,
        random: true,
        straight: false,
        outModes: {
          default: "none",
          bottom: "destroy",
        },
      },
      rotate: {
        value: actualOptions.flat
          ? disableRotate
          : {
              min: 0,
              max: 360,
            },
        direction: "random",
        animation: {
          enable: !actualOptions.flat,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: !actualOptions.flat,
        value: actualOptions.flat
          ? disableTilt
          : {
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
        enable: !actualOptions.flat,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: !actualOptions.flat,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
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
}
