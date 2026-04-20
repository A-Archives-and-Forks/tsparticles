import Particles from "./src/Particles.astro";
import { initParticlesEngine } from "./src/initParticlesEngine.js";

// Server-side entry that exports the Astro component for SSR build-time imports.
export { initParticlesEngine };
export default Particles;
