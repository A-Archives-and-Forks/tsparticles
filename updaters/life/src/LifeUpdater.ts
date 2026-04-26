import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { ILifeParticlesOptions, LifeParticle, LifeParticlesOptions } from "./Types.js";
import { Life } from "./Options/Classes/Life.js";
import { updateLife } from "./Utils.js";

const noTime = 0,
  identity = 1,
  infiniteValue = -1;

export class LifeUpdater implements IParticleUpdater {
  private readonly container;

  constructor(container: Container) {
    this.container = container;
  }

  init(particle: LifeParticle): void {
    const container = this.container,
      particlesOptions = particle.options,
      lifeOptions = particlesOptions.life;

    if (!lifeOptions) {
      return;
    }

    const delayFactor = lifeOptions.delay.sync ? identity : getRandom(),
      durationFactor = lifeOptions.duration.sync ? identity : getRandom();

    particle.life = {
      delay: container.retina.reduceFactor
        ? ((getRangeValue(lifeOptions.delay.value) * delayFactor) / container.retina.reduceFactor) *
          millisecondsToSeconds
        : noTime,
      delayTime: noTime,
      duration: container.retina.reduceFactor
        ? ((getRangeValue(lifeOptions.duration.value) * durationFactor) / container.retina.reduceFactor) *
          millisecondsToSeconds
        : noTime,
      time: noTime,
      count: lifeOptions.count,
    };

    if (particle.life.duration <= noTime) {
      particle.life.duration = infiniteValue;
    }

    if (particle.life.count <= noTime) {
      particle.life.count = infiniteValue;
    }

    particle.spawning = particle.life.delay > noTime;
  }

  isEnabled(particle: Particle): boolean {
    return !particle.destroyed;
  }

  loadOptions(
    options: LifeParticlesOptions,
    ...sources: (RecursivePartial<ILifeParticlesOptions> | undefined)[]
  ): void {
    options.life ??= new Life();

    for (const source of sources) {
      options.life.load(source?.life);
    }
  }

  update(particle: LifeParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }

    updateLife(particle, delta, this.container.canvas.size);
  }
}
