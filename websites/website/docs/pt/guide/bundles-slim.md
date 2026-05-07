# Bundle: Slim

`@tsparticles/slim` e a escolha recomendada para a maioria dos projetos.

## Quando escolher Slim

- Voce quer bom equilibrio entre tamanho e recursos.
- Voce usa a API de engine `tsParticles` diretamente.
- Voce precisa de formas/interacoes comuns sem carregar tudo.

## Instalacao

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Exemplo de configuracao

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

## Armadilhas comuns

- Chamar `tsParticles.load(...)` antes de `loadSlim(...)`.
- Misturar versoes entre engine e plugins.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Matriz de instalacao: [`/guide/installation`](/pt/guide/installation)
