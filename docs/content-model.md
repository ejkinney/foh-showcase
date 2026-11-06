# Showcase content handoff

`content/showcase.json` is the source for the six concepts. `src/main.ts` imports it at build time and renders each concept's landing view, sample menu, and three visual copies used by the vertical loop. `content/showcase.schema.json` describes the file's structure.

Edit the copy, menu placeholders, contact address, and image paths in `content/showcase.json`, then run `npm run build`. Images live under `public/images`; each scene has a desktop WebP and a smaller mobile WebP. Keep meaningful alt text, `photoCredit`, and a verified `photoSource` link. See `docs/photo-sources.md` for the current license record.

The restaurant name field is browser-only state. It defaults to “Your restaurant,” updates all visible name placements with text content, and is cleared on refresh. Sample menu rows are intentionally generic: they have no prices, service links, or claims about real clients. The only outgoing actions are the FOH home link and email links.

The six scene IDs are also CSS theme keys in `src/style.css`. A new scene needs a corresponding theme style. Keep the content and all three rendered copies the same height so a scroll wrap preserves the visual position. Menu tab state is synchronized across copies for that reason.

## Visual direction

- **Dining:** moody room photography, a high-contrast editorial serif, a spacious menu card. The atmospheric emphasis draws from the dining examples in Framer's restaurant roundup.
- **Counter:** oversized display type, vivid food photography, quick menu scanning. The energy draws from the roundup's counter-service examples.
- **Café:** sunlit product photography, soft curves, warm paper and cocoa tones. The inviting mood draws from the roundup's café and bakery examples.
- **Pizzeria:** overhead food photography, tomato red and warm cream, expressive serif type.
- **Cocktail bar:** a close-up service moment, dark plum and amber, italic editorial type.
- **Bakery:** a human food moment, pale green and flour-toned paper, a calm menu-first composition.

The real photographs illustrate possible styles and do not represent FOH client work. No reference site's logo, screenshot, menu, or copy is used.
