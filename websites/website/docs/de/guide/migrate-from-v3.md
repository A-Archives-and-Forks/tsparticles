# Migration von v3.x

Bei `v3.x` ist das groesste Migrationsrisiko meist die Options-Kompatibilitaet.

## Prioritaere Aenderungen

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Load-API-Migration

Vorher:

```ts
await tsParticles.load("tsparticles", options);
```

Nachher:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Ressourcen

- Option-Rename-Matrix: [`/guide/option-rename-matrix`](/de/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/de/options/particles-paint)
