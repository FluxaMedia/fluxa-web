(function () {
const NUVIO_BASE = 'https://api.nuvio.tv';
const NUVIO_KEY = 'sb_publishable_1Clq8rlTVACkdcZuqr6_AD__xUUC_EN';
const NUVIO_MAX_PROFILES = 6;
const STREMIO_BASE = 'https://api.strem.io';
const SESSION_KEY = 'fluxa.account.session';

function saveSession(s) {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else localStorage.removeItem(SESSION_KEY);
}

function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}

const NuvioClient = (() => {
  async function raw(method, path, body, token) {
    const headers = { apikey: NUVIO_KEY, 'Content-Type': 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    const res = await fetch(NUVIO_BASE + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : (method === 'POST' ? '{}' : undefined),
    });
    const text = await res.text();
    return [res.status, text];
  }

  async function req(method, path, body, token) {
    const [status, text] = await raw(method, path, body, token);
    if (status < 200 || status >= 300) {
      let msg = text;
      try { const j = JSON.parse(text); msg = j.error_description || j.msg || j.message || j.error || text; } catch {}
      const err = new Error(msg || ('Nuvio API ' + status));
      err.status = status;
      throw err;
    }
    return text ? JSON.parse(text) : null;
  }

  const post = (path, body, token) => req('POST', path, body, token);
  const get = (path, token) => req('GET', path, undefined, token);

  const progressKey = (contentId, season, episode) =>
    (season != null && episode != null) ? `${contentId}_s${season}e${episode}` : contentId;

  return {
    signUp: (email, password) => post('/auth/v1/signup', { email, password }),
    signIn: (email, password) => post('/auth/v1/token?grant_type=password', { email, password }),
    refresh: (refresh_token) => post('/auth/v1/token?grant_type=refresh_token', { refresh_token }),
    signOut: (token) => raw('POST', '/auth/v1/logout', undefined, token),
    getUser: (token) => get('/auth/v1/user', token),

    pullProfiles: (token) => post('/rest/v1/rpc/sync_pull_profiles', {}, token),
    pushProfiles: (token, profiles) =>
      post('/rest/v1/rpc/sync_push_profiles', { p_client_max_profiles: NUVIO_MAX_PROFILES, p_profiles: profiles }, token),

    pullAddons: (token, profileId) =>
      get(`/rest/v1/addons?select=*&profile_id=eq.${profileId}&order=sort_order`, token),
    pushAddons: (token, profileId, addons) =>
      post('/rest/v1/rpc/sync_push_addons', { p_profile_id: profileId, p_addons: addons }, token),

    pullPlugins: (token, profileId) =>
      get(`/rest/v1/plugins?select=*&profile_id=eq.${profileId}&order=sort_order`, token),

    pullLibrary: (token, profileId, limit = 500, offset = 0) =>
      post('/rest/v1/rpc/sync_pull_library', { p_profile_id: profileId, p_limit: limit, p_offset: offset }, token),

    pullWatchProgress: (token, profileId, limit = 200) =>
      post('/rest/v1/rpc/sync_pull_watch_progress', { p_profile_id: profileId, p_limit: limit }, token),
    deleteWatchProgress: (token, profileId, contentId, season, episode) =>
      post('/rest/v1/rpc/sync_delete_watch_progress', { p_profile_id: profileId, p_progress_key: progressKey(contentId, season, episode) }, token),

    pullWatchHistory: (token, profileId, pageSize = 500) =>
      post('/rest/v1/rpc/sync_pull_watched_items', { p_profile_id: profileId, p_page: 1, p_page_size: pageSize }, token),

    pullSettings: (token, profileId, platform = 'desktop') =>
      post('/rest/v1/rpc/sync_pull_profile_settings_blob', { p_profile_id: profileId, p_platform: platform }, token),
    pushSettings: (token, profileId, settingsJson, platform = 'desktop') =>
      post('/rest/v1/rpc/sync_push_profile_settings_blob', { p_profile_id: profileId, p_platform: platform, p_settings_json: settingsJson }, token),

    pullCollections: (token, profileId) =>
      post('/rest/v1/rpc/sync_pull_collections', { p_profile_id: profileId }, token),
    pushCollections: (token, profileId, collectionsJson) =>
      post('/rest/v1/rpc/sync_push_collections', { p_profile_id: profileId, p_collections_json: collectionsJson }, token),

    listAvatars: () => post('/rest/v1/rpc/get_avatar_catalog', {}).catch(() => []),
    getSyncOverview: (token) => post('/rest/v1/rpc/get_sync_overview', {}, token).catch(() => null),
  };
})();

const StremioClient = (() => {
  async function call(path, body) {
    const res = await fetch(STREMIO_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.error) {
      const err = new Error(data.error.message || 'Stremio error');
      err.code = data.error.code;
      err.wrongEmail = data.error.wrongEmail;
      throw err;
    }
    return data;
  }

  function extractAuth(data) {
    const r = data && data.result;
    if (!r) throw new Error('Unexpected response from Stremio');
    const authKey = r.authKey || (r.user && r.user.authKey);
    const user = r.user || {};
    if (!authKey) throw new Error('No auth key returned');
    return { authKey, userId: user.id || user._id || null, email: user.email || null };
  }

  return {
    async login(email, password) {
      return extractAuth(await call('/api/login', { email, password }));
    },
    async register(email, password) {
      return extractAuth(await call('/api/register', { email, password }));
    },
    logout: (authKey) => call('/api/logout', { authKey }).catch(() => null),
    async getAddons(authKey) {
      const d = await call('/api/addonCollectionGet', { authKey, update: true });
      return (d.result && d.result.addons) || [];
    },
    setAddons: (authKey, addons) => call('/api/addonCollectionSet', { authKey, addons }),
    async getLibrary(authKey) {
      const d = await call('/api/datastoreGet', { authKey, collection: 'libraryItem', all: true });
      return d.result || [];
    },
    putLibrary: (authKey, items) => call('/api/datastorePut', { authKey, collection: 'libraryItem', changes: items }),
  };
})();

window.FluxaAccount = { NuvioClient, StremioClient, loadSession, saveSession, NUVIO_MAX_PROFILES };
})();
