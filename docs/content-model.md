# Showcase content handoff

`content/showcase.json` is the source for the 36 concepts. `src/main.ts` imports it at build time and renders each concept's landing view, sample menu, and three visual copies used by the vertical loop. `content/showcase.schema.json` describes the file's structure.

Edit the copy, menu placeholders, contact address, and `heroAssetId` / `menuAssetId` in `content/showcase.json`, then run `npm run build`. The IDs refer to `content/asset-library.json`, which records alt text, author, Commons source and CC0 license for each photo. Optimized desktop and phone files live under `public/images`. See `docs/asset-library.md` for the asset workflow.

The compact restaurant name field and two color sliders stay in the fixed studio header while the gallery scrolls. The name defaults to “Your restaurant” and updates all name placements with text content. Moving a slider opens an overview of the entire gallery, and releasing it returns to the same scroll position. These controls are browser-only state, are cleared on refresh, and are never saved or sent. Sample menu rows contain illustrative dishes. The only outgoing actions are the FOH home link, email links, and photograph source links.

`defaultColors` defines the starting main and accent hues in `content/showcase.json`. Both values are integers from 0 to 359. `src/main.ts` generates the palette. `src/layouts.css` and `src/new-layouts.css` apply it, including the local tints used by the newspaper, record sleeve, chocolate box, and sunrise. Text uses controlled light and dark pairs, and accents appear on frames and details. `src/gallery.css` defines the color overview and sizes its rows to the number of concepts. `src/foundation.css` owns the studio controls, common menu styles, and style browser.

Each scene's `layout` selects its composition. The original layouts share markup in `src/main.ts` with styles in `src/layouts.css`. The six additions use dedicated markup in `src/scene-compositions.ts` and styles in `src/new-layouts.css`. `designSignature` records the composition and `previewLabel` is the short caption in the color overview. Give a new scene a unique layout key and a corresponding overview treatment. Keep all three rendered copies the same height so a scroll wrap preserves the visual position. Menu tab state is synchronized across copies, and changing names or tabs preserves the current reading position. The Listening Bar uses Up and Down for its vertical tab list. The other layouts use Left and Right. `design-history.json` records previous and current layout signatures.

The “Browse styles” dialog renders its image, label, and number directly from the same scene records. Selection closes the dialog, scrolls to the central copy, and focuses its menu button. Native dialog behavior supplies focus containment, Escape, and return to the trigger. No new route or saved visitor state is introduced.

## Contract and validation

This existing project is a fictional style showcase, not a restaurant with real locations, prices, or ordering. Its established version-5 showcase contract remains canonical; it has not been migrated to the Distinctive Web restaurant `site.json` contract. `npm run validate` uses Ajv's JSON Schema 2020-12 implementation and format checks for both delivered schemas, then checks IDs, renderer keys, asset references, and image files. `npm run build` runs validation, TypeScript checking, and the production build in that order.

For example, edit `scenes[0].heroLine`, `scenes[0].tabs[0].items[0]`, or `scenes[0].menuAssetId` (using an ID from the asset library). The hero, menu, or image updates on the next Vite reload/build. Keep scene IDs stable; do not use their array positions as references elsewhere. There are intentionally no price, hours, reservation, or customer-data fields. Update this handoff when adding public fields or a renderer, and preserve the schema version for compatible copy/layout changes.

## Visual direction

- **Dining / cinema:** full-room photography behind an editorial headline, then an overlapping letterpress menu page.
- **Counter / poster:** a tilted food-photo poster, block type, and takeaway-ticket menu rows.
- **Café / journal:** an arched photo window with a quiet type column, then a lined notebook and photo postcard.
- **Pizzeria / table:** a circular overhead food photo against tomato red, then an oven-ticket menu beside a round pizza image.
- **Cocktail bar / nocturne:** a tall doorway photo and late-night type, then a drinks list over a full-bleed service photograph.
- **Bakery / market:** a broad bread photo and flour-paper headline panel, then shelf-like menu cards under a photo strip.
- **Noodle house / street poster:** a round bowl sign, chopstick rule, and order-slip menu.
- **Seafood / tide:** a scalloped photograph and airy dockside ledger.
- **Wine bistro / cellar:** a narrow wine-glass panel, italic headline, and dark tasting card.
- **Diner / checkered:** checker trim, breakfast photography, and receipt-like menu rows.
- **Cantina / collage:** a lively room photograph, staggered headline blocks, and color-banded menu.
- **Sushi / ink:** restrained type above a long sashimi image and a ruled menu sheet.
- **Steakhouse / fire:** an angular dish photograph, large block type, and grill ledger.
- **Dessert / patisserie:** a floating round dessert portrait and a delicate display menu.
- **Garden / botanical:** a leaf-shaped food image and garden-journal menu.
- **Trattoria / diagonal:** a tilted plate photograph and warm tablecloth menu.
- **Ice cream / scoop:** striped canopy, curved cone photograph, and flavor cards.
- **Farm table / harvest:** produce photography as a newspaper clipping and harvest bulletin.
- **Dim sum / fold:** overlapping paper frames, two dish photos, and a folded menu sheet.
- **Brunch / daybreak:** a diagonal breakfast table, small postcard, and bright menu page.
- **Roastery / roaster:** measured industrial photo strips and a bold coffee menu.
- **Oyster bar / shell:** rounded shell crop, circular seafood detail, and coastal rules.
- **Smokehouse / ember:** dark firelit composition and a broad grill ledger.
- **Shared table / linen:** soft tabletop imagery, a second bread photo, and quiet menu typography.
- **Tea house / ritual:** narrow photo panels, generous white space, and fine menu rules.
- **Burger counter / sticker:** punchy sticker shapes, paired food photos, and a bold order card.
- **Vegetable kitchen / mosaic:** tiled ingredient imagery and a garden-toned menu.
- **Food hall / signage:** wayfinding-inspired framing and contrasting street-food imagery.
- **Sweet shop / bonbon:** confectionery photo circles and a playful display menu.
- **Open kitchen / pass:** service-window framing, kitchen detail, and a chef's pass menu.
- **Market dispatch / broadsheet:** newspaper masthead, two-photo spread, and a columnar market menu.
- **Listening bar / record-sleeve:** a photo sleeve with a grooved record and a numbered drinks track list.
- **Curry counter / order-board:** illuminated signage, a bowl panorama, and a counter ordering board.
- **Flatbread house / table-runner:** a woven invitation between two dishes and a shared-plate menu.
- **Chocolate atelier / tasting-box:** a box-lid headline and individually divided tasting compartments.
- **Breakfast club / sunburst:** bold sunrise lettering, an angled social-table photograph, and a café menu.

The real photographs illustrate possible styles and do not represent FOH client work. No reference site's logo, screenshot, menu, or copy is used. The added compositions draw broad visual cues from the restaurant sites named in [this FoodNYC discussion](https://www.reddit.com/r/FoodNYC/comments/1h85551/restaurants_with_cool_websites/): lively graphic systems, food-first presentation, and spare editorial pacing.
