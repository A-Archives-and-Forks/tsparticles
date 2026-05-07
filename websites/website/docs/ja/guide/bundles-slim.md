# Bundle: Slim

`@tsparticles/slim` は、ほとんどのプロジェクトで推奨される標準バンドルです。

## Slim を選ぶタイミング

- サイズと機能のバランスを重視したい。
- `tsParticles` の engine API を直接使いたい。
- 一般的な shape/interactions を、全機能なしで使いたい。

## インストール

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

## よくある落とし穴

- `loadSlim(...)` より先に `tsParticles.load(...)` を呼ぶ。
- engine と plugins のバージョンを混在させる。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- インストール一覧: [`/guide/installation`](/ja/guide/installation)
