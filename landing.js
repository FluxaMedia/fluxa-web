const REPOS = ['KhooLy/fluxa-desktop', 'KhooLy/fluxa', 'KhooLy/fluxa-core'];

const topNav = document.querySelector('.top-nav');
window.addEventListener('scroll', () => {
  topNav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.addEventListener('click', e => {
    if (e.target.closest('a')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

// Scroll reveal via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function attachReveal(selector, stagger = false) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (stagger) el.style.transitionDelay = (i * 65) + 'ms';
    observer.observe(el);
  });
}

attachReveal('.section-header');
attachReveal('.feature-card', true);
attachReveal('.platform-card', true);
attachReveal('.repo-card', true);
attachReveal('.release-card');
attachReveal('.screenshots-wrap');
attachReveal('.contributors-section-inner');

// Draggable screenshot scroll
const wrap = document.querySelector('.screenshots-wrap');
if (wrap) {
  let dragging = false, startX = 0, scrollStart = 0;
  wrap.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollStart = wrap.scrollLeft;
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    wrap.scrollLeft = scrollStart - (e.pageX - wrap.offsetLeft - startX);
  });
  document.addEventListener('mouseup', () => { dragging = false; });
}

const GH_TTL = 60 * 60 * 1000;

async function gh(path) {
  const key = 'gh:' + path;
  try {
    const hit = JSON.parse(localStorage.getItem(key));
    if (hit && Date.now() - hit.t < GH_TTL) return hit.data;
  } catch {}

  const r = await fetch('https://api.github.com/' + path);
  if (!r.ok) {
    try {
      const stale = JSON.parse(localStorage.getItem(key));
      if (stale) return stale.data;
    } catch {}
    throw new Error(r.status);
  }
  const data = await r.json();
  try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch {}
  return data;
}

// Repo stats
async function loadRepoStats() {
  const ids = ['fluxa-desktop', 'fluxa', 'fluxa-core'];
  for (const [i, repo] of REPOS.entries()) {
    try {
      const data = await gh('repos/' + repo);
      const card = document.getElementById('repo-' + ids[i]);
      if (!card) continue;
      const stars = card.querySelector('.repo-stars');
      const forks = card.querySelector('.repo-forks');
      if (stars) stars.textContent = fmtNum(data.stargazers_count);
      if (forks) forks.textContent = fmtNum(data.forks_count);
    } catch {}
  }
}

// Latest release
async function loadRelease() {
  const el = document.getElementById('release-content');
  if (!el) return;
  try {
    const d = await gh('repos/KhooLy/fluxa-desktop/releases/latest');
    const date = new Date(d.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const body = (d.body || '').slice(0, 600).replace(/\n/g, '<br>');
    el.innerHTML = `
      <div class="release-header">
        <div class="release-tag"><i data-lucide="tag" class="inline-icon"></i>${d.tag_name}</div>
        <div class="release-date">${date}</div>
      </div>
      <div class="release-body">${body ? `<p>${body}</p>` : '<p>See GitHub for release notes.</p>'}
        <p style="margin-top:14px"><a href="${d.html_url}" target="_blank" style="color:rgba(255,255,255,0.7);font-size:13px;">View on GitHub →</a></p>
      </div>`;
    if (window.lucide) lucide.createIcons({ nodes: [el] });
  } catch {
    el.innerHTML = '<div class="release-error">Could not load release info. <a href="https://github.com/KhooLy/fluxa-desktop/releases" target="_blank" style="color:rgba(255,255,255,0.6)">View on GitHub</a></div>';
  }
}

// Contributors
async function loadContributors() {
  const grid = document.getElementById('contributors-grid');
  if (!grid) return;
  try {
    const seen = new Map();
    const results = await Promise.allSettled(REPOS.map(r => gh('repos/' + r + '/contributors?per_page=50')));
    for (const r of results) {
      if (r.status !== 'fulfilled') continue;
      for (const c of r.value) {
        if (!seen.has(c.login)) seen.set(c.login, c);
        else seen.get(c.login).contributions += c.contributions;
      }
    }
    const sorted = [...seen.values()].sort((a, b) => b.contributions - a.contributions);
    grid.innerHTML = sorted.map(c =>
      `<a class="contributor reveal" href="${c.html_url}" target="_blank" title="${c.login}">
        <img src="${c.avatar_url}&s=88" alt="${c.login}" loading="lazy" />
        <span class="contributor-tooltip">${c.login}</span>
      </a>`
    ).join('');
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i * 40) + 'ms';
      observer.observe(el);
    });
  } catch {
    grid.innerHTML = '<p class="contributors-loading">Could not load contributors.</p>';
  }
}

function fmtNum(n) {
  if (!n && n !== 0) return '–';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

// Init
if (window.lucide) lucide.createIcons();
loadRepoStats();
loadRelease();
loadContributors();
