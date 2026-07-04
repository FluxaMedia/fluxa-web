document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  const btn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (btn) {
    btn.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.faq-q').forEach(q => {
    q.setAttribute('aria-expanded', q.closest('.faq-item').classList.contains('open') ? 'true' : 'false');
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        const qq = i.querySelector('.faq-q');
        if (qq) qq.setAttribute('aria-expanded', 'false');
      });
      if (!open) item.classList.add('open');
      q.setAttribute('aria-expanded', !open ? 'true' : 'false');
    });
  });

  if (window.lucide) lucide.createIcons();

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      const faqItem = target.classList.contains('faq-item') ? target : null;
      if (faqItem) faqItem.classList.add('open');
      target.scrollIntoView({ block: 'start' });
      target.classList.add('jump-highlight');
      setTimeout(() => target.classList.remove('jump-highlight'), 1600);
    }
  }

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  function position() {
    const r = input.getBoundingClientRect();
    results.style.top = (r.bottom + 4) + 'px';
    results.style.left = r.left + 'px';
    results.style.width = r.width + 'px';
  }

  function doSearch(q) {
    q = q.trim();
    if (!q || !window.SEARCH_INDEX) {
      results.classList.remove('visible');
      return;
    }

    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = [];

    for (const p of window.SEARCH_INDEX) {
      for (const s of p.sections) {
        const text = (s.title + ' ' + s.content).toLowerCase();
        const base = terms.reduce((n, t) => n + (text.includes(t) ? 1 : 0), 0);
        if (!base) continue;
        const titleBonus = terms.reduce((n, t) => n + (s.title.toLowerCase().includes(t) ? 2 : 0), 0);
        matches.push({ url: p.page, pageTitle: p.pageTitle, title: s.title, anchor: s.anchor, score: base + titleBonus });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (!matches.length) {
      results.innerHTML = `<div class="search-no-results">No results for "${q}"</div>`;
    } else {
      results.innerHTML = matches.slice(0, 8).map(r =>
        `<a class="search-result" href="${r.url}${r.anchor ? '#' + r.anchor : ''}">` +
          `<div class="search-result-title">${r.title}</div>` +
          `<div class="search-result-page">${r.pageTitle}</div>` +
        `</a>`
      ).join('');
    }

    position();
    results.classList.add('visible');
  }

  input.addEventListener('input', e => doSearch(e.target.value));
  input.addEventListener('focus', e => { if (e.target.value.trim()) doSearch(e.target.value); });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap') && !e.target.closest('.search-results')) {
      results.classList.remove('visible');
    }
  });
  window.addEventListener('resize', () => {
    if (results.classList.contains('visible')) position();
  });
  window.addEventListener('scroll', () => {
    if (results.classList.contains('visible')) position();
  }, { passive: true });
});
