import { Canvas } from "./Canvas";
import type { ClickMode } from "../Enums/Modes/ClickMode";
import type { Engine } from "./Engine";
import { EventListeners } from "./Utils/EventListeners";
import { EventType } from "../Enums/Types/EventType";
import type { IContainerInteractivity } from "./Interfaces/IContainerInteractivity";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IDelta } from "./Interfaces/IDelta";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import type { ISourceOptions } from "../Types/ISourceOptions";
import { Options } from "../Options/Classes/Options";
import type { Particle } from "./Particle";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import { errorPrefix } from "./Utils/Constants";
import { getLogger } from "../Utils/Utils";
import { getRangeValue } from "../Utils/NumberUtils";
import { loadOptions } from "../Utils/OptionsUtils";

/**
 * Checks if the container is still usable
 * @param container - the container to check
 * @returns true if the container is still usable
 */
function guardCheck(container: Container): boolean {
    return container && !container.destroyed;
}

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
 * @param engine -
 * @param container -
 * @param sourceOptionsArr -
 * @returns the options loaded
 */
function loadContainerOptions(
    engine: Engine,
    container: Container,
    ...sourceOptionsArr: (ISourceOptions | undefined)[]
): Options {
    const options = new Options(engine, container);

    loadOptions(options, ...sourceOptionsArr);

    return options;
}

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 */
export class Container {
    /**
     * The options loaded by the container, it's a full {@link Options} object
     */
    actualOptions;

    /**
     * Canvas object, in charge of the canvas element and drawing functions
     */
    readonly canvas;

    /**
     * Check if the particles' container is destroyed, if so it's not recommended using it
     */
    destroyed;

    /**
     * All the shape drawers used by the container
     */
    readonly drawers;

    /**
     * The container fps limit, coming from options
     */
    fpsLimit;

    interactivity: IContainerInteractivity;

    /**
     * Last frame time, used for delta values, for keeping animation correct in lower frame rates
     */
    lastFrameTime?: number;

    /**
     * The container check if it's hidden on the web page
     */
    pageHidden;

    /**
     * The particles manager
     */
    readonly particles;

    pathGenerators: Map<string, IMovePathGenerator>;

    /**
     * All the plugins used by the container
     */
    readonly plugins;

    responsiveMaxWidth?: number;

    readonly retina;

    smooth;

    /**
     * Check if the particles container is started
     */
    started;

    zLayers;

    private _currentTheme?: string;
    private _delay: number;
    private _delayTimeout?: number | NodeJS.Timeout;
    private _drawAnimationFrame?: number;
    /**
     * The container duration
     */
    private _duration;
    private readonly _engine;
    private readonly _eventListeners;
    private _firstStart;
    private _initialSourceOptions;
    private readonly _intersectionObserver;
    /**
     * The container lifetime
     */
    private _lifeTime;
    private _options;
    private _paused;
    private _sourceOptions;

    /**
     * This is the core class, create an instance to have a new working particles manager
     * @param engine - the engine used by container
     * @param id - the id to identify this instance
     * @param sourceOptions - the options to load
     */
    constructor(
        engine: Engine,
        readonly id: string,
        sourceOptions?: ISourceOptions,
    ) {
        this._engine = engine;
        this.fpsLimit = 120;
        this.smooth = false;
        this._delay = 0;
        this._duration = 0;
        this._lifeTime = 0;
        this._firstStart = true;
        this.started = false;
        this.destroyed = false;
        this._paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this._engine, this);
        this.pathGenerators = new Map<string, IMovePathGenerator>();
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.plugins = new Map<string, IContainerPlugin>();
        this.drawers = new Map<string, IShapeDrawer>();
        /* tsParticles variables with default values */
        this._options = loadContainerOptions(this._engine, this);
        this.actualOptions = loadContainerOptions(this._engine, this);

