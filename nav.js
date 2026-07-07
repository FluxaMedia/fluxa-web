const DOC_PAGES = [
  { page: 'docs.html', title: 'Docs Home', section: 'Start', icon: 'book-open', updated: '2026-07-05', badges: ['Desktop', 'Android', 'Web'] },
  { page: 'what-is-fluxa.html', title: 'What is Fluxa', section: 'Start', icon: 'info', updated: '2026-07-05', badges: ['Desktop', 'Android', 'Web'] },
  { page: 'getting-started.html', title: 'Getting Started', section: 'Start', icon: 'rocket', updated: '2026-07-05', badges: ['Desktop', 'Android', 'Web', 'Windows', 'macOS', 'Linux', 'webOS'] },
  { page: 'concepts.html', title: 'Concepts', section: 'Start', icon: 'library', updated: '2026-07-05', badges: ['Addons', 'Stremio', 'Nuvio'] },
  { page: 'architecture.html', title: 'Architecture', section: 'How it works', icon: 'git-branch', updated: '2026-07-05', badges: ['Core', 'Desktop', 'Android'] },
  { page: 'addon-deep-dive.html', title: 'Addon Deep Dive', section: 'How it works', icon: 'blocks', updated: '2026-07-05', badges: ['Addons', 'Stremio'] },
  { page: 'accounts-comparison.html', title: 'Account Comparison', section: 'How it works', icon: 'users', updated: '2026-07-05', badges: ['Nuvio', 'Stremio', 'Trakt'] },
  { page: 'privacy-security.html', title: 'Privacy & Security', section: 'How it works', icon: 'shield-check', updated: '2026-07-05', badges: ['Privacy', 'Security'] },
  { page: 'addons-catalogs.html', title: 'Addons & Catalogs', section: 'Core workflows', icon: 'puzzle', updated: '2026-07-05', badges: ['Addons', 'Stremio'] },
  { page: 'sync-accounts.html', title: 'Sync & Accounts', section: 'Core workflows', icon: 'refresh-cw', updated: '2026-07-05', badges: ['Nuvio', 'Trakt', 'MAL', 'Simkl'] },
  { page: 'playback.html', title: 'Playback', section: 'Core workflows', icon: 'play-circle', updated: '2026-07-05', badges: ['Desktop', 'Android', 'mpv'] },
  { page: 'playback-advanced.html', title: 'Playback Advanced', section: 'Core workflows', icon: 'sliders', updated: '2026-07-05', badges: ['mpv', 'HDR', 'Subtitles'] },
  { page: 'library-collections.html', title: 'Library & Collections', section: 'Core workflows', icon: 'bookmark', updated: '2026-07-05', badges: ['Library', 'Nuvio'] },
  { page: 'collections-cookbook.html', title: 'Collections Cookbook', section: 'Core workflows', icon: 'folder', updated: '2026-07-05', badges: ['Collections', 'Examples'] },
  { page: 'debrid-usenet-setup.html', title: 'Debrid & Usenet Setup', section: 'Operations', icon: 'server', updated: '2026-07-05', badges: ['Debrid', 'Usenet'] },
  { page: 'data-locations.html', title: 'Data Locations', section: 'Operations', icon: 'database', updated: '2026-07-05', badges: ['Backup', 'Desktop', 'Android'] },
  { page: 'updates-releases.html', title: 'Updates & Releases', section: 'Operations', icon: 'package', updated: '2026-07-05', badges: ['Updates', 'Releases'] },
  { page: 'platform-install.html', title: 'Platform Install Notes', section: 'Operations', icon: 'monitor-smartphone', updated: '2026-07-05', badges: ['Windows', 'macOS', 'Linux', 'Android', 'webOS'] },
  { page: 'recommended-settings.html', title: 'Recommended Settings', section: 'Operations', icon: 'check-square', updated: '2026-07-05', badges: ['Profiles', 'Playback'] },
  { page: 'settings.html', title: 'Settings', section: 'Reference', icon: 'sliders', updated: '2026-07-05', badges: ['Desktop', 'Android'] },
  { page: 'keyboard-shortcuts.html', title: 'Keyboard Shortcuts', section: 'Reference', icon: 'keyboard', updated: '2026-07-05', badges: ['Desktop', 'Playback'] },
  { page: 'troubleshooting.html', title: 'Troubleshooting', section: 'Reference', icon: 'alert-circle', updated: '2026-07-05', badges: ['Fixes', 'Desktop', 'Android'] },
  { page: 'troubleshooting-flows.html', title: 'Troubleshooting Flows', section: 'Reference', icon: 'route', updated: '2026-07-05', badges: ['Decision Trees'] },
  { page: 'glossary.html', title: 'Glossary', section: 'Reference', icon: 'book-open', updated: '2026-07-05', badges: ['Terms'] },
  { page: 'known-limitations.html', title: 'Known Limitations', section: 'Reference', icon: 'alert-circle', updated: '2026-07-05', badges: ['Limits'] },
  { page: 'faq.html', title: 'FAQ', section: 'Reference', icon: 'help-circle', updated: '2026-07-05', badges: ['Answers'] },
  { page: 'contributing-docs.html', title: 'Contributing Docs', section: 'Reference', icon: 'file-text', updated: '2026-07-05', badges: ['Contributing'] },
];

