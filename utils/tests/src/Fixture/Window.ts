import { type DOMWindow, JSDOM } from "jsdom";

import { TestOffscreenCanvas, installTransferControlToOffscreen } from "./OffscreenCanvas.js";

type TestWindowWithOffscreen = DOMWindow & {
  OffscreenCanvas?: typeof TestOffscreenCanvas;
};

const testWindow = new JSDOM("").window as TestWindowWithOffscreen;

Object.defineProperty(testWindow, "OffscreenCanvas", {
  configurable: true,
  value: TestOffscreenCanvas,
});

if (typeof globalThis.OffscreenCanvas === "undefined") {
  Object.defineProperty(globalThis, "OffscreenCanvas", {
    configurable: true,
    value: TestOffscreenCanvas,
  });
}

if (typeof globalThis.HTMLCanvasElement !== "undefined") {
  installTransferControlToOffscreen(globalThis.HTMLCanvasElement.prototype);
}

if (typeof testWindow.HTMLCanvasElement !== "undefined") {
  installTransferControlToOffscreen(testWindow.HTMLCanvasElement.prototype);
}

export { testWindow as TestWindow };
