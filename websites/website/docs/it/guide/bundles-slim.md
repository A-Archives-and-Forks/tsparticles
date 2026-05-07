# Bundle: Slim

`@tsparticles/slim` e la scelta consigliata per la maggior parte dei progetti.

## Quando scegliere Slim

- Vuoi un buon equilibrio tra peso e funzionalita.
- Usi direttamente l'API engine `tsParticles`.
- Ti servono forme/interazioni comuni senza caricare tutto.

## Installazione

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Esempio di setup

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

## Problemi comuni

- Chiamare `tsParticles.load(...)` prima di `loadSlim(...)`.
- Mischiare versioni diverse tra engine e plugin.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Matrice installazione: [`/guide/installation`](/it/guide/installation)
