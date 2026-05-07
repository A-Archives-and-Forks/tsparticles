# Bundle: tsparticles (Full)

`tsparticles` e il bundle full e include un ampio set di funzionalita ufficiali con un solo loader.

## Quando scegliere tsparticles (Full)

- Ti servono molte funzionalita ufficiali senza selezionare plugin manualmente.
- Vuoi una base completa pronta per la produzione prima delle ottimizzazioni.
- Preferisci il controllo engine tramite API `tsParticles`.

## Installazione

```bash
pnpm add @tsparticles/engine tsparticles
```

## Esempio di setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 100 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

## Problemi comuni

- Chiamare `tsParticles.load(...)` prima di `loadFull(...)`.
- Dare per scontato che sia lo stesso pacchetto di `@tsparticles/all` (sono bundle diversi).

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Matrice installazione: [`/guide/installation`](/it/guide/installation)
