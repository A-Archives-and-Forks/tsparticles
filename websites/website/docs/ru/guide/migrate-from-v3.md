# Миграция с v3.x

Для `v3.x` главный риск миграции обычно связан с совместимостью опций.

## Приоритетные изменения

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Миграция Load API

До:

```ts
await tsParticles.load("tsparticles", options);
```

После:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Ресурсы

- Матрица переименований: [`/guide/option-rename-matrix`](/ru/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ru/options/particles-paint)
