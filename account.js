const { NuvioClient, StremioClient, loadSession, saveSession, NUVIO_MAX_PROFILES } = window.FluxaAccount;

const app = document.getElementById('app');
const NUVIO_LOGO = 'nuvio-logo.png';
const STREMIO_LOGO = 'stremio-logo.png';
const NUVIO_STORAGE = 'https://api.nuvio.tv/storage/v1/object/public/avatars/';

const state = {
  session: loadSession(),
  authProvider: 'nuvio',
  authTab: 'login',
  profiles: [],
  avatars: [],
  activeIndex: null,
  section: 'overview',
};

async function ensureAvatars() {
  if (state.avatars.length) return;
  try { state.avatars = (await NuvioClient.listAvatars()) || []; } catch { state.avatars = []; }
}

function avatarUrl(p) {
  if (!p) return null;
  if (p.avatar_url) return p.avatar_url;
  if (p.avatar_id) {
    const e = state.avatars.find(a => a.id === p.avatar_id);
    if (e) return NUVIO_STORAGE + e.storage_path;
  }
  return null;
}

function avatarHtml(p, size) {
  const url = avatarUrl(p);
  const st = size ? `style="width:${size}px;height:${size}px"` : '';
  return `<div class="avatar" ${st}>${url ? `<img src="${esc(url)}" alt="" loading="lazy" />` : esc(initials(p && p.name))}</div>`;
}

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function icons() { if (window.lucide) lucide.createIcons(); }

let toastTimer;
function toast(msg, isErr) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast'; }, 3200);
}

function confirmModal(title, body, confirmLabel = 'Confirm') {
  const m = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  const btn = document.getElementById('modal-confirm');
  btn.textContent = confirmLabel;
  m.classList.add('open');
  return new Promise(resolve => {
    const done = v => { m.classList.remove('open'); btn.onclick = null; document.getElementById('modal-cancel').onclick = null; resolve(v); };
    btn.onclick = () => done(true);
    document.getElementById('modal-cancel').onclick = () => done(false);
  });
}

async function nuvioToken() {
  const s = state.session;
  const now = Math.floor(Date.now() / 1000);
  if (s.refreshToken && s.expiresAt && s.expiresAt - now < 60) {
    const r = await NuvioClient.refresh(s.refreshToken);
    s.accessToken = r.access_token;
    s.refreshToken = r.refresh_token || s.refreshToken;
    s.expiresAt = now + (r.expires_in || 3600);
    saveSession(s);
  }
  return s.accessToken;
}

function logout() {
  const s = state.session;
  if (s) {
    if (s.provider === 'nuvio' && s.accessToken) NuvioClient.signOut(s.accessToken).catch(() => {});
    if (s.provider === 'stremio' && s.authKey) StremioClient.logout(s.authKey);
  }
  saveSession(null);
  state.session = null;
  state.profiles = [];
  state.activeIndex = null;
  state.section = 'overview';
  render();
}

function render() {
  const menuBtn = document.getElementById('panel-menu-btn');
  if (menuBtn) menuBtn.style.display = state.session ? '' : 'none';
  if (state.session) renderPanel();
  else renderAuth();
  icons();
}

function renderAuth() {
  const p = state.authProvider;
  const tab = state.authTab;
  app.innerHTML = `
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-logo"><img src="logo.png" alt="Fluxa" /></div>
      <div class="auth-title">${tab === 'login' ? 'Sign in to Fluxa' : 'Create your account'}</div>
      <div class="auth-sub">Manage your profiles, addons, and settings anywhere.</div>

      <div class="provider-toggle">
        <button data-provider="nuvio" class="${p === 'nuvio' ? 'active' : ''}">
          <img src="${NUVIO_LOGO}" alt="" onerror="this.style.display='none'" /> Nuvio
        </button>
        <button data-provider="stremio" class="${p === 'stremio' ? 'active' : ''}">
          <img src="${STREMIO_LOGO}" alt="" onerror="this.style.display='none'" /> Stremio
        </button>
      </div>

      <div class="tabs">
        <button data-tab="login" class="${tab === 'login' ? 'active' : ''}">Log in</button>
        <button data-tab="signup" class="${tab === 'signup' ? 'active' : ''}">Sign up</button>
      </div>

      <div id="auth-error"></div>

      <form id="auth-form" novalidate>
        <div class="field">
          <label>Email</label>
          <input type="email" id="auth-email" placeholder="you@example.com" autocomplete="email" autofocus />
          <div class="field-err" id="err-email"></div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="pw-wrap">
            <input type="password" id="auth-password" placeholder="${tab === 'login' ? 'Your password' : 'At least 8 characters'}" autocomplete="${tab === 'login' ? 'current-password' : 'new-password'}" />
            <button type="button" id="pw-toggle" aria-label="Show password"><i data-lucide="eye" style="width:16px;height:16px"></i></button>
          </div>
          <div class="field-err" id="err-password"></div>
        </div>
        ${tab === 'signup' ? `
        <div class="field">
          <label>Confirm password</label>
          <input type="password" id="auth-confirm" placeholder="Re-enter password" autocomplete="new-password" />
          <div class="field-err" id="err-confirm"></div>
        </div>` : ''}
        <button type="submit" class="btn btn-primary auth-submit" id="auth-submit">
          ${tab === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>

      <div class="auth-hint">
        ${p === 'nuvio'
          ? 'Nuvio is Fluxa\'s built-in sync account. Same credentials as the desktop and Android apps.'
          : 'Use your existing Stremio account. Fluxa connects to Stremio\'s public API.'}
      </div>
    </div>
  </div>`;

  app.querySelectorAll('[data-provider]').forEach(b => b.onclick = () => { state.authProvider = b.dataset.provider; render(); });
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { state.authTab = b.dataset.tab; render(); });

  const pwToggle = document.getElementById('pw-toggle');
  pwToggle.onclick = () => {
    const inp = document.getElementById('auth-password');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    pwToggle.innerHTML = `<i data-lucide="${inp.type === 'password' ? 'eye' : 'eye-off'}" style="width:16px;height:16px"></i>`;
    icons();
  };

  document.getElementById('auth-form').onsubmit = onAuthSubmit;
}

function fieldErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}

async function onAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const confirm = state.authTab === 'signup' ? document.getElementById('auth-confirm').value : null;

  ['err-email', 'err-password', 'err-confirm'].forEach(i => fieldErr(i, ''));
  document.getElementById('auth-error').innerHTML = '';

  let ok = true;
  if (!email) { fieldErr('err-email', 'Email is required'); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fieldErr('err-email', 'Enter a valid email'); ok = false; }
  if (!password) { fieldErr('err-password', 'Password is required'); ok = false; }
  else if (state.authTab === 'signup' && password.length < 8) { fieldErr('err-password', 'At least 8 characters'); ok = false; }
  if (state.authTab === 'signup' && password !== confirm) { fieldErr('err-confirm', 'Passwords do not match'); ok = false; }
  if (!ok) return;

  const btn = document.getElementById('auth-submit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span>';

  try {
    if (state.authProvider === 'nuvio') await nuvioAuth(email, password);
    else await stremioAuth(email, password);
    render();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = state.authTab === 'login' ? 'Log in' : 'Create account';
    const msg = friendlyAuthError(err);
    document.getElementById('auth-error').innerHTML = `<div class="auth-error">${esc(msg)}</div>`;
  }
}

function friendlyAuthError(err) {
  const m = (err && err.message) || String(err);
  if (/invalid login|invalid_grant|wrongPassword|user not found|invalid credentials/i.test(m)) return 'Incorrect email or password.';
  if (/already registered|already exists|user_already_exists/i.test(m)) return 'An account with that email already exists.';
  if (/failed to fetch|networkerror|load failed/i.test(m)) return 'Network error. Check your connection and try again.';
  return m;
}

async function nuvioAuth(email, password) {
  const fn = state.authTab === 'login' ? NuvioClient.signIn : NuvioClient.signUp;
  const r = await fn(email, password);
  if (!r || !r.access_token) {
    throw new Error('Account created. Check your email to confirm, then log in.');
  }
  state.session = {
    provider: 'nuvio',
    email,
    accessToken: r.access_token,
    refreshToken: r.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + (r.expires_in || 3600),
    userId: r.user && r.user.id,
  };
  saveSession(state.session);
}

async function stremioAuth(email, password) {
  const fn = state.authTab === 'login' ? StremioClient.login : StremioClient.register;
  const r = await fn(email, password);
  state.session = { provider: 'stremio', email: r.email || email, authKey: r.authKey, userId: r.userId };
  saveSession(state.session);
}

const SECTIONS = {
  nuvio: [
    ['overview', 'Overview', 'layout-dashboard'],
    ['profiles', 'Profiles', 'users'],
    ['addons', 'Addons', 'puzzle'],
    ['plugins', 'Plugins', 'blocks'],
    ['library', 'Library', 'bookmark'],
    ['watch', 'Watch activity', 'history'],
    ['settings', 'Settings', 'sliders'],
    ['collections', 'Collections', 'folder'],
  ],
  stremio: [
    ['overview', 'Overview', 'layout-dashboard'],
    ['addons', 'Addons', 'puzzle'],
    ['library', 'Library', 'bookmark'],
  ],
};

