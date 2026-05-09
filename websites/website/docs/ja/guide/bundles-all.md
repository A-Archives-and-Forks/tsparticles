# Bundle: All

`@tsparticles/all` は公式機能をすべて読み込み、素早いプロトタイピングに向いています。

## All を選ぶタイミング

- すべての機能をすぐ使いたい。
- 素早く選択肢を試したい。
- サイズよりセットアップ速度を優先したい。

## インストール

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

## よくある落とし穴

- 本番で、より小さい bundle で十分なのに all を使う。
- `loadAll(...)` より先に `tsParticles.load(...)` を呼ぶ。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- インストール一覧: [`/guide/installation`](/ja/guide/installation)
