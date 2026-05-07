# Bundle: Particles

`@tsparticles/particles` expoe uma API focada para fundos de particulas simples.

## Quando escolher Particles

- Voce quer uma API rapida para fundos de particulas.
- Voce nao precisa configurar engine/plugins manualmente.
- Voce prefere uma API compacta em estilo app.

## Instalacao

```bash
pnpm add @tsparticles/particles
```

## Exemplo de configuracao

```ts
import { particles } from "@tsparticles/particles";

await particles({
  count: 120,
  links: true,
  linksColor: "#0ff",
});

await particles("canvas-id", {
  count: 80,
  shape: ["circle", "square"],
});
```

## Armadilhas comuns

- Assumir que `tsParticles` e exportado por `@tsparticles/particles`.
- Reutilizar o mesmo id de canvas sem querer.

## Paginas relacionadas

- Visao geral: [`/guide/bundles`](/pt/guide/bundles)
- Bundles no playground: [`/playground/bundles`](/pt/playground/bundles)
