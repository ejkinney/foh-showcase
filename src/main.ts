import content from '../content/showcase.json';
import assetContent from '../content/asset-library.json';
import { sceneCompositions } from './scene-compositions';
import './foundation.css';
import './layouts.css';
import './gallery.css';
import './new-layouts.css';

type Tab = { label: string; items: string[] };
type Asset = { id: string; alt: string; author: string; sourceUrl: string; image: string; smallImage: string; sourceWidth: number; sourceHeight: number };
type Scene = {
  id: string;
  layout: string;
  designSignature: string;
  number: string;
  styleLabel: string;
  previewLabel: string;
  heroLine: string;
  heroSupport: string;
  menuLine: string;
  menuSupport: string;
  heroAssetId: string;
  menuAssetId: string;
  tabs: Tab[];
};

const site = content as {
  defaultRestaurantName: string;
  defaultColors: { baseHue: number; accentHue: number };
  contactEmail: string;
  scenes: Scene[];
};
const assets = new Map((assetContent.assets as Asset[]).map((asset) => [asset.id, asset]));
function getAsset(id: string): Asset {
  const asset = assets.get(id);
  if (!asset) throw new Error(`Missing asset: ${id}`);
  return asset;
}
document.documentElement.dataset.vibe = 'custom';
const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Showcase mount was not found');

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

const emailHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent('Let’s make my restaurant site')}`;
const sceneTotal = String(site.scenes.length).padStart(2, '0');
const awning = `<span class="foh-mark" aria-hidden="true"><span class="foh-awning">${Array.from({ length: 9 }, () => '<i></i>').join('')}</span><strong>FOH</strong></span>`;
const initialName = escapeHtml(site.defaultRestaurantName);

function photo(asset: Asset, extraClass: string, eager = false, decorative = false): string {
  return `<picture class="${extraClass}">
    <source media="(max-width: 700px)" srcset="${asset.smallImage}" />
    <img src="${asset.image}" alt="${decorative ? '' : escapeHtml(asset.alt)}" width="${asset.sourceWidth}" height="${asset.sourceHeight}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''} />
  </picture>`;
}

function credit(asset: Asset, copy: number): string {
  return `<a href="${escapeHtml(asset.sourceUrl)}" target="_blank" rel="noopener noreferrer"${copy !== 0 ? ' tabindex="-1"' : ''}>${escapeHtml(asset.author)}</a>`;
}

function menuTabs(scene: Scene, copy: number, numbered: boolean, vertical: boolean): { tabs: string; panels: string } {
  const tabs = `<div class="menu-tabs" role="tablist" aria-label="${escapeHtml(scene.styleLabel)} sample menu"${vertical ? ' aria-orientation="vertical"' : ''}>
    ${scene.tabs.map((tab, index) => `<button class="menu-tab" type="button" role="tab"
      id="tab-${scene.id}-${copy}-${index}" aria-controls="panel-${scene.id}-${copy}-${index}"
      aria-selected="${index === 0}" tabindex="${copy === 0 && index === 0 ? '0' : '-1'}"
      data-scene="${scene.id}" data-tab="${index}">${escapeHtml(tab.label)}</button>`).join('')}
  </div>`;
  const panels = scene.tabs.map((tab, index) => `<div class="menu-panel" role="tabpanel"
    id="panel-${scene.id}-${copy}-${index}" aria-labelledby="tab-${scene.id}-${copy}-${index}" tabindex="${copy === 0 ? '0' : '-1'}"${index ? ' hidden' : ''}>
    ${tab.items.map((item, itemIndex) => `<div class="menu-item">${numbered ? `<span class="menu-item__number" aria-hidden="true">${String(itemIndex + 1).padStart(2, '0')}</span>` : ''}<span class="menu-item__name">${escapeHtml(item)}</span>${numbered ? '<span class="menu-item__glyph" aria-hidden="true">✳</span>' : ''}</div>`).join('')}
  </div>`).join('');
  return { tabs, panels };
}

function chapter(scene: Scene, copy: number): string {
  const first = scene.id === site.scenes[0].id;
  const headingTag = first && copy === 0 ? 'h1' : 'h2';
  const heroAsset = getAsset(scene.heroAssetId);
  const menuAsset = getAsset(scene.menuAssetId);
  const twoPhotos = heroAsset.id !== menuAsset.id;
  const header = `<div class="demo-header"><span class="demo-name restaurant-name">${initialName}</span><button type="button" class="demo-menu-link" data-menu-jump${copy !== 0 ? ' tabindex="-1"' : ''}>View menu <span aria-hidden="true">↗</span></button></div>`;
  const title = `<${headingTag} class="hero__title">${escapeHtml(scene.heroLine)}</${headingTag}>`;
  const support = `<p class="hero__support">${escapeHtml(scene.heroSupport)}</p>`;
  const menuTitle = `<h3>${escapeHtml(scene.menuLine)}</h3>`;
  const menuSupport = `<p>${escapeHtml(scene.menuSupport)}</p>`;
  const credits = `<p class="menu__disclaimer">Menu wording is illustrative. Your real dishes take this space.<br />Real ${twoPhotos ? 'photographs' : 'photograph'} by ${credit(heroAsset, copy)}${twoPhotos ? ` and ${credit(menuAsset, copy)}` : ''}, CC0.</p>`;
  const close = `<div class="menu__close"><a href="${emailHref}"${copy !== 0 ? ' tabindex="-1"' : ''}>Let’s make yours <span aria-hidden="true">↗</span></a></div>`;
  const compose = sceneCompositions.get(scene.layout);
  if (compose) {
    const recordSleeve = scene.layout === 'record-sleeve';
    const composition = compose({
      header, title, support, menuTitle, menuSupport, credits, close,
      lead: photo(heroAsset, 'scene-lead', first && copy === 0),
      detail: photo(menuAsset, 'scene-detail', false, true),
      menuPhoto: photo(menuAsset, 'scene-menu-photo'),
      controls: menuTabs(scene, copy, recordSleeve, recordSleeve),
    });
    return `<article class="chapter chapter--${scene.id} layout--${scene.layout} chapter--composed" data-scene="${scene.id}" aria-label="${escapeHtml(scene.styleLabel)} concept">${composition}</article>`;
  }

  const numberedMenu = ['poster', 'noodle', 'checkered', 'roaster', 'pass'].includes(scene.layout);
  const { tabs, panels } = menuTabs(scene, copy, numberedMenu, false);
  return `<article class="chapter chapter--${scene.id} layout--${scene.layout} chapter--original" data-scene="${scene.id}" aria-label="${escapeHtml(scene.styleLabel)} concept">
    <section class="hero" aria-label="${escapeHtml(scene.styleLabel)} landing page concept">
      <div class="hero__inner">
        ${header}
        <div class="hero__stage">
          <div class="hero__media">${photo(heroAsset, 'hero__photo', first && copy === 0)}</div>
          ${twoPhotos ? `<div class="hero__accent" aria-hidden="true">${photo(menuAsset, 'hero__accent-photo', false, true)}</div>` : ''}
          <div class="hero__wash" aria-hidden="true"></div>
        </div>
        <div class="hero__copy"><p class="eyebrow">${escapeHtml(scene.styleLabel)}</p>${title}${support}</div>
      </div>
    </section>
    <section class="menu" aria-label="${escapeHtml(scene.styleLabel)} menu concept">
      <div class="menu__shell">
        <div class="menu__intro">${menuTitle}${menuSupport}</div>
        ${tabs}${panels}
        <div class="menu__visual">${photo(menuAsset, 'menu__photo')}</div>
        ${credits}
        ${close}
      </div>
    </section>
  </article>`;
}

function cycle(copy: number): string {
  return `<div class="cycle" data-copy="${copy}"${copy !== 0 ? ' aria-hidden="true"' : ' id="main-content" tabindex="-1"'}>
    ${site.scenes.map((scene) => chapter(scene, copy)).join('')}
  </div>`;
}

function overviewCard(scene: Scene): string {
  const heroAsset = getAsset(scene.heroAssetId);
  return `<article class="overview-card layout--${scene.layout}" data-scene="${scene.id}">
    <img class="overview-card__image" src="${heroAsset.smallImage}" alt="" width="${heroAsset.sourceWidth}" height="${heroAsset.sourceHeight}" loading="lazy" decoding="async" />
    <div class="overview-card__top"><span class="restaurant-name">${initialName}</span><span>${escapeHtml(scene.number)}</span></div>
    <div class="overview-card__bottom"><strong>${escapeHtml(scene.previewLabel)}</strong><span class="overview-card__menu" aria-hidden="true"><i></i><i></i><i></i></span></div>
  </article>`;
}

app.innerHTML = `<header class="studio-header">
  <div class="studio-header__identity"><a class="studio-header__brand" href="https://fohrestaurants.com/" aria-label="Front of House home">${awning}<span class="studio-header__wordmark">FRONT <em>OF</em> HOUSE<small>RESTAURANT WEB STUDIO</small></span></a><button class="browse-button" type="button" data-browse aria-haspopup="dialog">Browse styles <span id="scene-counter">01 / ${sceneTotal}</span><span aria-hidden="true">▦</span></button></div>
  <div class="personalizer" role="group" aria-label="Personalize the website examples">
    <label class="personalizer__field personalizer__field--name" for="restaurant-name"><span>Restaurant name</span><input id="restaurant-name" class="name-input" type="text" maxlength="48" autocomplete="off" spellcheck="false" placeholder="Your restaurant" aria-describedby="personalizer-note" /></label>
    <label class="personalizer__field personalizer__field--range" for="base-hue"><span><i class="color-swatch color-swatch--base" aria-hidden="true"></i>Main color</span><input id="base-hue" class="color-slider" type="range" min="0" max="359" step="1" value="${site.defaultColors.baseHue}" aria-describedby="personalizer-note" /></label>
    <label class="personalizer__field personalizer__field--range" for="accent-hue"><span><i class="color-swatch color-swatch--accent" aria-hidden="true"></i>Accent</span><input id="accent-hue" class="color-slider" type="range" min="0" max="359" step="1" value="${site.defaultColors.accentHue}" aria-describedby="personalizer-note" /></label>
    <span class="sr-only" id="personalizer-note">Changes only this preview. Drag a color slider to see all ${site.scenes.length} sites. Nothing is saved or sent.</span>
    <span class="sr-only" id="color-preview-status" role="status" aria-live="polite"></span>
  </div>
  <a href="${emailHref}" class="studio-header__cta">Let’s make yours <span aria-hidden="true">↗</span></a>
