<script setup lang="ts">
import { confetti, type ConfettiOptions } from "@tsparticles/confetti";
import { tsParticles, type Container } from "@tsparticles/engine";
import { fireworks, type FireworkOptions } from "@tsparticles/fireworks";
import { particles, type ParticlesOptions } from "@tsparticles/particles";
import { ref } from "vue";

type BundleKey = "confetti" | "fireworks" | "particles";

const bundleIds: Record<BundleKey, string> = {
  confetti: "tsparticles-bundle-confetti",
  fireworks: "tsparticles-bundle-fireworks",
  particles: "tsparticles-bundle-particles",
};

const defaultOptions: Record<BundleKey, unknown> = {
  confetti: {
    count: 80,
    spread: 55,
    angle: 90,
    startVelocity: 45,
    gravity: 1,
    zIndex: 10,
    colors: ["#ff577f", "#ffd166", "#06d6a0", "#4cc9f0"],
    position: {
      x: 50,
      y: 50,
    },
  },
  fireworks: {
    background: "#0a1026",
    colors: ["#ffffff", "#ffd166", "#72ddf7", "#f15bb5"],
    sounds: false,
    rate: {
      min: 2,
      max: 4,
    },
    speed: {
      min: 10,
      max: 25,
    },
  },
  particles: {
    count: 100,
    color: "#72ddf7",
    links: true,
    linksColor: "#72ddf7",
    linksLength: 140,
    collisions: true,
    radius: {
      min: 1,
      max: 3,
    },
    speed: {
      min: 0.3,
      max: 1.2,
    },
    shape: ["circle", "square"],
  },
};

const editors = {
  confetti: ref(JSON.stringify(defaultOptions.confetti, null, 2)),
  fireworks: ref(JSON.stringify(defaultOptions.fireworks, null, 2)),
  particles: ref(JSON.stringify(defaultOptions.particles, null, 2)),
};

const statuses = {
  confetti: ref("Ready. Press Start."),
  fireworks: ref("Ready. Press Start."),
  particles: ref("Ready. Press Start."),
};

const parseErrors = {
  confetti: ref(""),
  fireworks: ref(""),
  particles: ref(""),
};

const busy = {
  confetti: ref(false),
  fireworks: ref(false),
  particles: ref(false),
};

const confettiContainer = ref<Container | undefined>();
const confettiRunning = ref(false);
const fireworksRunning = ref(false);
const particlesRunning = ref(false);

function getContainerById(id: string): Container | undefined {
  return tsParticles.items.find((container) => String(container.id) === id);
}

function destroyById(id: string): void {
  const container = getContainerById(id);

  container?.destroy();
}

function parseOptions<T>(bundle: BundleKey): T | undefined {
  parseErrors[bundle].value = "";

  try {
    return JSON.parse(editors[bundle].value) as T;
  } catch {
    parseErrors[bundle].value = "Invalid JSON. Check commas, quotes, and braces.";
    statuses[bundle].value = "JSON parsing error.";

    return;
  }
}

function resetOptions(bundle: BundleKey): void {
  editors[bundle].value = JSON.stringify(defaultOptions[bundle], null, 2);
  parseErrors[bundle].value = "";
  statuses[bundle].value = "Reset to default options.";
}

async function startConfetti(): Promise<void> {
  if (busy.confetti.value) {
    return;
  }

  const options = parseOptions<ConfettiOptions>("confetti");

  if (!options) {
    return;
  }

  busy.confetti.value = true;

  try {
    destroyById(bundleIds.confetti);
    confettiContainer.value = await confetti(bundleIds.confetti, options);

    if (!confettiContainer.value) {
      confettiRunning.value = false;
      statuses.confetti.value = "No confetti container created.";

      return;
    }

    confettiRunning.value = true;
    statuses.confetti.value = "Confetti running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.confetti.value = `Start failed: ${reason}`;
  } finally {
    busy.confetti.value = false;
  }
}

function stopConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti.value = "No active confetti demo.";

    return;
  }

  confettiContainer.value.pause();
  confettiRunning.value = false;
  statuses.confetti.value = "Confetti paused.";
}

function resumeConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti.value = "No active confetti demo.";

    return;
  }

  confettiContainer.value.play();
  confettiRunning.value = true;
  statuses.confetti.value = "Confetti resumed.";
}

function destroyConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti.value = "No confetti demo to destroy.";

    return;
  }

  confettiContainer.value.destroy();
  confettiContainer.value = undefined;
  confettiRunning.value = false;
  statuses.confetti.value = "Confetti destroyed.";
}

async function startFireworks(): Promise<void> {
  if (busy.fireworks.value) {
    return;
  }

  const options = parseOptions<FireworkOptions>("fireworks");

  if (!options) {
    return;
  }

  busy.fireworks.value = true;

  try {
    destroyById(bundleIds.fireworks);
    const instance = await fireworks(bundleIds.fireworks, options);

    if (!instance) {
      fireworksRunning.value = false;
      statuses.fireworks.value = "No fireworks instance created.";

      return;
    }

    fireworksRunning.value = true;
    statuses.fireworks.value = "Fireworks running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.fireworks.value = `Start failed: ${reason}`;
  } finally {
    busy.fireworks.value = false;
  }
}

function stopFireworks(): void {
  const container = getContainerById(bundleIds.fireworks);

  if (!container) {
    statuses.fireworks.value = "No active fireworks demo.";

    return;
  }

  container.pause();
  fireworksRunning.value = false;
  statuses.fireworks.value = "Fireworks paused.";
}

function resumeFireworks(): void {
  const container = getContainerById(bundleIds.fireworks);

  if (!container) {
    statuses.fireworks.value = "No active fireworks demo.";

    return;
  }

  container.play();
  fireworksRunning.value = true;
  statuses.fireworks.value = "Fireworks resumed.";
}

function destroyFireworks(): void {
  const container = getContainerById(bundleIds.fireworks);

  if (!container) {
    statuses.fireworks.value = "No fireworks demo to destroy.";

    return;
  }

  container.destroy();
  fireworksRunning.value = false;
  statuses.fireworks.value = "Fireworks destroyed.";
}

async function startParticles(): Promise<void> {
  if (busy.particles.value) {
    return;
  }

  const options = parseOptions<ParticlesOptions>("particles");

  if (!options) {
    return;
  }

  busy.particles.value = true;

  try {
    destroyById(bundleIds.particles);
    const instance = await particles(bundleIds.particles, options);

    if (!instance) {
      particlesRunning.value = false;
      statuses.particles.value = "No particles instance created.";

      return;
    }

    particlesRunning.value = true;
    statuses.particles.value = "Particles running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.particles.value = `Start failed: ${reason}`;
  } finally {
    busy.particles.value = false;
  }
}

function stopParticles(): void {
  const container = getContainerById(bundleIds.particles);

  if (!container) {
    statuses.particles.value = "No active particles demo.";

    return;
  }

  container.pause();
  particlesRunning.value = false;
  statuses.particles.value = "Particles paused.";
}

function resumeParticles(): void {
  const container = getContainerById(bundleIds.particles);

  if (!container) {
    statuses.particles.value = "No active particles demo.";

    return;
  }

  container.play();
  particlesRunning.value = true;
  statuses.particles.value = "Particles resumed.";
}

function destroyParticles(): void {
  const container = getContainerById(bundleIds.particles);

  if (!container) {
    statuses.particles.value = "No particles demo to destroy.";

    return;
  }

  container.destroy();
  particlesRunning.value = false;
  statuses.particles.value = "Particles destroyed.";
}
</script>

