import { useCallback, useEffect, useMemo, useState } from 'react';
import { NuvioClient, StremioClient, loadSession, nuvioToken, saveSession } from './api';
import type { Session } from './api';
import Auth from './Auth';
import Panel from './Panel';
import { SECTIONS } from './Panel';
import type { SectionId } from './Panel';
import { AccountContext } from './context';
import type { Account } from './context';
import type { Avatar, Profile } from './ui';
import { Chrome } from './ui';

export default function App({ base = '' }: { base?: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<SectionId>('overview');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setSession(loadSession());
    setReady(true);
  }, []);

  const asset = useCallback((file: string) => `${base}/${file}`.replace(/\/{2,}/g, '/'), [base]);

  const token = useCallback(async () => {
    if (!session) throw new Error('Signed out');
    return nuvioToken(session, setSession);
  }, [session]);

  const reloadProfiles = useCallback(async () => {
    const list = ((await NuvioClient.pullProfiles(await token())) || []) as Profile[];
    const sorted = list.sort((a, b) => a.profile_index - b.profile_index);
    setProfiles(sorted);
    setActiveIndex(current => (current != null && sorted.some(p => p.profile_index === current) ? current : sorted[0]?.profile_index ?? null));
    return sorted;
  }, [token]);

  useEffect(() => {
    if (session?.provider !== 'nuvio') return;
    reloadProfiles().catch(() => {});
    NuvioClient.listAvatars().then(list => setAvatars(list || []), () => {});
  }, [session?.provider, session?.userId]);

  useEffect(() => {
    if (!session) return;
    if (!SECTIONS[session.provider].some(([id]) => id === section)) setSection('overview');
  }, [session, section]);

  const signOut = () => {
    if (session?.provider === 'nuvio' && session.accessToken) NuvioClient.signOut(session.accessToken).catch(() => {});
    if (session?.provider === 'stremio' && session.authKey) StremioClient.logout(session.authKey);
    saveSession(null);
    setSession(null);
    setProfiles([]);
    setAvatars([]);
    setActiveIndex(null);
    setSection('overview');
  };

  const account = useMemo<Account>(
    () => ({ session: session!, token, profiles, avatars, activeIndex, reloadProfiles, asset }),
    [session, token, profiles, avatars, activeIndex, reloadProfiles, asset]
  );

  if (!ready) return null;

  return (
    <Chrome>
      {session ? (
        <AccountContext.Provider value={account}>
          <Panel section={section} onSection={setSection} onPickProfile={setActiveIndex} onSignOut={signOut} />
        </AccountContext.Provider>
      ) : (
        <Auth asset={asset} onSignedIn={setSession} />
      )}
    </Chrome>
  );
}
