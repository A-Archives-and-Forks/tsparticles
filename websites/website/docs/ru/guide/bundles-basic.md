# Bundle: Basic

`@tsparticles/basic` подходит для максимально легких setup с минимальным runtime.

## Когда выбирать Basic

- Размер bundle - главный приоритет.
- Нужны только базовые эффекты.
- Расширенные plugins не требуются.

## Установка

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Пример настройки

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 50 },
      move: { enable: true, speed: 1.5 },
    },
  },
});
```

## Частые ошибки

- Ожидать функции из plugins, которые не входят в basic.
- Вызывать `tsParticles.load(...)` до `loadBasic(...)`.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