const escHtml = value => String(value ?? '').replace(/[&<>"]/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}[c]));

document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  const doc = DOC_PAGES.find(item => item.page === page);

  addSkipLink();
  renderDocsNav(page);

  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  revealActiveNavLink();
  initSidebar();
  initTopbarMenu();
  initFaq();
  initSearch();
  decorateDocsPage(doc);
  addBackToTop();
  fixExternalLinks();

  if (window.lucide) lucide.createIcons();
  openHashTarget();
});

function addSkipLink() {
  const main = document.querySelector('.main');
  if (!main) return;
  if (!main.id) main.id = 'main-content';
  const link = document.createElement('a');
  link.className = 'skip-link';
  link.href = '#' + main.id;
  link.textContent = 'Skip to content';
  document.body.prepend(link);
}

function revealActiveNavLink() {
  const active = document.querySelector('.sidebar nav a.active');
  if (!active) return;
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const top = active.offsetTop;
  if (top > sidebar.clientHeight - 80) sidebar.scrollTop = top - sidebar.clientHeight / 2;
}

function addBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i data-lucide="arrow-up" style="width:16px;height:16px"></i>';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 900);
  }, { passive: true });
}

function fixExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    const rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
    if (!rel.includes('noopener')) rel.push('noopener');
    a.setAttribute('rel', rel.join(' '));
  });
}

function renderDocsNav(page) {
  const nav = document.querySelector('.sidebar nav');
  if (!nav) return;

  const sections = ['Start', 'How it works', 'Core workflows', 'Operations', 'Reference'];
  const activeSection = DOC_PAGES.find(item => item.page === page)?.section;

  nav.innerHTML = `
    <div class="nav-group">Site</div>
    <a href="index.html"><i data-lucide="home" class="nav-icon"></i>Site home</a>
    <a href="account.html"><i data-lucide="user" class="nav-icon"></i>Account</a>
    ${sections.map(section => {
      const open = section === activeSection;
      return `
      <button type="button" class="nav-group nav-group-toggle" aria-expanded="${open ? 'true' : 'false'}">
        ${section}
        <i data-lucide="chevron-down" class="nav-group-chevron"></i>
      </button>
      <div class="nav-group-links${open ? ' open' : ''}">
        ${DOC_PAGES.filter(item => item.section === section).map(item => `
          <a href="${item.page}" class="${item.page === page ? 'active' : ''}">
            <i data-lucide="${item.icon || 'file-text'}" class="nav-icon"></i>${escHtml(item.title)}
          </a>`).join('')}
      </div>`;
    }).join('')}`;

  nav.querySelectorAll('.nav-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const links = btn.nextElementSibling;
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
}

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
    document.body.classList.toggle('sidebar-locked', open && window.matchMedia('(max-width: 840px)').matches);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  overlay.addEventListener('click', close);
  sidebar.addEventListener('click', e => {
    if (e.target.closest('a') && window.matchMedia('(max-width: 840px)').matches) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) close();
  });
}

function initTopbarMenu() {
  const btn = document.getElementById('docs-nav-toggle');
  const links = document.getElementById('docs-top-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close site menu' : 'Open site menu');
  });

  const close = () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open site menu');
  };

  links.addEventListener('click', e => {
    if (e.target.closest('a')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) close();
  });
}

function initFaq() {
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
}

function openHashTarget() {
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;

  const faqItem = target.classList.contains('faq-item') ? target : null;
  if (faqItem) faqItem.classList.add('open');
  target.scrollIntoView({ block: 'start' });
  target.classList.add('jump-highlight');
  setTimeout(() => target.classList.remove('jump-highlight'), 1600);
}

