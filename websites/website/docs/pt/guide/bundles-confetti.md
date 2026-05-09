# Bundle: Confetti

`@tsparticles/confetti` expoe uma API focada para efeitos de confete com setup minimo.

## Quando escolher Confetti

- Voce quer efeitos de celebracao com uma chamada.
- Voce nao precisa fazer wiring manual do engine.
- Voce prefere uma API compacta para eventos de UI.

## Instalacao

```bash
pnpm add @tsparticles/confetti
```

## Exemplo de configuracao

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

## Armadilhas comuns

- Assumir que `tsParticles` e exportado por `@tsparticles/confetti`.
- Reutilizar o mesmo id de canvas sem querer.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Bundles no playground: [`/playground/bundles`](/pt/playground/bundles)
