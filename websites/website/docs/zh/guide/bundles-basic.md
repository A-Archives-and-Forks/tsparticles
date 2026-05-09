# Bundle: Basic

`@tsparticles/basic` 适合极简轻量场景，运行时开销更低。

## 何时选择 Basic

- bundle 体积是首要目标。
- 你只需要核心基础效果。
- 不需要高级 plugins。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Setup example

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

## 常见问题

- 期待 basic 不包含的 plugin 功能。
- 在 `loadBasic(...)` 之前调用 `tsParticles.load(...)`。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- 安装矩阵: [`/guide/installation`](/zh/guide/installation)
