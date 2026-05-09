# Bundle: Fireworks

`@tsparticles/fireworks` предоставляет специализированное API для эффектов фейерверка с минимальным setup.

## Когда выбирать Fireworks

- Нужны fireworks-анимации в один вызов.
- Не нужен прямой wiring движка.
- Нужен компактный API для праздничных сценариев.

## Установка

```bash
pnpm add @tsparticles/fireworks
```

## Пример настройки

```ts
import { fireworks } from "@tsparticles/fireworks";

const instance = await fireworks({
  colors: ["#ffffff", "#ff0000"],
  sounds: false,
});

instance?.pause();
instance?.play();

await fireworks("canvas-id", {
  rate: 3,
  speed: { min: 10, max: 25 },
});
```

## Частые ошибки

- Считать, что `tsParticles` экспортируется из `@tsparticles/fireworks`.
- Вызывать `fireworks(...)` много раз без управления возвращенной instance.

## Связанные страницы

- Обзор: [`/guide/bundles`](/ru/guide/bundles)
- Bundle playground: [`/playground/bundles`](/ru/playground/bundles)
