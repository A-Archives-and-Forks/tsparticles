# Bundle: Fireworks

`@tsparticles/fireworks` は、最小セットアップで花火演出を行う特化 API です。

## Fireworks を選ぶタイミング

- 花火アニメーションを 1 call で使いたい。
- engine の直接 wiring は不要。
- 祝賀 UI にコンパクトな API を使いたい。

## インストール

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

## よくある落とし穴

- `@tsparticles/fireworks` から `tsParticles` が export されると思い込む。
- 返された instance を管理せず `fireworks(...)` を繰り返し呼ぶ。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- Playground bundles: [`/playground/bundles`](/ja/playground/bundles)
