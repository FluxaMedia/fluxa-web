import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { NUVIO_STORAGE } from './api';

export type Avatar = { id: string; storage_path: string };
export type Profile = {
  profile_index: number;
  name?: string | null;
  avatar_id?: string | null;
  avatar_url?: string | null;
  avatar_color_hex?: string | null;
  uses_primary_addons?: boolean;
  uses_primary_plugins?: boolean;
  pin_enabled?: boolean;
  pin_locked_until?: string | null;
  updated_at?: string;
};

export function initials(name?: string | null) {
  const n = (name || '').trim();
  if (!n) return '?';
  return n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function avatarUrl(p: Profile | null | undefined, avatars: Avatar[]) {
  if (!p) return null;
  if (p.avatar_url) return p.avatar_url;
  if (p.avatar_id) {
    const e = avatars.find(a => a.id === p.avatar_id);
    if (e) return NUVIO_STORAGE + e.storage_path;
  }
  return null;
}

export function ProfileAvatar({ profile, avatars, size }: { profile: Profile | null; avatars: Avatar[]; size?: number }) {
  const url = avatarUrl(profile, avatars);
  const style = size ? { width: size, height: size } : undefined;
  return (
    <div className="avatar" style={style}>
      {url ? <img src={url} alt="" loading="lazy" /> : initials(profile?.name)}
    </div>
  );
}

export function Spinner() {
  return <span className="spin" />;
}

export function SecHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="sec-head">
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Loading({ title }: { title: string }) {
  return (
    <>
      <SecHead title={title} />
      <div className="loading-sec"><Spinner /></div>
    </>
  );
}

export function SectionError({ title, message }: { title: string; message: string }) {
  return (
    <>
      <SecHead title={title} />
      <div className="empty">{message}</div>
    </>
  );
}

type Toast = { text: string; error: boolean };
const ToastContext = createContext<(text: string, error?: boolean) => void>(() => {});
export const useToast = () => useContext(ToastContext);

type ConfirmRequest = { title: string; body: string; label: string; resolve: (v: boolean) => void };
const ConfirmContext = createContext<(title: string, body: string, label?: string) => Promise<boolean>>(async () => false);
export const useConfirm = () => useContext(ConfirmContext);

export function Chrome({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [ask, setAsk] = useState<ConfirmRequest | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const push = useCallback((text: string, error = false) => {
    setToast({ text, error });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const confirm = useCallback(
    (title: string, body: string, label = 'Confirm') =>
      new Promise<boolean>(resolve => setAsk({ title, body, label, resolve })),
    []
  );

  const answer = (v: boolean) => {
    ask?.resolve(v);
    setAsk(null);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={push}>
      <ConfirmContext.Provider value={confirm}>
        {children}
        <div className={'toast' + (toast ? ' show' : '') + (toast?.error ? ' err' : '')}>{toast?.text}</div>
        <div className={'modal-overlay' + (ask ? ' open' : '')}>
          <div className="modal">
            <h3>{ask?.title}</h3>
            <p>{ask?.body}</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => answer(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => answer(true)}>{ask?.label}</button>
            </div>
          </div>
        </div>
      </ConfirmContext.Provider>
    </ToastContext.Provider>
  );
}
