# Bundle: tsparticles (Full)

`tsparticles` e o bundle full e inclui um conjunto amplo de recursos oficiais com um unico loader.

## Quando escolher tsparticles (Full)

- Voce precisa de muitos recursos oficiais sem selecionar plugins manualmente.
- Voce quer uma base completa pronta para producao antes de ajustar.
- Voce prefere controle do engine pela API `tsParticles`.

## Instalacao

```bash
pnpm add @tsparticles/engine tsparticles
```

## Exemplo de setup

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

## Erros comuns

- Chamar `tsParticles.load(...)` antes de `loadFull(...)`.
- Assumir que e o mesmo pacote que `@tsparticles/all` (sao bundles diferentes).

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Matriz de instalacao: [`/guide/installation`](/pt/guide/installation)
