# Showcase content handoff

`content/showcase.json` is the source for the six concepts. `src/main.ts` imports it at build time and renders each concept's landing view, sample menu, and three visual copies used by the vertical loop. `content/showcase.schema.json` describes the file's structure.

Edit the copy, menu placeholders, contact address, and image paths in `content/showcase.json`, then run `npm run build`. Images live under `public/images`; each scene has a desktop WebP and a smaller mobile WebP. Keep meaningful alt text, `photoCredit`, and a verified `photoSource` link. See `docs/photo-sources.md` for the current license record.

The compact restaurant name field and vibe selector stay in the fixed studio header while the gallery scrolls. The name defaults to “Your restaurant” and updates all name placements with text content. Both controls are browser-only state, are cleared on refresh, and are never saved or sent. Sample menu rows are intentionally generic: they have no prices, service links, or claims about real clients. The only outgoing actions are the FOH home link and email links.

`defaultVibe` and `vibes` define the selector in `content/showcase.json`. The five supported IDs are `signature`, `coastal`, `garden`, `after-dark`, and `electric`. Their palettes live in `src/vibes.css`; adding a vibe requires a CSS palette and a schema enum update. The signature option preserves each scene's original colors. Other options apply one coordinated palette across all six scenes, including their frames, menu surfaces, and typography colors. They do not alter photo assets or layout geometry.

Each scene's `layout` selects its application-owned composition in `src/style.css`; `designSignature` records the intent behind that composition. The layout key is presentation data, not executable content. A new scene needs a corresponding layout style. Keep the content and all three rendered copies the same height so a scroll wrap preserves the visual position. Menu tab state is synchronized across copies for that reason.

## Visual direction

- **Dining / cinema:** full-room photography behind an editorial headline, then an overlapping letterpress menu page.
- **Counter / poster:** a tilted food-photo poster, block type, and takeaway-ticket menu rows.
- **Café / journal:** an arched photo window with a quiet type column, then a lined notebook and photo postcard.
- **Pizzeria / table:** a circular overhead food photo against tomato red, then an oven-ticket menu beside a round pizza image.
- **Cocktail bar / nocturne:** a tall doorway photo and late-night type, then a drinks list over a full-bleed service photograph.
- **Bakery / market:** a broad bread photo and flour-paper headline panel, then shelf-like menu cards under a photo strip.

The real photographs illustrate possible styles and do not represent FOH client work. No reference site's logo, screenshot, menu, or copy is used.
