const NUVIO_BASE = 'https://api.nuvio.tv';
const NUVIO_KEY = 'sb_publishable_1Clq8rlTVACkdcZuqr6_AD__xUUC_EN';
const STREMIO_BASE = 'https://api.strem.io';
const SESSION_KEY = 'fluxa.account.session';

export const NUVIO_MAX_PROFILES = 6;
export const NUVIO_STORAGE = 'https://api.nuvio.tv/storage/v1/object/public/avatars/';

export type Session = {
  provider: 'fluxa' | 'nuvio' | 'stremio';
  instanceUrl?: string;
  email: string;
  userId?: string | null;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  authKey?: string;
};

export function loadSession(): Session | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function saveSession(s: Session | null) {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else localStorage.removeItem(SESSION_KEY);
}

async function raw(method: string, path: string, body?: unknown, token?: string): Promise<[number, string]> {
  const headers: Record<string, string> = { apikey: NUVIO_KEY, 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const res = await fetch(NUVIO_BASE + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : method === 'POST' ? '{}' : undefined,
  });
  return [res.status, await res.text()];
}

async function req(method: string, path: string, body?: unknown, token?: string) {
  const [status, text] = await raw(method, path, body, token);
  if (status < 200 || status >= 300) {
    let msg = text;
    try {
      const j = JSON.parse(text);
      msg = j.error_description || j.msg || j.message || j.error || text;
    } catch {}
    const err: Error & { status?: number } = new Error(msg || 'Nuvio API ' + status);
    err.status = status;
    throw err;
  }
  return text ? JSON.parse(text) : null;
}

const post = (path: string, body?: unknown, token?: string) => req('POST', path, body, token);
const get = (path: string, token?: string) => req('GET', path, undefined, token);

const progressKey = (contentId: string, season?: number | null, episode?: number | null) =>
  season != null && episode != null ? `${contentId}_s${season}e${episode}` : contentId;

export const NuvioClient = {
  signUp: (email: string, password: string) => post('/auth/v1/signup', { email, password }),
  signIn: (email: string, password: string) => post('/auth/v1/token?grant_type=password', { email, password }),
  refresh: (refresh_token: string) => post('/auth/v1/token?grant_type=refresh_token', { refresh_token }),
  signOut: (token: string) => raw('POST', '/auth/v1/logout', undefined, token),
  getUser: (token: string) => get('/auth/v1/user', token),

  pullProfiles: (token: string) => post('/rest/v1/rpc/sync_pull_profiles', {}, token),
  verifyProfilePin: (token: string, profileId: number, pin: string) =>
    post('/rest/v1/rpc/verify_profile_pin', { p_profile_id: profileId, p_pin: pin }, token),
  setProfilePin: (token: string, profileId: number, pin: string, currentPin?: string) =>
    post('/rest/v1/rpc/set_profile_pin', { p_profile_id: profileId, p_pin: pin, ...(currentPin ? { p_current_pin: currentPin } : {}) }, token),
  clearProfilePin: (token: string, profileId: number, currentPin?: string) =>
    post('/rest/v1/rpc/clear_profile_pin', { p_profile_id: profileId, ...(currentPin ? { p_current_pin: currentPin } : {}) }, token),
  clearProfilePinWithPassword: (token: string, profileId: number, accountPassword: string) =>
    post('/rest/v1/rpc/clear_profile_pin_with_account_password', { p_profile_id: profileId, p_account_password: accountPassword }, token),
  pushProfiles: (token: string, profiles: unknown[]) =>
    post('/rest/v1/rpc/sync_push_profiles', { p_client_max_profiles: NUVIO_MAX_PROFILES, p_profiles: profiles }, token),

  pullAddons: (token: string, profileId: number) =>
    get(`/rest/v1/addons?select=*&profile_id=eq.${profileId}&order=sort_order`, token),
  pushAddons: (token: string, profileId: number, addons: unknown[]) =>
    post('/rest/v1/rpc/sync_push_addons', { p_profile_id: profileId, p_addons: addons }, token),

  pullPlugins: (token: string, profileId: number) =>
    get(`/rest/v1/plugins?select=*&profile_id=eq.${profileId}&order=sort_order`, token),

  pullLibrary: (token: string, profileId: number, limit = 500, offset = 0) =>
    post('/rest/v1/rpc/sync_pull_library', { p_profile_id: profileId, p_limit: limit, p_offset: offset }, token),

  pullWatchProgress: (token: string, profileId: number, limit = 200) =>
    post('/rest/v1/rpc/sync_pull_watch_progress', { p_profile_id: profileId, p_limit: limit }, token),
  deleteWatchProgress: (token: string, profileId: number, contentId: string, season?: number | null, episode?: number | null) =>
    post('/rest/v1/rpc/sync_delete_watch_progress', { p_profile_id: profileId, p_progress_key: progressKey(contentId, season, episode) }, token),

  pullWatchHistory: (token: string, profileId: number, pageSize = 500) =>
    post('/rest/v1/rpc/sync_pull_watched_items', { p_profile_id: profileId, p_page: 1, p_page_size: pageSize }, token),

  pullSettings: (token: string, profileId: number, platform = 'desktop') =>
    post('/rest/v1/rpc/sync_pull_profile_settings_blob', { p_profile_id: profileId, p_platform: platform }, token),
  pushSettings: (token: string, profileId: number, settingsJson: unknown, platform = 'desktop') =>
    post('/rest/v1/rpc/sync_push_profile_settings_blob', { p_profile_id: profileId, p_platform: platform, p_settings_json: settingsJson }, token),

  pullCollections: (token: string, profileId: number) =>
    post('/rest/v1/rpc/sync_pull_collections', { p_profile_id: profileId }, token),
  pushCollections: (token: string, profileId: number, collectionsJson: unknown) =>
    post('/rest/v1/rpc/sync_push_collections', { p_profile_id: profileId, p_collections_json: collectionsJson }, token),

  listAvatars: () => post('/rest/v1/rpc/get_avatar_catalog', {}).catch(() => []),
  getSyncOverview: (token: string) => post('/rest/v1/rpc/get_sync_overview', {}, token).catch(() => null),
};

