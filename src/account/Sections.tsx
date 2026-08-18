import { useState } from 'react';
import { KeyRound, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { NUVIO_MAX_PROFILES, NuvioClient, StremioClient } from './api';
import { useAccount, useLoad } from './context';
import type { Profile } from './ui';
import { Loading, ProfileAvatar, SectionError, SecHead, useConfirm, useToast } from './ui';

function sumMap(m: unknown) {
  if (!m || typeof m !== 'object') return null;
  return Object.values(m as Record<string, unknown>).reduce<number>((a, b) => a + (Number(b) || 0), 0);
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="stat">
      <div className="stat-val">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function IdentityRows({ email, userId }: { email: string; userId?: string | null }) {
  return (
    <div className="list">
      <div className="row"><div className="row-main"><div className="row-title">Email</div><div className="row-sub">{email}</div></div></div>
      <div className="row"><div className="row-main"><div className="row-title">User ID</div><div className="row-sub">{userId || 'Unknown'}</div></div></div>
    </div>
  );
}

export function Overview() {
  const { session, token, profiles } = useAccount();
  const nuvio = session.provider === 'nuvio';

  if (session.provider === 'fluxa') {
    return (
      <>
        <SecHead title="Overview">Signed in to your own Fluxa Sync instance.</SecHead>
        <div className="stat-row">
          <Stat value={profiles.length} label="Profiles" />
        </div>
        <div className="list">
          <div className="row"><div className="row-main"><div className="row-title">Instance</div><div className="row-sub">{session.instanceUrl}</div></div></div>
          <div className="row"><div className="row-main"><div className="row-title">Email</div><div className="row-sub">{session.email}</div></div></div>
          <div className="row"><div className="row-main"><div className="row-title">User ID</div><div className="row-sub">{session.userId || 'Unknown'}</div></div></div>
        </div>
      </>
    );
  }

  const { data, error } = useLoad(async () => {
    if (nuvio) return { overview: await NuvioClient.getSyncOverview(await token()), addons: [], library: [] };
    const [addons, library] = await Promise.all([
      StremioClient.getAddons(session.authKey!).catch(() => []),
      StremioClient.getLibrary(session.authKey!).catch(() => []),
    ]);
    return { overview: null, addons, library };
  }, [session.provider]);

  if (error) return <SectionError title="Overview" message={error} />;
  if (!data) return <Loading title="Overview" />;

  if (nuvio) {
    const addonTotal = data.overview ? sumMap(data.overview.addons) : null;
    const libTotal = data.overview ? sumMap(data.overview.library_items) : null;
    return (
      <>
        <SecHead title="Overview">Your Nuvio sync account at a glance.</SecHead>
        <div className="stat-row">
          <Stat value={profiles.length} label="Profiles" />
          <Stat value={NUVIO_MAX_PROFILES} label="Profile limit" />
          <Stat value={addonTotal ?? 0} label="Addons synced" />
          <Stat value={libTotal ?? 0} label="Library items" />
        </div>
        <IdentityRows email={session.email} userId={session.userId} />
      </>
    );
  }

  return (
    <>
      <SecHead title="Overview">Your Stremio account, connected via Stremio's public API.</SecHead>
      <div className="stat-row">
        <Stat value={data.addons.length} label="Installed addons" />
        <Stat value={data.library.length} label="Library items" />
      </div>
      <IdentityRows email={session.email} userId={session.userId} />
    </>
  );
}

function toPushShape(p: Profile) {
  return {
    profile_index: p.profile_index,
    name: p.name,
    avatar_color_hex: p.avatar_color_hex ?? null,
    uses_primary_addons: !!p.uses_primary_addons,
    uses_primary_plugins: !!p.uses_primary_plugins,
    avatar_id: p.avatar_id ?? null,
    avatar_url: p.avatar_url ?? null,
  };
}

export function Profiles() {
  const { session, token, profiles, avatars, reloadProfiles } = useAccount();
  const toast = useToast();
  const confirm = useConfirm();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [accountPassword, setAccountPassword] = useState('');

  const push = async (list: Profile[]) => {
    setBusy(true);
    try {
      await NuvioClient.pushProfiles(await token(), list.map(toPushShape));
      await reloadProfiles();
    } finally {
      setBusy(false);
    }
  };

  const add = async () => {
    const trimmed = name.trim();
    if (!trimmed) return toast('Enter a profile name', true);
    const nextIndex = Math.max(0, ...profiles.map(p => p.profile_index)) + 1;
    await push([...profiles, { profile_index: nextIndex, name: trimmed }]);
    setName('');
    toast('Profile added');
  };

  const rename = async (p: Profile) => {
    const value = prompt('Rename profile', p.name || '');
    if (value == null) return;
    const trimmed = value.trim();
    if (!trimmed) return toast('Name cannot be empty', true);
    await push(profiles.map(x => (x.profile_index === p.profile_index ? { ...x, name: trimmed } : x)));
    toast('Profile renamed');
  };

  const startEdit = (p: Profile) => {
    setEditing(p.profile_index);
    setEditName(p.name || '');
    setEditAvatar(p.avatar_id || '');
    setCurrentPin('');
    setNewPin('');
    setAccountPassword('');
  };

  const saveProfile = async (p: Profile) => {
    const trimmed = editName.trim();
    if (!trimmed) return toast('Name cannot be empty', true);
    if (newPin && !/^\d{4}$/.test(newPin)) return toast('PIN must be exactly 4 digits', true);
    setBusy(true);
    try {
      await NuvioClient.pushProfiles(
        await token(),
        profiles.map(x => x.profile_index === p.profile_index
          ? { ...toPushShape(x), name: trimmed, avatar_id: editAvatar || null }
          : toPushShape(x))
      );
      if (newPin) {
        await NuvioClient.setProfilePin(await token(), p.profile_index, newPin, currentPin || undefined);
      }
      await reloadProfiles();
      setEditing(null);
      toast('Profile saved');
    } catch (err) {
      toast((err as Error).message || 'Could not save profile', true);
    } finally {
      setBusy(false);
    }
  };

  const clearPin = async (p: Profile) => {
    if (!currentPin && !accountPassword) return toast('Enter the current PIN or account password', true);
    setBusy(true);
    try {
      if (currentPin) await NuvioClient.clearProfilePin(await token(), p.profile_index, currentPin);
      else await NuvioClient.clearProfilePinWithPassword(await token(), p.profile_index, accountPassword);
      await reloadProfiles();
      setCurrentPin('');
      setAccountPassword('');
      toast('PIN removed');
    } catch (err) {
      toast((err as Error).message || 'Could not remove PIN', true);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p: Profile) => {
    const label = p.name || 'Profile ' + p.profile_index;
    const ok = await confirm('Delete profile', `Delete "${label}"? Its addons, library, and settings on this account will be removed.`, 'Delete');
    if (!ok) return;
    await push(profiles.filter(x => x.profile_index !== p.profile_index));
    toast('Profile deleted');
  };

  if (session.provider === 'fluxa') {
    return (
      <>
        <SecHead title="Profiles">Profiles stored on your Fluxa Sync instance.</SecHead>
        <div className="note-box">
          Profiles are created and edited in the Fluxa app. This is a read-only view of what your instance holds.
        </div>
        <div className="list">
          {profiles.length ? profiles.map(p => (
            <div className="row" key={p.profile_index}>
              <ProfileAvatar profile={p} avatars={avatars} size={42} />
              <div className="row-main">
                <div className="row-title">{p.name || 'Profile ' + p.profile_index}</div>
              </div>
            </div>
          )) : <div className="empty">No profiles on this instance yet.</div>}
        </div>
      </>
    );
  }

  return (
    <>
      <SecHead title="Profiles">Up to {NUVIO_MAX_PROFILES} profiles, each with its own addons, library, and settings.</SecHead>
      <div className="toolbar">
        <input
          className="inline-input grow"
          placeholder="New profile name"
          maxLength={40}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={add} disabled={busy || profiles.length >= NUVIO_MAX_PROFILES}>
          <Plus size={14} /> Add profile
        </button>
      </div>
      <div className="list">
        {profiles.map(p => (
          <div key={p.profile_index}>
          <div className="row">
            <ProfileAvatar profile={p} avatars={avatars} size={42} />
            <div className="row-main">
              <div className="row-title">
                {p.name || 'Profile ' + p.profile_index} {p.profile_index === 1 && <span className="tag">Primary</span>}
              </div>
              <div className="row-sub">Index {p.profile_index}{p.pin_enabled ? ' · PIN locked' : ''}</div>
            </div>
            <div className="row-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => editing === p.profile_index ? setEditing(null) : startEdit(p)} disabled={busy}><Pencil size={13} /></button>
              {p.profile_index !== 1 && (
                <button className="btn btn-danger btn-sm" onClick={() => remove(p)} disabled={busy}><Trash2 size={13} /></button>
              )}
            </div>
          </div>
          {editing === p.profile_index && (
            <div className="edit-card">
              <div className="toolbar">
                <input className="inline-input grow" maxLength={40} value={editName} onChange={e => setEditName(e.target.value)} placeholder="Profile name" />
                <select className="inline-input" value={editAvatar} onChange={e => setEditAvatar(e.target.value)}>
                  <option value="">Default avatar</option>
                  {avatars.map(a => <option key={a.id} value={a.id}>{a.id}</option>)}
                </select>
                <button className="btn btn-primary" onClick={() => saveProfile(p)} disabled={busy}><Save size={14} /> Save</button>
              </div>
              <div className="pin-editor">
                <div className="pin-title"><KeyRound size={14} /> {p.pin_enabled ? 'Change or remove PIN' : 'Set profile PIN'}</div>
                {p.pin_enabled && <input className="inline-input" inputMode="numeric" maxLength={4} type="password" placeholder="Current PIN" value={currentPin} onChange={e => setCurrentPin(e.target.value.replace(/\D/g, '').slice(0, 4))} />}
                <input className="inline-input" inputMode="numeric" maxLength={4} type="password" placeholder="New 4-digit PIN" value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))} />
                {p.pin_enabled && <>
                  <input className="inline-input" type="password" placeholder="Account password (PIN removal fallback)" value={accountPassword} onChange={e => setAccountPassword(e.target.value)} />
                  <button className="btn btn-danger btn-sm" onClick={() => clearPin(p)} disabled={busy}>Remove PIN</button>
                </>}
              </div>
            </div>
          )}
          </div>
        ))}
      </div>
    </>
  );
}

