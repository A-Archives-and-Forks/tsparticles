# Bundle: Particles

`@tsparticles/particles` предоставляет специализированное API для простых particle backgrounds.

## Когда выбирать Particles

- Нужен быстрый API для фона с частицами.
- Не хотите вручную настраивать engine/plugins.
- Нужен компактный API в стиле app.

## Установка

```bash
pnpm add @tsparticles/particles
```

## Пример настройки

```ts
import { particles } from "@tsparticles/particles";

await particles({
  count: 120,
  links: true,
  linksColor: "#0ff",
});

await particles("canvas-id", {
  count: 80,
  shape: ["circle", "square"],
});
```

## Частые ошибки

- Считать, что `tsParticles` экспортируется из `@tsparticles/particles`.
- Непреднамеренно использовать один и тот же canvas id повторно.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Bundle playground: [`/playground/bundles`](/ru/playground/bundles)
