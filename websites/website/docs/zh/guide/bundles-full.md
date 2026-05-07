# Bundle: tsparticles (Full)

`tsparticles` 是 full bundle，用一个 loader 就能加载大量官方功能。

## 何时选择 tsparticles (Full)

- 你需要大量官方功能，但不想手动挑选 plugins。
- 你希望先有一套可用于 production 的完整基础，再做细化。
- 你希望通过 `tsParticles` API 直接控制 engine。

## 安装

```bash
pnpm add @tsparticles/engine tsparticles
```

## Setup 示例

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

## 常见问题

- 在 `loadFull(...)` 之前调用 `tsParticles.load(...)`。
- 误以为它和 `@tsparticles/all` 是同一个包（它们是不同 bundles）。

## 相关页面

- 总览: [`/guide/bundles`](/zh/guide/bundles)
- 安装矩阵: [`/guide/installation`](/zh/guide/installation)
