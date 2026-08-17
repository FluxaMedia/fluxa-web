const REPOS = [
  { id: 'fluxa-core', slug: 'FluxaMedia/fluxa-core', release: false },
  { id: 'fluxa-desktop', slug: 'FluxaMedia/fluxa-desktop', release: true },
  { id: 'fluxa-android', slug: 'KhooLy/Fluxa', release: true },
  { id: 'fluxa-web', slug: 'FluxaMedia/fluxa-web', release: true },
];

const GH_TTL = 60 * 60 * 1000;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function initNav() {
  const nav = document.getElementById('top-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 24);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  links.addEventListener('click', e => {
    if (!e.target.closest('a')) return;
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  });
}

function initProgress() {
  const nav = document.getElementById('top-nav');
  const bar = document.getElementById('nav-progress');

  const paint = () => {
    const span = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    bar.style.width = Math.min(100, (scrollY / span) * 100).toFixed(2) + '%';
  };

  paint();
  addEventListener('scroll', paint, { passive: true });
  addEventListener('resize', paint);
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (reduced) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i, 6) * 45) + 'ms';
    io.observe(el);
  });
}

async function gh(path) {
  const key = 'gh:' + path;
  try {
    const hit = JSON.parse(localStorage.getItem(key));
    if (hit && Date.now() - hit.t < GH_TTL) return hit.data;
  } catch {}

  const res = await fetch('https://api.github.com/' + path);
  if (!res.ok) {
    try {
      const stale = JSON.parse(localStorage.getItem(key));
      if (stale) return stale.data;
    } catch {}
    throw new Error(String(res.status));
  }
  const data = await res.json();
  try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch {}
  return data;
}

const fmtNum = n => (n == null ? '–' : n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n));

async function loadStats() {
  for (const repo of REPOS) {
    try {
      const data = await gh('repos/' + repo.slug);
      const card = document.getElementById('repo-' + repo.id);
      if (!card) continue;
      card.querySelector('.repo-stars').textContent = fmtNum(data.stargazers_count);
      card.querySelector('.repo-forks').textContent = fmtNum(data.forks_count);
    } catch {}
  }
}

function notes(raw) {
  const lines = esc(raw.slice(0, 520)).split('\n');
  const out = [];
  let list = false;
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    const bullet = line.match(/^[-*]\s+(.*)/);
    if (bullet) {
      if (!list) { out.push('<ul>'); list = true; }
      out.push('<li>' + bullet[1] + '</li>');
    } else {
      if (list) { out.push('</ul>'); list = false; }
      out.push('<p>' + line + '</p>');
    }
  }
  if (list) out.push('</ul>');
  return out.join('');
}

async function loadReleases() {
  const host = document.getElementById('release-list');
  if (!host) return;
  const repos = REPOS.filter(r => r.release);
  const results = await Promise.allSettled(repos.map(r => gh('repos/' + r.slug + '/releases/latest')));

  host.innerHTML = repos.map((repo, i) => {
    const result = results[i];
    if (result.status !== 'fulfilled') {
      return `
        <div class="release">
          <div><div class="release-tag">${esc(repo.id)}</div></div>
          <div class="release-notes">
            <p>No release feed right now.
            <a href="https://github.com/${repo.slug}/releases" target="_blank" rel="noopener">Check GitHub</a></p>
          </div>
        </div>`;
    }
    const d = result.value;
    const date = new Date(d.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
      <div class="release">
        <div>
          <div class="release-tag">${esc(d.tag_name)}</div>
          <div class="mono release-meta">${esc(repo.id)} · ${date}</div>
        </div>
        <div class="release-notes">
          ${notes(d.body || '') || '<p>Release notes are on GitHub.</p>'}
          <p><a href="${esc(d.html_url)}" target="_blank" rel="noopener">Full notes</a></p>
        </div>
      </div>`;
  }).join('');
}

async function loadPeople() {
  const host = document.getElementById('people-grid');
  if (!host) return;
  try {
    const seen = new Map();
    const results = await Promise.allSettled(REPOS.map(r => gh('repos/' + r.slug + '/contributors?per_page=50')));
    for (const r of results) {
      if (r.status !== 'fulfilled' || !Array.isArray(r.value)) continue;
      for (const c of r.value) {
        if (seen.has(c.login)) seen.get(c.login).contributions += c.contributions;
        else seen.set(c.login, { ...c });
      }
    }
    const sorted = [...seen.values()].sort((a, b) => b.contributions - a.contributions);
    if (!sorted.length) throw new Error('empty');
    host.innerHTML = sorted.map(c =>
      `<a class="person" href="${esc(c.html_url)}" target="_blank" rel="noopener" title="${esc(c.login)}">
        <img src="${esc(c.avatar_url)}&s=84" alt="${esc(c.login)}" loading="lazy" />
      </a>`).join('');
  } catch {
    host.innerHTML = '<p class="mono">Contributor list unavailable.</p>';
  }
}

initNav();
initProgress();
initReveal();
loadStats();
loadReleases();
loadPeople();
