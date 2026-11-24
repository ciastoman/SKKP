(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const cfg = window.SKKP_CONFIG || {};

  $$('[data-version]').forEach(el => { el.textContent = cfg.version || '0.6.x'; });
  $$('[data-release-status]').forEach(el => { el.textContent = cfg.releaseStatus || 'W rozwoju'; });

  const githubUrl = typeof cfg.githubUrl === 'string' && /^https:\/\//.test(cfg.githubUrl) ? cfg.githubUrl : 'https://github.com/ciastoman';
  $$('.btn-github').forEach(el => { el.href = githubUrl; });

  const url = typeof cfg.downloadUrl === 'string' ? cfg.downloadUrl.trim() : '';
  const validDownload = /^https:\/\//i.test(url);
  const downloadLink = $('.download-link');
  const placeholder = $('.download-placeholder');
  const hint = $('#download-hint');
  if (validDownload && downloadLink) {
    downloadLink.href = url;
    downloadLink.target = '_blank';
    downloadLink.rel = 'noopener noreferrer';
    downloadLink.hidden = false;
    if (placeholder) placeholder.hidden = true;
    if (hint) hint.textContent = 'Pobieranie ZIP z najnowszego wydania GitHub. Wymagane zalogowanie i dostęp do repozytorium gry; jeżeli paczka nie jest jeszcze dostępna, sprawdź status wydania.';
  }

  const navToggle = $('.nav-toggle');
  const nav = $('#main-nav');
  function closeNav() {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Otwórz menu');
  }
  navToggle?.addEventListener('click', () => {
    const open = !nav?.classList.contains('is-open');
    nav?.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  });
  $$('a', nav).forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  document.addEventListener('click', e => {
    if (nav?.classList.contains('is-open') && !nav.contains(e.target) && !navToggle?.contains(e.target)) closeNav();
  });

  const tabs = $$('.showcase-tab');
  const panes = $$('.showcase-pane');
  function switchPane(tab, focus = false) {
    if (!tab) return;
    const id = tab.dataset.pane;
    tabs.forEach(t => {
      const selected = t === tab;
      t.classList.toggle('is-active', selected);
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    panes.forEach(p => {
      const selected = p.dataset.pane === id;
      p.hidden = !selected;
      p.classList.toggle('is-active', selected);
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => switchPane(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      switchPane(tabs[next], true);
    });
  });

  // Animacja wejścia nigdy nie ukrywa treści przy braku wsparcia dla IntersectionObserver.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('has-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -45px 0px', threshold: 0.04 });
    $$('.reveal').forEach(el => observer.observe(el));
  }

  $('#footer-year').textContent = String(new Date().getFullYear());
  const progress = $('#progress-line');
  let busy = false;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0) + '%';
    busy = false;
  };
  window.addEventListener('scroll', () => {
    if (!busy) { busy = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();
})();
