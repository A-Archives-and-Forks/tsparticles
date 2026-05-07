# Bundle: Confetti

`@tsparticles/confetti` предоставляет специализированное API для эффектов конфетти с минимальным setup.

## Когда выбирать Confetti

- Нужны праздничные эффекты в один вызов.
- Не хотите вручную подключать engine.
- Предпочитаете компактный API для UI-событий.

## Установка

```bash
pnpm add @tsparticles/confetti
```

## Пример настройки

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 80,
  spread: 60,
});

await confetti("canvas-id", {
  count: 50,
  angle: 90,
  spread: 45,
});
```

## Частые ошибки

- Считать, что `tsParticles` экспортируется из `@tsparticles/confetti`.
- Непреднамеренно использовать один и тот же canvas id повторно.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Bundle playground: [`/playground/bundles`](/ru/playground/bundles)