function renderPanel() {
  const s = state.session;
  const secs = SECTIONS[s.provider];
  if (!secs.some(x => x[0] === state.section)) state.section = 'overview';
  const perProfile = new Set(['addons', 'plugins', 'library', 'watch', 'settings', 'collections']);
  const showProfilePicker = s.provider === 'nuvio' && perProfile.has(state.section);

  app.innerHTML = `
  <div class="panel">
    <div class="panel-overlay" id="panel-overlay"></div>
    <aside class="panel-side" id="panel-side">
      <div class="acct-card">
        <img class="acct-logo" src="${s.provider === 'nuvio' ? NUVIO_LOGO : STREMIO_LOGO}" alt="" onerror="this.style.display='none'" />
        <div class="acct-info">
          <div class="acct-email">${esc(s.email || 'Signed in')}</div>
          <div class="acct-provider">${s.provider} account</div>
        </div>
      </div>
      ${s.provider === 'nuvio' ? `
      <div class="profile-switcher" id="profile-picker" style="${showProfilePicker ? '' : 'display:none'}">
        <label>Active profile</label>
        <button class="ps-trigger" id="ps-trigger" aria-haspopup="listbox" aria-expanded="false">
          <span class="ps-current" id="ps-current">…</span>
          <i data-lucide="chevrons-up-down" class="ps-chev"></i>
        </button>
        <div class="ps-menu" id="ps-menu" role="listbox"></div>
      </div>` : ''}
      <nav class="side-nav">
        ${secs.map(([id, label, ic]) => `
          <button data-section="${id}" class="${state.section === id ? 'active' : ''}">
            <i data-lucide="${ic}"></i> ${label}
          </button>`).join('')}
      </nav>
      <div class="side-foot">
        <button class="btn btn-ghost btn-sm" id="logout-btn" style="width:100%">
          <i data-lucide="log-out" style="width:14px;height:14px"></i> Sign out
        </button>
      </div>
    </aside>
    <main class="panel-main"><div id="sec"></div></main>
  </div>`;

  app.querySelectorAll('[data-section]').forEach(b => b.onclick = () => {
    state.section = b.dataset.section;
    closeSide();
    renderPanel();
  });
  document.getElementById('logout-btn').onclick = logout;
  document.getElementById('panel-menu-btn').onclick = toggleSide;
  document.getElementById('panel-overlay').onclick = closeSide;

  if (s.provider === 'nuvio') setupProfilePicker();
  icons();
  loadSection();
}

function toggleSide() {
  document.getElementById('panel-side').classList.toggle('open');
  document.getElementById('panel-overlay').classList.toggle('open');
}
function closeSide() {
  const side = document.getElementById('panel-side');
  if (side) side.classList.remove('open');
  const ov = document.getElementById('panel-overlay');
  if (ov) ov.classList.remove('open');
}

async function ensureProfiles() {
  if (state.session.provider !== 'nuvio') return;
  if (state.profiles.length) return;
  const token = await nuvioToken();
  const profiles = await NuvioClient.pullProfiles(token);
  state.profiles = (profiles || []).sort((a, b) => a.profile_index - b.profile_index);
  if (state.activeIndex == null && state.profiles.length) state.activeIndex = state.profiles[0].profile_index;
}