async function stremioCall(path: string, body: unknown) {
  const res = await fetch(STREMIO_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (data && data.error) {
    const err: Error & { code?: number; wrongEmail?: boolean } = new Error(data.error.message || 'Stremio error');
    err.code = data.error.code;
    err.wrongEmail = data.error.wrongEmail;
    throw err;
  }
  return data;
}

function extractAuth(data: any) {
  const r = data && data.result;
  if (!r) throw new Error('Unexpected response from Stremio');
  const authKey = r.authKey || (r.user && r.user.authKey);
  const user = r.user || {};
  if (!authKey) throw new Error('No auth key returned');
  return { authKey, userId: user.id || user._id || null, email: user.email || null };
}

export const StremioClient = {
  async login(email: string, password: string) {
    return extractAuth(await stremioCall('/api/login', { email, password }));
  },
  async register(email: string, password: string) {
    return extractAuth(await stremioCall('/api/register', { email, password }));
  },
  logout: (authKey: string) => stremioCall('/api/logout', { authKey }).catch(() => null),
  async getAddons(authKey: string) {
    const d = await stremioCall('/api/addonCollectionGet', { authKey, update: true });
    return (d.result && d.result.addons) || [];
  },
  setAddons: (authKey: string, addons: unknown[]) => stremioCall('/api/addonCollectionSet', { authKey, addons }),
  async getLibrary(authKey: string) {
    const d = await stremioCall('/api/datastoreGet', { authKey, collection: 'libraryItem', all: true });
    return d.result || [];
  },
  putLibrary: (authKey: string, items: unknown[]) =>
    stremioCall('/api/datastorePut', { authKey, collection: 'libraryItem', changes: items }),
};

export async function nuvioToken(session: Session, onRefresh: (s: Session) => void) {
  const now = Math.floor(Date.now() / 1000);
  if (session.refreshToken && session.expiresAt && session.expiresAt - now < 60) {
    const r = await NuvioClient.refresh(session.refreshToken);
    const next: Session = {
      ...session,
      accessToken: r.access_token,
      refreshToken: r.refresh_token || session.refreshToken,
      expiresAt: now + (r.expires_in || 3600),
    };
    saveSession(next);
    onRefresh(next);
    return next.accessToken!;
  }
  return session.accessToken!;
}

export function friendlyError(err: unknown) {
  const m = (err as Error)?.message || String(err);
  if (/invalid login|invalid_grant|wrongPassword|user not found|invalid credentials/i.test(m)) return 'Incorrect email or password.';
  if (/already registered|already exists|user_already_exists/i.test(m)) return 'An account with that email already exists.';
  if (/failed to fetch|networkerror|load failed/i.test(m)) return 'Network error. Check your connection and try again.';
  return m;
}

export type FluxaProfile = {
  id: string;
  name: string;
  avatar: string | null;
  settings: Record<string, unknown>;
  updated_at: string;
};

export function resolveInstanceBase(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, '');
  if (!trimmed) throw new Error('Enter your Fluxa Sync address');
  const absolute = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(absolute);
  } catch {
    throw new Error('That address is not a valid URL');
  }
  if (parsed.pathname.endsWith('/api/v1') || parsed.pathname.includes('/functions/v1/')) return absolute;
  if (parsed.hostname.endsWith('.supabase.co')) return `${absolute}/functions/v1/fluxa-sync`;
  return `${absolute}/api/v1`;
}

