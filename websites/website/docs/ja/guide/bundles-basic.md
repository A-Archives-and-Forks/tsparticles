# Bundle: Basic

`@tsparticles/basic` は、最小ランタイムで超軽量に構成したい場合向けです。

## Basic を選ぶタイミング

- bundle サイズが最優先。
- 必要なのは基本的な効果だけ。
- 高度な plugins は不要。

## インストール

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

## よくある落とし穴

- basic に含まれない plugin 機能を期待してしまう。
- `loadBasic(...)` より先に `tsParticles.load(...)` を呼ぶ。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- インストール一覧: [`/guide/installation`](/ja/guide/installation)