function setupProfilePicker() {
  const trigger = document.getElementById('ps-trigger');
  const menu = document.getElementById('ps-menu');
  const current = document.getElementById('ps-current');
  if (!trigger || !menu) return;

  const paint = () => {
    const active = state.profiles.find(p => p.profile_index === state.activeIndex) || state.profiles[0];
    if (active) current.innerHTML = `${avatarHtml(active, 22)}<span class="ps-cur-name">${esc(active.name || 'Profile ' + active.profile_index)}</span>`;
    menu.innerHTML = state.profiles.map(p => `
      <button class="ps-item ${p.profile_index === state.activeIndex ? 'active' : ''}" role="option" data-pi="${p.profile_index}">
        ${avatarHtml(p, 26)}
        <span class="ps-item-name">${esc(p.name || 'Profile ' + p.profile_index)}</span>
        ${p.profile_index === state.activeIndex ? '<i data-lucide="check" class="ps-check"></i>' : ''}
      </button>`).join('');
    icons();
    menu.querySelectorAll('[data-pi]').forEach(b => b.onclick = () => {
      state.activeIndex = Number(b.dataset.pi);
      closeMenu();
      paint();
      loadSection();
    });
  };

  const closeMenu = () => { menu.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
  trigger.onclick = e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  document.addEventListener('click', e => { if (!e.target.closest('#profile-picker')) closeMenu(); });

  const ready = () => { paint(); if (['addons', 'plugins', 'library', 'watch', 'settings', 'collections'].includes(state.section)) loadSection(); };
  if (state.profiles.length && state.avatars.length) paint();
  else Promise.all([ensureProfiles(), ensureAvatars()]).then(ready).catch(() => {});
}

const sec = () => document.getElementById('sec');
function secLoading(title) {
  sec().innerHTML = `
    <div class="sec-head"><h1>${title}</h1></div>
    <div class="loading-sec"><span class="spin"></span></div>`;
  icons();
}
function secError(title, msg) {
  sec().innerHTML = `
    <div class="sec-head"><h1>${title}</h1></div>
    <div class="empty">${esc(msg)}</div>`;
}

async function loadSection() {
  const map = {
    overview: secOverview,
    profiles: secProfiles,
    addons: secAddons,
    plugins: secPlugins,
    library: secLibrary,
    watch: secWatch,
    settings: secSettings,
    collections: secCollections,
  };
  const fn = map[state.section];
  if (fn) {
    try { await fn(); }
    catch (err) { secError(titleFor(state.section), friendlyAuthError(err)); }
  }
  icons();
}

function titleFor(id) {
  const found = (SECTIONS[state.session.provider] || []).find(x => x[0] === id);
  return found ? found[1] : id;
}

async function secOverview() {
  const s = state.session;
  secLoading('Overview');
  if (s.provider === 'nuvio') {
    const token = await nuvioToken();
    await ensureProfiles();
    let overview = null;
    try { overview = await NuvioClient.getSyncOverview(token); } catch {}
    const p = state.profiles;
    const sumMap = m => (m && typeof m === 'object') ? Object.values(m).reduce((a, b) => a + (Number(b) || 0), 0) : null;
    const addonTotal = overview ? sumMap(overview.addons) : null;
    const libTotal = overview ? sumMap(overview.library_items) : null;
    sec().innerHTML = `
      <div class="sec-head"><h1>Overview</h1><p>Your Nuvio sync account at a glance.</p></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-val">${p.length}</div><div class="stat-label">Profiles</div></div>
        <div class="stat"><div class="stat-val">${NUVIO_MAX_PROFILES}</div><div class="stat-label">Profile limit</div></div>
        <div class="stat"><div class="stat-val">${addonTotal != null ? addonTotal : '—'}</div><div class="stat-label">Addons synced</div></div>
        <div class="stat"><div class="stat-val">${libTotal != null ? libTotal : '—'}</div><div class="stat-label">Library items</div></div>
      </div>
      <div class="list">
        <div class="row"><div class="row-main"><div class="row-title">Email</div><div class="row-sub">${esc(s.email)}</div></div></div>
        <div class="row"><div class="row-main"><div class="row-title">User ID</div><div class="row-sub">${esc(s.userId || '—')}</div></div></div>
      </div>`;
  } else {
    let addons = [], lib = [];
    try { addons = await StremioClient.getAddons(s.authKey); } catch {}
    try { lib = await StremioClient.getLibrary(s.authKey); } catch {}
    sec().innerHTML = `
      <div class="sec-head"><h1>Overview</h1><p>Your Stremio account, connected via Stremio's public API.</p></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-val">${addons.length}</div><div class="stat-label">Installed addons</div></div>
        <div class="stat"><div class="stat-val">${lib.length}</div><div class="stat-label">Library items</div></div>
      </div>
      <div class="list">
        <div class="row"><div class="row-main"><div class="row-title">Email</div><div class="row-sub">${esc(s.email)}</div></div></div>
        <div class="row"><div class="row-main"><div class="row-title">User ID</div><div class="row-sub">${esc(s.userId || '—')}</div></div></div>
      </div>`;
  }
}

function initials(name) {
  const n = (name || '').trim();
  if (!n) return '?';
  return n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

async function secProfiles() {
  secLoading('Profiles');
  await ensureAvatars();
  const token = await nuvioToken();
  const profiles = await NuvioClient.pullProfiles(token);
  state.profiles = (profiles || []).sort((a, b) => a.profile_index - b.profile_index);
  const canAdd = state.profiles.length < NUVIO_MAX_PROFILES;
  sec().innerHTML = `
    <div class="sec-head"><h1>Profiles</h1><p>Up to ${NUVIO_MAX_PROFILES} profiles, each with its own addons, library, and settings.</p></div>
    <div class="toolbar">
      <input class="inline-input grow" id="new-profile-name" placeholder="New profile name" maxlength="40" />
      <button class="btn btn-primary" id="add-profile" ${canAdd ? '' : 'disabled'}>
        <i data-lucide="plus" style="width:14px;height:14px"></i> Add profile
      </button>
    </div>
    <div class="list">
      ${state.profiles.map(p => `
        <div class="row">
          ${avatarHtml(p, 42)}
          <div class="row-main">
            <div class="row-title">${esc(p.name || 'Profile ' + p.profile_index)} ${p.profile_index === 1 ? '<span class="tag">Primary</span>' : ''}</div>
            <div class="row-sub">Index ${p.profile_index}${p.pin_enabled ? ' · PIN locked' : ''}</div>
          </div>
          <div class="row-actions">
            <button class="btn btn-ghost btn-sm" data-rename="${p.profile_index}"><i data-lucide="pencil" style="width:13px;height:13px"></i></button>
            ${p.profile_index !== 1 ? `<button class="btn btn-danger btn-sm" data-del="${p.profile_index}"><i data-lucide="trash-2" style="width:13px;height:13px"></i></button>` : ''}
          </div>
        </div>`).join('')}
    </div>`;
  icons();

  document.getElementById('add-profile').onclick = async () => {
    const name = document.getElementById('new-profile-name').value.trim();
    if (!name) { toast('Enter a profile name', true); return; }
    const nextIndex = Math.max(0, ...state.profiles.map(p => p.profile_index)) + 1;
    await pushProfilesFrom([...state.profiles, { profile_index: nextIndex, name, avatar_color_hex: null, uses_primary_addons: false, uses_primary_plugins: false, avatar_id: null, avatar_url: null }]);
    toast('Profile added');
    secProfiles();
  };

  sec().querySelectorAll('[data-rename]').forEach(b => b.onclick = async () => {
    const idx = Number(b.dataset.rename);
    const p = state.profiles.find(x => x.profile_index === idx);
    const name = prompt('Rename profile', p.name || '');
    if (name == null) return;
    const trimmed = name.trim();
    if (!trimmed) { toast('Name cannot be empty', true); return; }
    await pushProfilesFrom(state.profiles.map(x => x.profile_index === idx ? { ...x, name: trimmed } : x));
    toast('Profile renamed');
    secProfiles();
  });

  sec().querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    const idx = Number(b.dataset.del);
    const p = state.profiles.find(x => x.profile_index === idx);
    if (!await confirmModal('Delete profile', `Delete "${p.name || 'Profile ' + idx}"? Its addons, library, and settings on this account will be removed.`, 'Delete')) return;
    await pushProfilesFrom(state.profiles.filter(x => x.profile_index !== idx));
    if (state.activeIndex === idx) state.activeIndex = null;
    state.profiles = [];
    toast('Profile deleted');
    secProfiles();
  });
}