function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  function position() {
    const r = input.getBoundingClientRect();
    results.style.top = (r.bottom + 6) + 'px';
    results.style.left = r.left + 'px';
    results.style.width = r.width + 'px';
  }

  function closeSearch(clear = false) {
    results.classList.remove('visible');
    if (clear) input.value = '';
  }

  function moveSelection(delta) {
    const items = [...results.querySelectorAll('.search-result')];
    if (!items.length) return;
    const current = results.querySelector('.search-result.selected');
    let idx = items.indexOf(current) + delta;
    if (idx < 0) idx = items.length - 1;
    if (idx >= items.length) idx = 0;
    if (current) current.classList.remove('selected');
    items[idx].classList.add('selected');
    items[idx].scrollIntoView({ block: 'nearest' });
  }

  function highlight(text, terms) {
    let out = escHtml(text);
    for (const term of terms) {
      if (!term) continue;
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(`(${safe})`, 'ig'), '<mark>$1</mark>');
    }
    return out;
  }

  function snippet(content, terms) {
    const text = String(content || '').replace(/\s+/g, ' ').trim();
    const lower = text.toLowerCase();
    const hit = terms.map(t => lower.indexOf(t)).filter(i => i >= 0).sort((a, b) => a - b)[0];
    if (hit == null) return text.slice(0, 120);
    const start = Math.max(0, hit - 46);
    const end = Math.min(text.length, hit + 110);
    return (start ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  }

  function doSearch(q) {
    q = q.trim();
    if (!q || !window.SEARCH_INDEX) {
      closeSearch();
      return;
    }

    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = [];

    for (const p of window.SEARCH_INDEX) {
      for (const s of p.sections) {
        const text = (s.title + ' ' + s.content + ' ' + p.pageTitle).toLowerCase();
        const base = terms.reduce((n, t) => n + (text.includes(t) ? 1 : 0), 0);
        if (!base) continue;
        const titleBonus = terms.reduce((n, t) => n + (s.title.toLowerCase().includes(t) ? 3 : 0), 0);
        matches.push({
          url: p.page,
          pageTitle: p.pageTitle,
          title: s.title,
          anchor: s.anchor,
          excerpt: snippet(s.content, terms),
          score: base + titleBonus,
        });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (!matches.length) {
      results.innerHTML = `
        <div class="search-empty">
          <div class="search-empty-title">No docs found</div>
          <div class="search-empty-sub">Try a feature name, setting, error message, or addon term.</div>
        </div>`;
    } else {
      results.innerHTML = matches.slice(0, 8).map(r =>
        `<a class="search-result" href="${r.url}${r.anchor ? '#' + r.anchor : ''}">` +
          `<div class="search-result-title">${highlight(r.title, terms)}</div>` +
          `<div class="search-result-page">${escHtml(r.pageTitle)}</div>` +
          `<div class="search-result-snippet">${highlight(r.excerpt, terms)}</div>` +
        `</a>`
      ).join('');
    }

    position();
    results.classList.add('visible');
  }

  input.addEventListener('input', e => doSearch(e.target.value));
  input.addEventListener('focus', e => { if (e.target.value.trim()) doSearch(e.target.value); });
  input.addEventListener('keydown', e => {
    if (!results.classList.contains('visible')) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      moveSelection(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter') {
      const target = results.querySelector('.search-result.selected') || results.querySelector('.search-result');
      if (target) {
        closeSearch();
        location.href = target.href;
      }
    }
  });
  results.addEventListener('click', e => {
    if (e.target.closest('a')) closeSearch();
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap') && !e.target.closest('.search-results')) closeSearch();
  });
  document.addEventListener('keydown', e => {
    const slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.matches('input, textarea, [contenteditable="true"]');
    const ctrlK = e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey) && !e.altKey;
    if (slash || ctrlK) {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape') {
      closeSearch(document.activeElement === input);
      input.blur();
    }
  });
  window.addEventListener('resize', () => {
    if (results.classList.contains('visible')) position();
  });
  window.addEventListener('scroll', () => {
    if (results.classList.contains('visible')) position();
  }, { passive: true });
}

function decorateDocsPage(doc) {
  const content = document.querySelector('.content');
  if (!content || !doc) return;

  addDocMeta(content, doc);
  addHeadingAnchors(content);
  addOnThisPage(content);
  addCopyButtons(content);
  wrapTables(content);
  addPrevNext(content, doc);
  addFeedback(content, doc);
}

function wrapTables(content) {
  content.querySelectorAll('table').forEach(table => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.before(wrap);
    wrap.appendChild(table);
  });
}

