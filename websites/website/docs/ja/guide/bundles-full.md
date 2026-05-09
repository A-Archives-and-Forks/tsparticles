# Bundle: tsparticles (Full)

`tsparticles` は full bundle で、1 つの loader で幅広い公式機能をまとめて使えます。

## tsparticles (Full) を選ぶタイミング

- 多くの公式機能を plugin の個別選択なしで使いたい。
- 微調整の前に、production 向けの完全な土台を用意したい。
- `tsParticles` API で engine を直接コントロールしたい。

## インストール

```bash
pnpm add @tsparticles/engine tsparticles
```

## Setup example

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

## よくある落とし穴

- `loadFull(...)` より先に `tsParticles.load(...)` を呼ぶ。
- `@tsparticles/all` と同じパッケージだと思い込む（別 bundle です）。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- インストール一覧: [`/guide/installation`](/ja/guide/installation)
