# Bundle: Basic

`@tsparticles/basic` convient aux configurations tres legeres avec runtime minimal.

## Quand choisir Basic

- La taille du bundle est votre priorite principale.
- Vous avez besoin uniquement des effets de base.
- Les plugins avances ne sont pas necessaires.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Exemple de configuration

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 50 },
      move: { enable: true, speed: 1.5 },
    },
  },
});
```

## Pieges courants

- Attendre des fonctionnalites qui appartiennent a des plugins non inclus.
- Appeler `tsParticles.load(...)` avant `loadBasic(...)`.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Matrice d'installation: [`/guide/installation`](/fr/guide/installation)
