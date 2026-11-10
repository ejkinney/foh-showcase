type SceneParts = {
  header: string;
  title: string;
  support: string;
  lead: string;
  detail: string;
  menuTitle: string;
  menuSupport: string;
  menuPhoto: string;
  controls: { tabs: string; panels: string };
  credits: string;
  close: string;
};

export const sceneCompositions = new Map<string, (parts: SceneParts) => string>([
  ['broadsheet', (p) => `
    <section class="hero">
      <div class="composition-frame dispatch">
        ${p.header}
        <div class="dispatch__headline">${p.title}</div>
        <div class="dispatch__photos">${p.lead}${p.detail}</div>
        <div class="dispatch__story">${p.support}</div>
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame dispatch-menu">
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        ${p.controls.tabs}
        ${p.controls.panels}
        ${p.menuPhoto}
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
  ['record-sleeve', (p) => `
    <section class="hero">
      <div class="composition-frame listening">
        ${p.header}
        <div class="listening__cover">
          <div class="listening__art">${p.lead}</div>
          <div class="listening__disc" aria-hidden="true"></div>
        </div>
        <div class="listening__notes">${p.title}${p.support}</div>
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame listening-menu">
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        ${p.menuPhoto}
        <div class="listening-menu__tracks">
          ${p.controls.tabs}
          ${p.controls.panels}
        </div>
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
  ['order-board', (p) => `
    <section class="hero">
      <div class="composition-frame curry">
        ${p.header}
        <div class="curry__sign">${p.title}${p.support}</div>
        ${p.lead}
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame curry-menu">
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        <div class="curry-menu__board">
          ${p.controls.tabs}
          ${p.controls.panels}
        </div>
        ${p.menuPhoto}
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
  ['table-runner', (p) => `
    <section class="hero">
      ${p.header}
      <div class="runner">
        ${p.lead}
        <div class="runner__invitation">${p.title}${p.support}</div>
        ${p.detail}
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame runner-menu">
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        ${p.controls.tabs}
        ${p.controls.panels}
        ${p.menuPhoto}
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
  ['tasting-box', (p) => `
    <section class="hero">
      <div class="composition-frame chocolate">
        ${p.header}
        <div class="chocolate__box">
          <div class="chocolate__lid">${p.title}${p.support}</div>
          ${p.lead}
          ${p.detail}
        </div>
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame chocolate-menu">
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        ${p.controls.tabs}
        <div class="chocolate-menu__tray">
          ${p.menuPhoto}
          ${p.controls.panels}
        </div>
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
  ['sunburst', (p) => `
    <section class="hero">
      <div class="composition-frame breakfast">
        ${p.header}
        <div class="breakfast__invitation">${p.title}${p.support}</div>
        <div class="breakfast__scene">${p.lead}</div>
      </div>
    </section>
    <section class="menu">
      <div class="composition-frame breakfast-menu">
        ${p.menuPhoto}
        <div class="menu__intro">${p.menuTitle}${p.menuSupport}</div>
        ${p.controls.tabs}
        ${p.controls.panels}
        ${p.credits}
        ${p.close}
      </div>
    </section>`],
]);