async function pushProfilesFrom(list) {
  const token = await nuvioToken();
  await NuvioClient.pushProfiles(token, list.map(p => ({
    profile_index: p.profile_index,
    name: p.name,
    avatar_color_hex: p.avatar_color_hex ?? null,
    uses_primary_addons: !!p.uses_primary_addons,
    uses_primary_plugins: !!p.uses_primary_plugins,
    avatar_id: p.avatar_id ?? null,
    avatar_url: p.avatar_url ?? null,
  })));
  state.profiles = [];
}

function manifestName(url) {
  try { return new URL(url).host; } catch { return url; }
}

async function fetchManifest(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function secAddons() {
  const s = state.session;
  secLoading('Addons');
  if (s.provider === 'nuvio') {
    await ensureProfiles();
    const pid = state.activeIndex;
    const token = await nuvioToken();
    const addons = (await NuvioClient.pullAddons(token, pid)) || [];
    renderNuvioAddons(addons, pid);
  } else {
    const addons = await StremioClient.getAddons(s.authKey);
    renderStremioAddons(addons);
  }
}

function renderNuvioAddons(addons, pid) {
  addons.sort((a, b) => a.sort_order - b.sort_order);
  sec().innerHTML = `
    <div class="sec-head"><h1>Addons</h1><p>Addons for the active profile. Add by manifest URL, toggle, reorder, or remove.</p></div>
    <div class="toolbar">
      <input class="inline-input grow" id="addon-url" placeholder="https://addon.example.com/manifest.json" />
      <button class="btn btn-primary" id="add-addon"><i data-lucide="plus" style="width:14px;height:14px"></i> Add</button>
    </div>
    <div class="list">
      ${addons.length ? addons.map((a, i) => `
        <div class="row">
          <div class="row-main">
            <div class="row-title">${esc(a.name || manifestName(a.url))}</div>
            <div class="row-sub">${esc(a.url)}</div>
          </div>
          <div class="row-actions">
            <label class="switch"><input type="checkbox" data-toggle="${i}" ${a.enabled ? 'checked' : ''}/><span class="track"></span><span class="thumb"></span></label>
            <button class="btn btn-ghost btn-sm" data-up="${i}" ${i === 0 ? 'disabled' : ''}><i data-lucide="chevron-up" style="width:13px;height:13px"></i></button>
            <button class="btn btn-ghost btn-sm" data-down="${i}" ${i === addons.length - 1 ? 'disabled' : ''}><i data-lucide="chevron-down" style="width:13px;height:13px"></i></button>
            <button class="btn btn-danger btn-sm" data-rm="${i}"><i data-lucide="trash-2" style="width:13px;height:13px"></i></button>
          </div>
        </div>`).join('') : '<div class="empty">No addons on this profile yet.</div>'}
    </div>`;
  icons();

  const save = async (list) => {
    const token = await nuvioToken();
    await NuvioClient.pushAddons(token, pid, list.map((a, i) => ({ url: a.url, name: a.name || null, enabled: a.enabled !== false, sort_order: i })));
  };

  document.getElementById('add-addon').onclick = async () => {
    const url = document.getElementById('addon-url').value.trim();
    if (!/^https?:\/\//.test(url)) { toast('Enter a valid manifest URL', true); return; }
    const man = await fetchManifest(url);
    await save([...addons, { url, name: man && man.name, enabled: true }]);
    toast('Addon added');
    secAddons();
  };
  sec().querySelectorAll('[data-toggle]').forEach(el => el.onchange = async () => {
    const i = Number(el.dataset.toggle);
    addons[i].enabled = el.checked;
    await save(addons);
    toast(addons[i].enabled ? 'Addon enabled' : 'Addon disabled');
  });
  sec().querySelectorAll('[data-up]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.up);
    [addons[i - 1], addons[i]] = [addons[i], addons[i - 1]];
    await save(addons); secAddons();
  });
  sec().querySelectorAll('[data-down]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.down);
    [addons[i + 1], addons[i]] = [addons[i], addons[i + 1]];
    await save(addons); secAddons();
  });
  sec().querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.rm);
    if (!await confirmModal('Remove addon', `Remove "${addons[i].name || manifestName(addons[i].url)}" from this profile?`, 'Remove')) return;
    addons.splice(i, 1);
    await save(addons); toast('Addon removed'); secAddons();
  });
}

