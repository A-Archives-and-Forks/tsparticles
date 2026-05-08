# Migra da v3.x

Da `v3.x`, il rischio principale in migrazione e la compatibilita delle opzioni.

## Cambi prioritari

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Migrazione API load

Prima:

```ts
await tsParticles.load("tsparticles", options);
```

Dopo:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Risorse

- Matrice rename: [`/guide/option-rename-matrix`](/it/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/it/options/particles-paint)
