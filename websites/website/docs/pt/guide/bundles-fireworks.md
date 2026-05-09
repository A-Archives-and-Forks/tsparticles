# Bundle: Fireworks

`@tsparticles/fireworks` expoe uma API focada para efeitos de fogos de artificio com setup minimo.

## Quando escolher Fireworks

- Voce quer animacoes fireworks com uma chamada.
- Voce nao precisa de wiring direto do engine.
- Voce prefere uma API compacta para momentos de celebracao.

## Instalacao

```bash
pnpm add @tsparticles/fireworks
```

## Exemplo de configuracao

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

## Armadilhas comuns

- Assumir que `tsParticles` e exportado por `@tsparticles/fireworks`.
- Chamar `fireworks(...)` repetidamente sem gerenciar a instancia.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Bundles no playground: [`/playground/bundles`](/pt/playground/bundles)
