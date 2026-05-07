# Bundle: Confetti

`@tsparticles/confetti` は、最小セットアップで紙吹雪演出を行う特化 API です。

## Confetti を選ぶタイミング

- 祝賀エフェクトを 1 call で実行したい。
- engine を手動で配線したくない。
- UI イベント向けにコンパクトな API が欲しい。

## インストール

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

## よくある落とし穴

- `@tsparticles/confetti` から `tsParticles` が export されると思い込む。
- 同じ canvas id を意図せず再利用する。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- Playground bundles: [`/playground/bundles`](/ja/playground/bundles)