export function Plugins() {
  const { token, activeIndex } = useAccount();
  const { data, error } = useLoad(async () => (await NuvioClient.pullPlugins(await token(), activeIndex!)) || [], [activeIndex]);

  if (error) return <SectionError title="Plugins" message={error} />;
  if (!data) return <Loading title="Plugins" />;

  return (
    <>
      <SecHead title="Plugins">Plugins synced for the active profile.</SecHead>
      <div className="note-box">
        Plugins are installed and configured inside the Fluxa app. This is a read-only view of what's synced to your account.
      </div>
      <div className="list">
        {data.length ? data.map((p: any, i: number) => (
          <div className="row" key={p.id || i}>
            <div className="row-main">
              <div className="row-title">{p.name || p.id || 'Plugin'}</div>
              <div className="row-sub">{p.url || p.source || ''}</div>
            </div>
            {p.enabled != null && <span className={'tag' + (p.enabled ? ' on' : '')}>{p.enabled ? 'Enabled' : 'Disabled'}</span>}
          </div>
        )) : <div className="empty">No plugins synced on this profile.</div>}
      </div>
    </>
  );
}

export function Library() {
  const { session, token, activeIndex } = useAccount();

  const { data, error } = useLoad(async () => {
    if (session.provider === 'nuvio') {
      const items = (await NuvioClient.pullLibrary(await token(), activeIndex!)) || [];
      return items.map((it: any) => ({
        name: it.name,
        poster: it.poster,
        sub: `${it.content_type || ''}${it.release_info ? ' · ' + it.release_info : ''}`,
      }));
    }
    const raw = await StremioClient.getLibrary(session.authKey!);
    return raw.filter((it: any) => !it.removed).map((it: any) => ({ name: it.name, poster: it.poster, sub: it.type || '' }));
  }, [session.provider, activeIndex]);

  if (error) return <SectionError title="Library" message={error} />;
  if (!data) return <Loading title="Library" />;

  return (
    <>
      <SecHead title="Library">{data.length} saved {data.length === 1 ? 'title' : 'titles'} on this account.</SecHead>
      <div className="note-box">Library items are added and removed while you watch in the Fluxa app. This view shows what's synced.</div>
      <div className="list">
        {data.length ? data.slice(0, 300).map((it: any, i: number) => (
          <div className="row" key={i}>
            {it.poster
              ? <img className="poster" src={it.poster} alt="" loading="lazy" onError={e => (e.currentTarget.style.visibility = 'hidden')} />
              : <div className="poster" />}
            <div className="row-main">
              <div className="row-title">{it.name || 'Untitled'}</div>
              <div className="row-sub">{it.sub}</div>
            </div>
          </div>
        )) : <div className="empty">Your library is empty.</div>}
      </div>
    </>
  );
}

