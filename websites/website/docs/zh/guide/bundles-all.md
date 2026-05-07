# Bundle: All

`@tsparticles/all` 会加载全部官方功能，适合快速原型阶段。

## 何时选择 All

- 你希望立即获得全部功能。
- 你在快速试验不同配置。
- 你更在意接入速度而非 bundle 体积。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Setup example

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

## 常见问题

- 在生产环境中使用 all，而不是更精简的目标 bundle。
- 在 `loadAll(...)` 之前调用 `tsParticles.load(...)`。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- 安装矩阵: [`/guide/installation`](/zh/guide/installation)
