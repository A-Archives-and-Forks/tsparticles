# Migra da v1.x

Da `v1.x`, conviene fare una migrazione in tre passi: pacchetti, `load(...)`, opzioni.

## API load moderna

Prima:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Dopo:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Rename opzioni da controllare subito

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Risorse

- Matrice rename: [`/guide/option-rename-matrix`](/it/guide/option-rename-matrix)
- Migrazione da particles.js: [`/migration/`](/it/migration/)
