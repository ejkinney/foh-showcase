import fs from 'node:fs';
import assert from 'node:assert/strict';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const read = path => JSON.parse(fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const site = read('content/showcase.json');
const library = read('content/asset-library.json');
for (const [data, schema] of [[site, 'content/showcase.schema.json'], [library, 'content/asset-library.schema.json']]) {
  const validate = ajv.compile(read(schema));
  assert(validate(data), JSON.stringify(validate.errors, null, 2));
}
const assets = new Map(library.assets.map(asset => [asset.id, asset]));
assert.equal(assets.size, library.assets.length, 'Asset IDs must be unique');
assert.equal(new Set(site.scenes.map(scene => scene.id)).size, site.scenes.length, 'Scene IDs must be unique');
assert.equal(new Set(site.scenes.map(scene => scene.layout)).size, site.scenes.length, 'Each scene must have its own layout');
const layouts = new Set(['layouts.css', 'new-layouts.css'].flatMap(file => {
  const styles = fs.readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
  return Array.from(styles.matchAll(/\.layout--([a-z-]+)\b/g), match => match[1]);
}));
for (const [index, scene] of site.scenes.entries()) {
  assert.equal(scene.number, String(index + 1).padStart(2, '0'), `Incorrect scene number: ${scene.id}`);
  assert(layouts.has(scene.layout), `Missing layout: ${scene.layout}`);
  for (const id of [scene.heroAssetId, scene.menuAssetId]) {
    const asset = assets.get(id);
    assert(asset, `Missing asset: ${id}`);
    for (const path of [asset.image, asset.smallImage]) {
      assert(fs.existsSync(new URL(`../public${path}`, import.meta.url)), `Missing image: ${path}`);
    }
  }
}
console.log(`Validated ${site.scenes.length} layouts, both content schemas, unique IDs, asset references, and image files.`);
