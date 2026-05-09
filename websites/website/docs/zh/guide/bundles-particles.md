# Bundle: Particles

`@tsparticles/particles` 提供面向简单粒子背景的聚焦 API。

## 何时选择 Particles

- 你想快速接入粒子背景。
- 你不想手动配置 engine/plugins。
- 你偏好紧凑的应用式 API。

## 安装

```bash
pnpm add @tsparticles/particles
```

## Setup example

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

## 常见问题

- 误以为 `@tsparticles/particles` 会导出 `tsParticles`。
- 无意间复用同一个 canvas id。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- Playground bundles: [`/playground/bundles`](/zh/playground/bundles)
