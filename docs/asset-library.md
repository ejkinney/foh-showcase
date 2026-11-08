# CC0 photography library

`content/asset-library.json` is the source of truth for 66 real photographs used or available for the showcase. Each record has its Wikimedia Commons file page, credited photographer, license URL, verification date, descriptive alt text, source dimensions, and paths to local WebP versions. The 18 original photos are grouped as `original-concepts`; the 48 new photos are grouped in 12 sets of four: dim sum, brunch, coffee, seafood, smokehouse, shared table, tea, burger, vegetables, markets, desserts, and restaurant interiors. Twelve new concepts use two distinct photos each, leaving 24 new photos available for later layouts.

Every record was checked against its individual Commons API file record for `LicenseShortName: CC0`, then the photo was resized locally for desktop and phone. [Commons reuse guidance](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/en) calls for checking the file page itself. [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) allows commercial reuse and adaptation without required attribution, though it does not cover trademarks, privacy, or publicity rights. The showcase still credits photographers and links to their file pages. When choosing new photos, avoid prominent logos, recognizable people, or claims that a pictured venue is an FOH client.

## Reuse a photo in a concept

Set a scene's `heroAssetId` and `menuAssetId` in `content/showcase.json` to IDs from the catalog. The hero photo fills the main landing image; when the two IDs differ, the menu photo also appears as a smaller detail in the landing view. The menu uses `menuAssetId`. Both photographers are credited in the sample menu. All imagery is labeled as a visual concept.

## Add more CC0 photos

1. Find a suitable Wikimedia Commons file and verify that **that file page** lists CC0. Record its exact `File:...` title, a unique ID, and a subject category in `content/asset-seeds.json`.
2. Run `powershell -File scripts/sync-assets.ps1`. The script rechecks the individual Commons API license and downloads optimized desktop and phone WebP files. It refuses files that are not reported as CC0 or are too small.
3. Review the generated `content/asset-library.json` record, especially `alt` and `author`, and inspect the picture itself for quality and recognizable people or marks. The script preserves hand-edited alt text and author names on later runs.
4. Run `powershell -File scripts/sync-assets.ps1 -VerifyOnly` and `npm run build` before release.

The source title and verified metadata travel with each asset. Keep the catalog and image files together when moving the site. The `content/asset-library.schema.json` file describes the catalog format.