function renderStremioAddons(addons) {
  const s = state.session;
  const isProtected = a => a.flags && a.flags.protected;
  sec().innerHTML = `
    <div class="sec-head"><h1>Addons</h1><p>Your Stremio addon collection. Add by manifest URL, reorder, or remove.</p></div>
    <div class="toolbar">
      <input class="inline-input grow" id="addon-url" placeholder="https://addon.example.com/manifest.json" />
      <button class="btn btn-primary" id="add-addon"><i data-lucide="plus" style="width:14px;height:14px"></i> Add</button>
    </div>
    <div class="list">
      ${addons.map((a, i) => `
        <div class="row">
          ${a.manifest && a.manifest.logo ? `<img class="avatar" src="${esc(a.manifest.logo)}" alt="" />` : ''}
          <div class="row-main">
            <div class="row-title">${esc((a.manifest && a.manifest.name) || manifestName(a.transportUrl))} ${isProtected(a) ? '<span class="tag">Protected</span>' : ''}</div>
            <div class="row-sub">${esc(a.transportUrl)}</div>
          </div>
          <div class="row-actions">
            <button class="btn btn-ghost btn-sm" data-up="${i}" ${i === 0 ? 'disabled' : ''}><i data-lucide="chevron-up" style="width:13px;height:13px"></i></button>
            <button class="btn btn-ghost btn-sm" data-down="${i}" ${i === addons.length - 1 ? 'disabled' : ''}><i data-lucide="chevron-down" style="width:13px;height:13px"></i></button>
            ${isProtected(a) ? '' : `<button class="btn btn-danger btn-sm" data-rm="${i}"><i data-lucide="trash-2" style="width:13px;height:13px"></i></button>`}
          </div>
        </div>`).join('')}
    </div>`;
  icons();

  const save = async (list) => { await StremioClient.setAddons(s.authKey, list); };

  document.getElementById('add-addon').onclick = async () => {
    const url = document.getElementById('addon-url').value.trim();
    if (!/^https?:\/\//.test(url)) { toast('Enter a valid manifest URL', true); return; }
    const man = await fetchManifest(url);
    if (!man || !man.id) { toast('Could not read addon manifest', true); return; }
    await save([...addons, { transportUrl: url, manifest: man }]);
    toast('Addon added'); secAddons();
  };
  sec().querySelectorAll('[data-up]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.up); [addons[i - 1], addons[i]] = [addons[i], addons[i - 1]];
    await save(addons); secAddons();
  });
  sec().querySelectorAll('[data-down]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.down); [addons[i + 1], addons[i]] = [addons[i], addons[i + 1]];
    await save(addons); secAddons();
  });
  sec().querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => {
    const i = Number(b.dataset.rm);
    if (!await confirmModal('Remove addon', `Remove "${(addons[i].manifest && addons[i].manifest.name) || 'this addon'}" from your Stremio account?`, 'Remove')) return;
    addons.splice(i, 1); await save(addons); toast('Addon removed'); secAddons();
  });
}

async function secPlugins() {
  secLoading('Plugins');
  await ensureProfiles();
  const token = await nuvioToken();
  const plugins = (await NuvioClient.pullPlugins(token, state.activeIndex)) || [];
  sec().innerHTML = `
    <div class="sec-head"><h1>Plugins</h1><p>Plugins synced for the active profile.</p></div>
    <div class="note-box">Plugins are installed and configured inside the Fluxa app. This is a read-only view of what's synced to your account.</div>
    <div class="list">
      ${plugins.length ? plugins.map(p => `
        <div class="row">
          <div class="row-main">
            <div class="row-title">${esc(p.name || p.id || 'Plugin')}</div>
            <div class="row-sub">${esc(p.url || p.source || '')}</div>
          </div>
          ${p.enabled != null ? `<span class="tag ${p.enabled ? 'on' : ''}">${p.enabled ? 'Enabled' : 'Disabled'}</span>` : ''}
        </div>`).join('') : '<div class="empty">No plugins synced on this profile.</div>'}
    </div>`;
  icons();
}

function fmtTime(sec) {
  sec = Math.floor(sec || 0);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(s).padStart(2, '0');
}

async function secLibrary() {
  const s = state.session;
  secLoading('Library');
  let items = [];
  if (s.provider === 'nuvio') {
    await ensureProfiles();
    const token = await nuvioToken();
    items = (await NuvioClient.pullLibrary(token, state.activeIndex)) || [];
    items = items.map(it => ({ name: it.name, poster: it.poster, sub: `${it.content_type || ''}${it.release_info ? ' · ' + it.release_info : ''}` }));
  } else {
    const raw = await StremioClient.getLibrary(s.authKey);
    items = raw.filter(it => !(it.removed)).map(it => ({ name: it.name, poster: it.poster, sub: it.type || '' }));
  }
  sec().innerHTML = `
    <div class="sec-head"><h1>Library</h1><p>${items.length} saved ${items.length === 1 ? 'title' : 'titles'} on this account.</p></div>
    <div class="note-box">Library items are added and removed while you watch in the Fluxa app. This view shows what's synced.</div>
    <div class="list">
      ${items.length ? items.slice(0, 300).map(it => `
        <div class="row">
          ${it.poster ? `<img class="poster" src="${esc(it.poster)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"/>` : '<div class="poster"></div>'}
          <div class="row-main">
            <div class="row-title">${esc(it.name || 'Untitled')}</div>
            <div class="row-sub">${esc(it.sub)}</div>
          </div>
        </div>`).join('') : '<div class="empty">Your library is empty.</div>'}
    </div>`;
  icons();
}

