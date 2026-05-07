# Bundle: Fireworks

`@tsparticles/fireworks` 提供面向烟花效果的聚焦 API，适合快速接入。

## 何时选择 Fireworks

- 你需要一键触发的烟花动画。
- 你不需要直接 wiring engine。
- 你想在庆祝场景中使用紧凑 API。

## 安装

```bash
pnpm add @tsparticles/fireworks
```

## Setup example

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

## 常见问题

- 误以为 `@tsparticles/fireworks` 会导出 `tsParticles`。
- 多次调用 `fireworks(...)` 却不管理返回的 instance。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- Playground bundles: [`/playground/bundles`](/zh/playground/bundles)
