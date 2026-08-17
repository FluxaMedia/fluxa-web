const REPOS = [
  { id: 'fluxa-core', slug: 'FluxaMedia/fluxa-core', release: false },
  { id: 'fluxa-desktop', slug: 'FluxaMedia/fluxa-desktop', release: true },
  { id: 'fluxa-android', slug: 'KhooLy/Fluxa', release: true },
  { id: 'fluxa-web', slug: 'FluxaMedia/fluxa-web', release: true },
];

const GH_TTL = 60 * 60 * 1000;

const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  menu.addEventListener('click', e => {
    if (!e.target.closest('a')) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
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
      const row = document.getElementById('repo-' + repo.id);
      if (!row) continue;
      row.querySelector('.repo-stars').textContent = fmtNum(data.stargazers_count);
      row.querySelector('.repo-forks').textContent = fmtNum(data.forks_count);
    } catch {}
  }
}

function notes(raw) {
  const lines = esc(raw.slice(0, 420)).split('\n');
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
          <div class="release-head"><div class="release-tag">${esc(repo.id)}</div></div>
          <div class="release-notes">
            <p><a href="https://github.com/${repo.slug}/releases" target="_blank" rel="noopener">Releases on GitHub</a></p>
          </div>
        </div>`;
    }
    const d = result.value;
    const date = new Date(d.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
      <div class="release">
        <div class="release-head">
          <div class="release-tag">${esc(d.tag_name)}</div>
          <div class="release-sub">${esc(repo.id)} · ${date}</div>
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
        <img src="${esc(c.avatar_url)}&s=80" alt="${esc(c.login)}" loading="lazy" />
      </a>`).join('');
  } catch {
    host.innerHTML = '<p>Contributor list unavailable.</p>';
  }
}

initNav();
loadStats();
loadReleases();
loadPeople();

function initSwitch() {
  const tabs = [...document.querySelectorAll('.switch button')];
  const shots = [...document.querySelectorAll('.stage img')];
  if (!tabs.length) return;

  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      for (const t of tabs) {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
      }
      for (const shot of shots) shot.classList.toggle('hidden', shot.dataset.view !== tab.dataset.view);
    });
  }
}

initSwitch();

function initDemo() {
  const video = document.getElementById('demo-video');
  const skip = document.getElementById('demo-skip');
  const fill = document.getElementById('demo-fill');
  if (!video || !skip) return;

  const INTRO_END = 5.2;

  skip.hidden = false;

  const paint = () => {
    const shown = video.currentTime < INTRO_END;
    skip.classList.toggle('on', shown);
    skip.tabIndex = shown ? 0 : -1;
    if (video.duration) fill.style.width = (video.currentTime / video.duration) * 100 + '%';
  };

  video.addEventListener('timeupdate', paint);
  video.addEventListener('loadedmetadata', paint);
  paint();
  skip.addEventListener('click', () => {
    video.currentTime = INTRO_END;
    paint();
  });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }
  }, { threshold: 0.35 });
  observer.observe(video);
}

initDemo();
