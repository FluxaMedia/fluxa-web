import { createContext, useContext, useEffect, useState } from 'react';
import { friendlyError } from './api';
import type { Session } from './api';
import type { Avatar, Profile } from './ui';

export type Account = {
  session: Session;
  token: () => Promise<string>;
  profiles: Profile[];
  avatars: Avatar[];
  activeIndex: number | null;
  reloadProfiles: () => Promise<Profile[]>;
  asset: (file: string) => string;
};

export const AccountContext = createContext<Account>(null as unknown as Account);
export const useAccount = () => useContext(AccountContext);

export function useLoad<T>(load: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let live = true;
    setData(null);
    setError(null);
    load().then(
      value => live && setData(value),
      err => live && setError(friendlyError(err))
    );
    return () => {
      live = false;
    };
  }, [...deps, nonce]);

  return { data, error, reload: () => setNonce(n => n + 1) };
}
