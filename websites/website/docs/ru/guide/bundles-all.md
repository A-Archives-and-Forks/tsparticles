# Bundle: All

`@tsparticles/all` загружает все официальные возможности и удобен для быстрого прототипирования.

## Когда выбирать All

- Нужны все возможности сразу.
- Вы быстро исследуете варианты.
- Размер bundle менее важен, чем скорость setup.

## Установка

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Пример настройки

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

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

## Частые ошибки

- Использовать в production, когда лучше подошел бы более узкий bundle.
- Вызывать `tsParticles.load(...)` до `loadAll(...)`.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