</header>
<main class="showcase" aria-label="Restaurant website concepts">${cycle(-1)}${cycle(0)}${cycle(1)}</main>
<div class="overview" aria-hidden="true" inert><div class="overview__heading"><strong>All ${site.scenes.length}, your colors.</strong><span>Release to return to the site</span></div><div class="overview__grid">${site.scenes.map(overviewCard).join('')}</div></div>
<aside class="contact-rail" aria-label="Contact Front of House"><span>YOUR WEBSITE IS YOUR NEW FRONT OF HOUSE</span><a href="${emailHref}">Let’s make yours <span aria-hidden="true">↗</span></a></aside>`;

app.insertAdjacentHTML('beforeend', `<dialog class="style-browser" aria-labelledby="style-browser-title">
  <div class="style-browser__header"><h2 id="style-browser-title">Browse ${site.scenes.length} restaurant styles</h2><button type="button" class="style-browser__close" aria-label="Close style browser">✕</button></div>
  <div class="style-browser__grid">${site.scenes.map(scene => `<button type="button" class="style-choice" data-choose-scene="${scene.id}"><img src="${getAsset(scene.heroAssetId).smallImage}" alt="" width="360" height="240" loading="lazy" decoding="async" /><span><small>${scene.number}</small><strong>${escapeHtml(scene.styleLabel)}</strong><i aria-hidden="true">↗</i></span></button>`).join('')}</div>
