# Migra da v2.x

Da `v2.x`, i punti principali sono: API di `load(...)` e rename opzioni.

## Migrazione API load

Prima:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Dopo:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
    },
  },
});
```

## Rename opzioni principali

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Risorse

- Matrice rename: [`/guide/option-rename-matrix`](/it/guide/option-rename-matrix)
- Migrazione v1: [`/guide/migrate-from-v1`](/it/guide/migrate-from-v1)
