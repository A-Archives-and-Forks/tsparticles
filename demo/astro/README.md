# Welcome to [Astro](https://astro.build)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/s/github/withastro/astro/tree/latest/examples/basics)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)


## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Running the tsParticles demo locally

The demo uses the @tsparticles/astro wrapper. In local dev the browser needs a browser-ready
ESM entry for the wrapper. The easiest way to run the demo locally is:

1. Install deps at the repo root: `pnpm install`
2. Start the demo dev server:

```bash
cd demo/astro
pnpm dev
```

3. Open the local URL reported by Astro.

Dev note: the demo places a small importmap and a client-init script before the Particles component so that
the browser loads the wrapper's browser entry and the core bundle in dev. The importmap looks like this:

```html
<script type="importmap">
  {
    "imports": {
      "@tsparticles/astro": "/node_modules/@tsparticles/astro/dist/index.client.js",
      "tsparticles": "/node_modules/tsparticles/esm/index.js"
    }
  }
</script>
```

Then a small client script calls `initParticlesEngine(...)` before the component is upgraded so the wrapper
can detect initialization and proceed without throwing.
