# Layout review — November 8, 2026

Reviewed the thirty existing concepts as a complete showcase: thirty landing views, thirty menus, the studio controls, color overview, and continuous scroll. Used the Distinctive Web skill's imagery-first, mobile-first review criteria.

## Findings and decisions

The earlier mobile layouts placed photographs at fixed coordinates and moved headlines down with 340–395px margins. Changes to the name, font, or screen width could break that relationship. Secondary images sometimes crossed the copy, the same first heading was styled differently in loop copies, some color combinations weakened small text, and the menus relied heavily on the same two-column arrangement.

Three mobile approaches were considered and retained where they suit the subject: immersive room/kitchen photography, framed food portraits followed by an invitation, and typography first with a precise photographic sequence. Frames and accents now live inside a reserved image stage; content determines the surrounding height. Restaurant/cuisine motifs remain specific to each concept. The desktop pass extends the successful mobile order into portrait columns, panorama bands, overlapping cards, and different menu arrangements.

Navigation reserves space for the fixed header through scroll margins rather than repeating empty header-height bands. A photographic style picker makes all thirty concepts directly reachable. Menu tabs wrap, have visible selection/focus, and support arrows, Home, and End. Text colors stay on controlled light/dark pairs regardless of accent hue. Motion is brief and non-blocking, and is removed under reduced motion.

## Concept-by-concept changes

| Concept | Review outcome |
| --- | --- |
| 01 Dining | Unified all heading copies; improved mobile room crop and scrim; letterpress menu overlaps the room photograph. |
| 02 Counter | Contained the tilted poster; reduced oversized block type; food photograph and takeaway tickets have separate space. |
| 03 Café | Arched window follows the header; headline stays clear; notebook and postcard balance the menu. |
| 04 Pizzeria | Round photo has a square aspect ratio; headline no longer crosses it; menu photo and order sheet remain distinct. |
| 05 Cocktail bar | Doorway crop has its own column; italic copy stays legible; photographic menu backdrop grows with its paper. |
| 06 Bakery | Counter card intentionally overlaps only the photograph; desktop menu uses a panoramic image and three shelf labels. |
| 07 Noodles | Bowl and chopstick ornament remain inside the image stage; compact type and dashed menu rows reduce crowding. |
| 08 Seafood | Broad scalloped horizon leads the mobile sequence; coastal ledger and tall photo balance desktop. |
| 09 Wine bistro | Tall wine portrait has a narrower desktop column; dark tasting card uses consistent light text. |
| 10 Diner | Checker trim moves with the image; reduced headline size; receipt rows stay readable with long labels. |
| 11 Cantina | Replaced accent-dependent headline contrast with a controlled signboard; retained room photography and banded menu. |
| 12 Sushi | Headline and photo now follow normal flow; supporting text sits beside the desktop title; double-rule menu remains spare. |
| 13 Steakhouse | Angular food crop stays beside the headline; menu masthead spans photo and grill ledger. |
| 14 Dessert studio | Rounded plate and fine number remain separate from copy; tall menu photograph balances dotted rows. |
| 15 Garden kitchen | Leaf crop no longer collides with the title; field-notebook edge and large photograph sustain the motif. |
| 16 Trattoria | Reduced photo rotation and contained its position; striped menu paper is paired with a framed food photo. |
| 17 Ice cream | Canopy follows the photo stage; cone stays visible; rounded flavor labels retain readable spacing. |
| 18 Farm table | Produce clipping and stamp stay together; a bulletin layout and larger food photograph occupy the menu. |
| 19 Dim sum | Both photos stay inside one stage; copy no longer competes with the smaller card; folded-paper menu is preserved. |
| 20 Brunch | Postcard is contained within the breakfast panorama; headline uses an accent rule; menu image remains prominent. |
| 21 Roastery | Industrial strip and espresso detail have deliberate proportions; bold copy and tasting card keep a clear reading order. |
| 22 Oyster bar | Shell crop and round detail no longer intrude on the invitation; menu uses coastal rules and a tall photo. |
| 23 Smokehouse | Grilling detail stays above mobile copy or to its right on desktop; butcher-paper menu has a broad masthead. |
| 24 Shared table | Bread inset remains inside the linen composition; separate invitation and menu paper avoid accidental overlaps. |
| 25 Tea house | Removed fixed photo positions beneath the heading; vessels follow the text on mobile and sit beside it on desktop. |
| 26 Burger stand | Checker trim and photo stickers stay together; high-contrast headline and ticket rows replace accent-dependent text. |
| 27 Vegetable kitchen | Adjusted the primary crop toward the food; asymmetric image windows and botanical rule stay clear of the copy. |
| 28 Food hall | Signboard text uses readable colors; kitchen detail stays in the image interval; menu uses a broad wayfinding masthead. |
| 29 Sweet counter | Curved pastry window contains the round detail; dotted menu sheet balances the larger food photograph. |
| 30 Open kitchen | Working-kitchen photo remains the backdrop; detail stays clear of text; chef's pass menu pairs food/process and dishes. |