<template>
  <div class="bundle-playgrounds">
    <section class="bundle-card">
      <h2>@tsparticles/confetti</h2>
      <p class="bundle-description">One-call confetti API for celebratory bursts and overlays.</p>
      <div class="button-row">
        <button type="button" :disabled="busy.confetti" @click="resetOptions('confetti')">Reset JSON</button>
        <button type="button" :disabled="busy.confetti" @click="startConfetti">Start</button>
        <button type="button" :disabled="busy.confetti || !confettiRunning" @click="stopConfetti">Stop</button>
        <button type="button" :disabled="busy.confetti || confettiRunning" @click="resumeConfetti">Resume</button>
        <button type="button" :disabled="busy.confetti" @click="destroyConfetti">Destroy</button>
      </div>
      <p class="status">{{ statuses.confetti }}</p>
      <p v-if="parseErrors.confetti" class="parse-error">{{ parseErrors.confetti }}</p>
      <textarea
        v-model="editors.confetti"
        class="options-editor"
        spellcheck="false"
        aria-label="Confetti options editor"
      />
      <div :id="bundleIds.confetti" class="playground-canvas" />
    </section>

    <section class="bundle-card">
      <h2>@tsparticles/fireworks</h2>
      <p class="bundle-description">Focused fireworks API with quick setup for launch/explosion scenes.</p>
      <div class="button-row">
        <button type="button" :disabled="busy.fireworks" @click="resetOptions('fireworks')">Reset JSON</button>
        <button type="button" :disabled="busy.fireworks" @click="startFireworks">Start</button>
        <button type="button" :disabled="busy.fireworks || !fireworksRunning" @click="stopFireworks">Stop</button>
        <button type="button" :disabled="busy.fireworks || fireworksRunning" @click="resumeFireworks">Resume</button>
        <button type="button" :disabled="busy.fireworks" @click="destroyFireworks">Destroy</button>
      </div>
      <p class="status">{{ statuses.fireworks }}</p>
      <p v-if="parseErrors.fireworks" class="parse-error">{{ parseErrors.fireworks }}</p>
      <textarea
        v-model="editors.fireworks"
        class="options-editor"
        spellcheck="false"
        aria-label="Fireworks options editor"
      />
      <div :id="bundleIds.fireworks" class="playground-canvas" />
    </section>

    <section class="bundle-card">
      <h2>@tsparticles/particles</h2>
      <p class="bundle-description">Simplified particles background API for network and geometric effects.</p>
      <div class="button-row">
        <button type="button" :disabled="busy.particles" @click="resetOptions('particles')">Reset JSON</button>
        <button type="button" :disabled="busy.particles" @click="startParticles">Start</button>
        <button type="button" :disabled="busy.particles || !particlesRunning" @click="stopParticles">Stop</button>
        <button type="button" :disabled="busy.particles || particlesRunning" @click="resumeParticles">Resume</button>
        <button type="button" :disabled="busy.particles" @click="destroyParticles">Destroy</button>
      </div>
      <p class="status">{{ statuses.particles }}</p>
      <p v-if="parseErrors.particles" class="parse-error">{{ parseErrors.particles }}</p>
      <textarea
        v-model="editors.particles"
        class="options-editor"
        spellcheck="false"
        aria-label="Particles options editor"
      />
      <div :id="bundleIds.particles" class="playground-canvas" />
    </section>
  </div>
</template>

<style scoped>
.bundle-playgrounds {
  display: grid;
  gap: 1.2rem;
}

.bundle-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.bundle-card h2 {
  margin: 0;
  font-size: 1rem;
}

.bundle-description {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
}

.button-row {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button-row button {
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.status {
  margin: 0.65rem 0 0;
}

.parse-error {
  margin: 0.4rem 0 0;
  color: #ff6b6b;
}

.options-editor {
  margin-top: 0.75rem;
  width: 100%;
  min-height: 210px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.82rem;
  line-height: 1.5;
  background: var(--vp-c-bg);
}

.playground-canvas {
  margin-top: 0.75rem;
  width: 100%;
  height: 280px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  background: #0a1026;
}
</style>
