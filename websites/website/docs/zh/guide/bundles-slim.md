# Bundle: Slim

`@tsparticles/slim` 是大多数项目的推荐默认选择。

## 何时选择 Slim

- 你需要体积与功能的平衡。
- 你直接使用 `tsParticles` engine API。
- 你需要常用 shape/interactions，但不想加载全部能力。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Setup example

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

## 常见问题

- 在 `loadSlim(...)` 之前调用 `tsParticles.load(...)`。
- engine 与 plugins 版本混用。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- 安装矩阵: [`/guide/installation`](/zh/guide/installation)
