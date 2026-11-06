import content from '../content/showcase.json';
import './style.css';

type Tab = { label: string; items: string[] };
type Scene = {
  id: string;
  number: string;
  styleLabel: string;
  heroLine: string;
  heroSupport: string;
  menuLine: string;
  menuSupport: string;
  image: string;
  smallImage: string;
  imageAlt: string;
  photoCredit: string;
  photoSource: string;
  tabs: Tab[];
};

const site = content as {
  defaultRestaurantName: string;
  contactEmail: string;
  scenes: Scene[];
};
const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Showcase mount was not found');

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

const emailHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent('Let’s make my restaurant site')}`;
const sceneTotal = String(site.scenes.length).padStart(2, '0');
const awning = `<span class="foh-mark" aria-hidden="true"><span class="foh-awning">${Array.from({ length: 9 }, () => '<i></i>').join('')}</span><strong>FOH</strong></span>`;
const initialName = escapeHtml(site.defaultRestaurantName);

function photo(scene: Scene, extraClass: string, eager = false): string {
  return `<picture class="${extraClass}">
    <source media="(max-width: 700px)" srcset="${scene.smallImage}" />
    <img src="${scene.image}" alt="${escapeHtml(scene.imageAlt)}" width="1536" height="1024" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''} />
  </picture>`;
}

function menuTabs(scene: Scene, copy: number): string {
  return `<div class="menu-tabs" role="tablist" aria-label="${escapeHtml(scene.styleLabel)} sample menu">
    ${scene.tabs.map((tab, index) => `<button class="menu-tab" type="button" role="tab"
      id="tab-${scene.id}-${copy}-${index}" aria-controls="panel-${scene.id}-${copy}-${index}"
      aria-selected="${index === 0}" tabindex="${copy === 0 && index === 0 ? '0' : '-1'}"
      data-scene="${scene.id}" data-tab="${index}">${escapeHtml(tab.label)}</button>`).join('')}
  </div>
  ${scene.tabs.map((tab, index) => `<div class="menu-panel" role="tabpanel"
    id="panel-${scene.id}-${copy}-${index}" aria-labelledby="tab-${scene.id}-${copy}-${index}"${index ? ' hidden' : ''}>
    ${tab.items.map((item, itemIndex) => `<div class="menu-item"><span class="menu-item__number">0${itemIndex + 1}</span><span class="menu-item__name">${escapeHtml(item)}</span><span class="menu-item__glyph" aria-hidden="true">✳</span></div>`).join('')}
  </div>`).join('')}`;
}

function chapter(scene: Scene, copy: number): string {
  const first = scene.id === site.scenes[0].id;
  const headingTag = first && copy === 0 ? 'h1' : 'h2';
  const inputId = `restaurant-name-${copy}`;
  return `<article class="chapter chapter--${scene.id}" data-scene="${scene.id}" aria-label="${escapeHtml(scene.styleLabel)} concept">
    <section class="hero" aria-label="${escapeHtml(scene.styleLabel)} landing page concept">
      ${photo(scene, 'hero__photo', first && copy === 0)}
      <div class="hero__wash" aria-hidden="true"></div>
      <div class="hero__inner">
        <div class="demo-header"><span class="demo-name restaurant-name">${initialName}</span><span class="demo-header__right"><span>Visual concept</span><button type="button" class="demo-menu-link" data-menu-jump${copy !== 0 ? ' tabindex="-1"' : ''}>View your menu <span aria-hidden="true">↗</span></button></span></div>
        <div class="hero__copy"><p class="eyebrow">${escapeHtml(scene.number)} / ${escapeHtml(scene.styleLabel)}</p><${headingTag}>${escapeHtml(scene.heroLine)}</${headingTag}><p class="hero__support">${escapeHtml(scene.heroSupport)}</p>
          ${first ? `<div class="name-panel"><label for="${inputId}">Try your name here</label><div class="name-panel__field"><input id="${inputId}" class="name-input" type="text" maxlength="48" autocomplete="off" spellcheck="false" placeholder="Your restaurant" value=""${copy !== 0 ? ' disabled' : ''} /><span aria-hidden="true">↗</span></div><p>Just for this visit. Nothing is saved.</p></div>` : ''}
        </div>
        <div class="hero__foot"><span>Picture your place here</span><span class="scroll-cue">Scroll to explore <span aria-hidden="true">↓</span></span></div>
      </div>
    </section>
    <section class="menu" aria-label="${escapeHtml(scene.styleLabel)} menu concept">
      <div class="menu__intro"><p class="eyebrow">Your food belongs here</p><h3>${escapeHtml(scene.menuLine)}</h3><p>${escapeHtml(scene.menuSupport)}</p></div>
      <div class="menu__composition">
        <div class="menu__visual">${photo(scene, 'menu__photo')}<span class="menu__visual-label">VISUAL CONCEPT <span aria-hidden="true">↗</span></span></div>
        <div class="menu__paper"><div class="menu__masthead"><span class="restaurant-name">${initialName}</span><span>YOUR MENU</span></div>
          <p class="menu__small-label">The good stuff, all in one place</p>${menuTabs(scene, copy)}
          <p class="menu__disclaimer">Menu wording is illustrative. Your real dishes take this space.<br />Real photograph by <a href="${escapeHtml(scene.photoSource)}" target="_blank" rel="noopener noreferrer"${copy !== 0 ? ' tabindex="-1"' : ''}>${escapeHtml(scene.photoCredit)}</a>, CC0.</p>
        </div>
      </div>
      <div class="menu__close"><span>Made for your restaurant, not a template.</span><a href="${emailHref}"${copy !== 0 ? ' tabindex="-1"' : ''}>Let’s make yours <span aria-hidden="true">↗</span></a></div>
    </section>
  </article>`;
}

function cycle(copy: number): string {
  return `<div class="cycle" data-copy="${copy}"${copy !== 0 ? ' aria-hidden="true"' : ' id="main-content" tabindex="-1"'}>
    ${site.scenes.map((scene) => chapter(scene, copy)).join('')}
  </div>`;
}

app.innerHTML = `<header class="studio-header">
  <a class="studio-header__brand" href="https://fohrestaurants.com/" aria-label="Front of House home">${awning}<span class="studio-header__wordmark">FRONT <em>OF</em> HOUSE<small>RESTAURANT WEB STUDIO</small></span></a>
  <div class="studio-header__right"><span class="studio-header__counter" id="scene-counter">01 / ${sceneTotal}</span><a href="${emailHref}" class="studio-header__cta">Let’s make yours <span aria-hidden="true">↗</span></a></div>
