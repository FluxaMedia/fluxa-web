import { useEffect, useRef, useState } from 'react';
import { Code, Download, Eye, Folder, Save, Upload } from 'lucide-react';
import { NuvioClient } from './api';
import { useAccount, useLoad } from './context';
import { Loading, SecHead, SectionError, useToast } from './ui';

type CollectionFolder = { title?: string; tileShape?: string; coverImageUrl?: string; coverEmoji?: string; sources?: unknown[]; catalogSources?: unknown[] };
type Collection = { title?: string; folders?: CollectionFolder[] };

function FolderCard({ folder }: { folder: CollectionFolder }) {
  const shape = (folder.tileShape || 'poster').toLowerCase();
  const wide = shape === 'landscape' || shape === 'wide';
  const sources = folder.sources || folder.catalogSources || [];
  return (
    <div className={'fcard' + (wide ? ' wide' : '')}>
      <div className="fcard-art">
        {folder.coverImageUrl && (
          <img
            src={folder.coverImageUrl}
            alt=""
            loading="lazy"
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('noimg');
            }}
          />
        )}
        <span className="fcard-emoji">{folder.coverEmoji || '📁'}</span>
      </div>
      <div className="fcard-title">{folder.title || 'Untitled'}</div>
      <div className="fcard-sub">{sources.length} source{sources.length === 1 ? '' : 's'} · {shape}</div>
    </div>
  );
}

function Preview({ collections }: { collections: Collection[] }) {
  if (!collections.length) {
    return (
      <div className="empty-panel">
        <Folder className="empty-icon" />
        <div className="empty-title">No collections yet</div>
        <div className="empty-desc">Build collections in the Fluxa app, or import a collections JSON below.</div>
      </div>
    );
  }
  return (
    <>
      {collections.map((c, i) => {
        const folders = c.folders || [];
        return (
          <div className="col-block" key={i}>
            <div className="col-block-head">
              <span className="col-block-title">{c.title || 'Collection'}</span>
              <span className="tag">{folders.length} folder{folders.length === 1 ? '' : 's'}</span>
            </div>
            <div className="frow">
              {folders.length
                ? folders.map((f, j) => <FolderCard folder={f} key={j} />)
                : <div className="row-sub" style={{ padding: '8px 2px' }}>No folders</div>}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function Collections() {
  const { token, activeIndex } = useAccount();
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'preview' | 'json'>('preview');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [draft, setDraft] = useState('[]');
  const [busy, setBusy] = useState(false);

  const { data, error, reload } = useLoad(async () => {
    const rows = await NuvioClient.pullCollections(await token(), activeIndex!);
    const row = Array.isArray(rows) ? rows[0] : rows;
    return ((row && row.collections_json) || []) as Collection[];
  }, [activeIndex]);

  useEffect(() => {
    if (!data) return;
    setCollections(data);
    setDraft(JSON.stringify(data, null, 2));
    setMode('preview');
  }, [data]);

  if (error) return <SectionError title="Collections" message={error} />;
  if (!data) return <Loading title="Collections" />;

  const toPreview = () => {
    try {
      setCollections(JSON.parse(draft));
    } catch {}
    setMode('preview');
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(collections, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fluxa-collections.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      let parsed;
      try {
        parsed = JSON.parse(String(reader.result));
      } catch {
        return toast('That file is not valid JSON', true);
      }
      if (!Array.isArray(parsed)) return toast('Collections file must be a JSON array', true);
      setCollections(parsed);
      setDraft(JSON.stringify(parsed, null, 2));
      setMode('json');
      toast('Imported — review, then Save to sync');
    };
    reader.readAsText(file);
  };

  const save = async () => {
    let parsed;
    try {
      parsed = JSON.parse(draft);
    } catch {
      return toast('Invalid JSON', true);
    }
    if (!Array.isArray(parsed)) return toast('Collections must be a JSON array', true);
    setBusy(true);
    try {
      await NuvioClient.pushCollections(await token(), activeIndex!, parsed);
      setCollections(parsed);
      toast('Collections saved');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SecHead title="Collections">Custom collections and folders for the active profile.</SecHead>
      <div className="toolbar">
        <div className="seg">
          <button className={mode === 'preview' ? 'active' : ''} onClick={toPreview}><Eye size={14} /> Preview</button>
          <button className={mode === 'json' ? 'active' : ''} onClick={() => setMode('json')}><Code size={14} /> JSON</button>
        </div>
        <div className="grow" />
        <button className="btn btn-ghost btn-sm" onClick={() => fileInput.current?.click()}><Upload size={14} /> Import</button>
        <button className="btn btn-ghost btn-sm" onClick={exportJson}><Download size={14} /> Export</button>
      </div>
      <input
        type="file"
        ref={fileInput}
        accept="application/json,.json"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) importJson(file);
          e.target.value = '';
        }}
      />
      {mode === 'preview' ? (
        <div className="col-preview"><Preview collections={collections} /></div>
      ) : (
        <>
          <textarea className="json-edit" spellCheck={false} value={draft} onChange={e => setDraft(e.target.value)} />
          <div className="toolbar" style={{ marginTop: 14 }}>
            <div className="grow" />
            <button className="btn btn-ghost" onClick={reload}>Reset</button>
            <button className="btn btn-primary" onClick={save} disabled={busy}><Save size={14} /> Save</button>
          </div>
        </>
      )}
    </>
  );
}
