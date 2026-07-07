// First-occurrence auto-linking for known services, tools, and Fluxa concepts.
// Each term is linked at most once per page, only in body text.

const GLOSSARY = [
  { term: 'architecture', url: 'architecture.html' },
  { term: 'fluxa-core', url: 'architecture.html#repos-and-responsibilities' },
  { term: 'manifest URL', url: 'concepts.html#manifest-url' },
  { term: 'manifest', url: 'concepts.html#manifest-url' },
  { term: 'catalog addon', url: 'concepts.html#catalog-addon' },
  { term: 'stream addon', url: 'concepts.html#stream-addon' },
  { term: 'metadata addon', url: 'concepts.html#metadata-addon' },
  { term: 'subtitle addon', url: 'concepts.html#subtitle-addon' },
  { term: 'addon', url: 'concepts.html#addons' },
  { term: 'catalog', url: 'addons-catalogs.html#catalogs' },
  { term: 'profile', url: 'sync-accounts.html#profiles-and-accounts' },
  { term: 'library', url: 'library-collections.html#my-list' },
  { term: 'collection', url: 'library-collections.html#collections' },
  { term: 'source', url: 'playback.html#picking-a-source' },
  { term: 'subtitles', url: 'playback.html#subtitles' },
  { term: 'Nuvio', url: 'sync-accounts.html#nuvio-cross-device-sync' },
  { term: 'Stremio', url: 'concepts.html#stremio-compatibility' },
  { term: 'API key', url: 'privacy-security.html#tokens-and-keys' },
  { term: 'data locations', url: 'data-locations.html' },
  { term: 'keyboard shortcuts', url: 'keyboard-shortcuts.html' },
  { term: 'recommended settings', url: 'recommended-settings.html' },
  { term: 'known limitations', url: 'known-limitations.html' },
  { term: 'Debrid setup', url: 'debrid-usenet-setup.html' },
  { term: 'Usenet setup', url: 'debrid-usenet-setup.html' },
  { term: 'Real-Debrid', url: 'https://real-debrid.com' },
  { term: 'AllDebrid', url: 'https://alldebrid.com' },
  { term: 'Debrid-Link', url: 'https://debrid-link.com' },
  { term: 'TorBox', url: 'https://torbox.app' },
  { term: 'Premiumize', url: 'https://www.premiumize.me' },
  { term: 'Torrentio', url: 'https://torrentio.strem.fun' },
  { term: 'Easynews', url: 'https://www.easynews.com' },
  { term: 'Newshosting', url: 'https://www.newshosting.com' },
  { term: 'Eweka', url: 'https://www.eweka.nl' },
  { term: 'UsenetServer', url: 'https://www.usenetserver.com' },
  { term: 'Trakt', url: 'https://trakt.tv' },
  { term: 'MyAnimeList', url: 'https://myanimelist.net' },
  { term: 'Simkl', url: 'https://simkl.com' },
  { term: 'TMDB', url: 'https://www.themoviedb.org' },
  { term: 'Letterboxd', url: 'https://letterboxd.com' },
  { term: 'MDBList', url: 'https://mdblist.com' },
  { term: 'mpv', url: 'https://mpv.io' },
];

const BLOCKED_TAGS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'button', 'nav', 'script', 'style']);

function linkifyTerms(root) {
  const linked = new Set();

  function termIndex(text, term) {
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = text.match(new RegExp(`\\b${safe}\\b`, 'i'));
    return match ? match.index : -1;
  }

  function walk(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (BLOCKED_TAGS.has(node.tagName.toLowerCase()) || node.classList.contains('doc-meta')) return;
      Array.from(node.childNodes).forEach(walk);
    } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
      let best = null;
      for (const { term, url } of GLOSSARY) {
        const key = term.toLowerCase();
        if (linked.has(key)) continue;
        const idx = termIndex(node.nodeValue, term);
        if (idx === -1) continue;
        if (!best || idx < best.idx || (idx === best.idx && term.length > best.term.length)) best = { term, url, idx };
      }
      if (!best) return;

      linked.add(best.term.toLowerCase());

      const matched = node.nodeValue.slice(best.idx, best.idx + best.term.length);
      const before = node.nodeValue.slice(0, best.idx);
      const afterText = node.nodeValue.slice(best.idx + best.term.length);
      const frag = document.createDocumentFragment();

      if (before) frag.appendChild(document.createTextNode(before));

      const a = document.createElement('a');
      a.href = best.url;
      if (/^https?:/.test(best.url)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.className = 'glossary-link';
      a.textContent = matched;
      frag.appendChild(a);

      const afterNode = afterText ? document.createTextNode(afterText) : null;
      if (afterNode) frag.appendChild(afterNode);

      node.parentNode.replaceChild(frag, node);
      if (afterNode) walk(afterNode);
    }
  }

  walk(root);
}

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  if (content) linkifyTerms(content);
});