</dialog>`);

const middle = document.querySelector<HTMLElement>('.cycle[data-copy="0"]')!;
const last = document.querySelector<HTMLElement>('.cycle[data-copy="1"]')!;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const styleBrowser = document.querySelector<HTMLDialogElement>('.style-browser')!;
const browseButton = document.querySelector<HTMLButtonElement>('[data-browse]')!;
browseButton.addEventListener('click', () => { styleBrowser.showModal(); document.documentElement.classList.add('is-browsing'); });
styleBrowser.querySelector('.style-browser__close')!.addEventListener('click', () => styleBrowser.close());
styleBrowser.addEventListener('close', () => { document.documentElement.classList.remove('is-browsing'); });
styleBrowser.addEventListener('click', (event) => {
  const choice = (event.target as Element).closest<HTMLElement>('[data-choose-scene]');
  if (!choice) return;
  const chapter = middle.querySelector<HTMLElement>(`.chapter[data-scene="${choice.dataset.chooseScene}"]`);
  styleBrowser.close();
  chapter?.scrollIntoView({ behavior: 'instant', block: 'start' });
  chapter?.querySelector<HTMLButtonElement>('[data-menu-jump]')?.focus({ preventScroll: true });
});
let scrollTicking = false;
let userInteracted = false;
for (const eventName of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
  window.addEventListener(eventName, () => { userInteracted = true; }, { once: true, passive: true });
}

function updateCounter(): void {
  const chapters = document.querySelectorAll<HTMLElement>('.chapter');
  const probe = window.innerHeight * 0.42;
  for (const chapter of chapters) {
    const rect = chapter.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom > probe) {
      const number = site.scenes.find((scene) => scene.id === chapter.dataset.scene)?.number;
      if (number) document.querySelector('#scene-counter')!.textContent = `${number} / ${sceneTotal}`;
      break;
    }
  }
}

function keepLooping(): void {
  const headerHeight = document.querySelector('.studio-header')!.getBoundingClientRect().height;
  const start = middle.offsetTop - headerHeight;
  const end = last.offsetTop - headerHeight;
  const length = end - start;
  const y = window.scrollY;
  if (length > 0 && y < start - 1) window.scrollTo({ top: y + length, behavior: 'instant' });
  else if (length > 0 && y >= end - 1) window.scrollTo({ top: y - length, behavior: 'instant' });
  updateCounter();
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    window.requestAnimationFrame(keepLooping);
  }
}, { passive: true });

function setTab(sceneId: string, selected: number): void {
  const anchor = captureReadingPosition();
  document.querySelectorAll<HTMLElement>(`.chapter[data-scene="${sceneId}"]`).forEach((chapter) => {
    const central = chapter.closest('.cycle')?.getAttribute('data-copy') === '0';
    chapter.querySelectorAll<HTMLButtonElement>('.menu-tab').forEach((button, index) => {
      button.setAttribute('aria-selected', String(index === selected));
      button.tabIndex = central && index === selected ? 0 : -1;
    });
    chapter.querySelectorAll<HTMLElement>('.menu-panel').forEach((panel, index) => {
      panel.hidden = index !== selected;
    });
  });
  restoreReadingPosition(anchor);
}

function captureReadingPosition(): { element: HTMLElement; top: number } | undefined {
  const probe = document.querySelector('.studio-header')!.getBoundingClientRect().bottom + 16;
  const element = [...middle.querySelectorAll<HTMLElement>('.hero, .menu')].find(el => {
    const rect = el.getBoundingClientRect();
    return rect.top <= probe && rect.bottom > probe;
  });
  return element ? { element, top: element.getBoundingClientRect().top } : undefined;
}

function restoreReadingPosition(anchor: ReturnType<typeof captureReadingPosition>): void {
  if (anchor) window.scrollBy({ top: anchor.element.getBoundingClientRect().top - anchor.top, behavior: 'instant' });
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const tab = target.closest<HTMLButtonElement>('.menu-tab');
  if (tab?.dataset.scene && tab.dataset.tab) {
    setTab(tab.dataset.scene, Number(tab.dataset.tab));
    return;
  }
  const jump = target.closest<HTMLButtonElement>('[data-menu-jump]');
  if (jump) {
    jump.closest('.chapter')?.querySelector('.menu')?.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  }
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.matches('.menu-tab')) return;
  const tablist = target.closest('.menu-tabs');
  const vertical = tablist?.getAttribute('aria-orientation') === 'vertical';
  const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
  if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const scene = site.scenes.find((item) => item.id === target.dataset.scene);
  if (!scene) return;
  const current = Number(target.dataset.tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? scene.tabs.length - 1
    : (current + (event.key === nextKey ? 1 : -1) + scene.tabs.length) % scene.tabs.length;
  setTab(scene.id, next);
  tablist?.querySelectorAll<HTMLButtonElement>('.menu-tab')[next]?.focus();
});

document.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches('.name-input')) return;
  const value = target.value.replace(/\s+/g, ' ').trim();
  const name = value || site.defaultRestaurantName;
  const anchor = captureReadingPosition();
  document.querySelectorAll<HTMLElement>('.restaurant-name').forEach((element) => { element.textContent = name; });
  restoreReadingPosition(anchor);
});

const baseSlider = document.querySelector<HTMLInputElement>('#base-hue')!;
const accentSlider = document.querySelector<HTMLInputElement>('#accent-hue')!;
const overview = document.querySelector<HTMLElement>('.overview')!;
const previewStatus = document.querySelector<HTMLElement>('#color-preview-status')!;
const colorKeys = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown']);
let pointerAdjusting = false;
let keyboardAdjusting = false;

function colorName(hue: number): string {
  if (hue < 15 || hue >= 345) return 'red';
  if (hue < 45) return 'orange';
  if (hue < 70) return 'yellow';
  if (hue < 165) return 'green';
  if (hue < 195) return 'teal';
  if (hue < 255) return 'blue';
  if (hue < 290) return 'violet';
  return 'pink';
}

function applyColors(): void {
  const base = Number(baseSlider.value);
  const accent = Number(accentSlider.value);
  const style = document.documentElement.style;
  style.setProperty('--v-deep', `hsl(${base} 38% 17%)`);
  style.setProperty('--v-mid', `hsl(${base} 40% 26%)`);
  style.setProperty('--v-light', `hsl(${base} 38% 93%)`);
  style.setProperty('--v-bright', `hsl(${base} 62% 77%)`);
  style.setProperty('--v-paper', `hsl(${base} 38% 97%)`);
  style.setProperty('--v-accent', `hsl(${accent} 76% 53%)`);
  style.setProperty('--v-swatch', `hsl(${base} 44% 43%)`);
  style.setProperty('--base-swatch', `hsl(${base} 55% 45%)`);
  style.setProperty('--accent-swatch', `hsl(${accent} 76% 53%)`);
  baseSlider.setAttribute('aria-valuetext', `Main color: ${colorName(base)}`);
  accentSlider.setAttribute('aria-valuetext', `Accent color: ${colorName(accent)}`);
}

function showOverview(): void {
  if (document.documentElement.classList.contains('is-overview')) return;
  const current = Number(document.querySelector('#scene-counter')?.textContent?.slice(0, 2)) - 1;
  const columns = window.innerWidth < 700 ? 5 : 6;
  const index = Number.isFinite(current) && current >= 0 ? current : 0;
  overview.style.setProperty('--overview-origin-x', `${((index % columns) + .5) / columns * 100}%`);
  overview.style.setProperty('--overview-origin-y', `${(Math.floor(index / columns) + .5) / Math.ceil(site.scenes.length / columns) * 100}%`);
  document.documentElement.classList.add('is-overview');
  previewStatus.textContent = `Color overview open. All ${site.scenes.length} examples are changing together.`;
}

function hideOverview(): void {
  if (!document.documentElement.classList.contains('is-overview')) return;
  document.documentElement.classList.remove('is-overview');
  previewStatus.textContent = 'Returned to the restaurant page.';
}

for (const slider of [baseSlider, accentSlider]) {
  slider.addEventListener('pointerdown', () => { pointerAdjusting = true; showOverview(); });
  slider.addEventListener('input', () => { applyColors(); showOverview(); });
  slider.addEventListener('keydown', (event) => {
    if (colorKeys.has(event.key)) { keyboardAdjusting = true; showOverview(); }
  });
  slider.addEventListener('keyup', (event) => {
    if (colorKeys.has(event.key)) { keyboardAdjusting = false; hideOverview(); }
  });
  slider.addEventListener('change', () => { if (!pointerAdjusting && !keyboardAdjusting) hideOverview(); });
  slider.addEventListener('blur', () => { pointerAdjusting = false; keyboardAdjusting = false; hideOverview(); });
}
window.addEventListener('pointerup', () => { pointerAdjusting = false; hideOverview(); });
window.addEventListener('pointercancel', () => { pointerAdjusting = false; hideOverview(); });
window.addEventListener('blur', hideOverview);
document.addEventListener('visibilitychange', () => { if (document.hidden) hideOverview(); });
applyColors();

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function scrollToOpening(): void {
  window.scrollTo({ top: middle.offsetTop - document.querySelector('.studio-header')!.getBoundingClientRect().height, behavior: 'instant' });
}
scrollToOpening();
window.requestAnimationFrame(() => {
  scrollToOpening();
  document.documentElement.classList.add('ready');
  updateCounter();
});
document.fonts.ready.then(() => {
  if (!userInteracted) scrollToOpening();
});
