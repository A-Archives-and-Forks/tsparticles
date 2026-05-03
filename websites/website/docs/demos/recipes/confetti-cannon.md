# Confetti Cannon Preset

Official preset from the `presets/presets/confettiCannon` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
    },
  });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

Demo: <https://particles.js.org/samples/presets/confettiCannon>

Source docs: <https://github.com/tsparticles/presets/tree/main/presets/confettiCannon#readme>
