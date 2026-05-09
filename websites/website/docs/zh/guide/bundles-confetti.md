# Bundle: Confetti

`@tsparticles/confetti` 提供面向彩纸效果的聚焦 API，接入成本很低。

## 何时选择 Confetti

- 你需要一键触发的庆祝效果。
- 你不需要手动连接 engine。
- 你希望在 UI 事件里用紧凑 API 快速触发。

## 安装

```bash
pnpm add @tsparticles/confetti
```

## Setup example

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

## 常见问题

- 误以为 `@tsparticles/confetti` 会导出 `tsParticles`。
- 无意间复用同一个 canvas id。

## 相关页面

- 概览: [`/guide/bundles`](/zh/guide/bundles)
- Playground bundles: [`/playground/bundles`](/zh/playground/bundles)
