# Bundle: All

`@tsparticles/all` carrega todos os recursos oficiais e e ideal para prototipagem rapida.

## Quando escolher All

- Voce quer todos os recursos disponiveis imediatamente.
- Voce esta explorando opcoes rapidamente.
- O tamanho do bundle e menos importante que a velocidade do setup.

## Instalacao

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Exemplo de configuracao

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

## Armadilhas comuns

- Usar em producao quando um bundle menor e focado seria melhor.
- Chamar `tsParticles.load(...)` antes de `loadAll(...)`.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Matriz de instalacao: [`/guide/installation`](/pt/guide/installation)
