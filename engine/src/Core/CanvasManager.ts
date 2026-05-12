import { cloneStyle, getFullScreenStyle, safeMatchMedia, safeMutationObserver } from "../Utils/Utils.js";
import { defaultZoom, generatedAttribute, half } from "./Utils/Constants.js";
import { getStyleFromRgb, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "./Container.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { ParticlesCanvasType } from "../Types/ParticlesCanvasType.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import { RenderManager } from "./RenderManager.js";

/**
 * Returns the canvas to use for rendering.
 * When an explicit OffscreenCanvas is passed in it is used as-is.
 *
 * DOM canvases are always transferred because the render context must come from an
 * OffscreenCanvas.
 * @param canvas - The canvas source to use for rendering.
 * @returns The render canvas instance.
 */
const transferredCanvases = new WeakMap<HTMLCanvasElement, OffscreenCanvas>(),
  getTransferredCanvas = (canvas: HTMLCanvasElement): OffscreenCanvas => {
    const transferredCanvas = transferredCanvases.get(canvas);

    if (transferredCanvas) {
      return transferredCanvas;
    }

    if (typeof canvas.transferControlToOffscreen !== "function") {
      throw new TypeError("OffscreenCanvas is required but not supported by this browser");
    }

    try {
      const offscreenCanvas = canvas.transferControlToOffscreen();

      transferredCanvases.set(canvas, offscreenCanvas);

      return offscreenCanvas;
    } catch {
      throw new TypeError("OffscreenCanvas transfer failed");
    }
  },
  isHtmlCanvasElement = (canvas: ParticlesCanvasType): canvas is HTMLCanvasElement => {
    return typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
  };

/**
 *
 * @param canvas -
 * @param style -
 * @param important -
 */
function setStyle(canvas: HTMLCanvasElement, style?: CSSStyleDeclaration, important = false): void {
  if (!style) {
    return;
  }

  const element = canvas,
    elementStyle = element.style,
    keys = new Set<string>();

  for (let i = 0; i < elementStyle.length; i++) {
    const key = elementStyle.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (let i = 0; i < style.length; i++) {
    const key = style.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (const key of keys) {
    const value = style.getPropertyValue(key);

    if (value) {
      elementStyle.setProperty(key, value, important ? "important" : "");
    } else {
      elementStyle.removeProperty(key);
    }
  }
}

/**
 * Canvas manager
 */
export class CanvasManager {
  /**
   * The source DOM canvas element, if available.
   */
  domElement?: HTMLCanvasElement;

  /** The render manager */
  readonly render;

  /**
   * The canvas used for rendering and as source for the 2D context.
   * This is an OffscreenCanvas when a DOM canvas is provided.
   */
  renderCanvas?: ParticlesCanvasType;

  /**
   * The particles canvas dimension
   */
  readonly size: IDimension;

  /**
   * Current zoom level
   */
  zoom = defaultZoom;

  private readonly _container;
  private _generated;
  private _mutationObserver?: MutationObserver;
  private _originalStyle?: CSSStyleDeclaration;
  private readonly _pluginManager;
  private _pointerEvents: string;
  private _resizePlugins: IContainerPlugin[];
  private readonly _standardSize: IDimension;

  /**
   * Zoom center point (for centered zooming)
   */
  private _zoomCenter?: ICoordinates;

  /**
   * Constructor of canvas manager
   * @param pluginManager - the engine managing the whole library
   * @param container - the parent container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
    this.render = new RenderManager(pluginManager, container, this);
    this._standardSize = {
      height: 0,
      width: 0,
    };

    const pxRatio = container.retina.pixelRatio,
      stdSize = this._standardSize;

    this.size = {
      height: stdSize.height * pxRatio,
      width: stdSize.width * pxRatio,
    };

    this._generated = false;
    this._resizePlugins = [];
    this._pointerEvents = "none";
  }

  private get _fullScreen(): boolean {
    return this._container.actualOptions.fullScreen.enable;
  }

  /**
   * Destroying object actions
   */
  destroy(): void {
    this.stop();

    if (this._generated) {
      const element = this.domElement;

      element?.remove();

      this.domElement = undefined;
      this.renderCanvas = undefined;
    } else {
      this._resetOriginalStyle();
    }

    this.render.destroy();

    this._resizePlugins = [];
  }

  /**
   * Gets the zoom center point
   * @returns The current zoom center.
   */
  getZoomCenter(): ICoordinates {
    const pxRatio = this._container.retina.pixelRatio,
      { width, height } = this.size;

    if (this._zoomCenter) {
      return this._zoomCenter;
    }

    return {
      x: (width * half) / pxRatio,
      y: (height * half) / pxRatio,
    };
  }

  /**
   * Initializes the canvas element
   */
  init(): void {
    this._safeMutationObserver(obs => {
      obs.disconnect();
    });
    this._mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });

    this.resize();
    this._initStyle();
    this.initBackground();
    this._safeMutationObserver(obs => {
      const element = this.domElement;

      if (!element || !(element instanceof Node)) {
        return;
      }

      obs.observe(element, { attributes: true });
    });

    this.initPlugins();
    this.render.init();
  }

  /**
   * Initializes the canvas background
   */
  initBackground(): void {
    const { _container } = this,
      options = _container.actualOptions,
      background = options.background,
      element = this.domElement;

    if (!element) {
      return;
    }

    const elementStyle = element.style,
      color = rangeColorToRgb(this._pluginManager, background.color);

    if (color) {
      elementStyle.backgroundColor = getStyleFromRgb(color, _container.hdr, background.opacity);
    } else {
      elementStyle.backgroundColor = "";
    }

    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }

  /**
   * Initializes the plugins needed by canvas
   */
  initPlugins(): void {
    this._resizePlugins = [];

    for (const plugin of this._container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
    }
  }

  /**
   * Loads the canvas HTML element
   * @param canvas - the canvas source element or OffscreenCanvas
   */
  loadCanvas(canvas: ParticlesCanvasType): void {
    if (this._generated && this.domElement) {
      this.domElement.remove();
    }

    const container = this._container,
      domCanvas = isHtmlCanvasElement(canvas) ? canvas : undefined;

    this.domElement = domCanvas;
    this._generated = domCanvas ? domCanvas.dataset[generatedAttribute] === "true" : false;
    this.renderCanvas = domCanvas ? getTransferredCanvas(domCanvas) : canvas;

    const domElement = this.domElement;

    if (domElement) {
      domElement.ariaHidden = "true";

      this._originalStyle = cloneStyle(domElement.style);
    }

    const standardSize = this._standardSize,
      renderCanvas = this.renderCanvas;

    if (domElement) {
      standardSize.height = domElement.offsetHeight;
      standardSize.width = domElement.offsetWidth;
    } else {
      standardSize.height = renderCanvas.height;
      standardSize.width = renderCanvas.width;
    }

    const pxRatio = this._container.retina.pixelRatio,
      retinaSize = this.size;

    renderCanvas.height = retinaSize.height = standardSize.height * pxRatio;
    renderCanvas.width = retinaSize.width = standardSize.width * pxRatio;

    const canSupportHdrQuery = safeMatchMedia("(color-gamut: p3)");

    this.render.setContextSettings({
      alpha: true,
      colorSpace: canSupportHdrQuery?.matches && container.hdr ? "display-p3" : "srgb",
      desynchronized: true,
      willReadFrequently: false,
    });
    this.render.setContext(renderCanvas.getContext("2d", this.render.settings));

    this._safeMutationObserver(obs => {
      obs.disconnect();
    });

    container.retina.init();
    this.initBackground();

    this._safeMutationObserver(obs => {
      const element = this.domElement;

      if (!element || !(element instanceof Node)) {
        return;
      }

      obs.observe(element, { attributes: true });
    });
  }

  /**
   * Calculates the size of the canvas
   * @returns true if the size changed
   */
  resize(): boolean {
    const element = this.domElement;

    if (!element) {
      return false;
    }

    const container = this._container,
      renderCanvas = this.renderCanvas;

    if (renderCanvas === undefined) {
      return false;
    }

    const currentSize = container.canvas._standardSize,
      newSize = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      },
      pxRatio = container.retina.pixelRatio,
      retinaSize = {
        width: newSize.width * pxRatio,
        height: newSize.height * pxRatio,
      };

    if (
      newSize.height === currentSize.height &&
      newSize.width === currentSize.width &&
      retinaSize.height === renderCanvas.height &&
      retinaSize.width === renderCanvas.width
    ) {
      return false;
    }

    const oldSize = { ...currentSize };

    currentSize.height = newSize.height;
    currentSize.width = newSize.width;

    const canvasSize = this.size;

    renderCanvas.width = canvasSize.width = retinaSize.width;
    renderCanvas.height = canvasSize.height = retinaSize.height;

    if (this._container.started) {
      container.particles.setResizeFactor({
        width: currentSize.width / oldSize.width,
        height: currentSize.height / oldSize.height,
      });
    }

    return true;
  }

  /**
   * Sets the pointer events style on the canvas
   * @param type - The pointer-events value to apply.
   */
  setPointerEvents(type: string): void {
    const element = this.domElement;

    if (!element) {
      return;
    }

    this._pointerEvents = type;
    this._repairStyle();
  }

  /**
   * Sets the zoom level and center point
   * @param zoomLevel - the new zoom level
   * @param center - optional center point for zoom (default is canvas center)
   */
  setZoom(zoomLevel: number, center?: ICoordinates): void {
    this.zoom = zoomLevel;
    this._zoomCenter = center;
  }

  /** Stops the canvas manager */
  stop(): void {
    this._safeMutationObserver(obs => {
      obs.disconnect();
    });

    this._mutationObserver = undefined;

    this.render.stop();
  }

  /**
   * The window resize event handler
   */
  async windowResize(): Promise<void> {
    if (!this.domElement || !this.resize()) {
      return;
    }

    const container = this._container,
      needsRefresh = container.updateActualOptions();

    /* density particles enabled */
    container.particles.setDensity();

    this._applyResizePlugins();

    if (needsRefresh) {
      await container.refresh();
    }
  }

  private readonly _applyResizePlugins: () => void = () => {
    for (const plugin of this._resizePlugins) {
      plugin.resize?.();
    }
  };

  private readonly _initStyle: () => void = () => {
    const element = this.domElement,
      options = this._container.actualOptions;

    if (!element) {
      return;
    }

    if (this._fullScreen) {
      this._setFullScreenStyle();
    } else {
      this._resetOriginalStyle();
    }

    for (const key in options.style) {
      if (!key || !(key in options.style)) {
        continue;
      }

      const value = options.style[key];

      if (!value) {
        continue;
      }

      element.style.setProperty(key, value, "important");
    }
  };

  private readonly _repairStyle: () => void = () => {
    const element = this.domElement;

    if (!element) {
      return;
    }

    this._safeMutationObserver(observer => {
      observer.disconnect();
    });
    this._initStyle();
    this.initBackground();

    const pointerEvents = this._pointerEvents;

    element.style.pointerEvents = pointerEvents;
    element.style.setProperty("pointer-events", pointerEvents);

    this._safeMutationObserver(observer => {
      if (!(element instanceof Node)) {
        return;
      }

      observer.observe(element, { attributes: true });
    });
  };

  private readonly _resetOriginalStyle: () => void = () => {
    const element = this.domElement,
      originalStyle = this._originalStyle;

    if (!element || !originalStyle) {
      return;
    }

    setStyle(element, originalStyle, true);
  };

  private readonly _safeMutationObserver: (callback: (observer: MutationObserver) => void) => void = callback => {
    if (!this._mutationObserver) {
      return;
    }

    callback(this._mutationObserver);
  };

  private readonly _setFullScreenStyle: () => void = () => {
    const element = this.domElement;

    if (!element) {
      return;
    }

    setStyle(element, getFullScreenStyle(this._container.actualOptions.fullScreen.zIndex), true);
  };
}
