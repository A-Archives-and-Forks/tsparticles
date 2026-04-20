import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadFull(tsParticles);

    await tsParticles.load({ options: configs.basic });
});
