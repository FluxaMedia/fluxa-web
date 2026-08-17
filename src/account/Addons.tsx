import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { NuvioClient, StremioClient } from './api';
import { useAccount, useLoad } from './context';
import { Loading, SecHead, SectionError, useConfirm, useToast } from './ui';

function manifestName(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

async function fetchManifest(url: string) {
  try {
    const res = await fetch(url);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function swap<T>(list: T[], a: number, b: number) {
  const next = [...list];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

function AddToolbar({ onAdd, busy }: { onAdd: (url: string) => Promise<void>; busy: boolean }) {
  const [url, setUrl] = useState('');
  const toast = useToast();

  const submit = async () => {
    if (!/^https?:\/\//.test(url.trim())) return toast('Enter a valid manifest URL', true);
    await onAdd(url.trim());
    setUrl('');
  };

  return (
    <div className="toolbar">
      <input
        className="inline-input grow"
        placeholder="https://addon.example.com/manifest.json"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        <Plus size={14} /> Add
      </button>
    </div>
  );
}

function Reorder({ index, count, onMove, disabled }: { index: number; count: number; onMove: (to: number) => void; disabled: boolean }) {
  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={() => onMove(index - 1)} disabled={disabled || index === 0}>
        <ChevronUp size={13} />
      </button>
      <button className="btn btn-ghost btn-sm" onClick={() => onMove(index + 1)} disabled={disabled || index === count - 1}>
        <ChevronDown size={13} />
      </button>
    </>
  );
}

export default function Addons() {
  const { session, token, activeIndex } = useAccount();
  const toast = useToast();
  const confirm = useConfirm();
  const [busy, setBusy] = useState(false);
  const nuvio = session.provider === 'nuvio';

  const { data, error, reload } = useLoad(async () => {
    if (nuvio) {
      const list = ((await NuvioClient.pullAddons(await token(), activeIndex!)) || []) as any[];
      return list.sort((a, b) => a.sort_order - b.sort_order);
    }
    return (await StremioClient.getAddons(session.authKey!)) as any[];
  }, [session.provider, activeIndex]);

  if (error) return <SectionError title="Addons" message={error} />;
  if (!data) return <Loading title="Addons" />;

  const save = async (list: any[]) => {
    setBusy(true);
    try {
      if (nuvio) {
        await NuvioClient.pushAddons(
          await token(),
          activeIndex!,
          list.map((a, i) => ({ url: a.url, name: a.name || null, enabled: a.enabled !== false, sort_order: i }))
        );
      } else {
        await StremioClient.setAddons(session.authKey!, list);
      }
      reload();
    } finally {
      setBusy(false);
    }
  };

  const add = async (url: string) => {
    const manifest = await fetchManifest(url);
    if (nuvio) {
      await save([...data, { url, name: manifest && manifest.name, enabled: true }]);
    } else {
      if (!manifest || !manifest.id) return toast('Could not read addon manifest', true);
      await save([...data, { transportUrl: url, manifest }]);
    }
    toast('Addon added');
  };

  const move = (from: number) => (to: number) => save(swap(data, from, to));

  const remove = async (i: number, label: string, target: string) => {
    if (!(await confirm('Remove addon', `Remove "${label}" ${target}?`, 'Remove'))) return;
    await save(data.filter((_, j) => j !== i));
    toast('Addon removed');
  };

  if (nuvio) {
    return (
      <>
        <SecHead title="Addons">Addons for the active profile. Add by manifest URL, toggle, reorder, or remove.</SecHead>
        <AddToolbar onAdd={add} busy={busy} />
        <div className="list">
          {data.length ? data.map((a, i) => (
            <div className="row" key={a.url}>
              <div className="row-main">
                <div className="row-title">{a.name || manifestName(a.url)}</div>
                <div className="row-sub">{a.url}</div>
              </div>
              <div className="row-actions">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={a.enabled !== false}
                    disabled={busy}
                    onChange={async e => {
                      const enabled = e.target.checked;
                      await save(data.map((x, j) => (j === i ? { ...x, enabled } : x)));
                      toast(enabled ? 'Addon enabled' : 'Addon disabled');
                    }}
                  />
                  <span className="track" />
                  <span className="thumb" />
                </label>
                <Reorder index={i} count={data.length} onMove={move(i)} disabled={busy} />
                <button
                  className="btn btn-danger btn-sm"
                  disabled={busy}
                  onClick={() => remove(i, a.name || manifestName(a.url), 'from this profile')}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )) : <div className="empty">No addons on this profile yet.</div>}
        </div>
      </>
    );
  }

  return (
    <>
      <SecHead title="Addons">Your Stremio addon collection. Add by manifest URL, reorder, or remove.</SecHead>
      <AddToolbar onAdd={add} busy={busy} />
      <div className="list">
        {data.map((a, i) => {
          const isProtected = a.flags && a.flags.protected;
          const name = (a.manifest && a.manifest.name) || manifestName(a.transportUrl);
          return (
            <div className="row" key={a.transportUrl}>
              {a.manifest && a.manifest.logo && <img className="avatar" src={a.manifest.logo} alt="" />}
              <div className="row-main">
                <div className="row-title">{name} {isProtected && <span className="tag">Protected</span>}</div>
                <div className="row-sub">{a.transportUrl}</div>
              </div>
              <div className="row-actions">
                <Reorder index={i} count={data.length} onMove={move(i)} disabled={busy} />
                {!isProtected && (
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={busy}
                    onClick={() => remove(i, name, 'from your Stremio account')}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
