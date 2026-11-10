# This Could Be Your Site

A standalone Front of House showcase with 36 restaurant website concepts, each with a landing page and sample menu. Built with Vite, TypeScript, and static content. No account, backend, analytics, or visitor data storage is required.

A small fixed studio bar lets visitors try their restaurant name and adjust the main and accent colors with two sliders. Moving either slider opens an overview of the concepts, and releasing it returns to the same scroll position. These changes stay in the current browser view only.

“Browse styles” opens a photographic index of all 36 concepts. Each concept has a mobile composition and a wider arrangement, with content-driven spacing, keyboard-operated menus, and reduced-motion support. See `docs/layout-review.md` for the layout review.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The static site is emitted to `dist/`. See `docs/content-model.md` to edit copy and menu placeholders. See `docs/asset-library.md` to source and reuse photographs.

The build also validates both JSON schemas, unique IDs, layout coverage, asset references, and local image files. Run `npm run validate` for those content checks alone.

## Photography

The showcase uses a local library of 66 individually verified CC0 photographs from Wikimedia Commons. Each has a source, author, license record, alt text, and optimized desktop and mobile WebP file in `content/asset-library.json`. The site credits the photographers of each displayed concept in its menu view. No generated image is used in the published site.
