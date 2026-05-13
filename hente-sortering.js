(function () {
  // iSEKK-stil: farget kvadrat med hvit glyph (samme som FraksjonIcon i kj&#248;psflyten)
  const w = '#fff';
  const GLYPHS = {
    'trash':    `<g fill="none" stroke="${w}" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="11" width="14" height="13" rx="1"/><line x1="7" y1="10" x2="25" y2="10"/><line x1="13" y1="8" x2="19" y2="8"/><line x1="13" y1="14" x2="13" y2="21"/><line x1="16" y1="14" x2="16" y2="21"/><line x1="19" y1="14" x2="19" y2="21"/></g>`,
    'wood':     `<g fill="none" stroke="${w}" stroke-width="1.6" stroke-linecap="round"><path d="M 6 14 L 22 8 L 26 12 L 10 18 Z"/><line x1="11" y1="14" x2="22" y2="9"/><path d="M 8 20 L 22 22 L 24 18" fill="none"/></g>`,
    'wood-imp': `<g fill="none" stroke="${w}" stroke-width="1.6" stroke-linecap="round"><path d="M 6 13 L 24 9 L 26 12 L 8 16 Z"/><line x1="6" y1="13" x2="8" y2="16"/><line x1="13" y1="11.5" x2="14.5" y2="14.5"/><line x1="20" y1="10" x2="21.5" y2="13"/></g>`,
    'gips':     `<g fill="none" stroke="${w}" stroke-width="1.6"><rect x="8" y="8" width="16" height="16" rx="1"/><line x1="12" y1="8" x2="12" y2="24" stroke-dasharray="2 2"/><line x1="20" y1="8" x2="20" y2="24" stroke-dasharray="2 2"/></g>`,
    'iso':      `<g fill="none" stroke="${w}" stroke-width="1.6"><rect x="7" y="9" width="18" height="14" rx="1"/><path d="M 10 13 q 2 -2 4 0 q 2 2 4 0 q 2 -2 4 0"/><path d="M 10 18 q 2 -2 4 0 q 2 2 4 0 q 2 -2 4 0"/></g>`,
    'ee':       `<g fill="${w}"><path d="M 12 6 L 9 17 L 14 17 L 11 26 L 22 14 L 17 14 L 20 6 Z"/></g>`,
    'papp':     `<g fill="none" stroke="${w}" stroke-width="1.6" stroke-linejoin="round"><path d="M 8 12 L 16 8 L 24 12 L 24 22 L 16 26 L 8 22 Z"/><path d="M 8 12 L 16 16 L 24 12"/><line x1="16" y1="16" x2="16" y2="26"/></g>`,
    'plast':    `<g fill="none" stroke="${w}" stroke-width="1.6"><path d="M 12 9 h 8 v 2 h -8 z M 13 11 v 13 q 0 1 1 1 h 4 q 1 0 1 -1 v -13"/><path d="M 14 16 h 4 M 14 19 h 4"/></g>`,
    'soil':     `<g fill="${w}"><circle cx="11" cy="20" r="2"/><circle cx="17" cy="22" r="2.5"/><circle cx="22" cy="19" r="1.8"/><circle cx="14" cy="14" r="1.5"/><circle cx="20" cy="13" r="1.5"/></g>`,
    'farlig':   `<g fill="none" stroke="${w}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M 16 7 L 25 23 L 7 23 Z"/><line x1="16" y1="13" x2="16" y2="18"/><circle cx="16" cy="20.5" r="0.9" fill="${w}" stroke="none"/></g>`,
    'leaf':     `<g fill="none" stroke="${w}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M 9 23 C 9 14 14 9 23 9 C 23 18 18 23 9 23 Z"/><line x1="9" y1="23" x2="19" y2="13"/></g>`,
  };

  function tile(color, icon, size) {
    return `<span class="fglyph" style="background:${color};width:${size}px;height:${size}px;border-radius:${Math.max(4, Math.round(size*0.18))}px"><svg width="${size}" height="${size}" viewBox="0 0 32 32">${GLYPHS[icon]||''}</svg></span>`;
  }

  const FRAKSJONER = [
    { id: 'restavfall', name: 'Restavfall',         color: '#1a1a1a', icon: 'trash',
      desc: 'Blandet bygg- og rivingsavfall som ikke passer i en spesifikk fraksjon.',
      yes: ['Plast','Papp og papir','Treverk','Metall','M&#248;bler','Blandede materialer'],
      no:  ['Farlig avfall','Batterier','Elektronikk','Masser og stein','Impregnert treverk'] },
    { id: 'trevirke',   name: 'Trevirke',           color: '#a07b5a', icon: 'wood',
      desc: 'Rent, ubehandlet eller malt treverk fra bygging og oppussing.',
      yes: ['Sponplater','MDF og kryssfiner','Parkett','Paller','Lekter og panel','Malt eller beiset treverk'],
      no:  ['Impregnert treverk','Kreosot eller CCA-behandlet treverk','Hageavfall','Jord og stein'] },
    { id: 'gips',       name: 'Gips',               color: '#3b82f6', icon: 'gips',
      desc: 'Gipsplater og gipsbasert materiale fra vegger, tak og oppussing.',
      yes: ['Gipsplater','Malt eller tapetsert gips','Gips med skruer og beslag','Akustikkplater av gips'],
      no:  ['Gips med fliser','V&#229;te eller forurensede plater','Andre byggmaterialer'] },
    { id: 'isolasjon',  name: 'Isolasjon',          color: '#64748b', icon: 'iso',
      desc: 'Mineralbasert isolasjon fra vegger, tak og himling.',
      yes: ['Steinull','Mineralull','Glassvatt','Himlingsplater uten gips'],
      no:  ['Isopor','Forurenset isolasjon','Organisk materiale'] },
    { id: 'papp',       name: 'Papp og papir',      color: '#3b82f6', icon: 'papp',
      desc: 'T&#248;rr og ren papp og papir: emballasje, esker og kontorpapir.',
      yes: ['B&#248;lgepapp','Esker','Emballasje','Kontorpapir'],
      no:  ['V&#229;tt papir','Tilgriset papp','Plastbelagt papir','Restavfall'] },
    { id: 'plast',      name: 'Plast',              color: '#a855f7', icon: 'plast',
      desc: 'Hard plast og plastfolie fra bygg, emballasje og rivning.',
      yes: ['Plastfolie','R&#248;r','Spann','Plastkarmer','Paller i plast'],
      no:  ['Organisk avfall','Metaller','Treverk','Papp og papir'] },
    { id: 'ee',         name: 'EE-avfall',          color: '#f59e0b', icon: 'ee',
      desc: 'Elektriske og elektroniske produkter med ledning, batteri eller plugg.',
      yes: ['Sm&#229;elektronikk','Kabler','EL-materiell','Hvitevarer','Lysarmaturer uten lyskilder'],
      no:  ['Batterier','Emballasje','Restavfall'] },
    { id: 'tungmasser', name: 'Tungmasser',         color: '#3b82f6', icon: 'soil',
      desc: 'Tunge mineralske masser fra riving og bygg.',
      yes: ['Betong','Teglstein','Stein','Keramikk','Porselen'],
      no:  ['Organisk materiale','Forurensede masser','Restavfall'] },
    { id: 'impregnert', name: 'Impregnert treverk', color: '#dc2626', icon: 'wood-imp',
      desc: 'Trevirke som er kjemisk behandlet for utend&#248;rs bruk.',
      yes: ['CU-impregnert trevirke med kjent opprinnelse'],
      no:  ['Kreosotimpregnert treverk','CCA-impregnert treverk','Brannhemmende plater','Blandingsavfall'] },
    { id: 'hage',       name: 'Hageavfall',         color: '#16a34a', icon: 'leaf',
      desc: 'Organisk avfall fra hage. Gr&#248;ntavfall som komposteres eller energigjenvinnes.',
      yes: ['Gress','L&#248;v','Kvister og greiner','Busker og hekk','Planter og r&#248;tter','Bark og flis'],
      no:  ['Jord og stein','Trykkimpregnert treverk','Plastsekker','Matavfall','Stubber over 15 cm i diameter'] },
  ];

  const byId = id => FRAKSJONER.find(f => f.id === id);

  const chipsEl  = document.getElementById('sort-chips');
  const panel    = document.getElementById('sort-panel');
  const glyphEl  = document.getElementById('sort-panel-glyph');
  const nameEl   = document.getElementById('sort-panel-name');
  const descEl   = null;
  const yesEl    = document.getElementById('sort-yes');
  const noEl     = document.getElementById('sort-no');

  let activeId = 'restavfall';

  function render() {
    chipsEl.innerHTML = '';
    FRAKSJONER.forEach(f => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sort-chip' + (f.id === activeId ? ' is-active' : '');
      b.dataset.id = f.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', f.id === activeId ? 'true' : 'false');
      b.innerHTML = `${tile(f.color, f.icon, 26)}<span>${f.name}</span>`;
      b.addEventListener('click', () => select(f.id));
      chipsEl.appendChild(b);
    });

    const f = byId(activeId) || FRAKSJONER[0];
    glyphEl.innerHTML = tile(f.color, f.icon, 64);
    nameEl.textContent = f.name;
    // desc removed
    yesEl.innerHTML = f.yes.map(t => `<li><span class="badge">&#10003;</span>${t}</li>`).join('');
    noEl.innerHTML  = f.no .map(t => `<li><span class="badge">&#10005;</span>${t}</li>`).join('');
  }

  function select(id) {
    if (id === activeId) return;
    activeId = id;
    panel.classList.remove('is-swap');
    void panel.offsetWidth;
    panel.classList.add('is-swap');
    render();
  }

  render();
})();