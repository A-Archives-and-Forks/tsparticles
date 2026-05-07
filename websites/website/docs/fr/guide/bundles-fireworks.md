# Bundle: Fireworks

`@tsparticles/fireworks` expose une API ciblee pour les effets feux d'artifice avec setup minimal.

## Quand choisir Fireworks

- Vous voulez des animations fireworks en un appel.
- Vous ne voulez pas de wiring engine direct.
- Vous preferez une API compacte pour les moments de celebration.

## Installation

```bash
pnpm add @tsparticles/fireworks
```

## Exemple de configuration

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

## Pieges courants

- Penser que `tsParticles` est exporte par `@tsparticles/fireworks`.
- Appeler `fireworks(...)` en boucle sans gerer l'instance retournee.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Bundles du playground: [`/playground/bundles`](/fr/playground/bundles)