</header>
<main class="showcase" aria-label="Restaurant website concepts">${cycle(-1)}${cycle(0)}${cycle(1)}</main>
<aside class="contact-rail" aria-label="Contact Front of House"><span>YOUR WEBSITE IS YOUR NEW FRONT OF HOUSE</span><a href="${emailHref}">Let’s make yours <span aria-hidden="true">↗</span></a></aside>`;

const middle = document.querySelector<HTMLElement>('.cycle[data-copy="0"]')!;
const last = document.querySelector<HTMLElement>('.cycle[data-copy="1"]')!;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
  const start = middle.offsetTop;
  const end = last.offsetTop;
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
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const scene = site.scenes.find((item) => item.id === target.dataset.scene);
  if (!scene) return;
  const current = Number(target.dataset.tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? scene.tabs.length - 1
    : (current + (event.key === 'ArrowRight' ? 1 : -1) + scene.tabs.length) % scene.tabs.length;
  setTab(scene.id, next);
  target.closest('.menu-tabs')?.querySelectorAll<HTMLButtonElement>('.menu-tab')[next]?.focus();
});

document.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches('.name-input')) return;
  const value = target.value.replace(/\s+/g, ' ').trim();
  const name = value || site.defaultRestaurantName;
  document.querySelectorAll<HTMLElement>('.restaurant-name').forEach((element) => { element.textContent = name; });
  document.querySelectorAll<HTMLInputElement>('.name-input:disabled').forEach((input) => { input.value = target.value; });
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo({ top: middle.offsetTop, behavior: 'instant' });
window.requestAnimationFrame(() => {
  window.scrollTo({ top: middle.offsetTop, behavior: 'instant' });
  document.documentElement.classList.add('ready');
  updateCounter();
});
document.fonts.ready.then(() => {
  if (!userInteracted) window.scrollTo({ top: middle.offsetTop, behavior: 'instant' });
});
