import type { Container, ICoordinates, IRgb, Particle } from "../../Core";
import { colorToRgb, getDistance, getDistances, getRangeValue, getStyleFromRgb, isPointInside } from "../../Utils";
import { Absorber } from "./Options/Classes/Absorber";
import type { Absorbers } from "./Absorbers";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit";
import { RecursivePartial } from "../../Types";
import { RotateDirection } from "../../Enums";
import { Vector } from "../../Core";

type OrbitingParticle = Particle & {
    absorberOrbit?: Vector;
    absorberOrbitDirection?: RotateDirection;
    needsNewPosition?: boolean;
};

/**
 * @category Absorbers Plugin
 */
export class AbsorberInstance {
    mass;
    opacity;
    size;

    color: IRgb;
    limit: IAbsorberSizeLimit;
    readonly name?: string;
    position: Vector;

    private dragging;

    private readonly initialPosition?: Vector;
    private readonly options;

    constructor(
        private readonly absorbers: Absorbers,
        private readonly container: Container,
        options: RecursivePartial<IAbsorber>,
        position?: ICoordinates
    ) {
        this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;

        if (options instanceof Absorber) {
            this.options = options;
        } else {
            this.options = new Absorber();
            this.options.load(options);
        }

        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * this.options.size.density * container.retina.reduceFactor;

        const limit = this.options.size.limit;

        this.limit = {
            radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
            mass: limit.mass,
        };

        this.color = colorToRgb(this.options.color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition?.copy() ?? this.calcPosition();
    }

    attract(particle: OrbitingParticle): void {
        const container = this.container;
        const options = this.options;

        if (options.draggable) {
            const mouse = container.interactivity.mouse;

            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = getDistance(this.position, mouse.downPosition);

                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            } else {
                this.dragging = false;
            }

            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }

        const pos = particle.getPosition();
        const { dx, dy, distance } = getDistances(this.position, pos);
        const v = Vector.create(dx, dy);

        v.length = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;

            if (
                (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0)
            ) {
                if (options.destroy) {
                    particle.destroy();
                } else {
                    particle.needsNewPosition = true;

                    this.updateParticlePosition(particle, v);
                }
            } else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }

                this.updateParticlePosition(particle, v);
            }

            if (this.limit.radius <= 0 || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }

            if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        } else {
            this.updateParticlePosition(particle, v);
        }
    }

    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): Vector {
        const container = this.container;

        const percentPosition = this.options.position;

        return Vector.create(
            (getRangeValue(percentPosition?.x ?? Math.random() * 100) / 100) * container.canvas.size.width,
            (getRangeValue(percentPosition?.y ?? Math.random() * 100) / 100) * container.canvas.size.height
        );
    }

    private updateParticlePosition(particle: OrbitingParticle, v: Vector): void {
        if (particle.destroyed) {
            return;
        }

        const container = this.container;
        const canvasSize = container.canvas.size;

        if (particle.needsNewPosition) {
            particle.position.x = Math.floor(Math.random() * canvasSize.width);
            particle.position.y = Math.floor(Math.random() * canvasSize.height);
            particle.velocity.setTo(particle.initialVelocity);
            particle.absorberOrbit = undefined;
            particle.needsNewPosition = false;
        }

        if (this.options.orbits) {
            if (particle.absorberOrbit === undefined) {
                particle.absorberOrbit = Vector.create(0, 0);
                particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
            }

            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);

                particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
            }

            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
            }

            const orbitRadius = particle.absorberOrbit.length;
            const orbitAngle = particle.absorberOrbit.angle;
            const orbitDirection = particle.absorberOrbitDirection;

            particle.velocity.x = 0;
            particle.velocity.y = 0;

            const updateFunc = {
                x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
                y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos,
            };

            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);

            particle.absorberOrbit.length -= v.length;
            particle.absorberOrbit.angle +=
                (((particle.retina.moveSpeed ?? 0) * container.retina.pixelRatio) / 100) *
                container.retina.reduceFactor;
        } else {
            const addV = Vector.origin;

            addV.length = v.length;
            addV.angle = v.angle;

            particle.velocity.addTo(addV);
        }
    }
}