async function secWatch() {
  secLoading('Watch activity');
  await ensureProfiles();
  const pid = state.activeIndex;
  const token = await nuvioToken();
  const [progress, history] = await Promise.all([
    NuvioClient.pullWatchProgress(token, pid).catch(() => []),
    NuvioClient.pullWatchHistory(token, pid).catch(() => []),
  ]);
  const prog = progress || [];
  sec().innerHTML = `
    <div class="sec-head"><h1>Watch activity</h1><p>Continue-watching progress and recently watched items.</p></div>
    <h3 style="font-size:13px;color:var(--text-muted);margin:0 0 10px;text-transform:uppercase;letter-spacing:0.06em">In progress</h3>
    <div class="list" id="prog-list">
      ${prog.length ? prog.map((w, i) => `
        <div class="row">
          <div class="row-main">
            <div class="row-title">${esc(w.content_id)}${w.season != null ? ` · S${w.season}E${w.episode}` : ''}</div>
            <div class="row-sub">${fmtTime(w.position)} / ${fmtTime(w.duration)}${w.duration ? ` · ${Math.round((w.position / w.duration) * 100)}%` : ''}</div>
          </div>
          <div class="row-actions">
            <button class="btn btn-danger btn-sm" data-clear="${i}"><i data-lucide="x" style="width:13px;height:13px"></i></button>
          </div>
        </div>`).join('') : '<div class="empty">Nothing in progress.</div>'}
    </div>
    <h3 style="font-size:13px;color:var(--text-muted);margin:24px 0 10px;text-transform:uppercase;letter-spacing:0.06em">Recently watched</h3>
    <div class="list">
      ${(history && history.length) ? history.slice(0, 100).map(w => `
        <div class="row">
          <div class="row-main">
            <div class="row-title">${esc(w.title || w.content_id)}${w.season != null ? ` · S${w.season}E${w.episode}` : ''}</div>
            <div class="row-sub">${w.watched_at ? new Date(w.watched_at).toLocaleString() : ''}</div>
          </div>
        </div>`).join('') : '<div class="empty">No watch history yet.</div>'}
    </div>`;
  icons();

  sec().querySelectorAll('[data-clear]').forEach(b => b.onclick = async () => {
    const w = prog[Number(b.dataset.clear)];
    if (!await confirmModal('Clear progress', 'Remove this item from continue watching?', 'Clear')) return;
    const tok = await nuvioToken();
    await NuvioClient.deleteWatchProgress(tok, pid, w.content_id, w.season, w.episode);
    toast('Progress cleared');
    secWatch();
  });
}

function settingValue(v) {
  if (v == null) return '—';
  if (typeof v === 'boolean') return v ? 'On' : 'Off';
  if (typeof v === 'object') return Array.isArray(v) ? `${v.length} item${v.length === 1 ? '' : 's'}` : `${Object.keys(v).length} field${Object.keys(v).length === 1 ? '' : 's'}`;
  return String(v);
}

