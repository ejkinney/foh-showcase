# This Could Be Your Site

A standalone Front of House showcase with 30 repeating restaurant website concepts. Built with Vite, TypeScript, and static content. No account, backend, analytics, or visitor data storage is required.

A small fixed studio bar lets visitors try their restaurant name and adjust the main and accent colors with two sliders. Moving either slider smoothly opens a 30-concept overview; releasing it returns to the same scroll position. These changes stay in the current browser view only.

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

## Photography

The showcase uses a local library of 66 individually verified CC0 photographs from Wikimedia Commons. Each has a source, author, license record, alt text, and optimized desktop and mobile WebP file in `content/asset-library.json`. The site credits the photographers of each displayed concept in its menu view. No generated image is used in the published site.
