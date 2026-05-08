# Migrer depuis v3.x

Depuis `v3.x`, le principal risque de migration est souvent la compatibilite des options.

## Changements prioritaires

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Migration de la Load API

Avant:

```ts
await tsParticles.load("tsparticles", options);
```

Apres:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Ressources

- Matrice des renommages: [`/guide/option-rename-matrix`](/fr/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/fr/options/particles-paint)
