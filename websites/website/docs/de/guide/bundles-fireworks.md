# Bundle: Fireworks

`@tsparticles/fireworks` bietet eine fokussierte API fuer Feuerwerk-Effekte mit minimalem Setup.

## Wann Fireworks waehlen

- Du willst Fireworks-Animationen mit einem Aufruf.
- Du brauchst kein direktes Engine-Wiring.
- Du bevorzugst eine kompakte API fuer Feier-Momente.

## Installation

```bash
pnpm add @tsparticles/fireworks
```

## Setup-Beispiel

```ts
import { fireworks } from "@tsparticles/fireworks";

const instance = await fireworks({
  colors: ["#ffffff", "#ff0000"],
  sounds: false,
});

instance?.pause();
instance?.play();

await fireworks("canvas-id", {
  rate: 3,
  speed: { min: 10, max: 25 },
});
```

## Haeufige Stolperfallen

- Annehmen, dass `tsParticles` aus `@tsparticles/fireworks` exportiert wird.
- `fireworks(...)` wiederholt aufrufen, ohne die Instanz zu verwalten.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Bundle-Playground: [`/playground/bundles`](/de/playground/bundles)
