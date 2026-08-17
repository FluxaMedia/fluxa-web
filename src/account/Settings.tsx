import { useEffect, useState } from 'react';
import { Code, Save, Sliders } from 'lucide-react';
import { NuvioClient } from './api';
import { useAccount, useLoad } from './context';
import { Loading, SecHead, SectionError, useToast } from './ui';

function settingValue(v: unknown) {
  if (v == null) return 'Not set';
  if (typeof v === 'boolean') return v ? 'On' : 'Off';
  if (typeof v === 'object') {
    if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? '' : 's'}`;
    const n = Object.keys(v as object).length;
    return `${n} field${n === 1 ? '' : 's'}`;
  }
  return String(v);
}

function prettyKey(k: string) {
  return k.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function Settings() {
  const { token, activeIndex } = useAccount();
  const toast = useToast();
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const { data, error, reload } = useLoad(async () => {
    const rows = await NuvioClient.pullSettings(await token(), activeIndex!);
    const row = Array.isArray(rows) ? rows[0] : rows;
    return { settings: (row && row.settings_json) || {}, updatedAt: row && row.updated_at };
  }, [activeIndex]);

  useEffect(() => {
    if (data) setDraft(JSON.stringify(data.settings, null, 2));
  }, [data]);

  if (error) return <SectionError title="Settings" message={error} />;
  if (!data) return <Loading title="Settings" />;

  const keys = Object.keys(data.settings);
  const updated = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : null;

  const save = async () => {
    let parsed;
    try {
      parsed = JSON.parse(draft);
    } catch {
      return toast('Invalid JSON', true);
    }
    setBusy(true);
    try {
      await NuvioClient.pushSettings(await token(), activeIndex!, parsed);
      toast('Settings saved');
      reload();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SecHead title="Settings">Synced settings for the active profile{updated ? ` · updated ${updated}` : ''}.</SecHead>
      {keys.length ? (
        <div className="list">
          {keys.map(k => (
            <div className="row" key={k}>
              <div className="row-main">
                <div className="row-title">{prettyKey(k)}</div>
                <div className="row-sub">{k}</div>
              </div>
              <span className="tag">{settingValue(data.settings[k])}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-panel">
          <Sliders className="empty-icon" />
          <div className="empty-title">No settings synced yet</div>
          <div className="empty-desc">
            Settings appear here after you change them in the Fluxa app for this profile. You can also add them manually below.
          </div>
        </div>
      )}
      <details className="adv" open={!keys.length}>
        <summary><Code size={14} /> Edit raw JSON</summary>
        <div className="note-box" style={{ marginTop: 12 }}>This is the exact settings blob Fluxa syncs. Invalid JSON won't save.</div>
        <textarea className="json-edit" spellCheck={false} value={draft} onChange={e => setDraft(e.target.value)} />
        <div className="toolbar" style={{ marginTop: 14 }}>
          <div className="grow" />
          <button className="btn btn-ghost" onClick={() => setDraft(JSON.stringify(data.settings, null, 2))}>Reset</button>
          <button className="btn btn-primary" onClick={save} disabled={busy}><Save size={14} /> Save</button>
        </div>
      </details>
    </>
  );
}