function prettyKey(k) {
  return k.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

async function secSettings() {
  secLoading('Settings');
  await ensureProfiles();
  const pid = state.activeIndex;
  const token = await nuvioToken();
  const rows = await NuvioClient.pullSettings(token, pid);
  const row = Array.isArray(rows) ? rows[0] : rows;
  const settings = (row && row.settings_json) || {};
  const keys = Object.keys(settings);
  const updated = row && row.updated_at ? new Date(row.updated_at).toLocaleString() : null;

  const body = keys.length ? `
    <div class="list">
      ${keys.map(k => `
        <div class="row">
          <div class="row-main"><div class="row-title">${esc(prettyKey(k))}</div><div class="row-sub">${esc(k)}</div></div>
          <span class="tag">${esc(settingValue(settings[k]))}</span>
        </div>`).join('')}
    </div>` : `
    <div class="empty-panel">
      <i data-lucide="sliders" class="empty-icon"></i>
      <div class="empty-title">No settings synced yet</div>
      <div class="empty-desc">Settings appear here after you change them in the Fluxa app for this profile. You can also add them manually below.</div>
    </div>`;

  sec().innerHTML = `
    <div class="sec-head"><h1>Settings</h1><p>Synced settings for the active profile${updated ? ` · updated ${esc(updated)}` : ''}.</p></div>
    ${body}
    <details class="adv" ${keys.length ? '' : 'open'}>
      <summary><i data-lucide="code" style="width:14px;height:14px"></i> Edit raw JSON</summary>
      <div class="note-box" style="margin-top:12px">This is the exact settings blob Fluxa syncs. Invalid JSON won't save.</div>
      <textarea class="json-edit" id="settings-json" spellcheck="false">${esc(JSON.stringify(settings, null, 2))}</textarea>
      <div class="toolbar" style="margin-top:14px">
        <div class="grow"></div>
        <button class="btn btn-ghost" id="settings-reset">Reset</button>
        <button class="btn btn-primary" id="settings-save"><i data-lucide="save" style="width:14px;height:14px"></i> Save</button>
      </div>
    </details>`;
  icons();

  document.getElementById('settings-reset').onclick = () => secSettings();
  document.getElementById('settings-save').onclick = async () => {
    let parsed;
    try { parsed = JSON.parse(document.getElementById('settings-json').value); }
    catch { toast('Invalid JSON', true); return; }
    const tok = await nuvioToken();
    await NuvioClient.pushSettings(tok, pid, parsed);
    toast('Settings saved');
    secSettings();
  };
}

function folderCard(f) {
  const shape = (f.tileShape || 'poster').toLowerCase();
  const wide = shape === 'landscape' || shape === 'wide';
  const cover = f.coverImageUrl;
  const sources = (f.sources || f.catalogSources || []);
  return `
    <div class="fcard ${wide ? 'wide' : ''}">
      <div class="fcard-art">
        ${cover ? `<img src="${esc(cover)}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('noimg')" />` : ''}
        <span class="fcard-emoji">${esc(f.coverEmoji || '📁')}</span>
      </div>
      <div class="fcard-title">${esc(f.title || 'Untitled')}</div>
      <div class="fcard-sub">${sources.length} source${sources.length === 1 ? '' : 's'} · ${esc(shape)}</div>
    </div>`;
}

function collectionsPreview(collections) {
  if (!collections.length) {
    return `
    <div class="empty-panel">
      <i data-lucide="folder" class="empty-icon"></i>
      <div class="empty-title">No collections yet</div>
      <div class="empty-desc">Build collections in the Fluxa app, or import a collections JSON below.</div>
    </div>`;
  }
  return collections.map(c => {
    const folders = c.folders || [];
    return `
    <div class="col-block">
      <div class="col-block-head">
        <span class="col-block-title">${esc(c.title || 'Collection')}</span>
        <span class="tag">${folders.length} folder${folders.length === 1 ? '' : 's'}</span>
      </div>
      <div class="frow">
        ${folders.length ? folders.map(folderCard).join('') : '<div class="row-sub" style="padding:8px 2px">No folders</div>'}
      </div>
    </div>`;
  }).join('');
}

async function secCollections() {
  secLoading('Collections');
  await ensureProfiles();
  const pid = state.activeIndex;
  const token = await nuvioToken();
  const rows = await NuvioClient.pullCollections(token, pid);
  const row = Array.isArray(rows) ? rows[0] : rows;
  let collections = (row && row.collections_json) || [];
  let mode = 'preview';

  const paint = () => {
    sec().innerHTML = `
      <div class="sec-head"><h1>Collections</h1><p>Custom collections and folders for the active profile.</p></div>
      <div class="toolbar">
        <div class="seg">
          <button data-mode="preview" class="${mode === 'preview' ? 'active' : ''}"><i data-lucide="eye" style="width:14px;height:14px"></i> Preview</button>
          <button data-mode="json" class="${mode === 'json' ? 'active' : ''}"><i data-lucide="code" style="width:14px;height:14px"></i> JSON</button>
        </div>
        <div class="grow"></div>
        <button class="btn btn-ghost btn-sm" id="col-import"><i data-lucide="upload" style="width:14px;height:14px"></i> Import</button>
        <button class="btn btn-ghost btn-sm" id="col-export"><i data-lucide="download" style="width:14px;height:14px"></i> Export</button>
      </div>
      <input type="file" id="col-file" accept="application/json,.json" style="display:none" />
      ${mode === 'preview'
        ? `<div class="col-preview">${collectionsPreview(collections)}</div>`
        : `<textarea class="json-edit" id="col-json" spellcheck="false">${esc(JSON.stringify(collections, null, 2))}</textarea>
           <div class="toolbar" style="margin-top:14px">
             <div class="grow"></div>
             <button class="btn btn-ghost" id="col-reset">Reset</button>
             <button class="btn btn-primary" id="col-save"><i data-lucide="save" style="width:14px;height:14px"></i> Save</button>
           </div>`}`;
    icons();
    wire();
  };

  const wire = () => {
    sec().querySelectorAll('[data-mode]').forEach(b => b.onclick = () => {
      if (mode === 'json') { const ta = document.getElementById('col-json'); try { collections = JSON.parse(ta.value); } catch {} }
      mode = b.dataset.mode; paint();
    });

    document.getElementById('col-export').onclick = () => {
      const blob = new Blob([JSON.stringify(collections, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'fluxa-collections.json';
      a.click();
      URL.revokeObjectURL(a.href);
    };

    const fileInput = document.getElementById('col-file');
    document.getElementById('col-import').onclick = () => fileInput.click();
    fileInput.onchange = () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        let parsed;
        try { parsed = JSON.parse(String(reader.result)); }
        catch { toast('That file is not valid JSON', true); return; }
        if (!Array.isArray(parsed)) { toast('Collections file must be a JSON array', true); return; }
        collections = parsed;
        mode = 'json';
        paint();
        toast('Imported — review, then Save to sync');
      };
      reader.readAsText(file);
    };

    const saveBtn = document.getElementById('col-save');
    if (saveBtn) saveBtn.onclick = async () => {
      let parsed;
      try { parsed = JSON.parse(document.getElementById('col-json').value); }
      catch { toast('Invalid JSON', true); return; }
      if (!Array.isArray(parsed)) { toast('Collections must be a JSON array', true); return; }
      const tok = await nuvioToken();
      await NuvioClient.pushCollections(tok, pid, parsed);
      collections = parsed;
      toast('Collections saved');
    };
    const resetBtn = document.getElementById('col-reset');
    if (resetBtn) resetBtn.onclick = () => secCollections();
  };

  paint();
}

render();
