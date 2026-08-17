(function () {
const BASE = document.documentElement.dataset.base || '';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function initSidebar() {
  const btn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (!btn || !sidebar || !overlay) return;

  const close = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('sidebar-locked');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', open);
    document.body.classList.toggle('sidebar-locked', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  sidebar.querySelectorAll('.nav-group-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const links = toggle.nextElementSibling;
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  const active = sidebar.querySelector('.nav-group-links a.active');
  if (active) active.scrollIntoView({ block: 'center' });
}

function initTopbarMenu() {
  for (const [btnId, linksId] of [['docs-nav-toggle', 'docs-top-links'], ['nav-toggle', 'nav-links']]) {
    const btn = document.getElementById(btnId);
    const links = document.getElementById(linksId);
    if (!btn || !links) continue;
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }
}

function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
    });
  });
}

function highlight(text, terms) {
  let out = esc(text);
  for (const t of terms) {
    if (t.length < 2) continue;
    out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
  }
  return out;
}

function excerpt(text, terms) {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0) return text.slice(0, 120);
  const start = Math.max(0, at - 40);
  return (start > 0 ? '…' : '') + text.slice(start, start + 140) + (text.length > start + 140 ? '…' : '');
}

function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let index = null;
  let selected = -1;

  const load = async () => {
    if (!index) index = await (await fetch(BASE + '/search.json')).json();
    return index;
  };

  function render(matches, terms) {
    selected = -1;
    if (!matches.length) {
      results.innerHTML =
        '<div class="search-empty">' +
        '<div class="search-empty-title">No matches</div>' +
        '<div class="search-empty-sub">Try a shorter or different term.</div>' +
        '</div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(r =>
        `<a class="search-result" href="${BASE}/docs/${esc(r.slug)}${r.anchor ? '#' + esc(r.anchor) : ''}">` +
          `<div class="search-result-title">${highlight(r.title, terms)}</div>` +
          `<div class="search-result-page">${esc(r.pageTitle)}</div>` +
          `<div class="search-result-snippet">${highlight(r.excerpt, terms)}</div>` +
        '</a>').join('');
    }
    results.classList.add('visible');
  }

  async function doSearch(raw) {
    const query = raw.trim().toLowerCase();
    if (query.length < 2) { results.classList.remove('visible'); return; }
    const terms = query.split(/\s+/).filter(Boolean);
    const data = await load();
    const matches = [];

    for (const page of data) {
      const head = (page.title + ' ' + page.description + ' ' + page.intro).toLowerCase();
      if (terms.every(t => head.includes(t))) {
        matches.push({
          slug: page.slug, anchor: '', title: page.title,
          pageTitle: page.section, excerpt: excerpt(page.description || page.intro, terms),
        });
      }
      for (const s of page.sections) {
        const hay = (s.title + ' ' + s.content).toLowerCase();
        if (terms.every(t => hay.includes(t))) {
          matches.push({
            slug: page.slug, anchor: s.anchor, title: s.title,
            pageTitle: page.title, excerpt: excerpt(s.content, terms),
          });
        }
      }
    }
    render(matches, terms);
  }

  function move(delta) {
    const items = [...results.querySelectorAll('.search-result')];
    if (!items.length) return;
    if (selected >= 0) items[selected].classList.remove('selected');
    selected = (selected + delta + items.length) % items.length;
    items[selected].classList.add('selected');
    items[selected].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', e => doSearch(e.target.value));
  input.addEventListener('focus', e => { if (e.target.value.trim()) doSearch(e.target.value); });
  input.addEventListener('keydown', e => {
    if (!results.classList.contains('visible')) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      move(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter') {
      const item = results.querySelectorAll('.search-result')[selected];
      if (item) { e.preventDefault(); location.href = item.href; }
    } else if (e.key === 'Escape') {
      results.classList.remove('visible');
      input.blur();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
  document.addEventListener('click', e => {
    if (!results.contains(e.target) && e.target !== input) results.classList.remove('visible');
  });
}

function initHeadingAnchors() {
  document.querySelectorAll('.content h2[id], .content h3[id]').forEach(h => {
    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    h.appendChild(a);
  });
}

function initTables() {
  document.querySelectorAll('.content table').forEach(table => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.before(wrap);
    wrap.appendChild(table);
  });
}

function initCopyButtons() {
  document.querySelectorAll('.content pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText.replace(/^Copy\n/, ''));
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      } catch {}
    });
    pre.appendChild(btn);
  });
}

function initTocSpy() {
  const rail = document.querySelector('.toc-rail');
  if (!rail) return;
  const links = new Map(
    [...rail.querySelectorAll('a')].map(a => [decodeURIComponent(a.hash.slice(1)), a])
  );
  const spy = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const link = links.get(entry.target.id);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    }
  }, { rootMargin: '-104px 0px -70% 0px' });
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTopbarMenu();
  initFaq();
  initSearch();
  initHeadingAnchors();
  initTables();
  initCopyButtons();
  initTocSpy();
  if (window.lucide) lucide.createIcons();
});
})();