function addDocMeta(content, doc) {
  if (doc.page === 'docs.html') return;
  const intro = content.querySelector('.intro, .home-hero');
  if (!intro || intro.querySelector('.doc-meta')) return;
  const meta = document.createElement('div');
  meta.className = 'doc-meta';
  meta.innerHTML = `
    <span>${escHtml(doc.section)}</span>
    <span>Updated ${escHtml(formatDate(doc.updated))}</span>
    ${doc.badges.map(b => `<span class="platform-badge">${escHtml(b)}</span>`).join('')}`;
  intro.appendChild(meta);
}

function addHeadingAnchors(content) {
  content.querySelectorAll('h2[id], h3[id]').forEach(h => {
    if (h.querySelector('.heading-anchor')) return;
    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    h.appendChild(a);
  });
}

function addOnThisPage(content) {
  if (content.classList.contains('docs-home')) return;
  if (content.querySelector('.on-this-page')) return;
  const headings = [...content.querySelectorAll('h2[id]')].slice(0, 8);
  if (headings.length < 3) return;
  const box = document.createElement('div');
  box.className = 'on-this-page';
  box.innerHTML = `
    <div class="on-this-page-title">On this page</div>
    <div class="on-this-page-links">
      ${headings.map(h => `<a href="#${h.id}">${escHtml(h.childNodes[0]?.textContent || h.textContent)}</a>`).join('')}
    </div>`;
  const intro = content.querySelector('.intro, .docs-hero-grid, .home-hero');
  if (intro) intro.insertAdjacentElement('afterend', box);

  addTocRail(content, headings);
}

function addTocRail(content, headings) {
  const main = content.closest('.main');
  if (!main) return;
  const rail = document.createElement('nav');
  rail.className = 'toc-rail';
  rail.setAttribute('aria-label', 'On this page');
  rail.innerHTML = `
    <div class="toc-rail-title">On this page</div>
    ${headings.map(h => `<a href="#${h.id}">${escHtml(h.childNodes[0]?.textContent || h.textContent)}</a>`).join('')}`;
  content.insertAdjacentElement('afterend', rail);

  const links = new Map(headings.map(h => [h.id, rail.querySelector(`a[href="#${h.id}"]`)]));
  const spy = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const link = links.get(entry.target.id);
      if (!link) continue;
      link.classList.toggle('active', entry.isIntersecting);
    }
  }, { rootMargin: `-${64 + 40}px 0px -70% 0px` });
  headings.forEach(h => spy.observe(h));
}

function addCopyButtons(content) {
  content.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      const text = pre.innerText.replace(/^Copy\s*/, '');
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
      }
    });
    pre.appendChild(btn);
  });
}

function addPrevNext(content, doc) {
  if (content.querySelector('.doc-pager')) return;
  const idx = DOC_PAGES.findIndex(item => item.page === doc.page);
  const prev = DOC_PAGES[idx - 1];
  const next = DOC_PAGES[idx + 1];
  if (!prev && !next) return;

  const pager = document.createElement('nav');
  pager.className = 'doc-pager';
  pager.setAttribute('aria-label', 'Documentation pagination');
  pager.innerHTML = `
    ${prev ? `<a class="pager-card prev" href="${prev.page}"><span>Previous</span><strong>${escHtml(prev.title)}</strong></a>` : '<span></span>'}
    ${next ? `<a class="pager-card next" href="${next.page}"><span>Next</span><strong>${escHtml(next.title)}</strong></a>` : '<span></span>'}`;
  content.appendChild(pager);
}

function addFeedback(content, doc) {
  if (content.querySelector('.doc-feedback')) return;
  const url = `https://github.com/KhooLy/fluxa-docs-web/issues/new?title=Docs%20feedback:%20${encodeURIComponent(doc.title)}`;
  const feedback = document.createElement('div');
  feedback.className = 'doc-feedback';
  feedback.innerHTML = `
    <div>
      <strong>Was this page useful?</strong>
      <p>Report outdated steps, missing screenshots, or unclear wording.</p>
    </div>
    <a class="btn btn-ghost" href="${url}" target="_blank" rel="noopener noreferrer">
      <i data-lucide="message-square" style="width:14px;height:14px"></i>
      Send feedback
    </a>`;
  content.appendChild(feedback);
}

function formatDate(value) {
  const d = new Date(value + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
