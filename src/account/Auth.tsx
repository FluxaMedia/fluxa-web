import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { NuvioClient, StremioClient, friendlyError, saveSession } from './api';
import type { Session } from './api';
import { Spinner } from './ui';

type Provider = 'nuvio' | 'stremio';
type Tab = 'login' | 'signup';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function nuvioAuth(tab: Tab, email: string, password: string): Promise<Session> {
  const r = await (tab === 'login' ? NuvioClient.signIn : NuvioClient.signUp)(email, password);
  if (!r || !r.access_token) {
    const notice: Error & { isNotice?: boolean } = new Error('Account created. Check your email to confirm, then log in.');
    notice.isNotice = true;
    throw notice;
  }
  return {
    provider: 'nuvio',
    email,
    accessToken: r.access_token,
    refreshToken: r.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + (r.expires_in || 3600),
    userId: r.user && r.user.id,
  };
}

async function stremioAuth(tab: Tab, email: string, password: string): Promise<Session> {
  const r = await (tab === 'login' ? StremioClient.login : StremioClient.register)(email, password);
  return { provider: 'stremio', email: r.email || email, authKey: r.authKey, userId: r.userId };
}

export default function Auth({ asset, onSignedIn }: { asset: (f: string) => string; onSignedIn: (s: Session) => void }) {
  const [provider, setProvider] = useState<Provider>('nuvio');
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<{ text: string; notice: boolean } | null>(null);

  const switchTo = (fn: () => void) => {
    fn();
    setErrors({});
    setBanner(null);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const confirm = String(form.get('confirm') || '');

    const next: Record<string, string> = {};
    if (!email) next.email = 'Email is required';
    else if (!EMAIL.test(email)) next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (tab === 'signup' && password.length < 8) next.password = 'At least 8 characters';
    if (tab === 'signup' && password !== confirm) next.confirm = 'Passwords do not match';

    setErrors(next);
    setBanner(null);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const session = provider === 'nuvio' ? await nuvioAuth(tab, email, password) : await stremioAuth(tab, email, password);
      saveSession(session);
      onSignedIn(session);
    } catch (err) {
      setBusy(false);
      if ((err as { isNotice?: boolean }).isNotice) setBanner({ text: (err as Error).message, notice: true });
      else setBanner({ text: friendlyError(err), notice: false });
    }
  }

  const hint =
    provider === 'nuvio'
      ? "Nuvio is Fluxa's built-in sync account. Same credentials as the desktop and Android apps."
      : tab === 'login'
        ? "Use your existing Stremio account. Fluxa connects to Stremio's public API."
        : 'Creates a real Stremio account, usable in Fluxa, Stremio, and any other Stremio-compatible app.';

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo"><img src={asset('logo.png')} alt="Fluxa" /></div>
        <div className="auth-title">{tab === 'login' ? 'Sign in to Fluxa' : 'Create your account'}</div>
        <div className="auth-sub">Manage your profiles, addons, and settings anywhere.</div>

        <div className="provider-toggle">
          {(['nuvio', 'stremio'] as Provider[]).map(p => (
            <button key={p} className={provider === p ? 'active' : ''} onClick={() => switchTo(() => setProvider(p))}>
              <img src={asset(p + '-logo.png')} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              {p === 'nuvio' ? 'Nuvio' : 'Stremio'}
            </button>
          ))}
        </div>

        <div className="tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => switchTo(() => setTab('login'))}>Log in</button>
          <button className={tab === 'signup' ? 'active' : ''} onClick={() => switchTo(() => setTab('signup'))}>Sign up</button>
        </div>

        {banner && <div className={banner.notice ? 'auth-notice' : 'auth-error'}>{banner.text}</div>}

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" autoFocus />
            <div className="field-err">{errors.email}</div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="pw-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={tab === 'login' ? 'Your password' : 'At least 8 characters'}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="field-err">{errors.password}</div>
          </div>
          {tab === 'signup' && (
            <div className="field">
              <label>Confirm password</label>
              <input type="password" name="confirm" placeholder="Re-enter password" autoComplete="new-password" />
              <div className="field-err">{errors.confirm}</div>
            </div>
          )}
          <button type="submit" className="btn btn-primary auth-submit" disabled={busy}>
            {busy ? <Spinner /> : tab === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <div className="auth-hint">{hint}</div>
      </div>
    </div>
  );
}