## Verification

The production build validates both existing JSON schemas with Ajv 2020-12, checks unique IDs, all thirty layout keys, image references and files, and then runs TypeScript and Vite. All passed. `git diff --check` passed.

- Captured and inspected all thirty landing views and all thirty menus in the local browser at 390px and 1440px. Narrow-phone and style-picker screenshots were also inspected.
- Checked all thirty concepts at 320, 390, 430, 768, 900, 1024, 1440, and 1920px: no horizontal overflow, overflowing headings/menu labels, or secondary-photo/copy collisions. All three scroll copies have equal height at each width.
- Switched every menu using the keyboard, verified the selected panel in all three copies, and returned each to its first tab with Home. No failures.
- Verified style selection, dialog Escape, focus return, and menu jumps. Reduced motion disables animations and makes menu jumps immediate.
- Verified the color overview opens during slider interaction and closes on release without changing scroll position.
- Tested a 48-character restaurant name at 320px. No overflow; the reading position moved by less than one pixel.
- Temporarily changed the canonical JSON headline, tab label, long dish name, and menu image reference. The build passed and the browser displayed each change without overflow. Restored the original public copy and rebuilt.
- Verified scroll wrapping in both directions and matching loop-copy dimensions.
- Calculated the controlled palette's worst small-text contrast across 360 main hues: 4.61:1 against the lightest end of the medium-color gradient. This calculation is for those palette pairs, not a blanket accessibility certification of photographs.
- No browser console errors were observed in the final session.

Review images and geometry results are local artifacts under `G:\thisYourSite\layout-review`. `final-mobile` contains hero, menu, and menu-paper viewport captures for all thirty concepts; `final-desktop` contains all thirty heroes and menus. Browser QA was performed in Chromium; a separate Safari/Firefox device pass was not performed.

## Six additional layouts — November 10, 2026

Compared the new landing and menu views with the contact sheets of the original thirty. The new layouts use dedicated section markup, with shared controls for the showcase name, colors, style picker, and menu navigation.

| Concept | Structural choice |
| --- | --- |
| 31 Market dispatch | Newspaper headline, adjacent market photographs, and a columnar menu. |
| 32 Listening bar | Square photo sleeve and grooved record, with a vertical drinks selector and numbered track list. |
| 33 Curry counter | Illuminated title above a food panorama, followed by a counter board with large category buttons. |
| 34 Flatbread house | The invitation sits between two dish photographs, stacked on a phone and side by side on desktop. Menu items form a shared-plate grid. |
| 35 Chocolate atelier | A rectangular box-lid composition carries into divided tasting wells. |
| 36 Breakfast club | Oversized sunrise lettering and an angled table photograph, with a pill-shaped menu selector. |

Inspected the six landing and menu views at 390px and 1440px in Chromium. Checked geometry from 320px to 1920px, all 36 entries in the style picker and color overview, menu selection by click and keyboard, reduced-motion menu jumps, focus after choosing a style, and equal heights for the three scrolling copies. A 320 × 568 touch fixture rendered an edited headline, long dish name, and alternate photo from the JSON import.
