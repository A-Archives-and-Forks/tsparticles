# Bundle: Basic

`@tsparticles/basic` e voltado para setups extra leves com runtime minimo.

## Quando escolher Basic

- Tamanho do bundle e a prioridade principal.
- Voce precisa apenas de efeitos basicos.
- Plugins avancados nao sao necessarios.

## Instalacao

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Exemplo de configuracao

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

## Armadilhas comuns

- Esperar recursos que pertencem a plugins nao incluidos.
- Chamar `tsParticles.load(...)` antes de `loadBasic(...)`.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Matriz de instalacao: [`/guide/installation`](/pt/guide/installation)
