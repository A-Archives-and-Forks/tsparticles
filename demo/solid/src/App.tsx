import configs from "@tsparticles/configs";
import type { Component } from 'solid-js';
import { createSignal, Show, onMount } from "solid-js";
import { loadFull } from "tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/solid";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);
  const [config, setConfig] = createSignal(configs.basic);

  onMount(() => {
    // Initialize only on the client to avoid SSR/module-eval side-effects.
    void initParticlesEngine(async (engine) => {
      await loadFull(engine as any);
    })
      .then(() => setInitialized(true))
      .catch((e) => console.error("Failed to initialize particles engine:", e));
  });

  setTimeout(() => setConfig(configs.absorbers), 1000)

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={config()}/>
    </Show>
  );
};

export default App;
