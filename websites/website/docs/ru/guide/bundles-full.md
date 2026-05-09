# Bundle: tsparticles (Full)

`tsparticles` - это full-bundle, включающий широкий набор официальных возможностей с одним loader.

## Когда выбирать tsparticles (Full)

- Нужны многие официальные возможности без ручного выбора plugins.
- Нужна полная база, готовая к production, перед тонкой настройкой.
- Вы предпочитаете контроль engine через API `tsParticles`.

## Установка

```bash
pnpm add @tsparticles/engine tsparticles
```

## Пример настройки

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

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

- Вызывать `tsParticles.load(...)` до `loadFull(...)`.
- Считать, что это тот же пакет, что и `@tsparticles/all` (это разные bundles).

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