async function fluxaRequest<T>(base: string, method: string, path: string, body?: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (token) headers.authorization = 'Bearer ' + token;
  const res = await fetch(base + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) {
    let msg = text;
    try {
      const j = JSON.parse(text);
      msg = j.error_description || j.message || j.error || text;
    } catch {}
    const err: Error & { status?: number } = new Error(msg || 'Fluxa Sync ' + res.status);
    err.status = res.status;
    throw err;
  }
  return text ? (JSON.parse(text) as T) : (null as T);
}

type FluxaSessionResponse = {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: number | null;
  user: { id: string; email: string } | null;
};

function toFluxaSession(base: string, payload: FluxaSessionResponse): Session {
  if (!payload?.access_token || !payload.refresh_token) {
    throw new Error('Confirm your email address before signing in');
  }
  if (!payload.user) throw new Error('That instance returned no account');
  const lifetime = typeof payload.expires_in === 'number' && payload.expires_in > 0 ? payload.expires_in : 3600;
  return {
    provider: 'fluxa',
    email: payload.user.email,
    userId: payload.user.id,
    instanceUrl: base,
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + lifetime,
  };
}

export const FluxaClient = {
  signIn: async (instanceUrl: string, email: string, password: string) => {
    const base = resolveInstanceBase(instanceUrl);
    return toFluxaSession(base, await fluxaRequest<FluxaSessionResponse>(base, 'POST', '/auth/login', { email, password }));
  },
  signUp: async (instanceUrl: string, email: string, password: string) => {
    const base = resolveInstanceBase(instanceUrl);
    return toFluxaSession(base, await fluxaRequest<FluxaSessionResponse>(base, 'POST', '/auth/register', { email, password }));
  },
  refresh: async (base: string, refreshToken: string) =>
    toFluxaSession(base, await fluxaRequest<FluxaSessionResponse>(base, 'POST', '/auth/refresh', { refresh_token: refreshToken })),
  signOut: (base: string, token: string, refreshToken: string) =>
    fluxaRequest(base, 'POST', '/auth/logout', { refresh_token: refreshToken }, token).catch(() => null),
  profiles: async (base: string, token: string) =>
    (await fluxaRequest<FluxaProfile[]>(base, 'GET', '/profiles', undefined, token)) ?? [],
};

export async function fluxaToken(session: Session, onRefresh: (s: Session) => void) {
  const now = Math.floor(Date.now() / 1000);
  if (session.refreshToken && session.expiresAt && session.expiresAt - now < 60) {
    const next = await FluxaClient.refresh(session.instanceUrl!, session.refreshToken);
    saveSession(next);
    onRefresh(next);
    return next.accessToken!;
  }
  return session.accessToken!;
}
