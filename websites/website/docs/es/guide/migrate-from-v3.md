# Migrar desde v3.x

Desde `v3.x`, el principal riesgo suele estar en la compatibilidad de opciones.

## Cambios prioritarios

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Migracion de API load

Antes:

```ts
await tsParticles.load("tsparticles", options);
```

Despues:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Recursos

- Matriz de renombres: [`/guide/option-rename-matrix`](/es/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/es/options/particles-paint)
