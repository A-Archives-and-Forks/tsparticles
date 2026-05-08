# Миграция с v2.x

Для `v2.x` основные точки миграции: API `load(...)` и переименования опций.

## Миграция Load API

До:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

После:

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

## Основные переименования

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ресурсы

- Матрица переименований: [`/guide/option-rename-matrix`](/ru/guide/option-rename-matrix)
- Миграция v1: [`/guide/migrate-from-v1`](/ru/guide/migrate-from-v1)
