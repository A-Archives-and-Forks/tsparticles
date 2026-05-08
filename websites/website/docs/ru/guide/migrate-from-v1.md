# Миграция с v1.x

Для `v1.x` лучше идти в три шага: пакеты, `load(...)`, опции.

## Современный Load API

До:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

После:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Что проверить в первую очередь

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ресурсы

- Матрица переименований: [`/guide/option-rename-matrix`](/ru/guide/option-rename-matrix)
- Миграция с particles.js: [`/migration/`](/ru/migration/)