        /* ---------- tsParticles - start ------------ */
        this._eventListeners = new EventListeners(this);

        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this._intersectionObserver = new IntersectionObserver((entries) => this._intersectionManager(entries));
        }

        this._engine.dispatchEvent(EventType.containerBuilt, { container: this });
    }

    /**
     * The options used by the container, it's a full {@link Options} object
     * @returns the options used by the container
     */
    get options(): Options {
        return this._options;
    }

    /**
     * The options that were initially passed to the container
     * @returns the source options passed to the container
     */
    get sourceOptions(): ISourceOptions | undefined {
        return this._sourceOptions;
    }

    /**
     * Adds a click handler to the container
     * @param callback - the callback to be called when the click event occurs
     */
    addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
        if (!guardCheck(this)) {
            return;
        }

        const el = this.interactivity.element;

        if (!el) {
            return;
        }

        const clickOrTouchHandler = (e: Event, pos: ICoordinates, radius: number): void => {
            if (!guardCheck(this)) {
                return;
            }

            const pxRatio = this.retina.pixelRatio,
                posRetina = {
                    x: pos.x * pxRatio,
                    y: pos.y * pxRatio,
                },
                particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);

            callback(e, particles);
        };

        const clickHandler = (e: Event): void => {
            if (!guardCheck(this)) {
                return;
            }

            const mouseEvent = e as MouseEvent,
                pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };

            clickOrTouchHandler(e, pos, 1);
        };

        const touchStartHandler = (): void => {
            if (!guardCheck(this)) {
                return;
            }

            touched = true;
            touchMoved = false;
        };

        const touchMoveHandler = (): void => {
            if (!guardCheck(this)) {
                return;
            }

            touchMoved = true;
        };

        const touchEndHandler = (e: Event): void => {
            if (!guardCheck(this)) {
                return;
            }

            if (touched && !touchMoved) {
                const touchEvent = e as TouchEvent;
                let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];

                if (!lastTouch) {
                    lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];

                    if (!lastTouch) {
                        return;
                    }
                }

                const element = this.canvas.element,
                    canvasRect = element ? element.getBoundingClientRect() : undefined,
                    pos = {
                        x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
                        y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0),
                    };

                clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
            }

            touched = false;
            touchMoved = false;
        };

        const touchCancelHandler = (): void => {
            if (!guardCheck(this)) {
                return;
            }

            touched = false;
            touchMoved = false;
        };

        let touched = false,
            touchMoved = false;

        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
    }

    addLifeTime(value: number): void {
        this._lifeTime += value;
    }

    /**
     * Add a new path generator to the container
     * @param key - the key to identify the path generator
     * @param generator - the path generator
     * @param override - if true, override the existing path generator
     * @returns true if the path generator was added, false otherwise
     */
    addPath(key: string, generator: IMovePathGenerator, override = false): boolean {
        if (!guardCheck(this) || (!override && this.pathGenerators.has(key))) {
            return false;
        }

        this.pathGenerators.set(key, generator);

        return true;
    }

    alive(): boolean {
        return !this._duration || this._lifeTime <= this._duration;
    }

    /**
     * Destroys the current container, invalidating it
     */
    destroy(): void {
        if (!guardCheck(this)) {
            return;
        }

        this.stop();

        this.particles.destroy();
        this.canvas.destroy();

        for (const [, drawer] of this.drawers) {
            drawer.destroy && drawer.destroy(this);
        }

        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }

        this._engine.clearPlugins(this);

        this.destroyed = true;

        const mainArr = this._engine.dom(),
            idx = mainArr.findIndex((t) => t === this);

        if (idx >= 0) {
            mainArr.splice(idx, 1);
        }

        this._engine.dispatchEvent(EventType.containerDestroyed, { container: this });
    }

    /**
     * Draws a frame
     * @param force -
     */
    draw(force: boolean): void {
        if (!guardCheck(this)) {
            return;
        }

        let refreshTime = force;

        this._drawAnimationFrame = requestAnimationFrame(async (timestamp) => {
            if (refreshTime) {
                this.lastFrameTime = undefined;

                refreshTime = false;
            }

            await this._nextFrame(timestamp);
        });
    }

    async export(type: string, options: Record<string, unknown> = {}): Promise<Blob | undefined> {
        for (const [, plugin] of this.plugins) {
            if (!plugin.export) {
                continue;
            }

            const res = await plugin.export(type, options);

            if (!res.supported) {
                continue;
            }

            return res.blob;
        }

        getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
    }

    /**
     * Gets the animation status
     * @returns `true` is playing, `false` is paused
     */
    getAnimationStatus(): boolean {
        return !this._paused && !this.pageHidden && guardCheck(this);
    }

    /**
     * Handles click event in the container
     * @param mode - click mode to handle
     */
    handleClickMode(mode: ClickMode | string): void {
        if (!guardCheck(this)) {
            return;
        }

        this.particles.handleClickMode(mode);

        for (const [, plugin] of this.plugins) {
            plugin.handleClickMode && plugin.handleClickMode(mode);
        }
    }

    /**
     * Initializes the container
     */
    async init(): Promise<void> {
        if (!guardCheck(this)) {
            return;
        }

        const shapes = this._engine.getSupportedShapes();

        for (const type of shapes) {
            const drawer = this._engine.getShapeDrawer(type);

            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }

        /* options settings */
        this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = loadContainerOptions(this._engine, this, this._options);

        const availablePlugins = this._engine.getAvailablePlugins(this);

        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }

        /* init canvas + particles */
        this.retina.init();
        await this.canvas.init();

        this.updateActualOptions();

        this.canvas.initBackground();
        this.canvas.resize();

        this.zLayers = this.actualOptions.zLayers;
        this._duration = getRangeValue(this.actualOptions.duration) * 1000;
        this._delay = getRangeValue(this.actualOptions.delay) * 1000;
        this._lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        this.smooth = this.actualOptions.smooth;

        for (const [, drawer] of this.drawers) {
            drawer.init && (await drawer.init(this));
        }

        for (const [, plugin] of this.plugins) {
            plugin.init && (await plugin.init());
        }

        this._engine.dispatchEvent(EventType.containerInit, { container: this });

        this.particles.init();
        this.particles.setDensity();

        for (const [, plugin] of this.plugins) {
            plugin.particlesSetup && plugin.particlesSetup();
        }

        this._engine.dispatchEvent(EventType.particlesSetup, { container: this });
    }

    /**
     * Loads the given theme, overriding the options
     * @param name - the theme name, if `undefined` resets the default options or the default theme
     */
    async loadTheme(name?: string): Promise<void> {
        if (!guardCheck(this)) {
            return;
        }

        this._currentTheme = name;

        await this.refresh();
    }

    /**
     * Pauses animations
     */
    pause(): void {
        if (!guardCheck(this)) {
            return;
        }

        if (this._drawAnimationFrame !== undefined) {
            cancelAnimationFrame(this._drawAnimationFrame);

            delete this._drawAnimationFrame;
        }

        if (this._paused) {
            return;
        }

        for (const [, plugin] of this.plugins) {
            plugin.pause && plugin.pause();
        }

        if (!this.pageHidden) {
            this._paused = true;
        }

        this._engine.dispatchEvent(EventType.containerPaused, { container: this });
    }

    /**
     * Starts animations and resume from pause
     * @param force -
     */
    play(force?: boolean): void {
        if (!guardCheck(this)) {
            return;
        }

        const needsUpdate = this._paused || force;

        if (this._firstStart && !this.actualOptions.autoPlay) {
            this._firstStart = false;
            return;
        }

        if (this._paused) {
            this._paused = false;
        }

        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
        }

        this._engine.dispatchEvent(EventType.containerPlay, { container: this });

        this.draw(needsUpdate || false);
    }

    /**
     * Restarts the container, just a {@link Container.stop}/{@link Container.start} alias
     * @returns the Promise of the start method
     */
    async refresh(): Promise<void> {
        if (!guardCheck(this)) {
            return;
        }

        /* restart */
        this.stop();

        return this.start();
    }

    async reset(): Promise<void> {
        if (!guardCheck(this)) {
            return;
        }

        this._initialSourceOptions = undefined;
        this._options = loadContainerOptions(this._engine, this);
        this.actualOptions = loadContainerOptions(this._engine, this, this._options);

        return this.refresh();
    }

    /**
     * Starts the container, initializes what are needed to create animations and event handling
     */
    async start(): Promise<void> {
        if (!guardCheck(this) || this.started) {
            return;
        }

        await this.init();

        this.started = true;

        await new Promise<void>((resolve) => {
            this._delayTimeout = setTimeout(async () => {
                this._eventListeners.addListeners();

                if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
                    this._intersectionObserver.observe(this.interactivity.element);
                }

                for (const [, plugin] of this.plugins) {
                    plugin.start && (await plugin.start());
                }

                this._engine.dispatchEvent(EventType.containerStarted, { container: this });

                this.play();

                resolve();
            }, this._delay);
        });
    }

    /**
     * Stops the container, opposite to `start`. Clears some resources and stops events.
     */
    stop(): void {
        if (!guardCheck(this) || !this.started) {
            return;
        }

        if (this._delayTimeout) {
            clearTimeout(this._delayTimeout);

            delete this._delayTimeout;
        }

        this._firstStart = true;
        this.started = false;
        this._eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.stop();

        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
            this._intersectionObserver.unobserve(this.interactivity.element);
        }

        for (const [, plugin] of this.plugins) {
            plugin.stop && plugin.stop();
        }

        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }

        this._sourceOptions = this._options;

        this._engine.dispatchEvent(EventType.containerStopped, { container: this });
    }

    /**
     * Updates the container options
     * @returns true if the options were updated, false otherwise
     */
    updateActualOptions(): boolean {
        this.actualOptions.responsive = [];

        const newMaxWidth = this.actualOptions.setResponsive(
            this.canvas.size.width,
            this.retina.pixelRatio,
            this._options,
        );

        this.actualOptions.setTheme(this._currentTheme);

        if (this.responsiveMaxWidth === newMaxWidth) {
            return false;
        }

        this.responsiveMaxWidth = newMaxWidth;

        return true;
    }

    private readonly _intersectionManager: (entries: IntersectionObserverEntry[]) => void = (entries) => {
        if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
            return;
        }

        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }

            (entry.isIntersecting ? this.play : this.pause)();
        }
    };

    private readonly _nextFrame: (timestamp: DOMHighResTimeStamp) => Promise<void> = async (timestamp) => {
        try {
            // FPS limit logic - if we are too fast, just draw without updating
            if (
                !this.smooth &&
                this.lastFrameTime !== undefined &&
                timestamp < this.lastFrameTime + 1000 / this.fpsLimit
            ) {
                this.draw(false);

                return;
            }

            this.lastFrameTime ??= timestamp;

            const delta = initDelta(timestamp - this.lastFrameTime, this.fpsLimit, this.smooth);

            this.addLifeTime(delta.value);
            this.lastFrameTime = timestamp;

            if (delta.value > 1000) {
                this.draw(false);

                return;
            }

            await this.particles.draw(delta);

            if (!this.alive()) {
                this.destroy();
                return;
            }

            if (this.getAnimationStatus()) {
                this.draw(false);
            }
        } catch (e) {
            getLogger().error(`${errorPrefix} in animation loop`, e);
        }
    };
}