function fmtTime(total?: number) {
  const t = Math.floor(total || 0);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(s).padStart(2, '0');
}

const activityHeading = { fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' };

export function Watch() {
  const { token, activeIndex } = useAccount();
  const toast = useToast();
  const confirm = useConfirm();

  const { data, error, reload } = useLoad(async () => {
    const t = await token();
    const [progress, history] = await Promise.all([
      NuvioClient.pullWatchProgress(t, activeIndex!).catch(() => []),
      NuvioClient.pullWatchHistory(t, activeIndex!).catch(() => []),
    ]);
    return { progress: progress || [], history: history || [] };
  }, [activeIndex]);

  if (error) return <SectionError title="Watch activity" message={error} />;
  if (!data) return <Loading title="Watch activity" />;

  const clear = async (w: any) => {
    if (!(await confirm('Clear progress', 'Remove this item from continue watching?', 'Clear'))) return;
    await NuvioClient.deleteWatchProgress(await token(), activeIndex!, w.content_id, w.season, w.episode);
    toast('Progress cleared');
    reload();
  };

  return (
    <>
      <SecHead title="Watch activity">Continue-watching progress and recently watched items.</SecHead>
      <h3 style={{ ...activityHeading, margin: '0 0 10px' }}>In progress</h3>
      <div className="list">
        {data.progress.length ? data.progress.map((w: any, i: number) => (
          <div className="row" key={i}>
            <div className="row-main">
              <div className="row-title">{w.content_id}{w.season != null && ` · S${w.season}E${w.episode}`}</div>
              <div className="row-sub">
                {fmtTime(w.position)} / {fmtTime(w.duration)}
                {w.duration ? ` · ${Math.round((w.position / w.duration) * 100)}%` : ''}
              </div>
            </div>
            <div className="row-actions">
              <button className="btn btn-danger btn-sm" onClick={() => clear(w)}><X size={13} /></button>
            </div>
          </div>
        )) : <div className="empty">Nothing in progress.</div>}
      </div>
      <h3 style={{ ...activityHeading, margin: '24px 0 10px' }}>Recently watched</h3>
      <div className="list">
        {data.history.length ? data.history.slice(0, 100).map((w: any, i: number) => (
          <div className="row" key={i}>
            <div className="row-main">
              <div className="row-title">{w.title || w.content_id}{w.season != null && ` · S${w.season}E${w.episode}`}</div>
              <div className="row-sub">{w.watched_at ? new Date(w.watched_at).toLocaleString() : ''}</div>
            </div>
          </div>
        )) : <div className="empty">No watch history yet.</div>}
      </div>
    </>
  );
}
