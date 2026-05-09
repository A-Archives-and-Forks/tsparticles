# Bundle: Slim

`@tsparticles/slim` - рекомендуемый выбор по умолчанию для большинства проектов.

## Когда выбирать Slim

- Нужен хороший баланс между размером и возможностями.
- Вы используете API движка `tsParticles` напрямую.
- Нужны базовые формы/интеракции без загрузки всего набора.

## Установка

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Пример настройки

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true },
    },
  },
});
```

## Частые ошибки

- Вызывать `tsParticles.load(...)` до `loadSlim(...)`.
- Смешивать разные версии engine и plugins.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
