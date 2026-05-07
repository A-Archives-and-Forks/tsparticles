# Bundle: Slim

`@tsparticles/slim` est le choix recommande pour la plupart des projets.

## Quand choisir Slim

- Vous voulez un bon equilibre entre taille et fonctionnalites.
- Vous utilisez directement l'API engine `tsParticles`.
- Vous avez besoin de formes/interactions courantes sans tout charger.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Exemple de configuration

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true },
    },
  },
});
```

## Pieges courants

- Appeler `tsParticles.load(...)` avant `loadSlim(...)`.
- Melanger des versions differentes entre engine et plugins.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Matrice d'installation: [`/guide/installation`](/fr/guide/installation)
