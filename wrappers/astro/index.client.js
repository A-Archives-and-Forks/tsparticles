import { initParticlesEngine } from "./src/initParticlesEngine.js";

// Client-only entrypoint: export the runtime init helper as a browser-loadable ESM file.
// This avoids importing .astro files at the top-level which the browser cannot load.
export { initParticlesEngine };

// Default export is intentionally omitted for the client bundle; the demo's server-side
// import of the Astro component will use the server entrypoint instead.
