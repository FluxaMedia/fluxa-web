import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Blocks, Bookmark, Check, ChevronsUpDown, Folder, History, LayoutDashboard,
  LogOut, PanelLeft, Puzzle, Sliders, Users,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import Addons from './Addons';
import Collections from './Collections';
import Settings from './Settings';
import { Library, Overview, Plugins, Profiles, Watch } from './Sections';
import { useAccount } from './context';
import { Loading, ProfileAvatar } from './ui';

type SectionId = 'overview' | 'profiles' | 'addons' | 'plugins' | 'library' | 'watch' | 'settings' | 'collections';

const SECTIONS: Record<string, [SectionId, string, LucideIcon][]> = {
  fluxa: [
    ['overview', 'Overview', LayoutDashboard],
    ['profiles', 'Profiles', Users],
  ],
  nuvio: [
    ['overview', 'Overview', LayoutDashboard],
    ['profiles', 'Profiles', Users],
    ['addons', 'Addons', Puzzle],
    ['plugins', 'Plugins', Blocks],
    ['library', 'Library', Bookmark],
    ['watch', 'Watch activity', History],
    ['settings', 'Settings', Sliders],
    ['collections', 'Collections', Folder],
  ],
  stremio: [
    ['overview', 'Overview', LayoutDashboard],
    ['addons', 'Addons', Puzzle],
    ['library', 'Library', Bookmark],
  ],
};

const PER_PROFILE = new Set<SectionId>(['addons', 'plugins', 'library', 'watch', 'settings', 'collections']);

const VIEWS: Record<SectionId, ComponentType> = {
  overview: Overview,
  profiles: Profiles,
  addons: Addons,
  plugins: Plugins,
  library: Library,
  watch: Watch,
  settings: Settings,
  collections: Collections,
};

function ProfilePicker({ onPick }: { onPick: (index: number) => void }) {
  const { profiles, avatars, activeIndex } = useAccount();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const away = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', away);
    return () => document.removeEventListener('click', away);
  }, []);

  const active = profiles.find(p => p.profile_index === activeIndex) || profiles[0];

  return (
    <div className="profile-switcher" ref={box}>
      <label>Active profile</label>
      <button
        className="ps-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={e => {
          e.stopPropagation();
          setOpen(v => !v);
        }}
      >
        <span className="ps-current">
          {active ? (
            <>
              <ProfileAvatar profile={active} avatars={avatars} size={22} />
              <span className="ps-cur-name">{active.name || 'Profile ' + active.profile_index}</span>
            </>
          ) : '…'}
        </span>
        <ChevronsUpDown className="ps-chev" />
      </button>
      <div className={'ps-menu' + (open ? ' open' : '')} role="listbox">
        {profiles.map(p => (
          <button
            key={p.profile_index}
            className={'ps-item' + (p.profile_index === activeIndex ? ' active' : '')}
            role="option"
            aria-selected={p.profile_index === activeIndex}
            onClick={() => {
              onPick(p.profile_index);
              setOpen(false);
            }}
          >
            <ProfileAvatar profile={p} avatars={avatars} size={26} />
            <span className="ps-item-name">{p.name || 'Profile ' + p.profile_index}</span>
            {p.profile_index === activeIndex && <Check className="ps-check" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Panel({
  section, onSection, onPickProfile, onSignOut,
}: {
  section: SectionId;
  onSection: (s: SectionId) => void;
  onPickProfile: (index: number) => void;
  onSignOut: () => void;
}) {
  const { session, asset, activeIndex } = useAccount();
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => setSlot(document.getElementById('panel-menu-slot')), []);

  const sections = SECTIONS[session.provider];
  const View = VIEWS[section];
  const label = sections.find(([id]) => id === section)?.[1] || section;
  const showPicker = session.provider === 'nuvio' && PER_PROFILE.has(section);

  return (
    <div className="panel">
      {slot && createPortal(
        <button className="panel-menu-btn" aria-label="Open account menu" onClick={() => setOpen(v => !v)}>
          <PanelLeft size={18} />
        </button>,
        slot
      )}
      <div className={'panel-overlay' + (open ? ' open' : '')} onClick={() => setOpen(false)} />
      <aside className={'panel-side' + (open ? ' open' : '')}>
        <div className="acct-card">
          <img className="acct-logo" src={asset(session.provider === 'fluxa' ? 'logo.png' : session.provider + '-logo.png')} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
          <div className="acct-info">
            <div className="acct-email">{session.email || 'Signed in'}</div>
            <div className="acct-provider">{session.provider} account</div>
          </div>
        </div>
        {showPicker && <ProfilePicker onPick={onPickProfile} />}
        <nav className="side-nav">
          {sections.map(([id, label, Icon]) => (
            <button
              key={id}
              className={section === id ? 'active' : ''}
              onClick={() => {
                onSection(id);
                setOpen(false);
              }}
            >
              <Icon /> {label}
            </button>
          ))}
        </nav>
        <div className="side-foot">
          <button className="btn btn-ghost btn-sm" style={{ width: '100%' }} onClick={onSignOut}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>
      <main className="panel-main">
        {showPicker && activeIndex == null ? <Loading title={label} /> : <View />}
      </main>
    </div>
  );
}

export { SECTIONS };
export type { SectionId };
