(() => {
  'use strict';
  const shots = [{"title": "Mapa operacyjna", "meta": "Pulpit dyżurnego · powiat chrzanowski", "alt": "Zrzut ekranu SKKP Pro 0.6.3.5: główny pulpit dyżurnego, mapa powiatu chrzanowskiego, lista jednostek PSP i OSP oraz aktywne zgłoszenia CPR.", "url": "assets/screenshots/mapa-operacyjna.webp", "width": 2048, "height": 1121}, {"title": "Zadysponowane zastępy", "meta": "Karta zdarzenia · siły i środki", "alt": "Zrzut ekranu SKKP: karta zdarzenia z pojazdami OSP Balin, OSP Libiąż i OSP Moczydło w dwóch kolumnach, zdjęciami samochodów i paskami poziomu wody i piany.", "url": "assets/screenshots/zastepy.webp", "width": 1452, "height": 917}, {"title": "Bilans działań", "meta": "Karta zdarzenia · analiza przebiegu akcji", "alt": "Zrzut ekranu SKKP: zakładka Bilans działań z paskami koordynacji, współpracy PSP i OSP, specjalizacji OSP oraz wkładu poszczególnych zastępów.", "url": "assets/screenshots/bilans-dzialan.webp", "width": 1627, "height": 987}, {"title": "Kartoteka pojazdu", "meta": "Remizy i wyposażenie · flota", "alt": "Zrzut ekranu SKKP: dashboard pojazdu Mercedes 1222 GBA 2,5/25 OSP Mętków, fotografia wozu oraz parametry autopompy, wody i środka pianotwórczego.", "url": "assets/screenshots/karta-pojazdu.webp", "width": 1425, "height": 1010}, {"title": "Meldunki i mapa", "meta": "Zdarzenie w toku · Płoki", "alt": "Zrzut ekranu SKKP: zbliżenie mapy Płoków z lokalizacją zdarzenia, panelem CPR i kolorowymi meldunkami radiowymi jednostek.", "url": "assets/screenshots/meldunki-i-mapa.webp", "width": 1540, "height": 812}, {"title": "Widok taktyczny 2D", "meta": "Schemat miejsca zdarzenia · linia 0.7.x", "alt": "Zrzut ekranu SKKP Professional: widok taktyczny 2D z lokalnym układem budynków, dróg, znacznikiem pojazdu GLBM, rozpoznaniem KDR i skalą 40, 80, 160 i 300 metrów.", "url": "assets/screenshots/widok-taktyczny-2d.webp", "width": 1000, "height": 585}];
  const dialog = document.querySelector('#shot-lightbox');
  if (!dialog) return;
  const image = dialog.querySelector('#lightbox-image');
  const title = dialog.querySelector('#lightbox-title');
  const desc = dialog.querySelector('#lightbox-caption');
  const count = dialog.querySelector('#lightbox-count');
  const newtab = dialog.querySelector('#lightbox-newtab');
  let current = 0;
  let lastTrigger = null;
  function showImage(index) {
    current = (index + shots.length) % shots.length;
    const shot = shots[current];
    image.src = shot.url;
    image.alt = shot.alt;
    image.width = shot.width;
    image.height = shot.height;
    title.textContent = shot.title;
    desc.textContent = shot.meta;
    count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(shots.length).padStart(2, '0');
    newtab.href = shot.url;
  }
  document.querySelectorAll('[data-lightbox-index]').forEach(button => {
    button.addEventListener('click', () => {
      lastTrigger = button;
      showImage(Number(button.dataset.lightboxIndex));
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev')?.addEventListener('click', () => showImage(current - 1));
  dialog.querySelector('.lightbox-next')?.addEventListener('click', () => showImage(current + 1));
  dialog.addEventListener('close', () => lastTrigger?.focus());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); showImage(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); showImage(current - 1); }
  });
  const thumbs = [...document.querySelectorAll('.shot-thumb')];
  const tabs = [...document.querySelectorAll('.showcase-tab')];
  function syncThumbs() {
    const currentTab = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
    thumbs.forEach(t => {
      const selected = currentTab?.dataset.pane === t.dataset.selectPane;
      t.classList.toggle('is-selected', selected);
      t.setAttribute('aria-pressed', String(Boolean(selected)));
    });
  }
  thumbs.forEach(t => t.addEventListener('click', () => {
    const tab = tabs.find(tab => tab.dataset.pane === t.dataset.selectPane);
    tab?.click();
    syncThumbs();
    document.querySelector('#podglad .showcase-shell')?.scrollIntoView({block:'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }));
  tabs.forEach(tab => new MutationObserver(syncThumbs).observe(tab, {attributes:true,attributeFilter:['aria-selected']}));
  syncThumbs();
})();
