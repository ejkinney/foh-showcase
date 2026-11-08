# Showcase content handoff

`content/showcase.json` is the source for the 30 concepts. `src/main.ts` imports it at build time and renders each concept's landing view, sample menu, and three visual copies used by the vertical loop. `content/showcase.schema.json` describes the file's structure.

Edit the copy, menu placeholders, contact address, and `heroAssetId` / `menuAssetId` in `content/showcase.json`, then run `npm run build`. The IDs refer to `content/asset-library.json`, which records alt text, author, Commons source and CC0 license for each photo. Optimized desktop and phone files live under `public/images`. See `docs/asset-library.md` for the asset workflow.

The compact restaurant name field and two color sliders stay in the fixed studio header while the gallery scrolls. The name defaults to “Your restaurant” and updates all name placements with text content. Moving a slider opens a 30-concept overview with a smooth zoom; releasing it returns to the same scroll position. These controls are browser-only state, are cleared on refresh, and are never saved or sent. Sample menu rows are intentionally generic: they have no prices, service links, or claims about real clients. The only outgoing actions are the FOH home link, email links, and photograph source links.

`defaultColors` defines the starting main and accent hues in `content/showcase.json`. Both values are integers from 0 to 359. `src/main.ts` generates a coordinated palette from the slider values; `src/vibes.css`, `src/expansion.css`, and `src/expansion2.css` apply it across all 30 scenes, including frames, menus, and text colors. The sliders do not alter photographs or layout geometry. `src/overview.css` defines the zoomed-out preview shown during color adjustments.

Each scene's `layout` selects its application-owned composition in `src/style.css`, `src/expansion.css`, or `src/expansion2.css`; `designSignature` records the intent behind that composition. `previewLabel` is the short caption in the color overview. The layout key is presentation data, not executable content. A new scene needs a corresponding layout style and miniature treatment. Keep the content and all three rendered copies the same height so a scroll wrap preserves the visual position. Menu tab state is synchronized across copies for that reason.

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

The real photographs illustrate possible styles and do not represent FOH client work. No reference site's logo, screenshot, menu, or copy is used. The added compositions draw broad visual cues from the restaurant sites named in [this FoodNYC discussion](https://www.reddit.com/r/FoodNYC/comments/1h85551/restaurants_with_cool_websites/): lively graphic systems, food-first presentation, and spare editorial pacing.
