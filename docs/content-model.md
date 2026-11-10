# Showcase content handoff

`content/showcase.json` is the source for the 36 concepts. `src/main.ts` imports it at build time and renders each concept's landing view, sample menu, and three visual copies used by the vertical loop. `content/showcase.schema.json` describes the file's structure.

Edit the copy, menu placeholders, contact address, and `heroAssetId` / `menuAssetId` in `content/showcase.json`, then run `npm run build`. The IDs refer to `content/asset-library.json`, which records alt text, author, Commons source and CC0 license for each photo. Optimized desktop and phone files live under `public/images`. See `docs/asset-library.md` for the asset workflow.

The compact restaurant name field and two color sliders stay in the fixed studio header while the gallery scrolls. The name defaults to “Your restaurant” and updates all name placements with text content. Moving a slider opens an overview of the entire gallery, and releasing it returns to the same scroll position. These controls are browser-only state, are cleared on refresh, and are never saved or sent. Sample menu rows contain illustrative dishes. The only outgoing actions are the FOH home link, email links, and photograph source links.

`defaultColors` defines the starting main and accent hues in `content/showcase.json`. Both values are integers from 0 to 359. `src/main.ts` generates the palette. `src/layouts.css` and `src/new-layouts.css` apply it, combining the selected hues with each concept's material tints. Text uses controlled light and dark pairs, and accents appear on frames and details. `src/gallery.css` defines the color overview and sizes its rows to the number of concepts. `src/foundation.css` owns the studio controls, common menu styles, and style browser.

Each scene's `layout` selects its composition. The original layouts use shared slots for the headline, photography, menu introduction, tabs, dishes, credits, and contact action in `src/main.ts`. Each layout positions those slots independently in `src/layouts.css`, including separate grids for mobile and wide screens where appropriate. The six additions use dedicated markup in `src/scene-compositions.ts` and styles in `src/new-layouts.css`. `designSignature` records the composition and `previewLabel` is the short caption in the color overview. Keep all three rendered copies the same height so a scroll wrap preserves the visual position. Menu tab state is synchronized across copies, and changing names or tabs preserves the current reading position. The Listening Bar uses Up and Down for its vertical tab list. The other layouts use Left and Right. `design-history.json` records previous and current layout signatures.

The “Browse styles” dialog renders its image, label, and number directly from the same scene records. Selection closes the dialog, scrolls to the central copy, and focuses its menu button. Native dialog behavior supplies focus containment, Escape, and return to the trigger. No new route or saved visitor state is introduced.

## Contract and validation

This existing project is a fictional style showcase, not a restaurant with real locations, prices, or ordering. Its established version-5 showcase contract remains canonical; it has not been migrated to the Distinctive Web restaurant `site.json` contract. `npm run validate` uses Ajv's JSON Schema 2020-12 implementation and format checks for both delivered schemas, then checks IDs, renderer keys, asset references, and image files. `npm run build` runs validation, TypeScript checking, and the production build in that order.

For example, edit `scenes[0].heroLine`, `scenes[0].tabs[0].items[0]`, or `scenes[0].menuAssetId` (using an ID from the asset library). The hero, menu, or image updates on the next Vite reload/build. Keep scene IDs stable; do not use their array positions as references elsewhere. There are intentionally no price, hours, reservation, or customer-data fields. Update this handoff when adding public fields or a renderer, and preserve the schema version for compatible copy/layout changes.

## Visual direction

The design signatures in `content/showcase.json` describe each current landing page and menu. See `docs/layout-review.md` for the comparisons across the gallery.

The real photographs illustrate possible styles and do not represent FOH client work. No reference site's logo, screenshot, menu, or copy is used. The added compositions draw broad visual cues from the restaurant sites named in [this FoodNYC discussion](https://www.reddit.com/r/FoodNYC/comments/1h85551/restaurants_with_cool_websites/): lively graphic systems, food-first presentation, and spare editorial pacing.
